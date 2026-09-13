import {state,clamp} from '../state.js';
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
    const isOwned = item.ownedByDefault || isItemOwned(item.id);
    const canAfford = state.funds >= item.price;
    const card = document.createElement('button'); card.className='thumb-card'; card.type='button';
    if(!isOwned && !canAfford) card.classList.add('locked');
    card.innerHTML = `<div class="thumb-img"></div><b>${state.lang==='ja'?item.ja:item.name}</b><small>${item.price} SLF</small>`;
    card.querySelector('.thumb-img').append(imageWithFallback([item.thumb,item.overlay], item.name));
    card.onclick=()=>selectItem(item);
    if(!isOwned){
      card.querySelector('b').textContent += ' 🔒';
      card.onclick=()=>tryPurchase(item);
    }
    grid.append(card);
  });
}

function isItemOwned(itemId){
  // Check if item is in current outfit
  for(const cat of ['hair','full','top','bottom','dress','swim','shoes']){
    if(state.outfit[cat] && state.outfit[cat].id === itemId) return true;
  }
  if(state.outfit.accessories){
    for(const acc of state.outfit.accessories){
      if(acc.id === itemId) return true;
    }
  }
  return false;
}

function tryPurchase(item){
  if(state.funds < item.price){
    const grid = document.getElementById('closetThumbs');
    const msg = document.createElement('div');
    msg.className = 'toast';
    msg.textContent = tx('Not enough Soft Life Funds.','ソフトライフファンドが足りない。');
    msg.style.cssText = 'color:#ff6b6b;padding:8px;font-size:14px;';
    grid.prepend(msg);
    setTimeout(()=>msg.remove(), 2000);
    return;
  }
  state.funds -= item.price;
  selectItem(item);
  renderHud();
  renderItems();
}

function selectItem(item){
  if(item.category === 'accessories' || item.category === 'earrings' || item.category === 'necklaces' || item.category === 'bracelets' || item.category === 'watches' || item.category === 'bags' || item.category === 'hats' || item.category === 'hair_ribbons' || item.category === 'sunglasses' || item.category === 'goddess'){
    const arr = state.outfit.accessories || [];
    if(!arr.find(x=>x.id===item.id)) arr.push(item);
    state.outfit.accessories = arr;
  }else if(item.category === 'hair' || item.category === 'hair_ribbons'){
    state.outfit.hair = item;
  }else if(item.category === 'tops'){
    state.outfit.top = item;
  }else if(item.category === 'bottoms'){
    state.outfit.bottom = item;
  }else if(item.category === 'dresses'){
    state.outfit.dress = item;
    state.outfit.top=null; state.outfit.bottom=null; state.outfit.swim=null; state.outfit.full=null;
  }else if(item.category === 'full_outfits'){
    state.outfit.full = item;
    state.outfit.top=null; state.outfit.bottom=null; state.outfit.swim=null; state.outfit.dress=null;
  }else if(item.category === 'outerwear'){
    state.outfit.outerwear = item;
  }else if(item.category === 'swimwear'){
    state.outfit.swim = item;
    state.outfit.top=null; state.outfit.bottom=null; state.outfit.dress=null; state.outfit.full=null;
  }else if(item.category === 'shoes'){
    state.outfit.shoes = item;
  }
  renderPaperDoll(document.getElementById('paperDollStage'));
}
