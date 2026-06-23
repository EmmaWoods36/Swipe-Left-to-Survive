import {state,clamp} from '../state.js';
import {tx} from '../localization.js';
import {clearStage,setActions,renderHud,showMap,showMessage} from '../screens.js';
import {setBackground,imageWithFallback,Asset} from '../assets.js';
import {RED_FLAGS,STORY_ORDER,GIRL_RED_FLAGS} from '../../data/redFlags.js';
import {GREEN_FLAGS} from '../../data/greenFlags.js';
import {syncAmyHp,enemyBarCount,hpForBars,renderHealthBar} from './healthBars.js';
import {popFx,playVsIntro,playSpecialCutin,screenShake} from './vfx.js';
import {supportMenu,useSupport} from './supports.js';
import {playBossCutscene} from '../scenes/bossScenes.js';

let onMapHandlers = {};
export function configureBattleRoutes(handlers){ onMapHandlers = handlers || {}; }

export function nextRedFlagId(){
  const order = getStoryOrder();
  return order.find(id => !state.defeated.has(id)) || 'normal_fake';
}

function getStoryOrder(){
  const order = STORY_ORDER.slice();
  if(state.preference === 'guys_and_girls'){
    order.splice(Math.max(3, order.indexOf('coworker')+1), 0, ...GIRL_RED_FLAGS);
  }
  return [...new Set(order)];
}

export function startNextBattle(){ startBattle(nextRedFlagId()); }

export function startBattle(id){
  if(id === 'algorithm' || id === 'pattern') return playBossCutscene(id);
  startBattleRaw(id);
}

export function startBattleRaw(id){
  const enemy = RED_FLAGS[id];
  if(!enemy) return;
  syncAmyHp();
  const enemyBars = enemyBarCount(enemy);
  const enemyMaxHp = hpForBars(enemyBars);
  const battle = {
    type:'redFlag', enemy, enemyBars, enemyMaxHp, enemyHp:enemyMaxHp, turn:'amy', patternClarity:0,
    log: message => setBattleLog(message)
  };
  state.battle = battle;
  playVsIntro({
    playerName:'Amy', enemyName:state.lang==='ja'?enemy.jaName:enemy.name,
    enemySub:state.lang==='ja'?enemy.jaClassName:enemy.className,
    playerImg:Asset.portraits.amy,
    enemyImg:enemy.sprite
  }, ()=>renderBattle());
}

export function startGreenFlagBattle(id){
  const gf = GREEN_FLAGS[id]; if(!gf) return;
  clearStage(); setBackground(gf.bg || 'beach');
  const bars = gf.bars || 3;
  state.battle = {type:'greenFlag', enemy:gf, enemyBars:bars, enemyMaxHp:hpForBars(bars), enemyHp:hpForBars(bars), turn:'amy', log:setBattleLog};
  renderBattle({green:true});
  setBattleLog(tx(`${gf.name} appears. Amy’s usual moves suddenly feel extremely unserious.`,`${gf.jaName}が現れた。エイミーのいつもの技が急にすごく場違いに感じる。`));
}

function renderBattle({green=false}={}){
  const b = state.battle; if(!b) return;
  clearStage(); setBackground(b.enemy.bg || 'battle');
  const name = state.lang==='ja'?(b.enemy.jaName||b.enemy.name):b.enemy.name;
  document.getElementById('screenLayer').innerHTML = `
    <div class="battle-layout">
      <div class="battle-bars"><div id="amyHpCard" class="hp-card"></div><div id="enemyHpCard" class="hp-card"></div></div>
      <div class="fighter-row">
        <div id="amyFighter" class="fighter"></div>
        <div id="enemyFighter" class="fighter"></div>
      </div>
      <div class="battle-actions">
        <div id="battleLog" class="battle-log"></div>
        <div id="battleButtons" class="battle-buttons"></div>
      </div>
    </div>`;
  document.getElementById('amyFighter').append(imageWithFallback(Asset.sprites.amy.idle, 'Amy'));
  document.getElementById('enemyFighter').append(imageWithFallback(b.enemy.sprite, name));
  setBattleLog(green ? tx('Green flag encounter. This is not a trauma boss rush.','グリーンフラッグ遭遇。これはトラウマボスラッシュではない。') : tx(`${name} appeared.`,`${name}が現れた。`));
  updateBattleUi();
  green ? setGreenActions() : setAmyActions();
  renderHud();
}

