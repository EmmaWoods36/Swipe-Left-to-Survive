export const state = {
  version: 'v2-clean-rebuild-0.1',
  lang: localStorage.getItem('slts_v2_lang') || 'en',
  playerName: 'Amy',
  nameMode: 'alphabet',
  preference: 'guys',
  screen: 'title',
  scene: null,
  day: 1,
  clockMinutes: 18 * 60,  // 6:00 PM — game starts in the evening (Sunset)
  funds: 800,
  peace: 50,
  clarity: 40,
  selfRespect: 45,
  groupChat: 60,
  delusion: 0,
  redFlagData: 0,
  defeated: new Set(),
  unlocked: {
    bestieRoutes: false,
    postPattern: false,
    algorithm: false,
    pattern: false
  },
  outfit: {
    hair: null,  // Set on game start by closetEngine init
    full: null,
    top: null,
    bottom: null,
    dress: null,
    outerwear: null,
    swim: null,
    shoes: null,
    accessories: []
  },
  ownedClothes: [], // Track purchased/owned clothing items by id
  coworkerEvent: {
    unlocked: false,   // true when 3 battles are defeated
    triggered: false,  // true when the office story event fires
    battleCompleted: false  // true after coworker battle is resolved
  },
  gallery: [],
  battle: null,
  amyBars: 1,
  amyHp: 50,
  amyMaxHp: 50,
  stamina: 50
};

export function serializeState(){
  return {...state, defeated:[...state.defeated]};
}

// === v1.34 CLOCK SYSTEM — RESTORED ===
// state.clockMinutes is the authoritative time source (0-1439)
// Periods: Sunrise 5:30-6:59, Day 7:00-17:59, Sunset 18:00-19:59, Night 20:00-5:29
// Map: Sunrise→afternoon bg, Day→day bg, Sunset→afternoon bg, Night→night bg

// Advance the game clock by N minutes. Midnight rollover increments day.
export function advanceGameMinutes(minutes) {
  state.clockMinutes += minutes;
  while (state.clockMinutes >= 1440) {
    state.clockMinutes -= 1440;
    state.day += 1;
  }
  // Update derived state.time string for backward compat
  state.time = getClockPeriod();
}

// Standard action time cost: 4 in-game hours (240 minutes) — DEPRECATED, use TIME_COSTS
export function advanceTime() {
  advanceGameMinutes(240);
}

// === Activity-specific time costs (per agreed design) ===
export const TIME_COSTS = {
  travel: 30,          // 30 min — moving between locations
  reading: 120,        // 2 hr — reading a book at the library
  officeWork: 240,     // 4 hr — the big half-day action
  spa: 120,            // 2 hr — spa treatment
  shopping: 120,       // 2 hr — boutique shopping
  meal: 120,           // 2 hr baseline — ordering food/drinks
  longMealOrDate: 180, // 3 hr — proper date activity
  battle: 60,          // 1 hr baseline — battle/date-battle sequence
  longDateBattle: 120, // 2 hr — longer date battles
  laptop: 120,         // 2 hr — meaningful sit-down work at cafe
  relax: 60            // 1 hr — relaxing activities (beach, window, etc.)
};

// Sleep: advance to next day at 8:00 AM, restore stats
export function sleepUntilMorning() {
  state.day += 1;
  state.clockMinutes = 8 * 60;  // 8:00 AM
  state.amyHp = state.amyMaxHp;
  state.stamina = 100;
  state.peace = Math.min(100, (state.peace || 50) + 20);
  state.time = getClockPeriod();
}

// Derive period label from clockMinutes
export function getClockPeriod() {
  const h = state.clockMinutes;
  // Sunrise: 5:30 AM - 6:59 AM (330 - 419)
  if (h >= 330 && h <= 419) return 'Sunrise';
  // Day: 7:00 AM - 5:59 PM (420 - 1079)
  if (h >= 420 && h <= 1079) return 'Day';
  // Sunset: 6:00 PM - 7:59 PM (1080 - 1199)
  if (h >= 1080 && h <= 1199) return 'Sunset';
  // Night: 8:00 PM - 5:29 AM (1200 - 329)
  return 'Night';
}

// Map period to background daypart key
export function getDaypartFromClock() {
  const period = getClockPeriod();
  if (period === 'Sunrise') return 'afternoon';
  if (period === 'Day') return 'day';
  if (period === 'Sunset') return 'afternoon';
  return 'night';  // Night
}

