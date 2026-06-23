import {state,setLanguage} from './state.js';

const UI = {
  title:{en:'Swipe Left to Survive',ja:'マッチング地獄サバイバル'},
  tagline:{en:'A turn-based dating survival RPG',ja:'恋の地雷サバイバルRPG'},
  start:{en:'Start',ja:'始める'},
  map:{en:'Map',ja:'マップ'},
  closet:{en:'Closet / Boutique',ja:'クローゼット / ブティック'},
  gallery:{en:'Gallery',ja:'ギャラリー'},
  dateFit:{en:'Date Fit Studio',ja:'デートコーデスタジオ'},
  continue:{en:'Continue',ja:'続ける'},
  skip:{en:'Skip Cutscene',ja:'スキップ'},
  back:{en:'Back',ja:'戻る'},
  hp:{en:'HP',ja:'HP'},
  funds:{en:'Soft Life Funds',ja:'ソフトライフ資金'},
  day:{en:'Day',ja:'Day'},
  time:{en:'Time',ja:'時間'}
};

export function t(key){
  const entry = UI[key];
  if(!entry) return key;
  return entry[state.lang] || entry.en;
}

export function tx(en, ja){ return state.lang === 'ja' ? (ja || en) : en; }

export function toggleLanguage(){
  setLanguage(state.lang === 'ja' ? 'en' : 'ja');
  updateStaticText();
  window.dispatchEvent(new CustomEvent('slts:languageChanged'));
}

export function updateStaticText(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}
