window.GameState = {
  currentScreen: "home",
  mode: null,
  storyNodeId: "opening",
  battle: null,
  unlockedCharacters: ["amy", "algorithm", "pattern", "friend_truth_cannon", "good_boy_green_flag", "red_flag_love_bomber"],
  settings: {
    textSpeed: "instant",
    difficulty: "normal",

    // Turn timer settings.
    // Amy has this many seconds to choose a move during battle.
    turnTimerSeconds: 15,

    // What happens if time runs out:
    // "auto_guard" = Amy uses Boundary Guard
    // "random" = random available move
    // "skip" = Amy hesitates and loses the turn
    timeoutBehavior: "auto_guard"
  },
  timers: {
    turnTimerId: null,
    turnDeadline: null
  }
};
