# Swipe Left to Survive — Missing Asset Report

**Generated:** Phase 1 Asset Audit
**Policy:** Every character has either a verified correct asset or an explicitly documented missing asset. No silent substitutions.

---

## Critical Missing Assets (Game-Breaking)

These assets are referenced by code but do not exist. They will cause visible errors at runtime.

| Character | Role | Referenced Path | Status |
|---|---|---|---|
| **Amy** | special cutin | `assets/cutins/amy/amy_special_cutin.png` | MISSING — referenced in assets.js |
| **Amy** | paper doll base | `assets/dressup/base/amy_paper_doll_base.png` | MISSING — referenced in assets.js, closet cannot function |
| **Roman Vega** | headshot/card | `assets/characters/villains/roman_vega_industry_mystery_card.png` | MISSING — referenced in redFlags.js, battle will show broken image |
| **Algorithm** | cutin | `assets/cutins/bosses/algorithm_cutin.png` | MISSING — referenced in assets.js |
| **Pattern** | cutin | `assets/cutins/bosses/pattern_cutin.png` | MISSING — referenced in assets.js |
| **Simone Brooks** | special cutin | `assets/cutins/red_flag_girls/Simone_Brooks/simone_special_cutin.png` | MISNAMED — file exists as `ivy_special_cutin.png` in Simone's folder |
| **Simone Brooks** | VS cutin | `assets/cutins/red_flag_girls/Simone_Brooks/simone_vs_cutin.png` | MISNAMED — file exists as `ivy_vs_cutin.png` in Simone's folder |
| **Malik** | support cutin | `assets/cutins/support/malik_support_cutin.png` | MISSING — referenced in assets.js, directory is empty |
| **Min** | support cutin | `assets/cutins/support/min_support_cutin.png` | MISSING — referenced in assets.js, directory is empty |

---

## Amy (Main Character)

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/main/amy_headshot.png` | OK |
| VN portrait | (same as headshot) | OK |
| battle sprite idle | `assets/sprites/amy/amy_idle.png` | OK |
| battle sprite hurt | `assets/sprites/amy/amy_hurt.png` | OK |
| battle sprite defeat | `assets/sprites/amy/amy_defeat.png` | OK |
| battle sprite defend | `assets/sprites/amy/amy_defend.png` | OK |
| battle sprite victory | `assets/sprites/amy/amy_victory.png` | OK |
| attack: punch | `assets/sprites/amy/amy_punch.png` | OK |
| attack: kick | `assets/sprites/amy/amy_kick.png` | OK |
| attack: high kick | `assets/sprites/amy/amy_high_kick.png` | OK |
| attack: energy blast | `assets/sprites/amy/amy_energy_blast.png` | OK |
| attack: beam cannon | `assets/sprites/amy/amy_beam_cannon.png` | OK |
| attack: special flag beam | `assets/sprites/amy/amy_special_flag_beam.png` | OK |
| attack: ultimate (Girl, Stand Up!) | `assets/sprites/amy/amy_ultimate_girl_stand_up.png` | OK |
| special cutin | — | **MISSING** |
| attack VFX | — | **MISSING** — no VFX sprites for Amy's attacks |
| paper doll base | — | **MISSING** — closet system cannot function without this |
| reference art | `assets/characters/main/amy_final_reference.png` | OK (reference only) |

---

## Goddess Amy

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/main/goddess_amy_headshot.png` | OK |
| neutral standing | `assets/sprites/amy/goddess/goddess_amy_neutral_standing.png` | OK |
| hurt | `assets/sprites/amy/goddess/goddess_amy_hurt.png` | OK |
| defeated/calm | `assets/sprites/amy/goddess/goddess_amy_defeated_or_calm.png` | OK |
| move 1: Name the Pattern | `assets/sprites/amy/goddess/goddess_amy_move_01_name_the_pattern.png` | OK |
| move 2: No More Maybe | `assets/sprites/amy/goddess/goddess_amy_move_02_no_more_maybe.png` | OK |
| move 3: I Know This Feeling | `assets/sprites/amy/goddess/goddess_amy_move_03_i_know_this_feeling.png` | OK |
| move 4: That's Not Love | `assets/sprites/amy/goddess/goddess_amy_move_04_thats_not_love.png` | OK |
| move 5: Choose Myself | `assets/sprites/amy/goddess/goddess_amy_move_05_choose_myself.png` | OK |
| move 6: Block and Delete | `assets/sprites/amy/goddess/goddess_amy_move_06_block_and_delete.png` | OK |
| move 7: Girl Stand Up Finisher | `assets/sprites/amy/goddess/goddess_amy_move_07_girl_stand_up_finisher.png` | OK |
| VFX (all 7 moves) | `assets/effects/amy/goddess/goddess_amy_fx_01-07_*.png` | OK |
| special cutin | — | **MISSING** |

