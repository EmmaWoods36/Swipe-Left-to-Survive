import {state,setLanguage} from './state.js';
import {updateStaticText} from './localization.js';
import {showTitle,showMap,renderHud} from './screens.js';
import {startOpening} from './scenes/opening.js';
import {startNextBattle,configureBattleRoutes,startGreenFlagBattle} from './battle/battleEngine.js';
import {showCloset,configureCloset} from './closet/closetEngine.js';
import {showDateFitStudio,configurePhoto} from './photo/dateFitStudio.js';

function routes(){
  return {
    startGame: startOpening,
    showMap: () => showMap({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio}),
    showCloset,
    showPhoto: showDateFitStudio,
    goBattle: startNextBattle,
    startGreenFlagBattle
  };
}

function boot(){
  setLanguage(state.lang);
  updateStaticText();
  const r = routes();
  configureBattleRoutes({goBattle:startNextBattle, showCloset, showPhoto:showDateFitStudio});
  configureCloset({showMap:r.showMap, showPhoto:showDateFitStudio});
  configurePhoto({showMap:r.showMap, showCloset});
  showTitle(r);
  renderHud();
}

window.addEventListener('slts:languageChanged', () => {
  updateStaticText();
  // Re-render the current major screen so buttons and labels update immediately.
  if(state.screen === 'title') showTitle(routes());
  else if(state.screen === 'map') routes().showMap();
});

window.SLTS_V2 = {state, boot, startOpening, startNextBattle, showCloset, showDateFitStudio};
boot();
