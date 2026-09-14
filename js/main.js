import {state,setLanguage,hasSaveData,loadGame,saveGame,autosave,startPassiveClock,getClockPeriod} from './state.js';
import {updateStaticText,tx} from './localization.js';
import {showTitle,showMap,renderHud,clearStage,screenLayer} from './screens.js';
import {startOpening} from './scenes/opening.js';
import {startNextBattle,configureBattleRoutes,startGreenFlagBattle,startBattle} from './battle/battleEngine.js';
import {showCloset,configureCloset} from './closet/closetEngine.js';
import {showDateFitStudio,configurePhoto} from './photo/dateFitStudio.js';
import {AudioManager} from './audioManager.js';

function routes(){
  return {
    startGame: startOpening,
    continueGame: () => { loadGame(); showMap({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio, startBattle}); },
    showMap: () => showMap({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio, startBattle}),
    showCloset,
    showPhoto: showDateFitStudio,
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
  configureBattleRoutes({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio});
  configureCloset({showMap:r.showMap, showPhoto:showDateFitStudio});
  configurePhoto({showMap:r.showMap, showCloset});
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
  if(state.screen === 'title') showTitle(routes());
  else if(state.screen === 'map') routes().showMap();
});

window.SLTS_V2 = {state, boot, startOpening, startNextBattle, showCloset, showDateFitStudio};
boot();