---

## Red Flag Guys

### 1. Two AM Summoner (Jay) — `two_am`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/jay_2am_summoner_headshot.png` | OK |
| reference art | `assets/characters/villains/2am_summoner_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack: phone | `assets/characters/villains/jay_2am_summoner_attack_phone.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** — no VFX for "wyd" spam / phone attacks |
| LoveLoop profile card | — | **MISSING** |

### 2. Preference Paladin (Connor) — `preference`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/connor_preference_paladin_headshot.png` | OK |
| reference art | `assets/characters/villains/preference_paladin_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 3. Experimental Coworker — `coworker`

| Role | File | Status |
|---|---|---|
| headshot | — | **MISSING** — no headshot exists for this character |
| reference art | `assets/characters/villains/experimental_coworker_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack: office | `assets/characters/villains/experimental_coworker_attack_office.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 4. House Date Economist (Terrence) — `house_date`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/terrence_house_date_economist_headshot.png` | OK |
| reference art | `assets/characters/villains/house_date_economist_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 5. Fighting Demons Guy (Dante) — `demon`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/dante_demon_fighter_headshot.png` | OK |
| reference art | `assets/characters/villains/demon_fighter_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 6. Broke Dreamer (Joey) — `broke_dreamer`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/joey_broke_balladeer_headshot.png` | OK |
| reference art | `assets/characters/villains/broke_dreamer_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack: tropical | `assets/characters/villains/joey_broke_dreamer_attack_tropical.png` | OK |
| cutin | `assets/characters/villains/joey_broke_dreamer_cutin.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 7. Low-Key Millionaire (Marquis) — `millionaire`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/marquis_low_key_millionaire_headshot.png` | OK |
| reference art | `assets/characters/villains/low_key_millionaire_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack: luxury | `assets/characters/villains/marquis_millionaire_attack_luxury.png` | OK |
| attack: VIP | `assets/characters/villains/marquis_millionaire_attack_vip.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 8. True Crime Date (Reggie) — `body_bag`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/reggie_true_crime_headshot.png` | OK |
| reference art | `assets/characters/villains/body_bag_boy_reference.png` | OK (reference only) |
| battle sprite (standing) | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 9. Dark Humor Guy (Derrick) — `dark_humor`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/derrick_dark_humor_headshot.png` | OK |
| battle sprite (stance) | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_stance.png` | OK |
| battle sprite (walk) | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_walk.png` | OK |
| battle sprite (point) | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_point.png` | OK |
| attack: masks | `assets/characters/villains/derrick_dark_humor_attack_masks.png` | OK |
| special | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_special.png` | OK |
| taunt | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_taunt.png` | OK |
| hurt | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_hurt.png` | OK |
| fullbody card | `assets/sprites/enemies/red_flag_guys/dark_humor_guy/derrick_dark_humor_fullbody_card.png` | OK |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 10. Old Young-Girl Guy (Victor) — `old_young`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/victor_old_young_girl_headshot.png` | OK |
| reference art | `assets/characters/villains/old_young_girl_guy_reference.png` | OK (reference only) |
| LoveLoop profile card | `assets/characters/villains/victor_old_young_girl_card.png` | OK |
| battle sprite (standing) | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |

