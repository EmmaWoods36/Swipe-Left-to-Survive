import {state} from '../state.js';
import {imageWithFallback,Asset} from '../assets.js';

export function renderPaperDoll(target){
  target.innerHTML = '';
  const stage = document.createElement('div');
  stage.className = 'paper-doll';
  target.append(stage);
  const base = imageWithFallback(Asset.paperDoll.base, 'Amy paper doll base');
  base.onerror = () => {
    stage.innerHTML = '<div class="asset-missing">Amy paper doll base missing.<br>No blob placeholder used.<br>Add assets/dressup/00_base/001_amy_paper_doll_base.png</div>';
  };
  stage.append(base);
  // Render layers in order: hair, full, top, dress, outerwear, bottom, swim, shoes, then accessories (which include earrings, necklaces, bracelets, watches, bags, hats, ribbons, sunglasses, goddess)
  const layers = ['hair','full','top','dress','outerwear','bottom','swim','shoes'];
  layers.forEach(cat=>{
    const item = state.outfit[cat];
    if(item && item.overlay) stage.append(imageWithFallback(item.overlay, item.name));
  });
  (state.outfit.accessories||[]).forEach(item=>item && item.overlay && stage.append(imageWithFallback(item.overlay,item.name)));
}
