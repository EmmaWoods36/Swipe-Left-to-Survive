# Swipe Left to Survive — End-to-End Development Vision / Handoff

## Development Philosophy

The sequence matters. The healthy pipeline is:

assets → foundation → VN → vertical slice → battle engine → campaign → bosses → world systems → dress-up/photo → postgame → localization/polish → QA → release

**Within each phase: one thing at a time → test it → lock it → move on.**

Do not redesign the game. Do not restart the content. Rebuild the foundation underneath the game we already designed.

---

## Phase 0 — Canon Lock + Recovery

Establish what the game is and what already exists. Take inventory of existing game, repo, dialogue, sprites, battle art, VFX, CGs, profiles, dress-up assets, NPC art, support art, bosses, and old code. Separate canon content from broken implementation.

The old v1.x game is reference material, not sacred architecture.

Output: canonical project reference covering characters, IDs, names, move sets, story order, unlock rules, folder structure, asset naming, UI behavior, localization rules, and game mechanics.

## Phase 1 — Asset Rehabilitation + Asset Pipeline

Make the art library reliable before wiring everything into UI.

Every asset gets classified as:
- headshot / VN portrait
- scene sprite
- battle sprite
- cut-in
- VFX
- CG
- dress-up overlay
- background
- profile/card art

These are different jobs and should never be substituted randomly.

Build one canonical asset manifest so code requests something like `amy.headshot` instead of guessing among six filenames.

Close remaining asset gaps: Christy, true NPC headshots, missing red-flag-guy portraits, missing scene poses.

Exit condition: every important character has either a verified correct asset or an explicitly documented missing asset. No silent substitutions.

## Phase 2 — Clean Technical Foundation

Architectural rebuild. Game becomes modular instead of one giant patch-lasagna HTML file.

Separate: state, localization, dialogue, screens, battle, characters, progression, closet, photo studio, audio, routes, and asset manifests.

Existing assets/ tree survives. Rebuild code around it.

Establish reliable game state for: Amy's display name, language, dating preference, day/time, money, defeated red flags, unlocked routes, inventory, endings, support availability, story flags, and saved progress.

Save/load needs versioning so future changes do not destroy existing saves.

Exit condition: a boring, stable shell that boots every time without stale UI from three previous versions haunting it.

## Phase 3 — VN / Narrative Presentation System

Base narrative UI: large bottom visual-novel dialogue window.

Amy / narration / LoveLoop use that bottom window. Portrait area shows Amy's headshot, not full-body sprite.

When another character speaks, their matching/mirrored dialogue UI appears over the base presentation with their own portrait. Characters entering a conversation, not unrelated floating widgets.

Amy's full battle sprite does not wander into exposition.

VN engine supports:
- typewriter reveal → one click reveals full current line → next click advances → Skip Cutscene skips the scene
- Language switching updates current visible line immediately
- Scene titles are overlays or metadata, never dialogue spoken by "System"

Exit condition: opening exposition can be played start to finish and looks intentional.

## Phase 4 — Opening + LoveLoop Vertical Slice

Player experiences:
Title → opening exposition → Amy on couch → LoveLoop discovery → profile setup → display name → preference → profile/card → likes/messages → 2AM Guy → reveal → first battle → post-battle progression

Name entry supports: Alphabet / Hiragana / Katakana
Defaults: Amy / えいみー / エイミー

LoveLoop preference begins with: Guys / Guys and girls (can be changed later).
No women-only route (only three canonical girl red flags).
Three girl red flags enter normal matchmaking pool when "Guys and girls" is selected.

Exit condition: someone who knows nothing about the project can play the opening through the tutorial battle and understand the game.

## Phase 5 — Full Battle Engine

Real reusable system instead of individually scripted fights.

Side-view turn-based RPG mechanics with fighting-game drama. Not real-time fighting game.

Story Mode and Arcade Mode use the same combat foundation.

Battle presentation includes: pink VS intro, player and opponent cut-ins, animated special cut-ins, support summon cut-ins, transparent attack VFX, impact animation, screen shake, flashes, character battle sprites.

Amy has attacks, specials, supports, HP progression, and ultimately "Girl, Stand Up!"

Health system visually grows across multiple colored bars:
yellow/orange/red → green/yellow → blue/green → silver/blue → purple/pink/silver

Enemies scale by tier. 2AM tutorial enemy is weak. Normal red flags escalate. Evan, Algorithm, and Pattern behave like real bosses.

Exit condition: one engine can run any red flag, boss, or green flag encounter from data instead of custom battle code for every person.

## Phase 6 — Red Flag Campaign

Feed complete red-flag roster into the battle system.

Each red flag gets the full pipeline:
LoveLoop profile → match/setup → date or encounter scene → escalation → battle → aftermath → progression flag

Red flags are actual characters with names, not only archetype labels.

Three women:
- Ivy Mercer — The Breadcrumb Poet
- Simone Brooks — The Gold-Star Gatekeeper
- Camila Reyes — The Soft Launch Siren

They coexist with the guy roster.

