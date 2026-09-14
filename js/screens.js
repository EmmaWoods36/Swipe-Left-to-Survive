import {state,hasSaveData,autosave} from './state.js';
import {t,tx,toggleLanguage} from './localization.js';
import {setBackground} from './assets.js';
import {visitSafeArea} from './scenes/safeAreas.js';
import {SAFE_AREAS} from '../data/conversationBank.js';
import {AudioManager} from './audioManager.js';
import {
  MAP_PINS, LOCATION_BACKGROUNDS, getLocationBg, getMapDaypart,
  isLocationOpen, formatHours, LOCATION_HOURS,
  OFFICE_EVENTS, LIBRARY_BOOKS, RESTAURANT_MENU, BAR_MENU, CAFE_DRINKS, CAFE_FOOD, SPA_PACKAGES,
  LOCATION_PEOPLE, APARTMENT_ACTIONS, BEACH_SUBLOCATIONS, MALL_SUBLOCATIONS
} from '../data/locations.js';

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

export function showMap({goBattle, showCloset, showPhoto, startBattle}={}){
  state.screen = 'map';
  clearStage();
  // Use data-driven map background based on game time
  const mapDaypart = getMapDaypart(state.time);
  const mapBg = getLocationBg('cityMap', mapDaypart) || 'assets/backgrounds/bg_city_map_day.png';
  // Set background directly via the scene-bg element
  const sceneBg = document.querySelector('.scene-bg');
  if(sceneBg){
    sceneBg.style.backgroundImage = `url("${mapBg}")`;
  }
  AudioManager.playSceneMusic('city_map');
  // 9 canonical pins from data/locations.js MAP_PINS
  const mapWrap = document.createElement('div');
  mapWrap.className = 'city-map-pins';
  MAP_PINS.forEach(pin => {
    const name = tx(pin.label.en, pin.label.ja);
    const isClosed = !isLocationOpen(pin.id, state.time);
    const hoursStr = formatHours(pin.id);
    let action;
    // Wire each pin to its proper game function
    if(pin.id==='apartment') action = () => showApartmentMenu({goBattle, showCloset, showPhoto});
    else if(pin.id==='mall') action = () => showMallMenu({goBattle, showCloset, showPhoto});
    else if(pin.id==='restaurant') action = () => visitSafeArea('restaurant', () => showMap({goBattle, showCloset, showPhoto}));
    else if(pin.id==='park') action = () => visitSafeArea('park', () => showMap({goBattle, showCloset, showPhoto}));
    else if(pin.id==='beach') action = () => showBeachMenu({goBattle, showCloset, showPhoto});
    else if(pin.id==='bar') action = () => showBarMenu({goBattle, showCloset, showPhoto});
    else if(pin.id==='library') action = () => showLibraryMenu({goBattle, showCloset, showPhoto});
    else if(pin.id==='office') action = () => showOfficeMenu({goBattle, showCloset, showPhoto, startBattle});
    else if(pin.id==='villainApt') action = () => showMap({goBattle, showCloset, showPhoto});
    else action = () => showMap({goBattle, showCloset, showPhoto});
    const pinEl = document.createElement('button');
    pinEl.className = `map-pin label-${pin.labelPos || 'below'}`;
    pinEl.type = 'button';
    pinEl.style.left = pin.x + '%';
    pinEl.style.top = pin.y + '%';
    if(isClosed){
      pinEl.classList.add('pin-closed');
      pinEl.title = hoursStr ? `Closed (${hoursStr})` : 'Closed';
    }
    pinEl.innerHTML = `<span class="pin-teardrop"><svg width="24" height="32" viewBox="0 0 24 32"><path d="M12 0C5.37 0 0 5.37 0 12c0 8.2 12 20 12 20s12-11.8 12-20C24 5.37 18.63 0 12 0z" fill="${isClosed ? '#888' : '#ff1493'}" stroke="#fff" stroke-width="2.5"/><circle cx="12" cy="12" r="4.5" fill="#fff"/></svg></span><span class="pin-label">${name}</span>`;
    pinEl.onclick = action;
    mapWrap.append(pinEl);
  });
  screenLayer().append(mapWrap);
  renderHud();
}

// Helper: set location background from LOCATION_BACKGROUNDS
function setLocationBg(locationKey){
  const daypart = getMapDaypart(state.time);
  const bgPath = getLocationBg(locationKey, daypart);
  if(bgPath){
    const sceneBg = document.querySelector('.scene-bg');
    if(sceneBg){
      sceneBg.style.backgroundImage = `url("${bgPath}")`;
    }
  }
}

