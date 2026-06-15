window.UI = {
  screen() {
    return document.getElementById("screen");
  },

  renderHome() {
    window.GameState.currentScreen = "home";
    window.BattleEngine.stopTurnTimer();

    this.screen().innerHTML = `
      <section class="panel">
        <p class="eyebrow">working title</p>
        <h2>Amy: Red Flag Rampage</h2>
        <p class="dialogue">
          A campy turn-based dating battle RPG with a chaotic arcade-fighter bonus mode.
          Amy fights red-flag guys, toxic patterns, and the dating app algorithm itself.
        </p>

        <div class="grid home-grid">
          <article class="card mode-card" data-action="story">
            <h3>Main Story</h3>
            <p>Conversation choices trigger moves. Emotional growth, but make it ridiculous.</p>
            <span class="tag">Turn-based</span><span class="tag">Timed choices</span>
          </article>

          <article class="card mode-card" data-action="arcade">
            <h3>Arcade Mode</h3>
            <p>Pick fighters/supports/enemies and throw hands with the metaphors.</p>
            <span class="tag">Chaotic</span><span class="tag">Roster</span>
          </article>

          <article class="card mode-card" data-action="design">
            <h3>Design Notes</h3>
            <p>Roster categories, sprite naming, timer logic, and move rules for future expansion.</p>
            <span class="tag">Dev</span><span class="tag">Planning</span>
          </article>
        </div>
      </section>
    `;

    this.screen().querySelector('[data-action="story"]').addEventListener("click", () => this.renderStory());
    this.screen().querySelector('[data-action="arcade"]').addEventListener("click", () => this.renderArcadeSelect());
    this.screen().querySelector('[data-action="design"]').addEventListener("click", () => this.renderDesignNotes());
  },

  renderStory() {
    window.GameState.currentScreen = "story";
    window.BattleEngine.stopTurnTimer();
    const node = window.STORY_NODES[window.GameState.storyNodeId];

    this.screen().innerHTML = `
      <section class="panel story-layout">
        <div>
          <p class="eyebrow">main story</p>
          <h2>${node.title}</h2>
          <p class="dialogue">${node.text}</p>
          <p class="small">
            Choices can either start a battle move directly or send Amy into a fight scene.
            Battle turns have a ${window.GameState.settings.turnTimerSeconds}-second timer.
          </p>
          <div class="btn-row">
            <button class="primary-btn" data-start-battle>Fight the ${window.CHARACTERS[node.enemyId].name}</button>
            <button class="ghost-btn" data-home>Back</button>
          </div>
        </div>

        <div class="card">
          <h3>Conversation Choices</h3>
          <div class="grid">
            ${node.choices.map(choice => `
              <button class="choice-btn" data-choice="${choice.moveId}" data-next="${choice.next}">
                ${choice.label}
                <span class="move-meta">Triggers: ${window.MOVES[choice.moveId].name}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `;

    this.screen().querySelector("[data-home]").addEventListener("click", () => this.renderHome());
    this.screen().querySelector("[data-start-battle]").addEventListener("click", () => {
      window.BattleEngine.startBattle({ mode: "story", playerId: "amy", enemyId: node.enemyId });
    });

    this.screen().querySelectorAll("[data-choice]").forEach(button => {
      button.addEventListener("click", () => {
        window.GameState.storyNodeId = button.dataset.next;
        window.BattleEngine.startBattle({ mode: "story", playerId: "amy", enemyId: node.enemyId });
      });
    });
  },

  renderArcadeSelect() {
    window.GameState.currentScreen = "arcade_select";
    window.BattleEngine.stopTurnTimer();
    const roster = window.GameState.unlockedCharacters.map(id => window.CHARACTERS[id]).filter(Boolean);

    this.screen().innerHTML = `
      <section class="panel">
        <p class="eyebrow">arcade mode</p>
        <h2>Pick a matchup</h2>
        <p class="dialogue">
          Skeleton version starts with Amy as the player. Later we can unlock friends, red-flag guys,
          concept bosses, and green-flag support characters as playable chaos.
        </p>

        <div class="grid roster">
          ${roster.map(character => `
            <article class="card character-card" data-enemy="${character.id}">
              <h3>${character.name}</h3>
              <p>${character.role}</p>
              <span class="tag">${character.category}</span>
            </article>
          `).join("")}
        </div>

        <div class="btn-row">
          <button class="ghost-btn" data-home>Back</button>
        </div>
      </section>
    `;

    this.screen().querySelector("[data-home]").addEventListener("click", () => this.renderHome());
    this.screen().querySelectorAll("[data-enemy]").forEach(card => {
      card.addEventListener("click", () => {
        const enemyId = card.dataset.enemy === "amy" ? "algorithm" : card.dataset.enemy;
        window.BattleEngine.startBattle({ mode: "arcade", playerId: "amy", enemyId });
      });
    });
  },

  renderBattle() {
    const battle = window.GameState.battle;
    if (!battle) return this.renderHome();

    const player = battle.player;
    const enemy = battle.enemy;

    this.screen().innerHTML = `
      <section class="battle-layout">
        ${this.fighterCard(player, "player")}
        <aside class="panel command-panel">
          <p class="eyebrow">${battle.mode} battle</p>
          <h2>Round ${battle.round}</h2>
          ${battle.winner ? this.resultControls(battle) : this.moveControls(player)}
          <div class="log">
            ${battle.log.map(item => `<p>${item}</p>`).join("")}
          </div>
        </aside>
        ${this.fighterCard(enemy, "enemy")}
      </section>
    `;

    this.bindBattleControls();
    this.updateTurnTimer();
  },

  updateTurnTimer() {
    const battle = window.GameState.battle;
    const timerNumber = document.getElementById("turnTimerNumber");
    const timerFill = document.getElementById("turnTimerFill");
    const timerLabel = document.getElementById("turnTimerLabel");

    if (!battle || !timerNumber || !timerFill) return;

    const total = window.GameState.settings.turnTimerSeconds;
    const remaining = battle.timerRemaining ?? total;
    const percent = Math.max(0, Math.min(100, (remaining / total) * 100));

    timerNumber.textContent = remaining;
    timerFill.style.width = `${percent}%`;
    timerFill.classList.toggle("danger", remaining <= 5);

    if (timerLabel) {
      timerLabel.textContent = battle.locked || battle.turn === "enemy"
        ? "Enemy is moving..."
        : "Choose before Amy overthinks it";
    }
  },

  fighterCard(fighter, side) {
    const spriteKey = fighter.currentSprite || "idle";
    const spritePath = fighter.sprites?.[spriteKey] || fighter.sprites?.idle;
    const hpPercent = window.Helpers.percent(fighter.hp, fighter.maxHp);

    return `
      <article class="panel fighter-card ${side}">
        <div>
          <p class="eyebrow">${fighter.category.replaceAll("_", " ")}</p>
          <h2>${fighter.name}</h2>
          <p class="small">${fighter.role}</p>
        </div>

        <div class="sprite-stage">
          <img class="sprite" src="${spritePath}" alt="${fighter.name} ${spriteKey}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';" />
          <div class="placeholder-sprite" style="display:none;">
            ${fighter.name}<br><span class="small">${spriteKey}</span>
          </div>
        </div>

        <div>
          <div class="hp-wrap">
            <div class="hp-label">
              <span>Resolve</span>
              <span>${fighter.hp}/${fighter.maxHp}</span>
            </div>
            <div class="hp-bar"><div class="hp-fill" style="width:${hpPercent}%"></div></div>
          </div>
          <div class="status-row">
            ${fighter.statuses.map(status => `<span class="status">${status}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  },

  moveControls(player) {
    const disabled = window.GameState.battle.locked ? "disabled" : "";
    const remaining = window.GameState.battle.timerRemaining ?? window.GameState.settings.turnTimerSeconds;

    return `
      <div class="turn-timer">
        <div class="turn-timer-top">
          <span id="turnTimerLabel">Choose before Amy overthinks it</span>
          <strong><span id="turnTimerNumber">${remaining}</span>s</strong>
        </div>
        <div class="turn-timer-bar">
          <div id="turnTimerFill" class="turn-timer-fill"></div>
        </div>
      </div>

      <h3>Amy's Moves</h3>
      <div class="move-list">
        ${player.moves.map(moveId => {
          const move = window.MOVES[moveId];
          return `
            <button class="move-btn" data-move="${move.id}" ${disabled}>
              ${move.name}
              <span class="move-meta">${move.description}</span>
            </button>
          `;
        }).join("")}
      </div>
      <div class="btn-row">
        <button class="ghost-btn" data-arcade>Arcade Select</button>
        <button class="ghost-btn" data-home>Home</button>
      </div>
    `;
  },

  resultControls(battle) {
    const playerWon = battle.winner === battle.player.id;
    return `
      <h3>${playerWon ? "Victory!" : "Defeat!"}</h3>
      <p class="small">${playerWon ? "The nonsense has been defeated for now." : "The group chat has been notified."}</p>
      <div class="btn-row">
        <button class="primary-btn" data-rematch>Rematch</button>
        <button class="ghost-btn" data-arcade>Arcade Select</button>
        <button class="ghost-btn" data-home>Home</button>
      </div>
    `;
  },

  bindBattleControls() {
    this.screen().querySelectorAll("[data-move]").forEach(button => {
      button.addEventListener("click", () => window.BattleEngine.choosePlayerMove(button.dataset.move));
    });

    const home = this.screen().querySelector("[data-home]");
    if (home) home.addEventListener("click", () => this.renderHome());

    const arcade = this.screen().querySelector("[data-arcade]");
    if (arcade) arcade.addEventListener("click", () => this.renderArcadeSelect());

    const rematch = this.screen().querySelector("[data-rematch]");
    if (rematch) {
      rematch.addEventListener("click", () => {
        const old = window.GameState.battle;
        window.BattleEngine.startBattle({ mode: old.mode, playerId: old.player.id, enemyId: old.enemy.id });
      });
    }
  },

  renderDesignNotes() {
    window.BattleEngine.stopTurnTimer();

    this.screen().innerHTML = `
      <section class="panel">
        <p class="eyebrow">dev notes</p>
        <h2>Skeleton Direction</h2>

        <div class="grid">
          <article class="card">
            <h3>Main Story</h3>
            <p>Conversation choices trigger battle moves automatically. This is the Pokemon-ish / dating RPG layer.</p>
          </article>

          <article class="card">
            <h3>Arcade Mode</h3>
            <p>Same roster, same sprites, more chaotic. Characters can fight directly even if the story treats them as metaphors.</p>
          </article>

          <article class="card">
            <h3>Turn Timer</h3>
            <p>Battle turns currently give Amy ${window.GameState.settings.turnTimerSeconds} seconds to choose. If time runs out, she panic-picks Boundary Guard by default.</p>
          </article>

          <article class="card">
            <h3>Good Boys</h3>
            <p>Keep them as healers, shields, cleanse units, and green-flag supports. They do not need to beat people up to be playable.</p>
          </article>

          <article class="card">
            <h3>Friends</h3>
            <p>Friends can absolutely deal social/emotional damage: Hard Truth Beam, Group Chat Intervention, Receipts Drop, etc.</p>
          </article>
        </div>

        <div class="btn-row">
          <button class="ghost-btn" data-home>Back</button>
        </div>
      </section>
    `;

    this.screen().querySelector("[data-home]").addEventListener("click", () => this.renderHome());
  }
};
