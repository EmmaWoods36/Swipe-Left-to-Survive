import {state} from './state.js';
import {t,tx,toggleLanguage} from './localization.js';
import {setBackground} from './assets.js';

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

export function showTitle({startGame, showMap, showCloset, showPhoto}={}){
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
  g.append(button(t('start'), startGame, 'primary'));
  g.append(button(t('map'), showMap));
  g.append(button(t('closet'), showCloset));
  g.append(button(t('dateFit'), showPhoto));
  renderHud();
}

export function showMap({goBattle, showCloset, showPhoto}={}){
  state.screen = 'map';
  clearStage();
  setBackground('map');
  screenLayer().innerHTML = `
    <div class="center-screen"><section class="panel light">
      <h2>${tx('City Map','シティマップ')}</h2>
      <p class="subtitle">${tx('Choose where Amy goes next.','次にエイミーが行く場所を選んでください。')}</p>
      <div id="mapGrid" class="map-grid"></div>
    </section></div>`;
  const places = [
    ['apartment',tx('Amy’s Apartment','エイミーの部屋'),tx('Rest, check LoveLoop, open closet.','休む、LoveLoopを見る、クローゼットを開く。')],
    ['closet',tx('Closet / Boutique','クローゼット / ブティック'),tx('Dress Amy with visual thumbnails.','画像サムネでエイミーを着せ替える。')],
    ['battle',tx('LoveLoop Date Battle','LoveLoopデートバトル'),tx('Fight the next red flag.','次の地雷と戦う。')],
    ['photo',tx('Date Fit Studio','デートコーデスタジオ'),tx('Take a Polaroid after dressing Amy.','着せ替え後にポラロイドを撮る。')]
  ];
  const grid = document.getElementById('mapGrid');
  places.forEach(([id,name,desc])=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${name}</h3><p class="muted">${desc}</p>`;
    const action = id==='closet'?showCloset:id==='battle'?goBattle:id==='photo'?showPhoto:()=>showMap({goBattle,showCloset,showPhoto});
    div.append(button(tx('Go','行く'), action, id==='battle'?'danger':''));
    grid.append(div);
  });
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
