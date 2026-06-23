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

export function countDefeatedRedFlags(){
  return [...state.defeated].filter(id => !['algorithm','pattern'].includes(id)).length;
}

export function clamp(n,min=0,max=100){ return Math.max(min, Math.min(max, n)); }
