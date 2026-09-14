import {state,clamp,advanceGameMinutes} from '../state.js';
import {tx} from '../localization.js';
import {clearStage,button,renderHud,screenLayer} from '../screens.js';
import {setBackground,imageWithFallback} from '../assets.js';
import {CLOSET_CATEGORIES,CLOSET_ITEMS} from '../../data/closetManifest.js';
import {renderPaperDoll} from './paperDoll.js';
import {AudioManager} from '../audioManager.js';

let currentCategory = 'hair';
let currentPage = 0;
let routes = {};
export function configureCloset(handlers){ routes = handlers || {}; }

const ITEMS_PER_PAGE = 8;

// === AMY'S CLOSET (Apartment) ===
// Wardrobe only — shows items Amy ALREADY OWNS. No purchasing.
// Back button returns to Apartment.
export function showCloset(){
  clearStage(); setBackground('closet'); AudioManager.playSceneMusic('mall'); renderHud();
  // Equip Amy's default/canon outfit on first visit if nothing is equipped
  if(!state.outfit.hair){
    const defaults = CLOSET_ITEMS.filter(i => i.ownedByDefault);
    for(const item of defaults){
      if(item.category === 'hair') state.outfit.hair = item;
      else if(item.category === 'tops') state.outfit.top = item;
      else if(item.category === 'bottoms') state.outfit.bottom = item;
      else if(item.category === 'shoes') state.outfit.shoes = item;
      else if(item.category === 'full_outfits') state.outfit.full = item;
    }
  }
  const layer = screenLayer();
  layer.innerHTML = `
    <div class="center-screen"><section class="panel">
      <h2>${tx("Amy's Closet",'エイミーのクローゼット')}</h2>
      <p class="subtitle">${tx('Dress Amy on the paper doll. Only items you own appear here.','紙人形のエイミーを着せ替える。持っている服のみ表示。')}</p>
      <div class="closet-layout">
        <div id="paperDollStage" class="paper-doll-stage"></div>
        <div>
          <div id="closetCats" class="mode-tabs"></div>
          <div id="closetThumbs" class="thumb-grid"></div>
          <div id="closetPager" class="pager"></div>
          <div id="closetActions" class="choice-grid"></div>
        </div>
      </div>
    </section></div>`;
  renderCategories(); renderItems(); renderPaperDoll(document.getElementById('paperDollStage'));
  const actions = document.getElementById('closetActions');
  actions.append(button(tx('Open Date Fit Studio','デートコーデスタジオへ'), routes.showPhoto || (()=>{}), 'primary'));
  // Back to Apartment (NOT to map)
  actions.append(button(tx('Back to Apartment','部屋へ戻る'), routes.showApartment || (()=>{})));
}

// === BOUTIQUE (Mall sublocation) ===
// Store — shows ALL items with prices. Sabrina is the sales associate NPC.
// Purchasing deducts funds and marks item as owned. Amy stays in Boutique.
// Back button returns to Mall.
let boutiquePage = 0;
export function showBoutique(){
  clearStage(); setBackground('closet'); AudioManager.playSceneMusic('mall'); renderHud();
  const layer = screenLayer();
  // Sabrina greeting dialogue
  const sabrinaGreetings = [
    tx("Welcome to the Boutique! I'm Sabrina. Let's find something that screams 'you', shall we?", 'ブティックへようこそ！サブリナよ。あなたらしく輝く服を見つけましょ。'),
    tx("Amy! Back already? You have excellent timing — we just got new stock in.", 'エイミー！もう戻ってきたの？タイミングばっちりね。新入荷したばかりなの。'),
    tx("Oh honey, you look like you need a wardrobe refresh. I've got ideas. Follow me.", 'ハニー、ワードローブの刷新が必要ね。アイデアがあるの。ついてきて。'),
    tx("Welcome back! I set aside some pieces I thought you'd love. Want to see?", 'お帰りなさい！あなたに似合いそうな服を取っておいたの。見てみる？')
  ];
  const greeting = sabrinaGreetings[Math.floor(Math.random() * sabrinaGreetings.length)];
  layer.innerHTML = `
    <div class="center-screen"><section class="panel">
      <h2>${tx('Boutique','ブティック')}</h2>
      <div class="npc-greeting">
        <img src="assets/sprites/scenes/npcs/sabrina/sabrina_scene_01.png" alt="Sabrina" class="npc-portrait" />
        <p class="npc-dialogue"><b>Sabrina:</b> ${greeting}</p>
      </div>
      <p class="subtitle">${tx('Browse merchandise. Try things on. Buy what you love.','商品を見る。試着する。好きなものを買う。')}</p>
      <div class="closet-layout">
        <div id="paperDollStage" class="paper-doll-stage"></div>
        <div>
          <div id="boutiqueCats" class="mode-tabs"></div>
          <div id="boutiqueThumbs" class="thumb-grid"></div>
          <div id="boutiquePager" class="pager"></div>
          <div id="boutiqueActions" class="choice-grid"></div>
        </div>
      </div>
    </section></div>`;
  renderBoutiqueCategories(); renderBoutiqueItems(); renderPaperDoll(document.getElementById('paperDollStage'));
  const actions = document.getElementById('boutiqueActions');
  actions.append(button(tx('Back to Mall','モールへ戻る'), routes.showMall || (()=>{})));
}

