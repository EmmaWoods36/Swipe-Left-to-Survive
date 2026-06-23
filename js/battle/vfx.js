import {imageWithFallback} from '../assets.js';
import {tx} from '../localization.js';

const fx = () => document.getElementById('fxLayer');

export function popFx(text){
  const el = document.createElement('div');
  el.className = 'fx-pop';
  el.textContent = text;
  fx().append(el);
  setTimeout(()=>el.remove(), 950);
}

export function screenShake(){
  const stage = document.getElementById('stage');
  stage.animate([
    {transform:'translate(0,0)'},{transform:'translate(-7px,3px)'},{transform:'translate(7px,-3px)'},{transform:'translate(0,0)'}
  ], {duration:280, iterations:1});
}

export function playVsIntro({playerName='Amy', enemyName='Enemy', enemySub='', playerImg, enemyImg}, done){
  const layer = fx();
  layer.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'vs-screen';
  wrap.innerHTML = `
    <div class="vs-card player"><div id="vsPlayerImg"></div><div><small>${tx('Player','プレイヤー')}</small><h2>${playerName}</h2></div><div class="vs-badge">VS</div></div>
    <div class="vs-card enemy"><div id="vsEnemyImg"></div><div><small>${tx('Opponent','対戦相手')}</small><h2>${enemyName}</h2><p>${enemySub}</p></div><div class="vs-badge">VS</div></div>
    <div class="vs-center">VS</div>`;
  layer.append(wrap);
  document.getElementById('vsPlayerImg').append(imageWithFallback(playerImg, playerName));
  document.getElementById('vsEnemyImg').append(imageWithFallback(enemyImg, enemyName));
  setTimeout(()=>{wrap.remove(); done&&done();}, 1150);
}

export function playSupportSummon(name, done){
  const wrap = document.createElement('div');
  wrap.className = 'support-aura';
  wrap.innerHTML = `<div class="support-banner">${name}<br><small>${tx('Support Summon','サポート召喚')}</small></div>`;
  fx().append(wrap);
  setTimeout(()=>{wrap.remove(); done&&done();}, 1000);
}

export function playSpecialCutin(label, side='player', done){
  popFx(label);
  screenShake();
  setTimeout(()=>done&&done(), 450);
}

export function playCameraFlash(){
  const div = document.createElement('div');
  div.className = 'flash';
  fx().append(div);
  setTimeout(()=>div.remove(), 850);
}