// Helper: show closed-location overlay
function showClosedOverlay(locationName, hoursStr, onBack){
  showMessage(
    tx('Closed', '閉まっている'),
    tx(`${locationName} is closed right now. Hours: ${hoursStr}`, `${locationName}は今閉まっている。営業時間: ${hoursStr}`),
    [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:onBack}]
  );
}

// === APARTMENT ===
// Amy's home hub — nested choices, NOT a single action
// Closet, LoveLoop, Date Fit Studio are NOT map pins — they're apartment actions
function showApartmentMenu({goBattle, showCloset, showPhoto}={}){
  state.screen = 'apartment';
  clearStage();
  setLocationBg('apartment');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Amy\'s Apartment','エイミーの部屋')}</h2>
    <p class="muted">${tx('Home base. Rest, check your phone, or get ready.','ホームベース。休む、携帯を見る、準備する。')}</p>
    <div id="aptActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('aptActions');
  // LoveLoop — dating progression entry point
  g.append(button(tx('Open LoveLoop','LoveLoopを開く'), () => { if(goBattle) goBattle(); }, 'primary'));
  // Closet — in Amy's room, not a map pin
  g.append(button(tx('Open Closet','クローゼットを開く'), showCloset));
  // Date Fit Studio
  g.append(button(tx('Date Fit Studio','デートコーデスタジオ'), showPhoto));
  // Rest — restore HP
  g.append(button(tx('Rest','休む'), () => {
    state.amyHp = state.amyMaxHp;
    showMessage(tx('Rested','休んだ'), tx('Amy took a nap. HP restored to full.','エイミーは昼寝をした。HPが全回復した。'),
      [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:() => showMap({goBattle, showCloset, showPhoto})}]);
  }));
  g.append(button(tx('Back to Map','マップへ戻る'), () => showMap({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === OFFICE ===
// One button: "Do Office Things" → random unhinged corporate BS → 500-1000 SLF → advance time
// Canon event: after 3 battles defeated, next office visit triggers the creepy coworker (Battle 4)
function showOfficeMenu({goBattle, showCloset, showPhoto, startBattle}={}){
  // Office is not available at night
  if(!isLocationOpen('office', state.time)){
    showClosedOverlay(tx('Office','オフィス'), formatHours('office'), () => showMap({goBattle, showCloset, showPhoto, startBattle}));
    return;
  }
  state.screen = 'office';
  clearStage();
  setLocationBg('office');

  // === CANON EVENT: Coworker introduction after Battle 3 ===
  if(!state.coworkerEvent) state.coworkerEvent = {};
  const ce = state.coworkerEvent;
  if(ce.unlocked && !ce.triggered){
    // This is the scripted creepy coworker encounter
    ce.triggered = true;
    autosave();
    AudioManager.playSceneMusic('cutscene');
    screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
      <h2>${tx('Office','オフィス')}</h2>
      <p class="muted">${tx('Amy walked into the office expecting another day of corporate absurdity. Instead, she found him waiting by her desk.','エイミーはまた日常の企業の不条理を期待してオフィスに入った。代わりに、彼女のデスクの隣で彼が待っていた。')}</p>
      <div class="menu-grid">
        <button class="btn primary" onclick="this.disabled=true">${tx('A coworker approaches...','同僚が近づいてくる...')}</button>
      </div>
    </section></div>`;
    // After a beat, trigger the pre-battle scene → coworker battle
    setTimeout(() => {
      if(startBattle){
        startBattle('coworker');
      } else {
        showMap({goBattle, showCloset, showPhoto, startBattle});
      }
    }, 3000);
    renderHud();
    return;
  }

  // === NORMAL: Do Office Things (random corporate BS) ===
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Office','オフィス')}</h2>
    <p class="muted">${tx('Amy\'s day job. It pays the bills and funds the wardrobe.','エイミーの日常の仕事。請求書とワードローブの資金になる。')}</p>
    <div id="officeActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('officeActions');
  g.append(button(tx('Do Office Things','仕事をする'), () => {
    // Pick a random corporate BS event each click
    const event = OFFICE_EVENTS[Math.floor(Math.random() * OFFICE_EVENTS.length)];
    const reward = event.reward;
    const eventText = tx(event.text.en, event.text.ja);
    state.funds += reward;
    renderHud();
    showMessage(tx('Office Things','仕事'),
      tx(`${eventText}\n\n+${reward} Soft Life Funds.`, `${eventText}\n\n+${reward}ソフトライフファンド。`),
      [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:() => showMap({goBattle, showCloset, showPhoto, startBattle})}]);
  }, 'primary'));
  g.append(button(tx('Back to Map','マップへ戻る'), () => showMap({goBattle, showCloset, showPhoto, startBattle})));
  renderHud();
}

// === LIBRARY ===
// Hierarchical: Read → book menu, Socialize, Return to Map
function showLibraryMenu({goBattle, showCloset, showPhoto}={}){
  if(!isLocationOpen('library', state.time)){
    showClosedOverlay(tx('Library','図書館'), formatHours('library'), () => showMap({goBattle, showCloset, showPhoto}));
    return;
  }
  state.screen = 'library';
  clearStage();
  setLocationBg('library');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Library','図書館')}</h2>
    <p class="muted">${tx('Quiet. Books. No notifications.','静か。本。通知なし。')}</p>
    <div id="libActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('libActions');
  // Read → opens book genre submenu
  g.append(button(tx('Read','読む'), () => showLibraryReadMenu({goBattle, showCloset, showPhoto}), 'primary'));
  // Socialize
  g.append(button(tx('Socialize','交流する'), () => visitSafeArea('library', () => showMap({goBattle, showCloset, showPhoto}))));
  g.append(button(tx('Return to Map','マップへ戻る'), () => showMap({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === LIBRARY READ SUBMENU ===
function showLibraryReadMenu({goBattle, showCloset, showPhoto}={}){
  clearStage();
  setLocationBg('library');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Read','読む')}</h2>
    <p class="muted">${tx('Pick a genre. Books cost time, not funds.','ジャンルを選んで。本は時間を消費し、お金はかからない。')}</p>
    <div id="libReadActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('libReadActions');
  LIBRARY_BOOKS.forEach(book => {
    const label = tx(book.label.en, book.label.ja);
    const statDesc = Object.entries(book.stats).map(([k,v]) => `${k} ${v>0?'+':''}${v}`).join(', ');
    g.append(button(label, () => {
      if(book.stats.peace) state.peace = Math.min(100, (state.peace||50) + book.stats.peace);
      if(book.stats.hope) state.hope = (state.hope||50) + book.stats.hope;
      if(book.stats.clarity) state.clarity = Math.min(100, (state.clarity||40) + book.stats.clarity);
      if(book.stats.selfRespect) state.selfRespect = Math.min(100, (state.selfRespect||45) + book.stats.selfRespect);
      if(book.stats.amyHp) state.amyHp = Math.min(state.amyMaxHp, state.amyHp + book.stats.amyHp);
      showMessage(tx('Reading','読書'), tx(`Amy read a ${label.toLowerCase()} book. (${statDesc})`, `エイミーは${label}の本を読んだ。(${statDesc})`),
        [{label:tx('Back','戻る'), className:'primary', onClick:() => showLibraryReadMenu({goBattle, showCloset, showPhoto})}]);
    }));
  });
  g.append(button(tx('Back to Library','図書館へ戻る'), () => showLibraryMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === BAR ===
// Hierarchical: Order → drink/snack menu, Socialize, Return to Map
function showBarMenu({goBattle, showCloset, showPhoto}={}){
  state.screen = 'bar';
  clearStage();
  setLocationBg('bar');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Bar','バー')}</h2>
    <p class="muted">${tx('Drinks with the girls. Or a quiet corner.','女子会で飲む。静かな隅っこも。')}</p>
    <div id="barActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('barActions');
  // Order → opens drink/snack submenu
  g.append(button(tx('Order','注文'), () => showBarOrderMenu({goBattle, showCloset, showPhoto}), 'primary'));
  // Socialize
  g.append(button(tx('Socialize','交流する'), () => visitSafeArea('bar', () => showBarMenu({goBattle, showCloset, showPhoto}))));
  g.append(button(tx('Return to Map','マップへ戻る'), () => showMap({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === BAR ORDER SUBMENU ===
function showBarOrderMenu({goBattle, showCloset, showPhoto}={}){
  clearStage();
  setLocationBg('bar');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Order','注文')}</h2>
    <p class="muted">${tx('What can I get you?','何にする？')}</p>
    <div id="barOrderActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('barOrderActions');
  BAR_MENU.forEach(item => {
    const label = tx(item.label.en, item.label.ja);
    g.append(button(`${label} (${item.price})`, () => {
      if(state.funds < item.price){
        showMessage(tx('Not Enough Funds','資金不足'), tx('Amy can\'t afford that right now.','今はそれを買う余裕がない。'),
          [{label:tx('Back','戻る'), className:'primary', onClick:() => showBarOrderMenu({goBattle, showCloset, showPhoto})}]);
        return;
      }
      state.funds -= item.price;
      renderHud();
      showMessage(tx('Ordered','注文'), tx(`Amy ordered ${label}. Soft Life Funds: ${state.funds}.`, `エイミーは${label}を注文した。ソフトライフファンド: ${state.funds}。`),
        [{label:tx('Back','戻る'), className:'primary', onClick:() => showBarOrderMenu({goBattle, showCloset, showPhoto})}]);
    }));
  });
  g.append(button(tx('Back to Bar','バーへ戻る'), () => showBarMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === BEACH ===
// Main map location with nested Beachside Cafe sublocation
function showBeachMenu({goBattle, showCloset, showPhoto}={}){
  state.screen = 'beach';
  clearStage();
  setLocationBg('beach');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Beach','海辺')}</h2>
    <p class="muted">${tx('Sun, sand, and zero red flags.','太陽、砂、地雷ゼロ。')}</p>
    <div id="beachActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('beachActions');
  // Beach activity
  g.append(button(tx('Relax on the Beach','海辺でリラックス'), () => {
    state.peace = Math.min(100, (state.peace||50) + 15);
    state.amyHp = Math.min(state.amyMaxHp, state.amyHp + 10);
    renderHud();
    showMessage(tx('Relaxing','リラックス'), tx('Amy soaked up the sun. Peace +15, HP +10.','エイミーは日差しを浴びた。ピース+15、HP+10。'),
      [{label:tx('Back','戻る'), className:'primary', onClick:() => showBeachMenu({goBattle, showCloset, showPhoto})}]);
  }, 'primary'));
  // Socialize
  g.append(button(tx('Socialize','交流する'), () => visitSafeArea('beach', () => showBeachMenu({goBattle, showCloset, showPhoto}))));
  // Beachside Cafe — nested sublocation
  const cafeOpen = isLocationOpen('beachsideCafe', state.time);
  g.append(button(tx('Visit Beachside Cafe','海辺のカフェに行く'), () => {
    if(!cafeOpen){
      showClosedOverlay(tx('Beachside Cafe','海辺のカフェ'), formatHours('beachsideCafe'), () => showBeachMenu({goBattle, showCloset, showPhoto}));
      return;
    }
    showBeachsideCafeMenu({goBattle, showCloset, showPhoto});
  }, cafeOpen ? '' : ''));
  g.append(button(tx('Return to Map','マップへ戻る'), () => showMap({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === BEACHSIDE CAFE (sublocation of Beach) ===
// Hierarchical: Order Drink → drink menu, Order Food → food menu, etc.
function showBeachsideCafeMenu({goBattle, showCloset, showPhoto}={}){
  state.screen = 'beachsideCafe';
  clearStage();
  setLocationBg('beachsideCafe');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Beachside Cafe','海辺のカフェ')}</h2>
    <p class="muted">${tx('Coffee, ocean view, good company.','コーヒー、海の景色、良い仲間。')}</p>
    <div id="cafeActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('cafeActions');
  // Order Drink → opens drink submenu
  g.append(button(tx('Order Drink','ドリンクを注文'), () => showCafeDrinkMenu({goBattle, showCloset, showPhoto}), 'primary'));
  // Order Food → opens food submenu
  g.append(button(tx('Order Food','フードを注文'), () => showCafeFoodMenu({goBattle, showCloset, showPhoto}), 'primary'));
  // Open Laptop
  g.append(button(tx('Open Laptop','ノートパソコンを開く'), () => {
    state.peace = Math.min(100, (state.peace||50) + 5);
    state.clarity = Math.min(100, (state.clarity||40) + 8);
    renderHud();
    showMessage(tx('Laptop Time','パソコン時間'), tx('Amy opened her laptop and caught up on things. Peace +5, Clarity +8.','エイミーはノートパソコンを開いて色々確認した。ピース+5、クラリティ+8。'),
      [{label:tx('Back','戻る'), className:'primary', onClick:() => showBeachsideCafeMenu({goBattle, showCloset, showPhoto})}]);
  }));
  // Relax by the Window
  g.append(button(tx('Relax by the Window','窓際でリラックス'), () => {
    state.peace = Math.min(100, (state.peace||50) + 20);
    state.amyHp = Math.min(state.amyMaxHp, state.amyHp + 15);
    renderHud();
    showMessage(tx('Relaxing','リラックス'), tx('Amy watched the waves through the window. Peace +20, HP +15.','エイミーは窓から波を眺めた。ピース+20、HP+15。'),
      [{label:tx('Back','戻る'), className:'primary', onClick:() => showBeachsideCafeMenu({goBattle, showCloset, showPhoto})}]);
  }));
  // Socialize (context-sensitive: Mia/Chloe, Sabrina, Christy)
  g.append(button(tx('Chat','おしゃべり'), () => visitSafeArea('beachsideCafe', () => showBeachsideCafeMenu({goBattle, showCloset, showPhoto}))));
  // Return to parent location (Beach), NOT directly to map
  g.append(button(tx('Back to Beach','海辺へ戻る'), () => showBeachMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === CAFE DRINK SUBMENU ===
function showCafeDrinkMenu({goBattle, showCloset, showPhoto}={}){
  clearStage();
  setLocationBg('beachsideCafe');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Order Drink','ドリンクを注文')}</h2>
    <p class="muted">${tx('What would Amy like to drink?','エイミーは何を飲みたい？')}</p>
    <div id="cafeDrinkActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('cafeDrinkActions');
  CAFE_DRINKS.forEach(item => {
    const label = tx(item.label.en, item.label.ja);
    g.append(button(`${label} (${item.price})`, () => {
      if(state.funds < item.price){
        showMessage(tx('Not Enough Funds','資金不足'), tx('Amy can\'t afford that right now.','今はそれを買う余裕がない。'),
          [{label:tx('Back','戻る'), className:'primary', onClick:() => showCafeDrinkMenu({goBattle, showCloset, showPhoto})}]);
        return;
      }
      state.funds -= item.price;
      renderHud();
      showMessage(tx('Ordered','注文'), tx(`Amy ordered ${label}. Soft Life Funds: ${state.funds}.`, `エイミーは${label}を注文した。ソフトライフファンド: ${state.funds}。`),
        [{label:tx('Back','戻る'), className:'primary', onClick:() => showCafeDrinkMenu({goBattle, showCloset, showPhoto})}]);
    }));
  });
  g.append(button(tx('Back to Cafe','カフェへ戻る'), () => showBeachsideCafeMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === CAFE FOOD SUBMENU ===
function showCafeFoodMenu({goBattle, showCloset, showPhoto}={}){
  clearStage();
  setLocationBg('beachsideCafe');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Order Food','フードを注文')}</h2>
    <p class="muted">${tx('What would Amy like to eat?','エイミーは何を食べたい？')}</p>
    <div id="cafeFoodActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('cafeFoodActions');
  CAFE_FOOD.forEach(item => {
    const label = tx(item.label.en, item.label.ja);
    g.append(button(`${label} (${item.price})`, () => {
      if(state.funds < item.price){
        showMessage(tx('Not Enough Funds','資金不足'), tx('Amy can\'t afford that right now.','今はそれを買う余裕がない。'),
          [{label:tx('Back','戻る'), className:'primary', onClick:() => showCafeFoodMenu({goBattle, showCloset, showPhoto})}]);
        return;
      }
      state.funds -= item.price;
      renderHud();
      showMessage(tx('Ordered','注文'), tx(`Amy ordered ${label}. Soft Life Funds: ${state.funds}.`, `エイミーは${label}を注文した。ソフトライフファンド: ${state.funds}。`),
        [{label:tx('Back','戻る'), className:'primary', onClick:() => showCafeFoodMenu({goBattle, showCloset, showPhoto})}]);
    }));
  });
  g.append(button(tx('Back to Cafe','カフェへ戻る'), () => showBeachsideCafeMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === MALL ===
// Hierarchical: Shop / Closet, Visit Spa, Return to Map
function showMallMenu({goBattle, showCloset, showPhoto}={}){
  if(!isLocationOpen('mall', state.time)){
    showClosedOverlay(tx('Mall','モール'), formatHours('mall'), () => showMap({goBattle, showCloset, showPhoto}));
    return;
  }
  state.screen = 'mall';
  clearStage();
  setLocationBg('mall');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Mall','モール')}</h2>
    <p class="muted">${tx('Shopping, spa, food court, and people-watching.','ショッピング、スパ、フードコート、人間観察。')}</p>
    <div id="mallActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('mallActions');
  // Shop / Closet
  g.append(button(tx('Boutique','ブティック'), showCloset, 'primary'));
  // Visit Spa — nested sublocation
  const spaOpen = isLocationOpen('spa', state.time);
  g.append(button(tx('Visit Spa','スパに行く'), () => {
    if(!spaOpen){
      showClosedOverlay(tx('Spa','スパ'), formatHours('spa'), () => showMallMenu({goBattle, showCloset, showPhoto}));
      return;
    }
    showSpaMenu({goBattle, showCloset, showPhoto});
  }));
  // Food Court
  g.append(button(tx('Food Court','フードコート'), () => visitSafeArea('restaurant', () => showMallMenu({goBattle, showCloset, showPhoto}))));
  // Return to Map
  g.append(button(tx('Return to Map','マップへ戻る'), () => showMap({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === SPA (sublocation of Mall) ===
// Hierarchical: Book Treatment → treatment menu, Back to Mall
function showSpaMenu({goBattle, showCloset, showPhoto}={}){
  if(!isLocationOpen('spa', state.time)){
    showClosedOverlay(tx('Spa','スパ'), formatHours('spa'), () => showMallMenu({goBattle, showCloset, showPhoto}));
    return;
  }
  state.screen = 'spa';
  clearStage();
  setLocationBg('spa');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Spa','スパ')}</h2>
    <p class="muted">${tx('Self-care is not selfish.','セルフケアは利己的じゃない。')}</p>
    <div id="spaActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('spaActions');
  // Book Treatment → opens treatment submenu
  g.append(button(tx('Book Treatment','トリートメントを予約'), () => showSpaTreatmentMenu({goBattle, showCloset, showPhoto}), 'primary'));
  // Back to Mall
  g.append(button(tx('Back to Mall','モールへ戻る'), () => showMallMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === SPA TREATMENT SUBMENU ===
function showSpaTreatmentMenu({goBattle, showCloset, showPhoto}={}){
  clearStage();
  setLocationBg('spa');
  screenLayer().innerHTML = `<div class="center-screen"><section class="panel">
    <h2>${tx('Book Treatment','トリートメントを予約')}</h2>
    <p class="muted">${tx('Treat yourself. You earned it.','自分を労わって。頑張ったんだから。')}</p>
    <div id="spaTreatmentActions" class="menu-grid"></div>
  </section></div>`;
  const g = document.getElementById('spaTreatmentActions');
  SPA_PACKAGES.forEach(pkg => {
    const label = tx(pkg.label.en, pkg.label.ja);
    g.append(button(`${label} (${pkg.price})`, () => {
      if(state.funds < pkg.price){
        showMessage(tx('Not Enough Funds','資金不足'), tx('Amy needs more Soft Life Funds for the spa.','スパに行くにはソフトライフファンドが足りない。'),
          [{label:tx('Back','戻る'), className:'primary', onClick:() => showSpaTreatmentMenu({goBattle, showCloset, showPhoto})}]);
        return;
      }
      state.funds -= pkg.price;
      if(pkg.effects.fullRestore){
        state.amyHp = state.amyMaxHp;
        state.peace = 100;
        state.stamina = 100;
      }
      if(pkg.effects.peace) state.peace = Math.min(100, (state.peace||50) + pkg.effects.peace);
      if(pkg.effects.delusion) state.delusion = Math.max(0, (state.delusion||0) + pkg.effects.delusion);
      if(pkg.effects.amyHp) state.amyHp = Math.min(state.amyMaxHp, state.amyHp + pkg.effects.amyHp);
      if(pkg.effects.stamina) state.stamina = Math.min(100, (state.stamina||50) + pkg.effects.stamina);
      if(pkg.effects.selfRespect) state.selfRespect = Math.min(100, (state.selfRespect||45) + pkg.effects.selfRespect);
      renderHud();
      showMessage(tx('Spa Treatment','スパトリートメント'), tx(`Amy enjoyed ${label}. Soft Life Funds: ${state.funds}.`, `エイミーは${label}を楽しんだ。ソフトライフファンド: ${state.funds}。`),
        [{label:tx('Back','戻る'), className:'primary', onClick:() => showSpaTreatmentMenu({goBattle, showCloset, showPhoto})}]);
    }));
  });
  g.append(button(tx('Back to Spa','スパへ戻る'), () => showSpaMenu({goBattle, showCloset, showPhoto})));
  renderHud();
}

// === RESTAURANT (called from map pin, uses safe area for encounters) ===
// The restaurant pin directly triggers the safe area encounter system,
// which handles food purchases + friend/NPC routing

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