function renderBoutiqueCategories(){
  const box = document.getElementById('boutiqueCats'); if(!box) return; box.innerHTML='';
  CLOSET_CATEGORIES.forEach(c=>{
    const b = button(state.lang==='ja'?c.ja:c.label, ()=>{currentCategory=c.id; boutiquePage=0; renderBoutiqueCategories(); renderBoutiqueItems();}, currentCategory===c.id?'selected':'');
    box.append(b);
  });
}

function renderBoutiqueItems(){
  const grid = document.getElementById('boutiqueThumbs'); if(!grid) return; grid.innerHTML='';
  const pager = document.getElementById('boutiquePager'); if(pager) pager.innerHTML='';
  const items = CLOSET_ITEMS.filter(i=>i.category===currentCategory);
  if(!items.length){
    grid.innerHTML = `<div class="thumb-card locked"><div class="asset-missing">${tx('Coming soon. No blob placeholder.','準備中。ブロブ代替なし。')}</div></div>`;
    return;
  }
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  if(boutiquePage >= totalPages) boutiquePage = totalPages - 1;
  if(boutiquePage < 0) boutiquePage = 0;
  const start = boutiquePage * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);
  pageItems.forEach(item=>{
    const isOwned = item.ownedByDefault || isItemOwned(item.id);
    const canAfford = state.funds >= item.price;
    const card = document.createElement('button'); card.className='thumb-card'; card.type='button';
    if(!isOwned && !canAfford) card.classList.add('locked');
    let label = state.lang==='ja'?item.ja:item.name;
    let priceText = isOwned ? tx('Owned','所有済み') : `${item.price} SLF`;
    card.innerHTML = `<div class="thumb-img"></div><b>${label}</b><small>${priceText}</small>`;
    card.querySelector('.thumb-img').append(imageWithFallback([item.thumb,item.overlay], item.name));
    if(isOwned){
      // Already owned — can equip/try on
      card.onclick=()=>selectItem(item);
    } else {
      // Not owned — purchase
      card.querySelector('b').textContent += ' \uD83D\uDD12';
      card.onclick=()=>tryPurchaseBoutique(item);
    }
    grid.append(card);
  });
  // Render pager
  if(totalPages > 1 && pager){
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn pager-btn'; prevBtn.type = 'button';
    prevBtn.textContent = '\u2039';
    prevBtn.disabled = boutiquePage === 0;
    prevBtn.onclick = ()=>{ boutiquePage--; renderBoutiqueItems(); };
    pager.append(prevBtn);
    const pageLabel = document.createElement('span');
    pageLabel.className = 'pager-label';
    pageLabel.textContent = `${boutiquePage + 1} / ${totalPages}`;
    pager.append(pageLabel);
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn pager-btn'; nextBtn.type = 'button';
    nextBtn.textContent = '\u203A';
    nextBtn.disabled = boutiquePage >= totalPages - 1;
    nextBtn.onclick = ()=>{ boutiquePage++; renderBoutiqueItems(); };
    pager.append(nextBtn);
  }
}

