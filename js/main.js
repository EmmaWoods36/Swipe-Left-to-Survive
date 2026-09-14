import {state,setLanguage,hasSaveData,loadGame,saveGame,autosave} from './state.js';
import {updateStaticText,tx} from './localization.js';
import {showTitle,showMap,renderHud,clearStage,screenLayer} from './screens.js';
import {startOpening} from './scenes/opening.js';
import {startNextBattle,configureBattleRoutes,startGreenFlagBattle} from './battle/battleEngine.js';
import {showCloset,configureCloset} from './closet/closetEngine.js';
import {showDateFitStudio,configurePhoto} from './photo/dateFitStudio.js';
import {AudioManager} from './audioManager.js';

function routes(){
  return {
    startGame: startOpening,
    continueGame: () => { loadGame(); showMap({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio}); },
    showMap: () => showMap({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio}),
    showCloset,
    showPhoto: showDateFitStudio,
    goBattle: startNextBattle,
    startGreenFlagBattle
  };
}

function showSplash(onComplete){
  state.screen = 'splash';
  clearStage();
  const splash = document.createElement('div');
  splash.className = 'splash-screen';
  splash.innerHTML = `
    <img src="assets/splash/emma_woods_studio_splash.png" alt="Emma Woods Studio" />
    <div class="splash-hint">${tx('Click to continue','クリックして続行')}</div>
  `;
  screenLayer().append(splash);
  // Hide the entire top bar and HUD for a true full-screen splash
  const topBar = document.querySelector('.top-bar');
  const hud = document.getElementById('hud');
  const stage = document.querySelector('.stage');
  if(topBar) topBar.style.display = 'none';
  if(hud) hud.style.display = 'none';
  if(stage) stage.style.top = '0';
  AudioManager.playSceneMusic('cutscene');
  let dismissed = false;
  const dismiss = () => {
    if(dismissed) return;
    dismissed = true;
    splash.classList.add('fade-out');
    setTimeout(() => {
      if(topBar) topBar.style.display = '';
      if(hud) hud.style.display = '';
      if(stage) stage.style.top = '';
      if(onComplete) onComplete();
    }, 600);
  };
  splash.addEventListener('click', dismiss);
  setTimeout(dismiss, 5000);
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
