import {state,hasSaveData} from './state.js';
import {t,tx,toggleLanguage} from './localization.js';
import {setBackground} from './assets.js';
import {visitSafeArea} from './scenes/safeAreas.js';
import {SAFE_AREAS} from '../data/conversationBank.js';
import {AudioManager} from './audioManager.js';

export const screenLayer = () => document.getElementById('screenLayer');
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
  const muted = AudioManager._isMuted;
  hud().innerHTML = `
    <span class="hud-chip">${t('day')} <b>${state.day}</b></span>
    <span class="hud-chip">${t('time')} <b>${state.time}</b></span>
    <span class="hud-chip">${t('hp')} <b>${state.amyHp}/${state.amyMaxHp}</b></span>
    <span class="hud-chip">${t('funds')} <b>${state.funds}</b></span>
    <button id="langToggle" class="lang-toggle" type="button"><b>${state.lang==='ja'?'和':'EN'}</b> / ${state.lang==='ja'?'EN':'和'}</button>
    <button id="muteToggle" class="lang-toggle" type="button" title="${muted?'Unmute':'Mute'}">${muted?'🔇':'🔊'}</button>
  `;
  document.getElementById('langToggle').onclick = toggleLanguage;
  document.getElementById('muteToggle').onclick = () => { AudioManager.toggleMute(); renderHud(); };
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
  AudioManager.playSceneMusic('title');
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
  // Pick map background based on game time per canon:
  // Sunrise/Day → day map, Sunset → afternoon map, Night → night map
  const timeMap = {
    'Sunrise': 'mapMorning',
    'Morning': 'mapMorning',
    'Day': 'mapMorning',
    'Afternoon': 'mapAfternoon',
    'Evening': 'mapAfternoon',
    'Sunset': 'mapAfternoon',
    'Dusk': 'mapNight',
    'Night': 'mapNight'
  };
  const mapBg = timeMap[state.time] || 'mapEvening';
  setBackground(mapBg);
  AudioManager.playSceneMusic('city_map');
  // Location pins positioned on the city map — fixed world map per canon
  // Coordinates matched to actual buildings/features on bg_city_map images
  const locations = [
    { id:'apartment',  name:tx('Amy\'s Apartment','エイミーの部屋'),     x:35, y:38 },
    { id:'office',     name:tx('Office','オフィス'),                     x:72, y:27 },
    { id:'library',    name:tx('Library','図書館'),                      x:56, y:43 },
    { id:'bar',        name:tx('Bar','バー'),                             x:76, y:48 },
    { id:'park',       name:tx('Park','公園'),                           x:28, y:64 },
    { id:'restaurant', name:tx('Restaurant','レストラン'),               x:54, y:70 },
    { id:'mall',       name:tx('Mall','モール'),                          x:83, y:76 },
    { id:'villain_apt',name:tx('Villain Apt','ヴィランの部屋'),           x:95, y:44 },
    { id:'beach',      name:tx('Beach','ビーチ'),                        x:20, y:85 }
  ];
  const mapWrap = document.createElement('div');
  mapWrap.className = 'city-map-pins';
  locations.forEach(loc => {
    const isApartment = loc.id==='apartment';
    const isMall = loc.id==='mall';
    const isBeach = loc.id==='beach';
    const isSafeArea = SAFE_AREAS[loc.id];
    let action;
    if(isMall) action = showCloset;
    else if(isApartment) action = () => showMap({goBattle, showCloset, showPhoto});
    else if(isSafeArea) action = () => visitSafeArea(loc.id, () => showMap({goBattle, showCloset, showPhoto}));
    else action = () => showMap({goBattle, showCloset, showPhoto});
    const pin = document.createElement('button');
    pin.className = 'map-pin';
    pin.type = 'button';
    pin.style.left = loc.x + '%';
    pin.style.top = loc.y + '%';
    pin.innerHTML = `<span class="pin-dot"></span><span class="pin-label">${loc.name}</span>`;
    pin.onclick = action;
    mapWrap.append(pin);
  });
  screenLayer().append(mapWrap);
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
