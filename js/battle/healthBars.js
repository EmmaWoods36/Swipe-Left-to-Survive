import {state,countDefeatedRedFlags} from '../state.js';

export const HP_PER_BAR = 50;

export function amyBarCount(){
  const wins = countDefeatedRedFlags();
  return Math.min(5, 1 + Math.min(wins, 6) * 0.5);
}

export function syncAmyHp({healOnWin=false}={}){
  const oldMax = state.amyMaxHp || HP_PER_BAR;
  const bars = amyBarCount();
  const nextMax = Math.round(bars * HP_PER_BAR);
  state.amyBars = bars;
  if(healOnWin){
    state.amyMaxHp = nextMax;
    state.amyHp = Math.min(nextMax, (state.amyHp || oldMax) + 22);
  }else{
    const ratio = Math.max(.72, Math.min(1, (state.amyHp || oldMax) / oldMax));
    state.amyMaxHp = nextMax;
    state.amyHp = Math.round(nextMax * ratio);
  }
}

export function algorithmBars(){
  if(state.amyBars >= 4) return 4.5;
  if(state.amyBars >= 3.5) return 4;
  return 3.5;
}

export function patternBars(){
  return state.amyBars >= 4 ? 5 : 4;
}

export function enemyBarCount(enemy){
  if(!enemy) return 1;
  if(enemy.id === 'algorithm') return algorithmBars();
  if(enemy.id === 'pattern') return patternBars();
  return enemy.bars || 2;
}

export function hpForBars(bars){ return Math.round(bars * HP_PER_BAR); }

export function renderHealthBar(target, {name, hp, maxHp, bars}){
  const whole = Math.ceil(bars);
  const html = [];
  for(let i=1;i<=whole;i++){
    const start = (i-1)*HP_PER_BAR;
    const end = i*HP_PER_BAR;
    const fill = Math.max(0, Math.min(HP_PER_BAR, hp - start));
    const width = Math.max(0, Math.min(100, fill/HP_PER_BAR*100));
    html.push(`<div class="hp-seg"><div class="hp-fill bar${i}" style="width:${width}%"></div></div>`);
  }
  target.innerHTML = `
    <div class="hp-label"><span>${name}</span><span>${hp}/${maxHp} • ${bars} bars</span></div>
    <div class="segmented">${html.join('')}</div>`;
}