function tryPurchaseBoutique(item){
  if(state.funds < item.price){
    // Sabrina's polite "can't afford" reaction
    const grid = document.getElementById('boutiqueThumbs');
    const msg = document.createElement('div');
    msg.className = 'toast';
    msg.textContent = tx("Sabrina: Oh, that one's a bit out of budget right now. But don't worry — it'll be here when you're ready.", 'サブリナ：あら、今は予算外ね。でも大丈夫、準備できたらまたあるから。');
    msg.style.cssText = 'color:#ff6b6b;padding:8px;font-size:14px;';
    grid.prepend(msg);
    setTimeout(()=>msg.remove(), 3000);
    return;
  }
  state.funds -= item.price;
  if(!state.ownedClothes) state.ownedClothes = [];
  if(!state.ownedClothes.includes(item.id)) state.ownedClothes.push(item.id);
  // Shopping = 2 hours
  advanceGameMinutes(120);
  selectItem(item);
  renderHud();
  renderBoutiqueItems();
  // Sabrina's excited reaction when Amy buys something cute
  const reactions = [
    tx("Sabrina: Oh my god, YES. That is SO you. Amazing choice!", 'サブリナ：ちょっと、イエス！それ、めっちゃエイミーっぽい！最高のチョイス！'),
    tx("Sabrina: You have incredible taste. That's going to look stunning on you.", 'サブリナ：センスいいね。それ、すごく似合うよ。'),
    tx("Sabrina: Yes yes yes! I was hoping you'd pick that one. It's perfect.", 'サブリナ：イエスイエスイエス！それ選んでくれると思ってたの。完璧だよ。')
  ];
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];
  const grid = document.getElementById('boutiqueThumbs');
  const msg = document.createElement('div');
  msg.className = 'toast';
  msg.textContent = reaction;
  msg.style.cssText = 'color:#7ee083;padding:8px;font-size:14px;';
  grid.prepend(msg);
  setTimeout(()=>msg.remove(), 3000);
}

function renderCategories(){
  const box = document.getElementById('closetCats'); box.innerHTML='';
  CLOSET_CATEGORIES.forEach(c=>{
    const b = button(state.lang==='ja'?c.ja:c.label, ()=>{currentCategory=c.id; currentPage=0; renderCategories(); renderItems();}, currentCategory===c.id?'selected':'');
    box.append(b);
  });
}

function renderItems(){
  const grid = document.getElementById('closetThumbs'); grid.innerHTML='';
  const pager = document.getElementById('closetPager'); if(pager) pager.innerHTML='';
  // CLOSET: Only show items Amy already owns — no purchasing in the closet
  const items = CLOSET_ITEMS.filter(i=>i.category===currentCategory && (i.ownedByDefault || isItemOwned(i.id)));
  if(!items.length){
    grid.innerHTML = `<div class="thumb-card locked"><div class="asset-missing">${tx('Nothing here yet. Visit the Boutique in the Mall to buy clothes.','\u307e\u3060\u4f55\u3082\u306a\u3044\u3002\u30e2\u30fc\u30eb\u306e\u30d6\u30c1\u30c3\u30af\u3067\u670d\u3092\u8cb7\u304a\u3046\u3002')}</div></div>`;
    return;
  }
  // Pagination
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  if(currentPage >= totalPages) currentPage = totalPages - 1;
  if(currentPage < 0) currentPage = 0;
  const start = currentPage * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);
  pageItems.forEach(item=>{
    const card = document.createElement('button'); card.className='thumb-card'; card.type='button';
    card.innerHTML = `<div class="thumb-img"></div><b>${state.lang==='ja'?item.ja:item.name}</b><small>${tx('Owned','\u6240\u6709\u6e08\u307f')}</small>`;
    card.querySelector('.thumb-img').append(imageWithFallback([item.thumb,item.overlay], item.name));
    card.onclick=()=>selectItem(item);
    grid.append(card);
  });
  // Render pager controls
  if(totalPages > 1 && pager){
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn pager-btn'; prevBtn.type = 'button';
    prevBtn.textContent = '\u2039';
    prevBtn.disabled = currentPage === 0;
    prevBtn.onclick = ()=>{ currentPage--; renderItems(); };
    pager.append(prevBtn);
    const pageLabel = document.createElement('span');
    pageLabel.className = 'pager-label';
    pageLabel.textContent = `${currentPage + 1} / ${totalPages}`;
    pager.append(pageLabel);
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn pager-btn'; nextBtn.type = 'button';
    nextBtn.textContent = '\u203a';
    nextBtn.disabled = currentPage >= totalPages - 1;
    nextBtn.onclick = ()=>{ currentPage++; renderItems(); };
    pager.append(nextBtn);
  }
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
  // Check if item was purchased (persisted in ownedClothes)
  if(state.ownedClothes && state.ownedClothes.includes(itemId)) return true;
  return false;
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
