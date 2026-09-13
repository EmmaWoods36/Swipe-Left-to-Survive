// ============================================================================
// SLTS Canonical Asset Manifest
// Phase 1 output: every character's assets by role, with explicit null for
// missing assets. No silent substitutions — code checks for null and shows a
// "coming soon" placeholder instead of a broken image.
//
// Usage:
//   import { Manifest } from './data/assetManifest.js';
//   const headshot = Manifest.amy.headshot;        // string path or null
//   const battle = Manifest.nico.battleSprite;      // string path or null
//
// Convention: paths are relative to repo root. null = documented missing.
// ============================================================================

export const Manifest = Object.freeze({

  // ---- AMY (main character) ----
  amy: {
    headshot:        'assets/characters/main/amy_headshot.png',
    vnPortrait:      'assets/characters/main/amy_headshot.png',
    reference:       'assets/characters/main/amy_final_reference.png',
    battleSprite: {
      idle:           'assets/sprites/amy/amy_idle.png',
      hurt:           'assets/sprites/amy/amy_hurt.png',
      defeat:         'assets/sprites/amy/amy_defeat.png',
      defend:         'assets/sprites/amy/amy_defend.png',
      victory:        'assets/sprites/amy/amy_victory.png',
      lowStance:      'assets/sprites/amy/amy_low_stance.png'
    },
    attacks: {
      punch:          'assets/sprites/amy/amy_punch.png',
      kick:           'assets/sprites/amy/amy_kick.png',
      highKick:       'assets/sprites/amy/amy_high_kick.png',
      energyBlast:    'assets/sprites/amy/amy_energy_blast.png',
      energyBlastAlt: 'assets/sprites/amy/amy_energy_blast_alt.png',
      beamCannon:     'assets/sprites/amy/amy_beam_cannon.png',
      specialFlagBeam:'assets/sprites/amy/amy_special_flag_beam.png',
      specialBoundary:'assets/sprites/amy/amy_special_boundary_flag.png',
      ultimate:       'assets/sprites/amy/amy_ultimate_girl_stand_up.png'
    },
    cutin:            null,  // MISSING — assets/cutins/amy/amy_special_cutin.png
    vfx:              null,  // MISSING — no VFX sprites for Amy's attacks
    paperDollBase:    'assets/dressup/00_base/001_amy_paper_doll_base.png',  // FOUND — was missing, now available
    reactions: {
      blushingSoft:   'assets/cgs/amy_reactions/amy_reaction_blushing_soft.png',
      creepedOut:     'assets/cgs/amy_reactions/amy_reaction_creeped_out.png',
      grossedOut:     'assets/cgs/amy_reactions/amy_reaction_grossed_out.png',
      irritated:      'assets/cgs/amy_reactions/amy_reaction_irritated.png',
      neutral:        'assets/cgs/amy_reactions/amy_reaction_neutral.png',
      pissedOff:      'assets/cgs/amy_reactions/amy_reaction_pissed_off.png'
    },
    card:             'assets/characters/cards/amy_card.png'
  },

  // ---- GODDESS AMY ----
  goddessAmy: {
    headshot:         'assets/characters/main/goddess_amy_headshot.png',
    battleSprite: {
      neutral:        'assets/sprites/amy/goddess/goddess_amy_neutral_standing.png',
      hurt:           'assets/sprites/amy/goddess/goddess_amy_hurt.png',
      defeated:       'assets/sprites/amy/goddess/goddess_amy_defeated_or_calm.png'
    },
    moves: {
      nameThePattern: 'assets/sprites/amy/goddess/goddess_amy_move_01_name_the_pattern.png',
      noMoreMaybe:    'assets/sprites/amy/goddess/goddess_amy_move_02_no_more_maybe.png',
      iKnowThisFeeling:'assets/sprites/amy/goddess/goddess_amy_move_03_i_know_this_feeling.png',
      thatsNotLove:   'assets/sprites/amy/goddess/goddess_amy_move_04_thats_not_love.png',
      chooseMyself:   'assets/sprites/amy/goddess/goddess_amy_move_05_choose_myself.png',
      blockAndDelete: 'assets/sprites/amy/goddess/goddess_amy_move_06_block_and_delete.png',
      girlStandUp:    'assets/sprites/amy/goddess/goddess_amy_move_07_girl_stand_up_finisher.png'
    },
    vfx: {
      nameThePattern: 'assets/effects/amy/goddess/goddess_amy_fx_01_name_the_pattern.png',
      noMoreMaybe:    'assets/effects/amy/goddess/goddess_amy_fx_02_no_more_maybe.png',
      iKnowThisFeeling:'assets/effects/amy/goddess/goddess_amy_fx_03_i_know_this_feeling.png',
      thatsNotLove:   'assets/effects/amy/goddess/goddess_amy_fx_04_thats_not_love.png',
      chooseMyself:   'assets/effects/amy/goddess/goddess_amy_fx_05_choose_myself.png',
      blockAndDelete: 'assets/effects/amy/goddess/goddess_amy_fx_06_block_and_delete.png',
      girlStandUp:    'assets/effects/amy/goddess/goddess_amy_fx_07_girl_stand_up_finisher.png'
    },
    cutin:             null   // MISSING
  },

  // ---- RED FLAG GUYS ----
  two_am: {
    headshot:         'assets/characters/villains/jay_2am_summoner_headshot.png',
    reference:        'assets/characters/villains/2am_summoner_reference.png',
    battleSprite:     null,  // MISSING
    attacks: {
      phone:          'assets/characters/villains/jay_2am_summoner_attack_phone.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  preference: {
    headshot:         'assets/characters/villains/connor_preference_paladin_headshot.png',
    reference:        'assets/characters/villains/preference_paladin_reference.png',
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  coworker: {
    headshot:         null,  // MISSING — no headshot exists
    reference:        'assets/characters/villains/experimental_coworker_reference.png',
    battleSprite:     null,  // MISSING
    attacks: {
      office:         'assets/characters/villains/experimental_coworker_attack_office.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  house_date: {
    headshot:         'assets/characters/villains/terrence_house_date_economist_headshot.png',
    reference:        'assets/characters/villains/house_date_economist_reference.png',
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  demon: {
    headshot:         'assets/characters/villains/dante_demon_fighter_headshot.png',
    reference:        'assets/characters/villains/demon_fighter_reference.png',
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  broke_dreamer: {
    headshot:         'assets/characters/villains/joey_broke_balladeer_headshot.png',
    reference:        'assets/characters/villains/broke_dreamer_reference.png',
    battleSprite:     null,  // MISSING
    attacks: {
      tropical:       'assets/characters/villains/joey_broke_dreamer_attack_tropical.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            'assets/characters/villains/joey_broke_dreamer_cutin.png',
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  millionaire: {
    headshot:         'assets/characters/villains/marquis_low_key_millionaire_headshot.png',
    reference:        'assets/characters/villains/low_key_millionaire_reference.png',
    battleSprite:     null,  // MISSING
    attacks: {
      luxury:         'assets/characters/villains/marquis_millionaire_attack_luxury.png',
      vip:            'assets/characters/villains/marquis_millionaire_attack_vip.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  body_bag: {
    headshot:         'assets/characters/villains/reggie_true_crime_headshot.png',
    reference:        'assets/characters/villains/body_bag_boy_reference.png',
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  dark_humor: {
    headshot:         'assets/characters/villains/derrick_dark_humor_headshot.png',
    battleSprite:     'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_stance.png',
    attacks: {
      masks:          'assets/characters/villains/derrick_dark_humor_attack_masks.png',
      special:        'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_special.png'
    },
    hurt:             'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_hurt.png',
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null,  // MISSING
    extra: {
      walk:           'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_walk.png',
      point:          'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_point.png',
      taunt:          'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_taunt.png',
      fullbodyCard:   'assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_fullbody_card.png'
    }
  },

  old_young: {
    headshot:         'assets/characters/villains/victor_old_young_girl_headshot.png',
    reference:        'assets/characters/villains/old_young_girl_guy_reference.png',
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      'assets/characters/villains/victor_old_young_girl_card.png'
  },

  lucien_reservation_mirage: {
    headshot:         'assets/characters/villains/lucien_reservation_mirage_card.png',
    portraitAlt:      'assets/characters/villains/lucien_moreau_portrait_alt.png',
    profile:          'assets/characters/villains/lucien_moreau_profile.png',
    battleSprite:     'assets/characters/villains/lucien_moreau_battle_standing.png',
    attacks: {
      phone:          'assets/characters/villains/lucien_moreau_attack_phone.png',
      charm:          'assets/characters/villains/lucien_moreau_attack_charm.png',
      reserved:       'assets/characters/villains/lucien_moreau_attack_reserved.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      'assets/characters/villains/lucien_moreau_profile.png',
    extra: {
      standingPhone:  'assets/characters/villains/lucien_moreau_standing_phone.png',
      fullbody:       'assets/characters/villains/lucien_moreau_fullbody.png'
    }
  },

  roman_vega: {
    headshot:         null,  // MISSING — all art missing
    reference:        null,  // MISSING
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  nico_boundary_pusher: {
    headshot:         'assets/characters/villains/boundary_pusher_headshot.png',
    battleSprite:     'assets/characters/villains/nico_hart_battle_standing.png',
    attacks: {
      heartBomb:      'assets/characters/villains/nico_hart_attack_heart_bomb.png',
      smokyAura:      'assets/characters/villains/nico_hart_attack_smoky_aura.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx: {
      heartBeam:      'assets/vfx/red_flags/nico_hart/heart_beam_vfx.png'
    },
    profileCard:      null   // MISSING
  },

  blake_disruptor: {
    headshot:         'assets/characters/villains/blake_sterling_profile.png',
    battleSprite:     'assets/characters/villains/blake_sterling_standing_tablet.png',
    attacks: {
      blockchain:     'assets/characters/villains/blake_sterling_attack_blockchain.png',
      runes:          'assets/characters/villains/blake_sterling_attack_runes.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            'assets/characters/villains/blake_sterling_cutin.png',
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  julian_softboi_savior: {
    headshot:         'assets/characters/villains/julian_cross_profile.png',
    battleSprite:     'assets/characters/villains/julian_cross_softboi_fullbody.png',
    attacks: {
      aura:           'assets/characters/villains/julian_cross_attack_aura.png'
    },
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      'assets/characters/villains/julian_cross_softboi_savior_card.png',
    cg:               'assets/cgs/story/cg_story_julian_warmth.png',
    extra: {
      standingBook:   'assets/characters/villains/julian_cross_standing_book.png'
    }
  },

  normal_fake: {
    headshot:         'assets/characters/villains/evan_guy_who_seems_normal_headshot.png',
    battleSprite:     null,  // MISSING
    attacks:          {},
    hurt:             null,  // MISSING
    defeated:         null,  // MISSING
    cutin:            null,  // MISSING
    vfx:              null,  // MISSING
    profileCard:      null   // MISSING
  },

  // ---- GIRL RED FLAGS ----
  ivy_mercer: {
    headshot:         'assets/characters/villains/girl_red_flags/ivy_mercer_headshot.png',
    battleSprite:     'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_neutral_standing.png',
    attacks: {
      breadcrumbs:    'assets/characters/villains/girl_red_flags/ivy_mercer_attack_breadcrumbs.png',
      midnightPoem:   'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_01_midnight_poem.png',
      threeDaySilence:'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_02_three_day_silence.png',
      almostVulnerable:'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_03_almost_vulnerable.png',
      readReceiptRitual:'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_04_read_receipt_ritual.png',
      breadcrumbMoon: 'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_05_breadcrumb_moon.png'
    },
    hurt:             'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_hurt.png',
    defeated:         'assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_defeated.png',
    cutin: {
      special:        'assets/cutins/red_flag_girls/Ivy_Mercer/ivy_special_cutin.png',
      vs:             'assets/cutins/red_flag_girls/Ivy_Mercer/ivy_vs_cutin.png'
    },
    vfx: {
      midnightPoem:   'assets/effects/red_flag_girls/Ivy_Mercer/ivy_fx_01_midnight_poem.png',
      threeDaySilence:'assets/effects/red_flag_girls/Ivy_Mercer/ivy_fx_02_three_day_silence.png',
      almostVulnerable:'assets/effects/red_flag_girls/Ivy_Mercer/ivy_fx_03_almost_vulnerable.png',
      readReceiptRitual:'assets/effects/red_flag_girls/Ivy_Mercer/ivy_fx_04_read_receipt_ritual.png',
      breadcrumbMoon: 'assets/effects/red_flag_girls/Ivy_Mercer/ivy_fx_05_breadcrumb_moon.png'
    },
    profileCard:      null   // MISSING
  },

  simone_brooks: {
    headshot:         'assets/characters/villains/girl_red_flags/simone_brooks_headshot.png',
    battleSprite:     'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_neutral_standing.png',
    attacks: {
      areYouActuallyQueer:'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_01_are_you_actually_queer.png',
      straightGirlEnergy:'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_02_straight_girl_energy.png',
      goldStarShield:'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_03_gold_star_shield.png',
      proveItPressure:'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_04_prove_it_pressure.png',
      queerEnoughTrial:'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_05_queer_enough_trial.png'
    },
    hurt:             'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_hurt.png',
    defeated:         'assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_defeated.png',
    cutin: {
      // MISNAMED — files exist as ivy_special_cutin.png and ivy_vs_cutin.png
      // in Simone's folder. Need rename to simone_special_cutin.png / simone_vs_cutin.png
      special:        'assets/cutins/red_flag_girls/Simone_Brooks/ivy_special_cutin.png',
      vs:             'assets/cutins/red_flag_girls/Simone_Brooks/ivy_vs_cutin.png'
    },
    vfx: {
      areYouActuallyQueer:'assets/effects/red_flag_girls/Simone_Brooks/simone_fx_01_are_you_actually_queer.png',
      straightGirlEnergy:'assets/effects/red_flag_girls/Simone_Brooks/simone_fx_02_straight_girl_energy.png',
      goldStarShield:'assets/effects/red_flag_girls/Simone_Brooks/simone_fx_03_gold_star_shield.png',
      proveItPressure:'assets/effects/red_flag_girls/Simone_Brooks/simone_fx_04_prove_it_pressure.png',
      queerEnoughTrial:'assets/effects/red_flag_girls/Simone_Brooks/simone_fx_05_queer_enough_trial.png'
    },
    profileCard:      null   // MISSING
  },

  camila_reyes: {
    headshot:         'assets/characters/villains/girl_red_flags/camila_reyes_headshot.png',
    battleSprite:     'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_neutral_standing.png',
    attacks: {
      vibeCheckTrap:  'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_01_vibe_check_trap.png',
      softLaunchBlur: 'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_02_soft_launch_blur.png',
      noLabelsGlitterBomb:'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_03_no_labels_glitter_bomb.png',
      attentionRefill:'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_04_attention_refill.png',
      closeFriendsConfusion:'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_05_close_friends_confusion.png'
    },
    hurt:             'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_hurt.png',
    defeated:         'assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_defeated.png',
    cutin: {
      special:        'assets/cutins/red_flag_girls/Camila_Reyes/camila_special_cutin.png',
      vs:             'assets/cutins/red_flag_girls/Camila_Reyes/camila_vs_cutin.png'
    },
    vfx:              null,  // MISSING — effects/red_flag_girls/Camila_Reyes/ is empty
    profileCard:      null   // MISSING
  },

  // ---- BOSSES ----
  algorithm: {
    headshot:         'assets/characters/bosses/algorithm_headshot.png',
    reference:        'assets/characters/bosses/algorithm_reference.png',
    battleSprite: {
      idle:           'assets/sprites/enemies/bosses/the_algorithm/algorithm_idle.png',
      walk:           'assets/sprites/enemies/bosses/the_algorithm/algorithm_walk.png'
    },
    attacks: {
      attack:         'assets/sprites/enemies/bosses/the_algorithm/algorithm_attack.png',
      glitch:         'assets/sprites/enemies/bosses/the_algorithm/algorithm_attack_glitch.png',
      beam:           'assets/sprites/enemies/bosses/the_algorithm/algorithm_beam.png'
    },
    special:           'assets/sprites/enemies/bosses/the_algorithm/algorithm_special.png',
    ultimate:          'assets/sprites/enemies/bosses/the_algorithm/algorithm_ultimate.png',
    intro:             'assets/sprites/enemies/bosses/the_algorithm/algorithm_intro.png',
    defeated:          'assets/sprites/enemies/bosses/the_algorithm/algorithm_defeated.png',
    storyCG:           'assets/cgs/story/cg_story_algorithm_strikes_apartment.png',
    cutin:             null,  // MISSING
    vfx:               null   // MISSING
  },

  pattern: {
    headshot:         'assets/characters/bosses/pattern_headshot.png',
    reference:        'assets/characters/bosses/pattern_reference.png',
    battleSprite: {
      idle:           'assets/sprites/enemies/bosses/the_pattern/pattern_idle.png',
      float:          'assets/sprites/enemies/bosses/the_pattern/pattern_float.png',
      ready:          'assets/sprites/enemies/bosses/the_pattern/pattern_ready.png'
    },
    attacks: {
      chain:          'assets/sprites/enemies/bosses/the_pattern/pattern_attack_chain.png',
      chainBarrage:   'assets/sprites/enemies/bosses/the_pattern/pattern_attack_chain_barrage.png',
      heartBlast:     'assets/sprites/enemies/bosses/the_pattern/pattern_attack_heart_blast.png'
    },
    special:           'assets/sprites/enemies/bosses/the_pattern/pattern_special_memory_swarm.png',
    block:             'assets/sprites/enemies/bosses/the_pattern/pattern_block.png',
    defeated:          null,  // MISSING — needed for Goddess Mode transformation
    cutin:             null,  // MISSING
    vfx:               null   // MISSING
  },

  // ---- NPCS (scene sprites) ----
  eli: {
    sceneSprites: 'assets/sprites/scenes/npcs/eli/',  // 9 poses: neutral, guiding, welcoming, sheepish, clasped, etc.
    role: 'spa_attendant',
    description: 'Male spa attendant, sage green uniform, wavy dark hair'
  },

  sabrina: {
    sceneSprites: 'assets/sprites/scenes/npcs/sabrina/',  // 11 poses: waving, guiding, thinking, delighted, etc.
    role: 'receptionist',
    description: 'East Asian woman, pink cardigan, floral scarf, high bun'
  },

  val: {
    sceneSprites: 'assets/sprites/scenes/npcs/val/',  // 10 poses: serving, menu, attentive, confident, etc.
    role: 'server_waitress',
    description: 'Tan woman, black service shirt, burgundy apron, high ponytail'
  },

  // ---- FRIENDS (scene sprites now available) ----
  malik: {
    headshot:         'assets/characters/friends/malik_headshot.png',
    reference:        'assets/characters/friends/malik_reference.png',
    card:             'assets/characters/cards/malik_card.png',
    sceneSprite:      null,  // MISSING - still need scene sprites
    supportCutin:     null,  // MISSING
    endingCG:         'assets/cgs/endings/cg_ending_malik_beach.png'
  },

  min: {
    headshot:         'assets/characters/friends/min_headshot.png',
    reference:        'assets/characters/friends/min_reference.png',
    card:             'assets/characters/cards/min_card.png',
    sceneSprite:      null,  // MISSING - still need scene sprites
    supportCutin:     null,  // MISSING
    endingCG:         'assets/cgs/endings/cg_ending_min_aquarium.png'
  },

  jade: {
    headshot:         'assets/characters/friends/jade_headshot.png',
    reference:        'assets/characters/friends/jade_final_reference.png',
    card:             'assets/characters/cards/jade_card.png',
    sceneSprites:     'assets/sprites/scenes/friends/jade/',  // 26 poses: sassy, laughing, skeptical, confident, etc.
    supportCutin:     null,  // MISSING
    endingCG:         null   // MISSING
  },

  chloe: {
    headshot:         'assets/characters/friends/chloe_headshot.png',
    reference:        'assets/characters/friends/chloe_reference.png',
    card:             'assets/characters/cards/chloe_card.png',
    sceneSprites:     'assets/sprites/scenes/friends/chloe/',  // 26 poses: cheerful, shocked, angry, laughing, etc.
    supportCutin:     null,  // MISSING
    endingCG:         null   // MISSING
  },

  mia: {
    headshot:         'assets/characters/friends/mia_headshot.png',
    reference:        'assets/characters/friends/mia_reference.png',
    card:             'assets/characters/cards/mia_card.png',
    sceneSprites:     'assets/sprites/scenes/friends/mia/',  // 30 poses: shy, blushing, tsundere, pouting, etc.
    supportCutin:     null,  // MISSING
    endingCG:         'assets/cgs/endings/cg_ending_mia_beachside_cafe.png'
  },

  // ---- GREEN FLAGS (Phase 11 — battle art not needed yet) ----
  xavier: {
    headshot:         'assets/characters/green_flags/xavier_headshot.png',
    reference:        'assets/characters/green_flags/xavier_reference.png',
    card:             'assets/characters/cards/xavier_card.png',
    battleSprite:     null,  // MISSING (Phase 11)
    attacks:          null,  // MISSING (Phase 11)
    endingCG:         'assets/cgs/endings/cg_ending_xavier_planetarium.png'
  },

  james: {
    headshot:         'assets/characters/green_flags/james_headshot.png',
    reference:        'assets/characters/green_flags/james_reference.png',
    card:             'assets/characters/cards/james_card.png',
    battleSprite:     null,  // MISSING (Phase 11)
    attacks:          null,  // MISSING (Phase 11)
    endingCG:         'assets/cgs/endings/cg_ending_james_movie.png'
  },

  andrew: {
    headshot:         'assets/characters/green_flags/andrew_headshot.png',
    reference:        'assets/characters/green_flags/andrew_reference.png',
    card:             'assets/characters/cards/andrew_card.png',
    battleSprite:     null,  // MISSING (Phase 11)
    attacks:          null,  // MISSING (Phase 11)
    endingCG:         'assets/cgs/endings/cg_ending_andrew_dinner.png'
  },

  christy: {
    headshot:         'assets/characters/green_flags/christy_headshot.png',
    fullbody:         'assets/characters/green_flags/christy_fullbody.png',
    fullbodyAlt:      'assets/characters/green_flags/christy_fullbody_alt.png',
    card:             'assets/characters/cards/christy_card.png',
    battleSprite:     null,  // MISSING (Phase 11)
    attacks:          null,  // MISSING (Phase 11)
    endingCG:         'assets/cgs/endings/cg_ending_christy_spa.png'
  },

  // ---- UNTRACKED: Adrian Vale (Love Bomber) ----
  // Art exists but character is NOT in redFlags.js. Decision needed.
  adrian_vale: {
    card:             'assets/characters/villains/adrian_vale_love_bomber_card.png',
    profile:          'assets/characters/villains/adrian_vale_love_bomber_profile.png',
    sprite:           'assets/characters/villains/adrian_vale_love_bomber_sprite.png',
    ultimate:         'assets/characters/villains/adrian_vale_love_bomber_ultimate.png'
  }
});

// Helper: get a path from the manifest, or null if missing
export function assetPath(characterId, ...rolePath){
  const char = Manifest[characterId];
  if(!char) return null;
  let cur = char;
  for(const key of rolePath){
    if(cur == null || typeof cur !== 'object') return null;
    cur = cur[key];
  }
  return cur;
}

// Helper: check if a character has a specific role asset
export function hasAsset(characterId, ...rolePath){
  return assetPath(characterId, ...rolePath) !== null;
}
