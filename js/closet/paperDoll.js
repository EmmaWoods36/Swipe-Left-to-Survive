import {state} from '../state.js';
import {imageWithFallback,Asset} from '../assets.js';
import {GARMENT_BOUNDS} from '../../data/paperDollLayout.js';
import {outfitItems} from './outfit.js';

// Registration is in body coordinates, independent of each source image's canvas.
// Headroom lets tall hairstyles sit above the scalp without clipping.
const WIDTH=1024, HEIGHT=1700, HEADROOM=160;
const BOXES={
  hair:[325,-100,370,370], tops:[350,310,325,320], bottoms:[330,610,380,770],
  dresses:[305,320,415,900], full_outfits:[260,300,500,1040], swimwear:[365,370,290,380],
  outerwear:[300,300,430,550], shoes:[342,1330,393,160],
  earrings:[412,200,190,75], necklaces:[435,287,145,120], bracelets:[250,685,48,70],
  watches:[722,690,48,65], bags:[690,650,230,280], hats:[365,-30,285,170],
  hair_ribbons:[355,10,310,85], sunglasses:[438,151,141,54], goddess:[390,-30,235,130]
};
export function garmentPlacement(item){
  const source=GARMENT_BOUNDS[item.id];
  if(!source) return {left:0,top:HEADROOM/HEIGHT*100,width:100,height:1536/HEIGHT*100};
  let box=BOXES[item.category] || [390,300,250,250];
  if(item.category==='dresses' && /mini|jersey|racerback/i.test(item.name)) box=[330,340,365,540];
  if(item.category==='bottoms' && /skirt|short/i.test(item.name)) box=[330,610,380,330];
  if(item.category==='goddess'){
    if(/necklace|choker/i.test(item.name)) box=BOXES.necklaces;
    else if(/sandals/i.test(item.name)) box=BOXES.shoes;
    else if(/gown/i.test(item.name)) box=BOXES.dresses;
    else if(/forearms|jewelry/i.test(item.name)) box=BOXES.bracelets;
  }
  const [x,y,w,h]=box,[l,t,r,b]=source.bounds,[iw,ih]=source.size;
  const sx=w/(r-l), sy=h/(b-t);
  return {left:(x-l*sx)/WIDTH*100,top:(y+HEADROOM-t*sy)/HEIGHT*100,width:iw*sx/WIDTH*100,height:ih*sy/HEIGHT*100};
}
export function renderPaperDoll(target,outfit=state.outfit){
  if(!target) return;
  target.replaceChildren();
  const stage=document.createElement('div');stage.className='paper-doll';stage.style.aspectRatio=`${WIDTH} / ${HEIGHT}`;target.append(stage);
  const base=imageWithFallback(Asset.paperDoll.base,'Amy');base.className='paper-doll-layer';
  Object.assign(base.style,{left:'0%',top:`${HEADROOM/HEIGHT*100}%`,width:'100%',height:`${1536/HEIGHT*100}%`});stage.append(base);
  const items=outfitItems(outfit).filter(i=>!((outfit.full||outfit.dress||outfit.swim)&&['tops','bottoms'].includes(i.category)));
  items.sort((a,b)=>(a.renderLayer||0)-(b.renderLayer||0));
  for(const item of items){
    if(!item.overlay) continue;
    const img=imageWithFallback(item.overlay,item.name);img.className='paper-doll-layer';img.dataset.item=item.id;img.dataset.slot=item.category;
    const placement=garmentPlacement(item);for(const [key,value] of Object.entries(placement))img.style[key]=`${value}%`;
    // Hair is on top of the scalp; its transparent face opening reveals Amy's face.
    stage.append(img);
  }
}