### 11. Lucien Moreau — `lucien_reservation_mirage`

| Role | File | Status |
|---|---|---|
| headshot/card | `assets/characters/villains/lucien_reservation_mirage_card.png` | OK |
| portrait alt | `assets/characters/villains/lucien_moreau_portrait_alt.png` | OK |
| profile | `assets/characters/villains/lucien_moreau_profile.png` | OK |
| battle sprite (standing) | `assets/characters/villains/lucien_moreau_battle_standing.png` | OK |
| battle sprite (phone) | `assets/characters/villains/lucien_moreau_standing_phone.png` | OK |
| fullbody | `assets/characters/villains/lucien_moreau_fullbody.png` | OK |
| attack: phone | `assets/characters/villains/lucien_moreau_attack_phone.png` | OK |
| attack: charm | `assets/characters/villains/lucien_moreau_attack_charm.png` | OK |
| attack: reserved | `assets/characters/villains/lucien_moreau_attack_reserved.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | `assets/characters/villains/lucien_moreau_profile.png` | OK (can double as profile) |

### 12. Roman Vega — `roman_vega`

| Role | File | Status |
|---|---|---|
| headshot | — | **MISSING** — all art missing |
| battle sprite | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |
| reference art | — | **MISSING** |

### 13. Nico Hart — `nico_boundary_pusher`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/boundary_pusher_headshot.png` | OK (generic filename, should be `nico_hart_headshot.png`) |
| battle sprite (standing) | `assets/characters/villains/nico_hart_battle_standing.png` | OK |
| attack: heart bomb | `assets/characters/villains/nico_hart_attack_heart_bomb.png` | OK |
| attack: smoky aura | `assets/characters/villains/nico_hart_attack_smoky_aura.png` | OK |
| VFX: heart beam | `assets/vfx/red_flags/nico_hart/heart_beam_vfx.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 14. Blake Sterling — `blake_disruptor`

| Role | File | Status |
|---|---|---|
| headshot/profile | `assets/characters/villains/blake_sterling_profile.png` | OK |
| battle sprite (standing) | `assets/characters/villains/blake_sterling_standing_tablet.png` | OK |
| attack: blockchain | `assets/characters/villains/blake_sterling_attack_blockchain.png` | OK |
| attack: runes | `assets/characters/villains/blake_sterling_attack_runes.png` | OK |
| cutin | `assets/characters/villains/blake_sterling_cutin.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

### 15. Julian Cross — `julian_softboi_savior`

| Role | File | Status |
|---|---|---|
| headshot/profile | `assets/characters/villains/julian_cross_profile.png` | OK |
| battle sprite (fullbody) | `assets/characters/villains/julian_cross_softboi_fullbody.png` | OK |
| battle sprite (standing book) | `assets/characters/villains/julian_cross_standing_book.png` | OK |
| attack: aura | `assets/characters/villains/julian_cross_attack_aura.png` | OK |
| LoveLoop profile card | `assets/characters/villains/julian_cross_softboi_savior_card.png` | OK |
| romantic CG | `assets/cgs/story/cg_story_julian_warmth.png` | OK |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |

### 16. Evan (Guy Who Seems Normal) — `normal_fake`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/evan_guy_who_seems_normal_headshot.png` | OK |
| battle sprite (standing) | — | **MISSING** |
| attack | — | **MISSING** |
| hurt | — | **MISSING** |
| defeated | — | **MISSING** |
| cutin | — | **MISSING** |
| VFX | — | **MISSING** |
| LoveLoop profile card | — | **MISSING** |

---

## Girl Red Flags