function setBattleLog(msg){ const log=document.getElementById('battleLog'); if(log) log.textContent = msg; }
function updateBattleUi(){
  const b = state.battle; if(!b) return;
  renderHealthBar(document.getElementById('amyHpCard'), {name:'Amy', hp:state.amyHp, maxHp:state.amyMaxHp, bars:state.amyBars});
  renderHealthBar(document.getElementById('enemyHpCard'), {name:state.lang==='ja'?(b.enemy.jaName||b.enemy.name):b.enemy.name, hp:b.enemyHp, maxHp:b.enemyMaxHp, bars:b.enemyBars});
  renderHud();
}

function setAmyActions(){
  const actions = [
    {label:tx('Boundary Slash','境界線スラッシュ'), onClick:()=>amyAttack({name:'Boundary Slash',damage:18,type:'normal'})},
    {label:tx('Phone Punch','スマホパンチ'), onClick:()=>amyAttack({name:'Phone Punch',damage:13+Math.floor(state.clarity/12),type:'normal'})},
    {label:tx('Kick of Discernment','見極めキック'), onClick:()=>amyAttack({name:'Kick of Discernment',damage:16+Math.floor(state.selfRespect/18),type:'normal'})},
    {label:tx('Check Receipts','証拠確認'), onClick:()=>amyAttack({name:'Check Receipts',damage:14+state.redFlagData*3,type:'normal'})},
    {label:tx('Call Friend','友だちを呼ぶ'), onClick:setSupportActions},
    {label:tx('Girl, Stand Up!','立ち上がれ！'), className:'primary', onClick:()=>amyAttack({name:'Girl, Stand Up!',damage:28+Math.floor(state.selfRespect/8),type:'special'})},
    {label:tx('Block / Leave','ブロックして離れる'), className:'danger wide', onClick:escapeBattle}
  ];
  setActions(actions);
}

function setSupportActions(){
  const actions = supportMenu().map(x=>({label:x.label,onClick:()=>useSupport(x.id,state.battle, afterAmyAction)}));
  actions.push({label:tx('Back','戻る'), onClick:setAmyActions, className:'wide'});
  setActions(actions);
}

function amyAttack(move){
  const b = state.battle; if(!b) return;
  const perform = ()=>{
    let damage = move.damage;
    if(b.enemy.id === 'pattern' && !state.unlocked.patternTransform){
      const floor = Math.ceil(b.enemyMaxHp * .8);
      damage = Math.min(damage, Math.max(0, b.enemyHp - floor));
      b.patternClarity = Math.min(100, (b.patternClarity||0)+18);
      if(b.enemyHp <= floor || damage <= 0){
        setBattleLog(tx('Amy’s attack landed… and The Pattern remembered how to survive it.','エイミーの攻撃は当たった……でも、パターンは生き残り方を覚えていた。'));
      }
    }
    if(move.name === 'Girl, Stand Up!' && b.enemy.id === 'pattern' && !state.unlocked.patternTransform){
      setBattleLog(tx('The words echo, but Amy has not transformed yet.','言葉は響いた。でもエイミーはまだ変身していない。'));
      return afterAmyAction();
    }
    b.enemyHp = Math.max(0, b.enemyHp - Math.max(0, damage));
    state.selfRespect = clamp(state.selfRespect+2); state.clarity = clamp(state.clarity+1);
    popFx(move.name); screenShake(); updateBattleUi();
    if(b.enemyHp <= 0) return winBattle();
    if(b.enemy.id === 'pattern' && b.patternClarity >= 100 && !state.unlocked.patternTransform){
      return unlockPatternTransform();
    }
    afterAmyAction();
  };
  if(move.type === 'special') playSpecialCutin(move.name,'player',perform); else perform();
}

function unlockPatternTransform(){
  state.unlocked.patternTransform = true;
  state.amyHp = state.amyMaxHp;
  setBattleLog(tx('Amy recognizes the feeling. This is not fate. This is The Pattern. Goddess Mode awakens.','エイミーはその感覚に気づく。これは運命じゃない。これはパターン。女神モードが目覚める。'));
  popFx(tx('GODDESS MODE','女神モード'));
  setActions([{label:tx('Transform and Break the Pattern','変身してパターンを壊す'),className:'primary wide',onClick:()=>{
    const b=state.battle; b.enemyHp=0; winBattle();
  }}]);
}

function afterAmyAction(){
  const b=state.battle; if(!b || b.enemyHp<=0) return;
  setActions([{label:tx('Enemy Turn','敵のターン'), className:'danger wide', onClick:enemyTurn}]);
}

