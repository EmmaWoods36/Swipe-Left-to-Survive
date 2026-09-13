export const state = {
  version: 'v2-clean-rebuild-0.1',
  lang: localStorage.getItem('slts_v2_lang') || 'en',
  playerName: 'Amy',
  nameMode: 'alphabet',
  preference: 'guys',
  screen: 'title',
  scene: null,
  day: 1,
  time: 'Evening',
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
    hair: null,
    full: null,
    top: null,
    bottom: null,
    dress: null,
    outerwear: null,
    swim: null,
    shoes: null,
    accessories: []
  },
  gallery: [],
  battle: null,
  amyBars: 1,
  amyHp: 50,
  amyMaxHp: 50
};

export function serializeState(){
  return {...state, defeated:[...state.defeated]};
}

export function hydrateState(saved){
  if(!saved) return;
  Object.assign(state, saved);
  state.defeated = new Set(saved.defeated || []);
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
