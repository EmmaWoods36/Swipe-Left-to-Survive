import {state,setLanguage,hasSaveData,loadGame,saveGame,autosave,startPassiveClock,getClockPeriod,isDayZeroSleepLocked} from './state.js';
import {updateStaticText,tx} from './localization.js';
import {showTitle,showMap,configureScreens,renderHud,clearStage,screenLayer,showApartmentMenu,showMallMenu} from './screens.js';
import {startOpening} from './scenes/opening.js';
import {startNextBattle,configureBattleRoutes,startGreenFlagBattle,startBattle} from './battle/battleEngine.js';
import {showCloset,showBoutique,showFittingRoom,configureCloset} from './closet/closetEngine.js';
import {showDateFitStudio,configurePhoto} from './photo/dateFitStudio.js';
import {AudioManager} from './audioManager.js';

function guardStoryWorld(action){
  return (...args) => {
    if(isDayZeroSleepLocked()) return startOpening();
    return action(...args);
  };
}

function routes(){
  const worldMap = () => showMap({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio, startBattle, showBoutique});
  return {
    startGame: startOpening,
    continueGame: () => {
      loadGame();
      if(isDayZeroSleepLocked()) return startOpening();
      return worldMap();
    },
    showMap: guardStoryWorld(worldMap),
    showCloset: guardStoryWorld(showCloset),
    showBoutique: guardStoryWorld(showBoutique),
    showPhoto: guardStoryWorld(showDateFitStudio),
    goBattle: startNextBattle,
    startGreenFlagBattle,
    startBattle
  };
}

function showSplash(onComplete){
  state.screen = 'splash';
  // Full-screen fixed overlay — matches Calamity War / Long Goodbye splash
  const splash = document.createElement('div');
  splash.id = 'emma-woods-splash';
  splash.innerHTML = '<img src="assets/splash/emma_woods_studio_splash.jpeg" alt="Emma Woods Studio" />';
  document.body.prepend(splash);
  AudioManager.playSceneMusic('title');
  let dismissed = false;
  const dismiss = () => {
    if(dismissed) return;
    dismissed = true;
    splash.classList.add('hidden');
    setTimeout(() => {
      splash.remove();
      clearStage();
      if(onComplete) onComplete();
    }, 700);
  };
  setTimeout(dismiss, 3000);
}

function boot(){
  setLanguage(state.lang);
  updateStaticText();
  AudioManager.init();
  const _resumeAudio = () => {
    AudioManager.resume();
    document.removeEventListener('click', _resumeAudio);
    document.removeEventListener('keydown', _resumeAudio);
  };
  document.addEventListener('click', _resumeAudio);
  document.addEventListener('keydown', _resumeAudio);
  const r = routes();
  configureScreens(r);
  configureBattleRoutes({goBattle:startNextBattle, showCloset:r.showCloset, showPhoto:r.showPhoto});
  configureCloset({showMap:r.showMap, showPhoto:r.showPhoto, showApartment:()=>showApartmentMenu({goBattle:startNextBattle, showCloset:r.showCloset, showPhoto:r.showPhoto}), showMall:()=>showMallMenu({goBattle:startNextBattle, showCloset:r.showCloset, showPhoto:r.showPhoto, showBoutique:r.showBoutique})});
  configurePhoto({showMap:r.showMap, showCloset:r.showCloset});
  if(hasSaveData()) loadGame();
  startPassiveClock();
  // Refresh HUD when clock ticks passively
  window.addEventListener('slts:clockTick', () => {
    if(state.screen !== 'title' && state.screen !== 'splash') renderHud();
  });
  // When day/night period changes, refresh current screen for backgrounds/availability
  window.addEventListener('slts:periodChanged', () => {
    if(state.screen === 'map') routes().showMap();
  });
  showSplash(() => { showTitle(r); renderHud(); });
  setInterval(()=>{ if(state.screen !== 'title' && state.screen !== 'splash') autosave(); }, 30000);
}

window.addEventListener('slts:languageChanged', () => {
  updateStaticText();
  // Re-render the current major screen so buttons and labels update immediately.
  if(state.dialogueActive) return;
  if(state.screen === 'closet') routes().showCloset();
  else if(state.screen === 'boutique') routes().showBoutique();
  else if(state.screen === 'fittingRoom') showFittingRoom();
  else if(state.screen === 'title') showTitle(routes());
  else if(state.screen === 'map') routes().showMap();
  else if(state.screen === 'apartment') showApartmentMenu({goBattle:startNextBattle, showCloset:routes().showCloset, showPhoto:routes().showPhoto});
  else if(state.screen === 'mall') showMallMenu({goBattle:startNextBattle, showCloset:routes().showCloset, showPhoto:routes().showPhoto, showBoutique:routes().showBoutique});
});

window.SLTS_V2 = {state, boot, startOpening, startNextBattle, showCloset, showDateFitStudio};
boot();
