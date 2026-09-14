import {state} from '../state.js';
import {imageWithFallback,Asset} from '../assets.js';

// Correct render order — sorted from bottom to top.
// Hair goes FIRST (behind the base body) so it doesn't cover Amy's face.
// The afro and other hairstyles are solid shapes that would cover the face
// if rendered on top. By putting hair behind the base, only the parts of
// the hair that extend beyond Amy's body are visible (correct paper doll behavior).
const LAYER_ORDER = [
  'hair',        // Hair goes BEHIND the body (so face is visible)
  'bottom',      // pants, skirts
  'top',         // shirts
  'full',        // full outfits (hide incompatible top/bottom)
  'dress',       // dresses (hide incompatible top/bottom)
  'swim',        // swimwear
  'outerwear',   // jackets, coats
  'shoes',       // boots, heels
  'earrings',    // earrings
  'necklace',    // necklaces
  'bracelet',    // bracelets
  'watch',       // watches
  'bag',         // bags
  'hat',         // hats
  'ribbon',      // hair ribbons
  'sunglasses',  // sunglasses
  'goddess',     // goddess overlay (topmost)
];

// Map state.outfit keys to the layer order above
const OUTFIT_KEY_MAP = {
  bottom: 'bottom',
  top: 'top',
  full: 'full',
  dress: 'dress',
  swim: 'swim',
  outerwear: 'outerwear',
  shoes: 'shoes',
  hair: 'hair',
  necklace: 'necklace',
  bracelet: 'bracelet',
  watch: 'watch',
  bag: 'bag',
  hat: 'hat',
  ribbon: 'ribbon',
  sunglasses: 'sunglasses',
  goddess: 'goddess',
};

// Earring and accessory items are stored in arrays on state.outfit
const ARRAY_KEYS = ['earrings', 'accessories'];

// Full outfit / dress compatibility: when these are equipped, hide incompatible top and bottom
function shouldHideSlot(outfit, slot) {
  if (outfit.full && (slot === 'top' || slot === 'bottom')) return true;
  if (outfit.dress && (slot === 'top' || slot === 'bottom')) return true;
  return false;
}

/**
 * Render the Amy paper doll from current outfit state.
 * Re-renders completely every call — no DOM leftovers, no ghost layers.
 * @param {HTMLElement} target - The container element for the paper doll
 */
export function renderPaperDoll(target) {
  if (!target) return;
  target.innerHTML = '';

  const stage = document.createElement('div');
  stage.className = 'paper-doll';
  target.append(stage);

  const outfit = state.outfit || {};

  // Render hair FIRST (behind everything) so it doesn't cover Amy's face.
  // The base body goes on top of the hair, so only the parts of the hair
  // that extend beyond Amy's body are visible.
  const hairItem = outfit.hair;
  if (hairItem && hairItem.overlay) {
    const hairImg = imageWithFallback(hairItem.overlay, hairItem.name || 'hair');
    hairImg.className = 'paper-doll-layer';
    hairImg.dataset.slot = 'hair';
    stage.append(hairImg);
  }

  // Layer 1: Amy's base body — ALWAYS rendered on top of hair, ALWAYS present
  const base = imageWithFallback(Asset.paperDoll?.base, 'Amy base');
  base.className = 'paper-doll-layer';
  base.onerror = () => {
    stage.innerHTML = '<div class="asset-missing">Amy paper doll base missing.<br>No blob placeholder.<br>Add assets/dressup/00_base/001_amy_paper_doll_base.png</div>';
  };
  stage.append(base);

  // Render remaining layers in the correct order (skip hair, already rendered)
  for (const slot of LAYER_ORDER) {
    if (slot === 'hair') continue; // Already rendered above
    // Skip if a full outfit or dress hides this slot
    if (shouldHideSlot(outfit, slot)) continue;

    const item = outfit[slot];
    if (item && item.overlay) {
      const img = imageWithFallback(item.overlay, item.name || slot);
      img.className = 'paper-doll-layer';
      img.dataset.slot = slot;
      stage.append(img);
    }
  }

  // Render earrings (array)
  const earrings = outfit.earrings;
  if (Array.isArray(earrings)) {
    earrings.forEach(item => {
      if (item && item.overlay) {
        const img = imageWithFallback(item.overlay, item.name || 'earrings');
        img.className = 'paper-doll-layer';
        img.dataset.slot = 'earrings';
        stage.append(img);
      }
    });
  } else if (earrings && earrings.overlay) {
    const img = imageWithFallback(earrings.overlay, earrings.name || 'earrings');
    img.className = 'paper-doll-layer';
    img.dataset.slot = 'earrings';
    stage.append(img);
  }

  // Render remaining accessories (array — bracelets, watches, bags, etc.)
  const accessories = outfit.accessories;
  if (Array.isArray(accessories)) {
    accessories.forEach(item => {
      if (item && item.overlay) {
        const img = imageWithFallback(item.overlay, item.name || 'accessory');
        img.className = 'paper-doll-layer';
        stage.append(img);
      }
    });
  }
}
