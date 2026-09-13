import {state,hasSaveData} from './state.js';
import {t,tx,toggleLanguage} from './localization.js';
import {setBackground} from './assets.js';
import {visitSafeArea} from './scenes/safeAreas.js';
import {SAFE_AREAS} from '../data/conversationBank.js';

const screenLayer = () => document.getElementById('screenLayer');
const hud = () => document.getElementById('hud');
const spriteLayer = () => document.getElementById('spriteLayer');
const dialogueLayer = () => document.getElementById('dialogueLayer');

export function clearStage(){
  screenLayer().innerHTML = '';
  spriteLayer().innerHTML = '';
  document.getElementById('fxLayer').innerHTML = '';
  dialogueLayer().classList.add('hidden');
  dialogueLayer().innerHTML = '';
}

export function renderHud(){
  hud().innerHTML = `
    <span class="hud-chip">${t('day')} <b>${state.day}</b></span>
    <span class="hud-chip">${t('time')} <b>${state.time}</b></span>
    <span class="hud-chip">${t('hp')} <b>${state.amyHp}/${state.amyMaxHp}</b></span>
    <span class="hud-chip">${t('funds')} <b>${state.funds}</b></span>
    <button id="langToggle" class="lang-toggle" type="button"><b>${state.lang==='ja'?'和':'EN'}</b> / ${state.lang==='ja'?'EN':'和'}</button>
  `;
  document.getElementById('langToggle').onclick = toggleLanguage;
}

export function button(label, onClick, classes=''){
  const b = document.createElement('button');
  b.className = `btn ${classes}`.trim();
  b.type = 'button';
  b.textContent = label;
  b.onclick = onClick;
  return b;
}

export function showTitle({startGame, showMap, showCloset, showPhoto, continueGame}={}){
  state.screen = 'title';
  clearStage();
  setBackground('apartmentEvening');
  screenLayer().innerHTML = `
    <div class="center-screen"><section class="panel">
      <h2>${tx('Swipe Left to Survive','マッチング地獄サバイバル')}</h2>
      <p class="subtitle">${tx('A clean v2 rebuild foundation — no patch lasagna.','v2クリーン再構築版 — パッチ地獄なし。')}</p>
      <p>${tx('Amy thought she was looking for love. LoveLoop thought she was looking for a boss rush.','エイミーは恋愛くらい普通にできると思っていた。LoveLoopはボスラッシュだと思っていた。')}</p>
      <div id="titleButtons" class="menu-grid"></div>
    </section></div>`;
  const g = document.getElementById('titleButtons');
  // Show Continue button if save data exists
  if(hasSaveData() && continueGame){
    g.append(button(tx('Continue','続きから'), continueGame, 'primary'));
  }
  g.append(button(t('start'), startGame, hasSaveData() ? '' : 'primary'));
  g.append(button(t('map'), showMap));
  g.append(button(t('closet'), showCloset));
  g.append(button(t('dateFit'), showPhoto));
  renderHud();
}

export function showMap({goBattle, showCloset, showPhoto}={}){
  state.screen = 'map';
  clearStage();
  setBackground('map');
  // No big white panel — just location buttons on the map background
  const places = [
    ['apartment',tx('Amy’s Apartment','エイミーの部屋'),tx('Rest, check LoveLoop, open closet.','休む、LoveLoopを見る、クローゼットを開く。')],
    ['closet',tx('Closet / Boutique','クローゼット / ブティック'),tx('Dress Amy with visual thumbnails.','画像サムネでエイミーを着せ替える。')],
    ['battle',tx('LoveLoop Date Battle','LoveLoopデートバトル'),tx('Fight the next red flag.','次の地雷と戦う。')],
    ['photo',tx('Date Fit Studio','デートコーデスタジオ'),tx('Take a Polaroid after dressing Amy.','着せ替え後にポラロイドを撮る。')],
    ['restaurant',tx('Restaurant','レストラン'),tx('Grab food. Maybe run into a friend.','ご飯を食べる。友達に会うかも。')],
    ['park',tx('Park','公園'),tx('Take a walk. Clear your head.','散歩する。頭を整理する。')],
    ['beach',tx('Beach','ビーチ'),tx('Sun, sand, and zero red flags.','太陽、砂、地雷ゼロ。')],
    ['bar',tx('Bar','バー'),tx('Drinks with the girls. Or a quiet corner.','女子会で飲む。静かな隅っこも。')],
    ['library',tx('Library','図書館'),tx('Quiet. Books. No notifications.','静か。本。通知なし。')],
    ['cafe',tx('Beachside Cafe','海辺のカフェ'),tx('Coffee, ocean view, good company.','コーヒー、海の景色、良い仲間。')]
  ];
  // Render locations as a simple button grid on the map background
  const container = document.createElement('div');
  container.className = 'map-locations';
  places.forEach(([id,name,desc])=>{
    const loc = document.createElement('div');
    loc.className = 'map-location';
    loc.innerHTML = `<h3>${name}</h3><p class="muted">${desc}</p>`;
    const isBattle = id==='battle';
    const isCloset = id==='closet';
    const isPhoto = id==='photo';
    const isSafeArea = SAFE_AREAS[id];
    let action;
    if(isBattle) action = goBattle;
    else if(isCloset) action = showCloset;
    else if(isPhoto) action = showPhoto;
    else if(isSafeArea) action = () => visitSafeArea(id, () => showMap({goBattle, showCloset, showPhoto}));
    else action = () => showMap({goBattle, showCloset, showPhoto});
    loc.append(button(tx('Go','行く'), action, isBattle?'danger':''));
    container.append(loc);
  });
  screenLayer().append(container);
  renderHud();
}

export function setActions(actions){
  const box = document.getElementById('battleButtons');
  if(!box) return;
  box.innerHTML = '';
  actions.forEach(a => box.append(button(a.label, a.onClick, a.className||'')));
}

export function showMessage(title, body, actions=[]){
  clearStage();
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel"><h2>${title}</h2><p>${body}</p><div id="messageActions" class="choice-grid"></div></section></div>`;
  const g = document.getElementById('messageActions');
  actions.forEach(a => g.append(button(a.label, a.onClick, a.className||'')));
  renderHud();
}
