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
  // Location pins — 9 fixed world-map pins per canon
  // Coordinates are semantic anchors: pin TIP touches building entrance/frontage
  // labelPos: individual label offset direction to avoid covering art
  const locations = [
    { id:'apartment',  name:tx('Amy\'s Apartment','エイミーの部屋'),     x:33.5, y:46.5, labelPos:'left' },
    { id:'office',     name:tx('Office','オフィス'),                     x:70.5, y:36.5, labelPos:'right' },
    { id:'library',    name:tx('Library','図書館'),                      x:53.5, y:50.5, labelPos:'left' },
    { id:'bar',        name:tx('Bar','バー'),                             x:73.0, y:56.0, labelPos:'right' },
    { id:'park',       name:tx('Park','公園'),                           x:28.5, y:71.5, labelPos:'left' },
    { id:'restaurant', name:tx('Restaurant','レストラン'),               x:51.5, y:76.5, labelPos:'right' },
    { id:'mall',       name:tx('Mall','モール'),                          x:77.0, y:83.5, labelPos:'right' },
    { id:'villain_apt',name:tx('Villain Apt','ヴィランの部屋'),           x:93.5, y:61.0, labelPos:'left' },
    { id:'beach',      name:tx('Beach','ビーチ'),                        x:21.5, y:70.5, labelPos:'left' }
  ];
  const mapWrap = document.createElement('div');
  mapWrap.className = 'city-map-pins';
  locations.forEach(loc => {
    const isMall = loc.id==='mall';
    const isApartment = loc.id==='apartment';
    const isSafeArea = SAFE_AREAS[loc.id];
    let action;
    if(isMall) action = showCloset;
    else if(isApartment) action = () => showMap({goBattle, showCloset, showPhoto});
    else if(isSafeArea) action = () => visitSafeArea(loc.id, () => showMap({goBattle, showCloset, showPhoto}));
    else action = () => showMap({goBattle, showCloset, showPhoto});
    const pin = document.createElement('button');
    pin.className = `map-pin label-${loc.labelPos || 'below'}`;
    pin.type = 'button';
    pin.style.left = loc.x + '%';
    pin.style.top = loc.y + '%';
    pin.innerHTML = `<span class="pin-teardrop"><svg width="24" height="32" viewBox="0 0 24 32"><path d="M12 0C5.37 0 0 5.37 0 12c0 8.2 12 20 12 20s12-11.8 12-20C24 5.37 18.63 0 12 0z" fill="#ff1493" stroke="#fff" stroke-width="2.5"/><circle cx="12" cy="12" r="4.5" fill="#fff"/></svg></span><span class="pin-label">${loc.name}</span>`;
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