### 17. Ivy Mercer — `ivy_mercer`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/girl_red_flags/ivy_mercer_headshot.png` | OK |
| battle sprite (standing) | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_neutral_standing.png` | OK |
| also: `assets/characters/villains/girl_red_flags/ivy_mercer_battle_standing.png` | | OK (duplicate) |
| attack: breadcrumbs | `assets/characters/villains/girl_red_flags/ivy_mercer_attack_breadcrumbs.png` | OK |
| move 1: midnight poem | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_01_midnight_poem.png` | OK |
| move 2: three day silence | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_02_three_day_silence.png` | OK |
| move 3: almost vulnerable | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_03_almost_vulnerable.png` | OK |
| move 4: read receipt ritual | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_04_read_receipt_ritual.png` | OK |
| move 5: breadcrumb moon | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_move_05_breadcrumb_moon.png` | OK |
| hurt | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_hurt.png` | OK |
| defeated | `assets/sprites/enemies/red_flag_girls/Ivy_Mercer/ivy_defeated.png` | OK |
| special cutin | `assets/cutins/red_flag_girls/Ivy_Mercer/ivy_special_cutin.png` | OK |
| VS cutin | `assets/cutins/red_flag_girls/Ivy_Mercer/ivy_vs_cutin.png` | OK |
| VFX (5 moves) | `assets/effects/red_flag_girls/Ivy_Mercer/ivy_fx_01-05_*.png` | OK |
| LoveLoop profile card | — | **MISSING** |

### 18. Simone Brooks — `simone_brooks`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/girl_red_flags/simone_brooks_headshot.png` | OK |
| battle sprite (standing) | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_neutral_standing.png` | OK |
| move 1: are you actually queer | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_01_are_you_actually_queer.png` | OK |
| move 2: straight girl energy | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_02_straight_girl_energy.png` | OK |
| move 3: gold star shield | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_03_gold_star_shield.png` | OK |
| move 4: prove it pressure | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_04_prove_it_pressure.png` | OK |
| move 5: queer enough trial | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_move_05_queer_enough_trial.png` | OK |
| hurt | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_hurt.png` | OK |
| defeated | `assets/sprites/enemies/red_flag_girls/Simone_Brooks/simone_defeated.png` | OK |
| special cutin | `assets/cutins/red_flag_girls/Simone_Brooks/ivy_special_cutin.png` | **MISNAMED** — should be `simone_special_cutin.png` |
| VS cutin | `assets/cutins/red_flag_girls/Simone_Brooks/ivy_vs_cutin.png` | **MISNAMED** — should be `simone_vs_cutin.png` |
| VFX (5 moves) | `assets/effects/red_flag_girls/Simone_Brooks/simone_fx_01-05_*.png` | OK |
| LoveLoop profile card | — | **MISSING** |

### 19. Camila Reyes — `camila_reyes`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/villains/girl_red_flags/camila_reyes_headshot.png` | OK |
| battle sprite (standing) | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_neutral_standing.png` | OK |
| move 1: vibe check trap | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_01_vibe_check_trap.png` | OK |
| move 2: soft launch blur | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_02_soft_launch_blur.png` | OK |
| move 3: no labels glitter bomb | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_03_no_labels_glitter_bomb.png` | OK |
| move 4: attention refill | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_04_attention_refill.png` | OK |
| move 5: close friends confusion | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_move_05_close_friends_confusion.png` | OK |
| hurt | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_hurt.png` | OK |
| defeated | `assets/sprites/enemies/red_flag_girls/Camila_Reyes/camila_defeated.png` | OK |
| special cutin | `assets/cutins/red_flag_girls/Camila_Reyes/camila_special_cutin.png` | OK |
| VS cutin | `assets/cutins/red_flag_girls/Camila_Reyes/camila_vs_cutin.png` | OK |
| VFX | — | **MISSING** — `effects/red_flag_girls/Camila_Reyes/` directory is empty |
| LoveLoop profile card | — | **MISSING** |

---

## Bosses

### 20. The Algorithm — `algorithm`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/bosses/algorithm_headshot.png` | OK |
| reference art | `assets/characters/bosses/algorithm_reference.png` | OK (reference only) |
| battle sprite (idle) | `assets/sprites/enemies/bosses/the_algorithm/algorithm_idle.png` | OK |
| battle sprite (walk) | `assets/sprites/enemies/bosses/the_algorithm/algorithm_walk.png` | OK |
| attack | `assets/sprites/enemies/bosses/the_algorithm/algorithm_attack.png` | OK |
| attack: glitch | `assets/sprites/enemies/bosses/the_algorithm/algorithm_attack_glitch.png` | OK |
| beam | `assets/sprites/enemies/bosses/the_algorithm/algorithm_beam.png` | OK |
| special | `assets/sprites/enemies/bosses/the_algorithm/algorithm_special.png` | OK |
| ultimate | `assets/sprites/enemies/bosses/the_algorithm/algorithm_ultimate.png` | OK |
| intro | `assets/sprites/enemies/bosses/the_algorithm/algorithm_intro.png` | OK |
| defeated | `assets/sprites/enemies/bosses/the_algorithm/algorithm_defeated.png` | OK |
| story CG | `assets/cgs/story/cg_story_algorithm_strikes_apartment.png` | OK |
| cutin | — | **MISSING** — referenced in assets.js |
| VFX | — | **MISSING** |

