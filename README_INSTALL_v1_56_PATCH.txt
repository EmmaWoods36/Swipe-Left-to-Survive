Swipe Left to Survive v1.56 PATCH
Generated: 2026-06-22T00:17:01.879698Z

What this patch is:
- Drop-in GitHub Pages patch: overwrite index.html and merge the assets/ folder into the repo.
- Existing GitHub assets are assumed to already be present; this patch only adds the new assets uploaded in chat.

Important structure choices:
- No folder named approved is included in output paths.
- The duplicate old folder assets/characters/red_flag_girls/ is intentionally NOT included.
- Canonical red flag girl paths kept:
  assets/sprites/enemies/red_flag_girls/
  assets/cutins/red_flag_girls/
  assets/effects/red_flag_girls/
- Guy red flag VFX paths use:
  assets/vfx/red_flags/<red_flag_id>/<move_number>_<move_slug>.png

Code fixes in index.html:
- Fixed the broken Date Fit Studio print function that swallowed a later script tag and caused splash-screen jail.
- Added stronger splash fail-safe timers.
- Versioned language storage to slts_language_v156 so old saved Japanese settings do not make a fresh build default to Japanese.
- Updated code paths so they do not reference approved or villains_approved folders.
- Added v1.56 VFX runtime overlay code for rendered move assets.

Rendered VFX wired now:
- two_am: 5 main move overlays + 1 bonus original.
- preference: 5 move overlays.
- coworker: 5 move overlays.

Pending VFX manifests remain included for the rest of the 17 guy roster. Those packages currently contain .pending.txt scaffold files, not final PNGs.

Beginner install:
1. Open the zip.
2. Drag index.html into the repo root and replace the old index.html.
3. Drag the assets folder into the repo root and choose merge/replace if asked.
4. Commit/push to GitHub.
5. Open GitHub Pages in a private/incognito tab first to avoid old cached localStorage.
