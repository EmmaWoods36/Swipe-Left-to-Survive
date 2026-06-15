window.Helpers = {
  cloneCharacter(characterId) {
    const base = window.CHARACTERS[characterId];
    if (!base) throw new Error(`Unknown character: ${characterId}`);

    return {
      ...base,
      hp: base.maxHp,
      resolve: base.maxResolve,
      statuses: [],
      currentSprite: "idle"
    };
  },

  getMove(moveId) {
    const move = window.MOVES[moveId];
    if (!move) throw new Error(`Unknown move: ${moveId}`);
    return move;
  },

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  },

  percent(current, max) {
    return Math.max(0, Math.round((current / max) * 100));
  },

  randomChoice(items) {
    return items[Math.floor(Math.random() * items.length)];
  },

  hasStatus(fighter, status) {
    return fighter.statuses.includes(status);
  },

  addStatus(fighter, status) {
    if (!status || fighter.statuses.includes(status)) return;
    fighter.statuses.push(status);
  },

  removeStatus(fighter, status) {
    fighter.statuses = fighter.statuses.filter(s => s !== status);
  },

  clearBadStatuses(fighter) {
    const bad = ["distracted", "glitched", "confused", "haunted"];
    fighter.statuses = fighter.statuses.filter(status => !bad.includes(status));
  }
};
