window.BattleEngine = {
  startBattle({ mode = "story", playerId = "amy", enemyId = "algorithm" } = {}) {
    this.stopTurnTimer();

    window.GameState.mode = mode;
    window.GameState.currentScreen = "battle";
    window.GameState.battle = {
      mode,
      player: window.Helpers.cloneCharacter(playerId),
      enemy: window.Helpers.cloneCharacter(enemyId),
      turn: "player",
      round: 1,
      log: [
        `Battle start: ${window.CHARACTERS[playerId].name} vs. ${window.CHARACTERS[enemyId].name}.`,
        `Amy has ${window.GameState.settings.turnTimerSeconds} seconds to choose a move.`
      ],
      locked: false,
      winner: null,
      timerRemaining: window.GameState.settings.turnTimerSeconds
    };

    window.UI.renderBattle();
    this.startTurnTimer();
  },

  startTurnTimer() {
    const battle = window.GameState.battle;
    if (!battle || battle.locked || battle.winner || battle.turn !== "player") return;

    this.stopTurnTimer();

    const seconds = window.GameState.settings.turnTimerSeconds;
    battle.timerRemaining = seconds;
    window.GameState.timers.turnDeadline = Date.now() + seconds * 1000;

    window.GameState.timers.turnTimerId = window.setInterval(() => {
      const activeBattle = window.GameState.battle;
      if (!activeBattle || activeBattle.locked || activeBattle.winner || activeBattle.turn !== "player") {
        this.stopTurnTimer();
        return;
      }

      const remaining = Math.max(0, Math.ceil((window.GameState.timers.turnDeadline - Date.now()) / 1000));
      activeBattle.timerRemaining = remaining;
      window.UI.updateTurnTimer();

      if (remaining <= 0) {
        this.stopTurnTimer();
        this.handleTurnTimeout();
      }
    }, 250);

    window.UI.updateTurnTimer();
  },

  stopTurnTimer() {
    if (window.GameState.timers.turnTimerId) {
      window.clearInterval(window.GameState.timers.turnTimerId);
    }
    window.GameState.timers.turnTimerId = null;
    window.GameState.timers.turnDeadline = null;
  },

  handleTurnTimeout() {
    const battle = window.GameState.battle;
    if (!battle || battle.locked || battle.winner || battle.turn !== "player") return;

    const behavior = window.GameState.settings.timeoutBehavior;

    if (behavior === "skip") {
      battle.log.unshift("Time ran out. Amy hesitated and lost her turn.");
      battle.locked = true;
      battle.turn = "enemy";
      battle.player.currentSprite = "hurt";
      window.UI.renderBattle();

      setTimeout(() => {
        this.enemyTurn();
        battle.round += 1;
        battle.locked = false;
        battle.turn = "player";
        battle.player.currentSprite = "idle";
        this.checkWinner();
        window.UI.renderBattle();
        this.startTurnTimer();
      }, 650);
      return;
    }

    let moveId = "boundary_guard";

    if (behavior === "random") {
      moveId = window.Helpers.randomChoice(battle.player.moves);
    }

    const move = window.MOVES[moveId] ? window.MOVES[moveId] : window.MOVES[window.Helpers.randomChoice(battle.player.moves)];
    battle.log.unshift(`Time ran out. Amy panic-picked ${move.name}.`);
    this.choosePlayerMove(move.id);
  },

  choosePlayerMove(moveId) {
    const battle = window.GameState.battle;
    if (!battle || battle.locked || battle.winner) return;

    this.stopTurnTimer();

    const move = window.Helpers.getMove(moveId);
    this.applyMove(battle.player, battle.enemy, move);
    this.checkWinner();

    if (battle.winner) {
      window.UI.renderBattle();
      return;
    }

    battle.locked = true;
    battle.turn = "enemy";
    window.UI.renderBattle();

    setTimeout(() => {
      this.enemyTurn();
      battle.round += 1;
      battle.locked = false;
      battle.turn = "player";
      this.checkWinner();
      window.UI.renderBattle();
      this.startTurnTimer();
    }, 650);
  },

  enemyTurn() {
    const battle = window.GameState.battle;
    if (!battle || battle.winner) return;

    const moveIds = battle.enemy.moves || [];
    const availableMoves = moveIds.map(id => window.MOVES[id]).filter(Boolean);

    // Bosses should occasionally use bigger moves without spamming supers every turn.
    const filtered = availableMoves.filter(move => {
      if (move.type === "ultimate") return Math.random() < 0.35;
      return true;
    });

    const move = window.Helpers.randomChoice(filtered.length ? filtered : availableMoves);
    this.applyMove(battle.enemy, battle.player, move);
  },

  applyMove(attacker, defender, move) {
    const battle = window.GameState.battle;
    attacker.currentSprite = move.sprite || "attack";
    defender.currentSprite = "hurt";

    let damage = 0;
    let healing = 0;

    if (move.type === "support") {
      healing = move.healing || 0;
      attacker.hp = window.Helpers.clamp(attacker.hp + healing, 0, attacker.maxHp);
      if (move.guard) window.Helpers.addStatus(attacker, "guarded");
      battle.log.unshift(`${attacker.name} used ${move.name}. +${healing} Resolve/HP energy.`);
    } else if (move.type === "cleanse") {
      damage = move.power || 0;
      healing = move.healing || 0;
      defender.hp = window.Helpers.clamp(defender.hp - damage, 0, defender.maxHp);
      attacker.hp = window.Helpers.clamp(attacker.hp + healing, 0, attacker.maxHp);
      window.Helpers.clearBadStatuses(attacker);
      battle.log.unshift(`${attacker.name} used ${move.name}. Cleansed the nonsense and dealt ${damage}.`);
    } else {
      damage = this.calculateDamage(attacker, defender, move);
      defender.hp = window.Helpers.clamp(defender.hp - damage, 0, defender.maxHp);
      if (move.applies) window.Helpers.addStatus(defender, move.applies);
      battle.log.unshift(`${attacker.name} used ${move.name}. ${defender.name} took ${damage} damage.`);
    }

    if (move.applies) {
      battle.log.unshift(`${defender.name} is now ${move.applies}.`);
    }

    setTimeout(() => {
      if (!window.GameState.battle) return;
      attacker.currentSprite = "idle";
      if (defender.hp <= 0) {
        defender.currentSprite = "ko";
      } else {
        defender.currentSprite = "idle";
      }
      window.UI.renderBattle();
    }, 480);
  },

  calculateDamage(attacker, defender, move) {
    let power = move.power || 0;

    if (window.Helpers.hasStatus(defender, "guarded")) {
      power = Math.round(power * 0.55);
      window.Helpers.removeStatus(defender, "guarded");
      window.GameState.battle.log.unshift(`${defender.name}'s guard reduced the damage.`);
    }

    if (window.Helpers.hasStatus(attacker, "glitched")) {
      power = Math.round(power * 0.75);
    }

    if (move.type === "ultimate") {
      power += 5;
    }

    return Math.max(0, power);
  },

  checkWinner() {
    const battle = window.GameState.battle;
    if (!battle) return;

    if (battle.player.hp <= 0) {
      this.stopTurnTimer();
      battle.player.currentSprite = "ko";
      battle.winner = battle.enemy.id;
      battle.log.unshift(`${battle.enemy.name} wins. Amy needs a group chat reset.`);
    }

    if (battle.enemy.hp <= 0) {
      this.stopTurnTimer();
      battle.enemy.currentSprite = "ko";
      battle.player.currentSprite = "victory";
      battle.winner = battle.player.id;
      battle.log.unshift(`${battle.player.name} wins. The nonsense has been temporarily defeated.`);
    }
  }
};
