# Swipe Left to Survive

GitHub Pages-ready prototype for Amy's turn-based dating survival RPG.

## Included in this build
- index.html at repo root
- Emma Woods Studio splash screen
- background/location art
- city map day / afternoon / night
- Amy battle sprites wired into battle actions
- villain, boss, friend, and green-flag reference art
- updated asset manifest

## Amy sprite mapping in this build
- Idle: amy_idle.png
- Phone Punch: amy_punch.png
- Kick of Discernment: amy_high_kick.png
- Check Receipts: amy_energy_blast_alt.png
- Boundary Slash: amy_special_flag_beam.png
- Girl, Stand Up!: amy_ultimate_girl_stand_up.png
- Hurt: amy_hurt.png
- Victory: amy_victory.png
- Defeat: amy_defeat.png
- Defend/Run: amy_defend.png

Bonus sprite files are also included for future use: amy_low_stance.png and amy_beam_cannon.png.

## Algorithm sprite mapping in this build
- Intro / boss reveal: algorithm_intro.png
- Idle / neutral stance: algorithm_idle.png
- Standard enemy turn: algorithm_attack.png
- Beam / “He’s Your Type Though”: algorithm_beam.png
- Ultimate / “Lower Standards For More Matches”: algorithm_ultimate.png
- Bonus included for future use: algorithm_walk.png and algorithm_special.png

## v1.7 asset folder structure update
Boss sprites are now under `assets/sprites/enemies/bosses/` because bosses are still enemies.

Current structure:
- `assets/sprites/amy/`
- `assets/sprites/enemies/bosses/the_algorithm/`
- `assets/sprites/enemies/bosses/the_pattern/`
- `assets/sprites/enemies/red_flag_guys/`

The Pattern sprites are wired into the final boss fight.


## v1.8 Story/Dialogue Patch
- Replaced player-facing random battle buttons with a phone notification flow: Check Phone → Reply / Ignore / Send to Group Chat / Block → cutscene → Date Battle.
- Added a much larger dialogue pool for friends, red flags, The Algorithm, The Pattern, and green-flag NPCs.
- `Hang With Friends` now shows individual friend choices with location-based lines instead of dumping the whole group response at once.
- Min's battle support is centered on side-eye/silent judgment, with occasional short deadpan caption text. No academic/model-minority-coded support lines.
- Malik now has the requested battle support energy: “Amy, be so f@&$ing for real!”
- James, Xavier, and Andrew now function as repeat NPCs before the ending. Andrew has progressive park interactions.
- Added Mall → Spa sublocation/actions. The UI name is simply “Spa.”
- Added post-date Car decompression scenes and actions.
- Day 4+ office visits now auto-trigger the office creeper cutscene if he has not been defeated.
- Added background keys/placeholders for beach_day, beach_night, spa, car_day, car_night, and car_rain. Replace these PNGs with final user-approved art when available.


## v1.9 Cheat Route Patch
- Adds earned cheat progression with persistent localStorage progress.
- Adds title/menu options for **Enter Cheat Code** and **Unlocked Cheats**.
- First playthrough has no active cheats; BESTIE ROUTES unlocks after James, Xavier, Andrew, and Choose Yourself endings.
- BESTIE ROUTES enables cheat-only Malik and Min endgame date battles: Malik at the Beach, Min at the Aquarium.
- GIRL ROUTE unlocks after Malik + Min are completed and enables Mia at the Beachside Cafe.
- Adds placeholder background keys/locations for Aquarium and Beachside Cafe.


## v1.10 Beachside Cafe sublocation patch

- Beachside Cafe is no longer a separate world-map pin.
- Beachside Cafe is now reached from the Beach action menu.
- Beachside Cafe remains a normal soft-life sublocation with cake/window actions.
- If GIRL ROUTE is active, Mia’s cheat-only green flag date battle appears inside Beachside Cafe.
- World map and location cards stay cleaner; Beach remains the only main map pin for that area.
