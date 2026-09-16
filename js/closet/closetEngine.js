import {state,advanceGameMinutes,TIME_COSTS,saveGame} from '../state.js';
import {tx} from '../localization.js';
import {clearStage,button,renderHud,screenLayer} from '../screens.js';
import {setBackground,imageWithFallback} from '../assets.js';
import {CLOSET_CATEGORIES,CLOSET_ITEMS} from '../../data/closetManifest.js';
import {renderPaperDoll} from './paperDoll.js';
import {initializeWardrobe,ownsItem,equipItem,purchaseItem,outfitItems} from './outfit.js';
import {AudioManager} from '../audioManager.js';

let category = 'hair', page = 0, routes = {}, preview = null;
const PAGE_SIZE = 6;
export function configureCloset(handlers){ routes = handlers || {}; }
export function showCloset(){ openWardrobe('closet'); }
export function showBoutique(){ preview = null; openWardrobe('boutique'); }
export function showFittingRoom(item){
  initializeWardrobe(state);
  preview ||= structuredClone(state.outfit);
  if(item) preview = equipItem(preview,item);
  openWardrobe('fittingRoom');
}

function openWardrobe(mode){
  clearStage(); state.screen = mode;
  initializeWardrobe(state);
  setBackground(mode); AudioManager.playSceneMusic('mall'); renderHud();
  const shop = mode === 'boutique', fitting = mode === 'fittingRoom';
  const title = shop ? 'Heart & Hem' : fitting ? tx('Heart & Hem · Fitting Room','Heart & Hem · 試着室') : tx("Amy’s Closet",'エイミーのクローゼット');
  screenLayer().innerHTML = `<div class="wardrobe-screen ${shop?'shop-screen':''}">
    <section class="panel wardrobe-panel ${shop?'shop-panel':''}">
      <header class="wardrobe-heading"><h2>${title}</h2><p>${shop ? tx('Sabrina: Amy! Take a look around. The fitting room is ready whenever you are.','サブリナ：エイミー！ゆっくり見てね。試着室も空いてるよ。') : fitting ? tx('Try a new look. Your outfit stays the same until you choose to wear it.','新しいコーデを試そう。「着る」を選ぶまで今の服はそのまま。') : tx('Your clothes, your style.','自分の服で、自分らしく。')}</p></header>
      <div class="wardrobe-layout ${shop?'store-layout':''}">
        ${shop?'':'<div id="paperDollStage" class="paper-doll-stage"></div>'}
        <div class="wardrobe-catalog"><div id="wardrobeCats" class="mode-tabs wardrobe-tabs"></div>
          <div id="wardrobeItems" class="wardrobe-grid"></div><div id="wardrobePager" class="pager closet-pager"></div></div>
      </div>
      <p id="wardrobeStatus" class="wardrobe-status" role="status" aria-live="polite"></p>
      <footer id="wardrobeActions" class="wardrobe-actions"></footer>
    </section></div>`;
  renderCategories(); renderItems(); renderDoll(); renderActions();
}
function renderDoll(){ renderPaperDoll(document.getElementById('paperDollStage'),state.screen==='fittingRoom'?preview:state.outfit); }
function status(message){ document.getElementById('wardrobeStatus').textContent=message; }
function renderCategories(){
  const box=document.getElementById('wardrobeCats'); box.replaceChildren();
  for(const c of CLOSET_CATEGORIES){
    const b=button(state.lang==='ja'?c.ja:c.label,()=>{category=c.id;page=0;renderCategories();renderItems();},category===c.id?'selected':'');
    b.setAttribute('aria-pressed',String(category===c.id)); box.append(b);
  }
}
function renderItems(){
  const grid=document.getElementById('wardrobeItems'), pager=document.getElementById('wardrobePager');
  grid.replaceChildren(); pager.replaceChildren();
  const mode=state.screen;
  const items=CLOSET_ITEMS.filter(i=>i.category===category && (mode==='closet'?ownsItem(state,i):i.shopVisible!==false));
  const pages=Math.max(1,Math.ceil(items.length/PAGE_SIZE)); page=Math.min(page,pages-1);
  if(!items.length){const p=document.createElement('p');p.textContent=tx('Nothing here yet. Visit Heart & Hem at the mall.','まだ何もないよ。モールのHeart & Hemに行こう。');grid.append(p);}
  const equipped=new Set(outfitItems(mode==='fittingRoom'?preview:state.outfit).map(i=>i.id));
  for(const item of items.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE)){
    const owned=ownsItem(state,item), card=document.createElement('article');card.className='wardrobe-card';
    card.dataset.item=item.id;
    const img=imageWithFallback([item.thumb,item.overlay],state.lang==='ja'?item.ja:item.name);card.append(img);
    const title=document.createElement('b');title.textContent=state.lang==='ja'?item.ja:item.name;card.append(title);
    const cost=document.createElement('small');cost.textContent=owned?tx('Owned','所有済み'):`${item.price.toLocaleString()} SLF`;card.append(cost);
    if(mode==='closet'){
      const removable=state.outfit.accessories?.some(i=>i.id===item.id);
      const wear=button(removable?tx('Remove','外す'):equipped.has(item.id)?tx('Wearing','着用中'):tx('Wear','着る'),()=>{state.outfit=equipItem(state.outfit,item);saveGame();renderDoll();renderItems();});
      wear.setAttribute('aria-pressed',String(equipped.has(item.id)));card.append(wear);
    }else{
      card.append(button(mode==='fittingRoom'?tx('Try on','試着'):tx('Fitting room','試着室'),()=>{if(mode==='boutique')showFittingRoom(item);else{preview=equipItem(preview,item);renderDoll();renderItems();renderActions();}}));
      if(!owned){const buy=button(tx('Buy','買う'),()=>buyItem(item),'primary');buy.disabled=state.funds<item.price;card.append(buy);}
    }
    grid.append(card);
  }
  if(pages>1){
    const prev=button('‹',()=>{page--;renderItems();});prev.disabled=page===0;prev.setAttribute('aria-label',tx('Previous page','前のページ'));
    const next=button('›',()=>{page++;renderItems();});next.disabled=page===pages-1;next.setAttribute('aria-label',tx('Next page','次のページ'));
    const label=document.createElement('span');label.textContent=`${page+1} / ${pages}`;pager.append(prev,label,next);
  }
}
function buyItem(item){
  const result=purchaseItem(state,item);
  if(result==='purchased'){
    advanceGameMinutes(TIME_COSTS.shopping);saveGame();renderHud();renderItems();renderActions();
    status(tx('Sabrina: Lovely choice! It’s in your wardrobe.','サブリナ：素敵なチョイス！クローゼットに入れておいたよ。'));
  }else if(result==='insufficient')status(tx('Not enough SLF yet.','SLFが足りないよ。'));
}
function renderActions(){
  const actions=document.getElementById('wardrobeActions');actions.replaceChildren();
  if(state.screen==='boutique'){
    actions.append(button(tx('Enter fitting room','試着室へ'),()=>showFittingRoom(),'primary'),button(tx('Back to Mall','モールへ戻る'),routes.showMall || (()=>{})));
  }else if(state.screen==='fittingRoom'){
    const unowned=outfitItems(preview).filter(i=>!ownsItem(state,i));
    const wear=button(tx('Wear this look','このコーデを着る'),()=>{state.outfit=structuredClone(preview);saveGame();status(tx('Your new look is on.','新しいコーデに着替えたよ。'));},'primary');wear.disabled=unowned.length>0;
    if(unowned.length)wear.title=tx('Buy the pieces in this look before wearing it out.','着て帰る前に、このコーデのアイテムを購入してね。');
    actions.append(wear,button(tx('Reset try-on','試着をリセット'),()=>{preview=structuredClone(state.outfit);renderDoll();renderItems();renderActions();status('');}),button(tx('Back to Boutique','ブティックへ戻る'),showBoutique));
  }else{
    actions.append(button(tx('Date Fit Studio','デートコーデスタジオ'),routes.showPhoto || (()=>{})),button(tx('Back to Apartment','部屋へ戻る'),routes.showApartment || (()=>{})));
  }
}