function enemyTurn(){
  const b=state.battle; if(!b) return;
  const atk = b.enemy.moves[Math.floor(Math.random()*b.enemy.moves.length)];
  const run = ()=>{
    let dmg = atk.damage;
    if(b.enemy.id === 'algorithm') dmg += 3;
    if(b.enemy.id === 'pattern') dmg += state.unlocked.patternTransform ? -4 : 7;
    state.amyHp = Math.max(0, state.amyHp - Math.max(1,dmg));
    state.delusion = clamp(state.delusion + (atk.delusion||0));
    state.peace = clamp(state.peace - Math.floor(dmg/2));
    popFx(state.lang==='ja'?(atk.jaName||atk.name):atk.name); screenShake();
    setBattleLog(atk.text || `${b.enemy.name} attacked.`);
    updateBattleUi();
    if(state.amyHp<=0 || state.delusion>=100) return gameOver();
    setActions([{label:tx('Amy’s Turn','エイミーのターン'), className:'primary wide', onClick:setAmyActions}]);
  };
  if(atk.type==='special') playSpecialCutin(state.lang==='ja'?(atk.jaName||atk.name):atk.name,'enemy',run); else run();
}

function winBattle(){
  const b=state.battle; if(!b) return;
  const id = b.enemy.id;
  if(b.type === 'redFlag') state.defeated.add(id);
  if(id === 'normal_fake') state.unlocked.algorithm = true;
  if(id === 'algorithm') state.unlocked.pattern = true;
  if(id === 'pattern') state.unlocked.postPattern = true;
  syncAmyHp({healOnWin:true});
  popFx(tx('VICTORY','勝利'));
  updateBattleUi();
  const name = state.lang==='ja'?(b.enemy.jaName||b.enemy.name):b.enemy.name;
  state.battle = null;
  showMessage(tx('Victory','勝利'), tx(`${name} was defeated. Amy gained clarity, receipts, and self-respect.`,`${name}を倒した。エイミーはクラリティ、証拠、自尊心を手に入れた。`), [
    {label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:()=>showMap(onMapHandlers)},
    ...(id==='normal_fake'?[{label:tx('Give Up on LoveLoop','LoveLoopをやめる'), className:'danger', onClick:()=>startBattle('algorithm')}]:[]),
    ...(id==='algorithm'?[{label:tx('Go to Sleep — Major Cutscene','眠る — 重要なカットシーン'), className:'danger', onClick:()=>startBattle('pattern')}]:[])
  ]);
}

function gameOver(){
  state.battle = null;
  showMessage(tx('Match Made in Hell','地獄のマッチ'), tx('Amy needs to regroup. This is not the end; this is a reload with better boundaries.','エイミーは立て直す必要がある。終わりではない。もっと強い境界線でリロードするだけ。'), [
    {label:tx('Back to Map','マップへ戻る'), onClick:()=>showMap(onMapHandlers), className:'primary'}
  ]);
}

function escapeBattle(){
  showMessage(tx('Blocked and Left','ブロックして離脱'), tx('Amy chose peace over unnecessary labor. Valid.','エイミーは不要な労働より平和を選んだ。正しい。'), [
    {label:tx('Back to Map','マップへ戻る'), onClick:()=>showMap(onMapHandlers), className:'primary'}
  ]);
}

function setGreenActions(){
  const b=state.battle;
  setActions([
    {label:tx('Try Boundary Slash','境界線スラッシュを試す'), onClick:()=>greenAttack(4)},
    {label:tx('Try Check Receipts','証拠確認を試す'), onClick:()=>greenAttack(3)},
    {label:tx('Accept Date Invitation','デートの誘いを受ける'), className:'green', onClick:()=>greenEnd(true)},
    {label:tx('Reject Kindly','やさしく断る'), onClick:()=>greenEnd(false)}
  ]);
  updateBattleUi();
  function greenAttack(dmg){
    b.enemyHp = Math.max(1, b.enemyHp - dmg);
    state.peace = clamp(state.peace+8);
    setBattleLog(tx('Amy attacks. The green flag energy absorbs almost everything. She is knocked back by basic kindness.','エイミーが攻撃する。グリーンフラッグの力がほとんど吸収する。普通のやさしさで押し返される。'));
    popFx(tx('NO REAL DAMAGE','ほぼ無傷'));
    updateBattleUi();
  }
  function greenEnd(accepted){
    state.battle=null;
    showMessage(accepted?tx('Date Accepted','デート承諾'):tx('Date Rejected Kindly','やさしく断った'), accepted?tx('Amy accepts because she wants to, not because she has to.','エイミーは、そうしたいから受ける。義務だからではない。'):tx('Amy says no and nothing explodes. Growth.','エイミーは断る。何も爆発しない。成長。'), [{label:tx('Back to Map','マップへ戻る'),onClick:()=>showMap(onMapHandlers),className:'primary'}]);
  }
}
