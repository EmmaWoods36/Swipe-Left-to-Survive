window.CHARACTERS = {
  amy: {
    id: "amy",
    name: "Amy",
    category: "main",
    role: "Main Character / Balanced Heart-Energy Fighter",
    maxHp: 120,
    maxResolve: 100,
    sprites: {
      idle: "assets/sprites/amy/amy_idle.png",
      punch: "assets/sprites/amy/amy_punch.png",
      kick: "assets/sprites/amy/amy_kick.png",
      low_kick: "assets/sprites/amy/amy_low_kick.png",
      high_kick: "assets/sprites/amy/amy_high_kick.png",
      block: "assets/sprites/amy/amy_block.png",
      hurt: "assets/sprites/amy/amy_hurt.png",
      crouch: "assets/sprites/amy/amy_crouch.png",
      walk_forward: "assets/sprites/amy/amy_walk_forward.png",
      walk_backward: "assets/sprites/amy/amy_walk_backward.png",
      energy_blast: "assets/sprites/amy/amy_energy_blast.png",
      victory: "assets/sprites/amy/amy_victory.png",
      special: "assets/sprites/amy/amy_special.png",
      ultimate: "assets/sprites/amy/amy_ultimate.png",
      ko: "assets/sprites/amy/amy_ko.png"
    },
    moves: ["boundary_guard", "pink_energy_blast", "low_kick", "high_kick", "group_chat_intervention", "red_flag_rejection"]
  },

  algorithm: {
    id: "algorithm",
    name: "Dating App Algorithm",
    category: "concept_boss",
    role: "Glitch Zoner / Notification Menace",
    maxHp: 115,
    maxResolve: 100,
    sprites: {
      idle: "assets/sprites/enemies/algorithm/algorithm_idle.png",
      walk_forward: "assets/sprites/enemies/algorithm/algorithm_walk_forward.png",
      walk_backward: "assets/sprites/enemies/algorithm/algorithm_walk_backward.png",
      weak_attack: "assets/sprites/enemies/algorithm/algorithm_weak_attack.png",
      strong_attack: "assets/sprites/enemies/algorithm/algorithm_strong_attack.png",
      energy_blast: "assets/sprites/enemies/algorithm/algorithm_energy_blast.png",
      finishing_move: "assets/sprites/enemies/algorithm/algorithm_finishing_move.png",
      hurt: "assets/sprites/enemies/algorithm/algorithm_hurt.png",
      ko: "assets/sprites/enemies/algorithm/algorithm_ko.png"
    },
    moves: ["swipe_left_slash", "you_up_ping", "new_match_barrage", "glitch_heart_blast", "true_love_exe"]
  },

  pattern: {
    id: "pattern",
    name: "The Pattern",
    category: "concept_boss",
    role: "Shadow Summoner / Toxic Loop Embodiment",
    maxHp: 125,
    maxResolve: 100,
    sprites: {
      idle: "assets/sprites/enemies/pattern/pattern_idle.png",
      walk_forward: "assets/sprites/enemies/pattern/pattern_walk_forward.png",
      walk_backward: "assets/sprites/enemies/pattern/pattern_walk_backward.png",
      weak_attack: "assets/sprites/enemies/pattern/pattern_weak_attack.png",
      strong_attack: "assets/sprites/enemies/pattern/pattern_strong_attack.png",
      energy_blast: "assets/sprites/enemies/pattern/pattern_energy_blast.png",
      finishing_move: "assets/sprites/enemies/pattern/pattern_finishing_move.png",
      hurt: "assets/sprites/enemies/pattern/pattern_hurt.png",
      ko: "assets/sprites/enemies/pattern/pattern_ko.png"
    },
    moves: ["love_bomb_chain", "breadcrumb_bind", "ghost_of_the_pattern", "broken_heart_core"]
  },

  friend_truth_cannon: {
    id: "friend_truth_cannon",
    name: "Friend: Truth Cannon",
    category: "friend",
    role: "Support Fighter / Group Chat Damage",
    maxHp: 105,
    maxResolve: 110,
    sprites: {
      idle: "assets/sprites/friends/friend_truth_cannon_idle.png",
      attack: "assets/sprites/friends/friend_truth_cannon_attack.png",
      support: "assets/sprites/friends/friend_truth_cannon_support.png"
    },
    moves: ["hard_truth_beam", "group_chat_intervention"]
  },

  good_boy_green_flag: {
    id: "good_boy_green_flag",
    name: "Good Boy: Green Flag",
    category: "good_boy",
    role: "Healer / Cleanse / Shield",
    maxHp: 100,
    maxResolve: 125,
    sprites: {
      idle: "assets/sprites/good_boys/good_boy_green_flag_idle.png",
      support: "assets/sprites/good_boys/good_boy_green_flag_support.png"
    },
    moves: ["consistency_heal", "boundary_guard"]
  },

  red_flag_love_bomber: {
    id: "red_flag_love_bomber",
    name: "Red Flag Guy: Love Bomber",
    category: "red_flag_guy",
    role: "Early Enemy / Charm Trap",
    maxHp: 90,
    maxResolve: 80,
    sprites: {
      idle: "assets/sprites/red_flag_guys/love_bomber_idle.png",
      weak_attack: "assets/sprites/red_flag_guys/love_bomber_weak_attack.png",
      strong_attack: "assets/sprites/red_flag_guys/love_bomber_strong_attack.png",
      ko: "assets/sprites/red_flag_guys/love_bomber_ko.png"
    },
    moves: ["love_bomb_chain", "breadcrumb_bind"]
  }
};
