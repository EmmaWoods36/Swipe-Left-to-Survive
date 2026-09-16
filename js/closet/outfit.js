import {CLOSET_ITEMS} from '../../data/closetManifest.js';

const slots = {hair:'hair',tops:'top',bottoms:'bottom',dresses:'dress',full_outfits:'full',swimwear:'swim',outerwear:'outerwear',shoes:'shoes'};
export function outfitItems(outfit){
  return Object.values(outfit || {}).flat().filter(item => item?.id);
}
export function ownsItem(state,item){
  return !!(item.ownedByDefault || state.ownedClothes?.includes(item.id));
}
export function initializeWardrobe(state){
  state.outfit ||= {accessories:[]};
  // Preserve clothes from older saves before replacing an equipped item.
  state.ownedClothes = [...new Set([...(state.ownedClothes || []),...outfitItems(state.outfit).map(i=>i.id)])];
  if(!outfitItems(state.outfit).length){
    for(const item of CLOSET_ITEMS.filter(i=>i.ownedByDefault)) state.outfit = equipItem(state.outfit,item);
  }
  if(!state.outfit.hair){
    const hair = CLOSET_ITEMS.find(i=>i.category==='hair' && i.ownedByDefault);
    if(hair) state.outfit = equipItem(state.outfit,hair);
  }
}
export function equipItem(outfit,item){
  const next = {...outfit,accessories:[...(outfit.accessories || [])]};
  const slot = slots[item.category];
  if(!slot){
    const selected = next.accessories.some(i=>i.id===item.id);
    next.accessories = next.accessories.filter(i=>i.category!==item.category);
    if(!selected) next.accessories.push(item);
  }else{
    if(['top','bottom'].includes(slot)) next.full=next.dress=next.swim=null;
    if(['full','dress','swim'].includes(slot)) next.full=next.dress=next.swim=next.top=next.bottom=null;
    next[slot] = item;
  }
  return next;
}
export function purchaseItem(state,item){
  if(ownsItem(state,item)) return 'owned';
  if(state.funds < item.price) return 'insufficient';
  state.funds -= item.price;
  state.ownedClothes = [...(state.ownedClothes || []),item.id];
  return 'purchased';
}