Dating-app profile system: every major red flag gets a proper LoveLoop profile the player can inspect before matching.

After enough bad matches, player can unlock "Give Up on LoveLoop."

Exit condition: game becomes a full relationship-survival campaign rather than a tutorial plus random battles.

## Phase 7 — Friends, Supports, World + Progression

Core friend group: Malik, Min, Jade, Chloe, Mia.

They are characters, not merely battle summons. They appear in apartment scenes, conversations, map events, commentary, and support mechanics.

Min stays the quietly sharp badass. Mia retains her "Maybe you should try dating girls..." conversation from the beginning.

Friends become strategically meaningful during battles:
- Normal battles allow summons
- Evan creates hesitation mechanic where friends initially think he seems fine
- Algorithm weakens support effectiveness
- Pattern removes conventional support attacks, replaces with friends' whispered encouragement

World layer: Amy's locations, day/time progression, office/work events, NPCs, Soft Life Fund economy.

Exit condition: there is a reason to exist between dates and battles.

## Phase 8 — Boss Arc: Evan → Algorithm → Pattern

Evan: convincing "normal guy" problem. Friends hesitate because nothing initially looks wrong. His mask gradually comes off.

The Algorithm: structural antagonist. The system that keeps feeding Amy patterns. Supports weakened.

The Pattern: emotional/main-story climax of the red-flag arc.
- Normal Amy cannot grind down Pattern
- She can damage it only to the established floor, then gets her ass handed to her
- Fight feels unwinnable
- Friends cannot jump in and solve it
- Amy hears them encouraging her
- Transformation into Goddess Mode
- Only Goddess Amy can break The Pattern

Not the absolute final battle — post-Pattern routes continue. It is the main-story climax / final boss of the red-flag arc.

## Phase 9 — Closet / Boutique / Soft-Life Economy

Real visual paper-doll system.

Players see image thumbnails for: hairstyles, tops, bottoms, dresses, full outfits, swimwear, shoes, bags, accessories.

Selecting an item immediately applies transparent overlay to Amy.

Layer order, ownership, prices, unlocks, inventory, and outfit state live in data.

Amy earns Soft Life Funds (including from office/work activities) and spends them on clothing.

Boutique and closet = part progression system, part cosmetic reward loop.

Happens on the actual dress-up Amy/paper doll, not inside a Polaroid.

## Phase 10 — Date Fit Studio + Gallery

Separate from closet.

Workflow: Dress Amy → choose solo or companion → choose location → pose/compose → camera flash → Polaroid develops → save to gallery.

Companions can use posed scene art rather than requiring dress-up system of their own.

Gallery = record of the player's run.

## Phase 11 — Post-Pattern Peace Map + Green Flag Routes

Beating Pattern does not immediately roll credits. Game changes tone.

Amy meets genuinely decent people. Green flags presented through battle language (part of the game's joke) but mechanic changes:
- Around three bars, difficult for Amy to damage (nothing obviously wrong)
- "Attacks" are devastating acts of competence, kindness, emotional availability, consistency, sweetness
- They knock Amy on her ass by behaving normally
- Accepting or rejecting the date is valid; game does not punish Amy for deciding a good person is not her person

Optional bestie romance: unlock opens Malik, Min, and Mia as post-Pattern dating possibilities together. Mia is not segregated behind a separate "girl route" unlock.

## Phase 12 — Endings, Replay + Arcade Mode

Story Mode: narrative progression and decisions.
Arcade Mode: strips to battle fantasy, same battle engine.

Endings reflect what Amy actually did: whether she stayed on LoveLoop, patterns tolerated/rejected, friendships, romance choices, green-flag outcomes, unlocked routes, other progression state.

Cheats and route shortcuts belong here, not in first playthrough.

## Phase 13 — Full Localization + Audio + Presentation Polish

English default. Japanese is full localization, not English with Japanese buttons.

Changing EN/和 updates all currently visible UI and dialogue immediately.

Narrative content stored by localized line ID.

Some jokes universal. Others culturally adapted when American dating-app jokes don't land naturally.

Final music, battle SFX, menu sounds, notification sounds, camera sounds, impact sounds, transition polish, animation timing, accessibility, touch targets, responsive layouts, mobile behavior.

## Phase 14 — Content Complete QA

Every system tested against every other system:
opening → language toggle → naming → preferences → profiles → dates → battle → support → bosses → Pattern → post-Pattern → closet → shop → photo → routes → ending → replay

- Asset paths audited on case-sensitive GitHub Pages
- Every missing image caught
- Every speaker/headshot mapping tested
- Every route tested in EN and JP
- Save/load tested across refreshes and build changes
- Mobile Safari tested (playing on iPhone)
- Explicit regression tests so fixing the closet doesn't make Amy disappear during narration

## Phase 15 — Release Candidate + Actual Game

Project stops being "Amber and ChatGPT's extremely ambitious browser prototype" and becomes a coherent release candidate.

Release build contains only active production code and canonical assets.
Debug menus and asset warnings removed or hidden.

Deployed as actual public build. Future additions become updates, not emergency surgery.