### 21. The Pattern — `pattern`

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/bosses/pattern_headshot.png` | OK |
| reference art | `assets/characters/bosses/pattern_reference.png` | OK (reference only) |
| battle sprite (idle) | `assets/sprites/enemies/bosses/the_pattern/pattern_idle.png` | OK |
| battle sprite (float) | `assets/sprites/enemies/bosses/the_pattern/pattern_float.png` | OK |
| battle sprite (ready) | `assets/sprites/enemies/bosses/the_pattern/pattern_ready.png` | OK |
| attack: chain | `assets/sprites/enemies/bosses/the_pattern/pattern_attack_chain.png` | OK |
| attack: chain barrage | `assets/sprites/enemies/bosses/the_pattern/pattern_attack_chain_barrage.png` | OK |
| attack: heart blast | `assets/sprites/enemies/bosses/the_pattern/pattern_attack_heart_blast.png` | OK |
| special: memory swarm | `assets/sprites/enemies/bosses/the_pattern/pattern_special_memory_swarm.png` | OK |
| block | `assets/sprites/enemies/bosses/the_pattern/pattern_block.png` | OK |
| defeated | — | **MISSING** — needed for Goddess Mode transformation sequence |
| cutin | — | **MISSING** — referenced in assets.js |
| VFX | — | **MISSING** |

---

## Friends

All friends have headshots and reference art. All are missing scene sprites and support cutins.

### 22. Malik

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/friends/malik_headshot.png` | OK |
| reference art | `assets/characters/friends/malik_reference.png` | OK (reference only) |
| card | `assets/characters/cards/malik_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_malik_beach.png` | OK |
| scene sprite | — | **MISSING** — for VN conversations |
| support cutin | — | **MISSING** — for battle support summon |

### 23. Min

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/friends/min_headshot.png` | OK |
| reference art | `assets/characters/friends/min_reference.png` | OK (reference only) |
| card | `assets/characters/cards/min_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_min_aquarium.png` | OK |
| scene sprite | — | **MISSING** |
| support cutin | — | **MISSING** |

### 24. Jade

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/friends/jade_headshot.png` | OK |
| reference art | `assets/characters/friends/jade_final_reference.png` | OK (reference only) |
| card | `assets/characters/cards/jade_card.png` | OK |
| scene sprite | — | **MISSING** |
| support cutin | — | **MISSING** |
| ending CG | — | **MISSING** |

### 25. Chloe

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/friends/chloe_headshot.png` | OK |
| reference art | `assets/characters/friends/chloe_reference.png` | OK (reference only) |
| card | `assets/characters/cards/chloe_card.png` | OK |
| scene sprite | — | **MISSING** |
| support cutin | — | **MISSING** |
| ending CG | — | **MISSING** |

### 26. Mia

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/friends/mia_headshot.png` | OK |
| reference art | `assets/characters/friends/mia_reference.png` | OK (reference only) |
| card | `assets/characters/cards/mia_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_mia_beachside_cafe.png` | OK |
| scene sprite | — | **MISSING** |
| support cutin | — | **MISSING** |

