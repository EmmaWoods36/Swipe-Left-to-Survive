import test from 'node:test';
import assert from 'node:assert/strict';
import {CLOSET_ITEMS} from '../data/closetManifest.js';
import {initializeWardrobe,equipItem,purchaseItem,ownsItem,outfitItems} from '../js/closet/outfit.js';

const newState = () => ({outfit:{accessories:[]},ownedClothes:[],funds:100000});
const paidHair = CLOSET_ITEMS.find(i=>i.category==='hair' && !i.ownedByDefault);

test('trying on an item cannot mutate the worn outfit or funds',()=>{
  const state=newState(); initializeWardrobe(state);
  const before=structuredClone(state);
  const preview=equipItem(state.outfit,paidHair);
  assert.equal(preview.hair.id,paidHair.id);
  assert.deepEqual(state,before);
  assert.equal(ownsItem(state,paidHair),false);
});

test('buying adds ownership once without equipping the item',()=>{
  const state=newState(); initializeWardrobe(state);
  const worn=structuredClone(state.outfit);
  assert.equal(purchaseItem(state,paidHair),'purchased');
  assert.equal(state.funds,100000-paidHair.price);
  assert.deepEqual(state.outfit,worn);
  assert.equal(purchaseItem(state,paidHair),'owned');
  assert.equal(state.funds,100000-paidHair.price);
  assert.deepEqual(state.ownedClothes,[paidHair.id]);
});

test('insufficient funds do not change ownership or balance',()=>{
  const state=newState(); state.funds=0;
  assert.equal(purchaseItem(state,paidHair),'insufficient');
  assert.equal(state.funds,0);
  assert.deepEqual(state.ownedClothes,[]);
});

test('old equipped items remain owned and missing hair does not reset clothes',()=>{
  const state=newState();
  const dress=CLOSET_ITEMS.find(i=>i.category==='dresses');
  state.outfit=equipItem(state.outfit,dress);
  initializeWardrobe(state);
  assert.equal(state.outfit.dress.id,dress.id);
  assert.ok(state.outfit.hair);
  assert.ok(state.ownedClothes.includes(dress.id));
  initializeWardrobe(state);
  assert.equal(state.outfit.dress.id,dress.id);
});

test('full outfits replace separates and accessories can be removed',()=>{
  let outfit={accessories:[]};
  const find=category=>CLOSET_ITEMS.find(i=>i.category===category);
  outfit=equipItem(outfit,find('tops'));
  outfit=equipItem(outfit,find('bottoms'));
  outfit=equipItem(outfit,find('full_outfits'));
  assert.equal(outfit.top,null); assert.equal(outfit.bottom,null);
  const earrings=find('earrings');
  outfit=equipItem(outfit,earrings);
  assert.ok(outfitItems(outfit).some(i=>i.id===earrings.id));
  outfit=equipItem(outfit,earrings);
  assert.ok(!outfitItems(outfit).some(i=>i.id===earrings.id));
});
