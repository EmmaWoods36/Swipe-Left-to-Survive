import {state} from '../state.js';
import {tx} from '../localization.js';
import {clearStage,button,renderHud} from '../screens.js';
import {setBackground,imageWithFallback} from '../assets.js';
import {CLOSET_CATEGORIES,CLOSET_ITEMS} from '../../data/closetManifest.js';
import {renderPaperDoll} from './paperDoll.js';

let currentCategory = 'hair';
let routes = {};
export function configureCloset(handlers){ routes = handlers || {}; }

export function showCloset(){
  clearStage(); setBackground('closet'); renderHud();
  const layer = document.getElementById('screenLayer');
  layer.innerHTML = `
    <div class="center-screen"><section class="panel">
      <h2>${tx('Closet / Boutique','クローゼット / ブティック')}</h2>
      <p class="subtitle">${tx('Dress Amy on the paper doll first. The Polaroid comes later.','先に紙人形のエイミーを着せ替える。ポラロイドはその後。')}</p>
      <div class="closet-layout">
        <div id="paperDollStage" class="paper-doll-stage"></div>
        <div>
          <div id="closetCats" class="mode-tabs"></div>
          <div id="closetThumbs" class="thumb-grid"></div>
          <div id="closetActions" class="choice-grid"></div>
        </div>
      </div>
    </section></div>`;
  renderCategories(); renderItems(); renderPaperDoll(document.getElementById('paperDollStage'));
  const actions = document.getElementById('closetActions');
  actions.append(button(tx('Open Date Fit Studio','デートコーデスタジオへ'), routes.showPhoto || (()=>{}), 'primary'));
  actions.append(button(tx('Back to Map','マップへ戻る'), routes.showMap || (()=>{})));
}

function renderCategories(){
  const box = document.getElementById('closetCats'); box.innerHTML='';
  CLOSET_CATEGORIES.forEach(c=>{
    const b = button(state.lang==='ja'?c.ja:c.label, ()=>{currentCategory=c.id; renderCategories(); renderItems();}, currentCategory===c.id?'selected':'');
    box.append(b);
  });
}

function renderItems(){
  const grid = document.getElementById('closetThumbs'); grid.innerHTML='';
  const items = CLOSET_ITEMS.filter(i=>i.category===currentCategory);
  if(!items.length){
    grid.innerHTML = `<div class="thumb-card locked"><div class="asset-missing">${tx('Coming soon. No blob placeholder.','準備中。ブロブ代替なし。')}</div></div>`; return;
  }
  items.forEach(item=>{
    const card = document.createElement('button'); card.className='thumb-card'; card.type='button';
    card.innerHTML = `<div class="thumb-img"></div><b>${state.lang==='ja'?item.ja:item.name}</b><small>${item.price} SLF</small>`;
    card.querySelector('.thumb-img').append(imageWithFallback([item.thumb,item.overlay], item.name));
    card.onclick=()=>selectItem(item);
    grid.append(card);
  });
}
function selectItem(item){
  if(item.category === 'accessories'){
    const arr = state.outfit.accessories || [];
    if(!arr.find(x=>x.id===item.id)) arr.push(item);
    state.outfit.accessories = arr;
  }else{
    state.outfit[item.category] = item;
    if(item.category === 'dress' || item.category === 'full') { state.outfit.top=null; state.outfit.bottom=null; state.outfit.swim=null; }
    if(item.category === 'swim') { state.outfit.top=null; state.outfit.bottom=null; state.outfit.dress=null; state.outfit.full=null; }
  }
  renderPaperDoll(document.getElementById('paperDollStage'));
}