// Format clockMinutes as H:MM AM/PM
export function formatClockTime() {
  const total = Math.floor(state.clockMinutes % 1440);
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

// Get current hour as integer (0-23) for location open/closed checks
export function getClockHour() {
  return Math.floor((state.clockMinutes % 1440) / 60);
}

// Get current minutes within the hour (0-59)
export function getClockMinuteOfHour() {
  return (state.clockMinutes % 1440) % 60;
}

// Passive clock: 1 real-world second = N game minutes (default: 0.5 = 30 game min per 60 real sec)
// Pauses during battle, cutscene, title, closet, shop
const PASSIVE_CLOCK_INTERVAL_MS = 60000;  // tick every 60 real seconds
const PASSIVE_GAME_MINUTES_PER_TICK = 10;  // 10 game minutes per real minute

let _passiveClockTimer = null;
let _passiveClockActive = false;

export function isPassiveClockPaused() {
  const s = state.screen;
  // Title/splash/cheat screens
  if (s === 'title' || s === 'splash' || s === 'cheat') return true;
  // Battle active
  if (state.battle) return true;
  // Cutscene active
  if (state.scene) return true;
  // Dialogue active (conversation in progress)
  if (state.dialogueActive) return true;
  // Any submenu/modal open (choosing food, drinks, books, spa, etc.)
  if (state.submenu) return true;
  // Shopping / trying on clothes / closet / boutique
  if (s === 'closet' || s === 'boutique' || s === 'shop') return true;
  // Browser tab not visible
  if (document.hidden) return true;
  return false;
}

export function startPassiveClock() {
  if (_passiveClockTimer) clearInterval(_passiveClockTimer);
  _passiveClockActive = true;
  _passiveClockTimer = setInterval(() => {
    if (!_passiveClockActive) return;
    if (isPassiveClockPaused()) return;
    const oldPeriod = getClockPeriod();
    advanceGameMinutes(PASSIVE_GAME_MINUTES_PER_TICK);
    const newPeriod = getClockPeriod();
    // If period changed, dispatch event so screens can refresh backgrounds/availability
    if (oldPeriod !== newPeriod) {
      window.dispatchEvent(new CustomEvent('slts:periodChanged', { detail: { oldPeriod, newPeriod } }));
    }
    // Always dispatch a tick event for HUD refresh
    window.dispatchEvent(new CustomEvent('slts:clockTick'));
  }, PASSIVE_CLOCK_INTERVAL_MS);
}

export function stopPassiveClock() {
  _passiveClockActive = false;
  if (_passiveClockTimer) {
    clearInterval(_passiveClockTimer);
    _passiveClockTimer = null;
  }
}

export function hydrateState(saved){
  if(!saved) return;
  Object.assign(state, saved);
  state.defeated = new Set(saved.defeated || []);
  // Restore clock — if missing from old saves, default to 6:00 PM Day 1
  if (typeof state.clockMinutes !== 'number') state.clockMinutes = 1080; // 6:00 PM
  if (typeof state.day !== 'number') state.day = 1;
  if (typeof state.stamina !== 'number') state.stamina = 50;
  state.time = getClockPeriod();
}

export function setLanguage(lang){
  state.lang = lang === 'ja' ? 'ja' : 'en';
  localStorage.setItem('slts_v2_lang', state.lang);
  document.documentElement.lang = state.lang;
}

export const SAVE_KEY = 'slts_v2_save';

export function saveGame(){
  try {
    const data = serializeState();
    data._savedAt = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch(e) { console.warn('Save failed:', e); return false; }
}

export function loadGame(){
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return false;
    const saved = JSON.parse(raw);
    hydrateState(saved);
    return true;
  } catch(e) { console.warn('Load failed:', e); return false; }
}

export function hasSaveData(){
  return !!localStorage.getItem(SAVE_KEY);
}

export function deleteSave(){
  localStorage.removeItem(SAVE_KEY);
}

export function countDefeatedRedFlags(){
  return [...state.defeated].filter(id => !['algorithm','pattern'].includes(id)).length;
}

// Auto-save whenever key state changes (battle results, screen transitions)
let saveDebounce = null;
export function autosave(){
  if(saveDebounce) clearTimeout(saveDebounce);
  saveDebounce = setTimeout(()=>{ saveGame(); saveDebounce = null; }, 2000);
}

export function clamp(n,min=0,max=100){ return Math.max(min, Math.min(max, n)); }
