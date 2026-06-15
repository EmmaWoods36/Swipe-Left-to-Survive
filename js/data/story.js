window.STORY_NODES = {
  opening: {
    id: "opening",
    title: "Act 1: The App Opens Back Up",
    text: "Amy is bored, cute, and suspiciously vulnerable to downloading the app again. The Dating App Algorithm senses weakness from across the internet.",
    enemyId: "algorithm",
    choices: [
      {
        label: "Open the app but keep expectations underground.",
        moveId: "boundary_guard",
        next: "algorithm_intro"
      },
      {
        label: "Swipe for dopamine. What could go wrong?",
        moveId: "pink_energy_blast",
        next: "algorithm_intro"
      },
      {
        label: "Text the group chat before doing anything reckless.",
        moveId: "group_chat_intervention",
        next: "algorithm_intro"
      }
    ]
  },

  algorithm_intro: {
    id: "algorithm_intro",
    title: "Boss Encounter: Dating App Algorithm",
    text: "A neon hooded menace materializes from the notification fog. Its screen-face smiles: TRUE LOVE.exe has stopped responding.",
    enemyId: "algorithm",
    choices: [
      {
        label: "Use Boundary Guard.",
        moveId: "boundary_guard",
        next: "algorithm_intro"
      },
      {
        label: "Fire Pink Energy Blast.",
        moveId: "pink_energy_blast",
        next: "algorithm_intro"
      },
      {
        label: "Call the Group Chat Intervention.",
        moveId: "group_chat_intervention",
        next: "algorithm_intro"
      },
      {
        label: "Use Red Flag Rejection.",
        moveId: "red_flag_rejection",
        next: "algorithm_intro"
      }
    ]
  }
};