---

## Green Flags

All green flags have headshots, reference art, cards, and ending CGs. All are missing battle sprites and attack art (needed for Phase 11 green flag battles).

### 27. Xavier

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/green_flags/xavier_headshot.png` | OK |
| reference art | `assets/characters/green_flags/xavier_reference.png` | OK (reference only) |
| card | `assets/characters/cards/xavier_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_xavier_planetarium.png` | OK |
| battle sprite | — | **MISSING** (Phase 11) |
| attack | — | **MISSING** (Phase 11) |

### 28. James

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/green_flags/james_headshot.png` | OK |
| reference art | `assets/characters/green_flags/james_reference.png` | OK (reference only) |
| card | `assets/characters/cards/james_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_james_movie.png` | OK |
| battle sprite | — | **MISSING** (Phase 11) |
| attack | — | **MISSING** (Phase 11) |

### 29. Andrew

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/green_flags/andrew_headshot.png` | OK |
| reference art | `assets/characters/green_flags/andrew_reference.png` | OK (reference only) |
| card | `assets/characters/cards/andrew_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_andrew_dinner.png` | OK |
| battle sprite | — | **MISSING** (Phase 11) |
| attack | — | **MISSING** (Phase 11) |

### 30. Christy

| Role | File | Status |
|---|---|---|
| headshot | `assets/characters/green_flags/christy_headshot.png` | OK |
| fullbody | `assets/characters/green_flags/christy_fullbody.png` | OK |
| fullbody alt | `assets/characters/green_flags/christy_fullbody_alt.png` | OK |
| card | `assets/characters/cards/christy_card.png` | OK |
| ending CG | `assets/cgs/endings/cg_ending_christy_spa.png` | OK |
| battle sprite | — | **MISSING** (Phase 11) |
| attack | — | **MISSING** (Phase 11) |

---

## Untracked Character: Adrian Vale (Love Bomber)

Art exists in the repo but this character is NOT in redFlags.js:

| Role | File | Status |
|---|---|---|
| card | `assets/characters/villains/adrian_vale_love_bomber_card.png` | OK (unused) |
| profile | `assets/characters/villains/adrian_vale_love_bomber_profile.png` | OK (unused) |
| sprite | `assets/characters/villains/adrian_vale_love_bomber_sprite.png` | OK (unused) |
| ultimate | `assets/characters/villains/adrian_vale_love_bomber_ultimate.png` | OK (unused) |

**Decision needed:** Is Adrian Vale a canon character? If yes, he needs to be added to redFlags.js. If no, these files should be moved to `needs_review/` or removed.

---

## Summary: Missing Asset Counts

| Category | Missing Count | Priority |
|---|---|---|
| **Game-breaking (code references missing files)** | 9 | CRITICAL — fix immediately |
| **Roman Vega (all art)** | 8+ | HIGH — character has zero assets |
| **Red flag guy battle sprites** | 13 | HIGH — most guys have no standing battle sprite |
| **Red flag guy hurt/defeated** | 26 | MEDIUM — needed for battle polish |
| **Red flag guy cutins** | 14 | MEDIUM — needed for special move drama |
| **Red flag guy VFX** | 14 | MEDIUM — needed for attack visuals |
| **LoveLoop profile cards** | 12 | MEDIUM — needed for Phase 6 dating app UI |
| **Friend scene sprites** | 5 | MEDIUM — needed for Phase 7 VN conversations |
| **Friend support cutins** | 5 | MEDIUM — needed for Phase 7 battle support |
| **Green flag battle art** | 8 | LOW — Phase 11, not needed yet |
| **Boss cutins** | 2 | MEDIUM — referenced in code |
| **Camila VFX** | 5 | MEDIUM — other girl flags have VFX |
| **Amy paper doll base** | 1 | CRITICAL — closet system cannot function |
| **Amy special cutin** | 1 | HIGH — referenced in code |
| **Simone cutin misnaming** | 2 | HIGH — files exist with wrong names |

### Total explicitly documented missing assets: ~100
