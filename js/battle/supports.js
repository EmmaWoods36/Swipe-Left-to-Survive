import {state,clamp} from '../state.js';
import {tx} from '../localization.js';
import {FRIENDS} from '../../data/characters.js';
import {playSupportSummon, popFx} from './vfx.js';

export function supportMenu(){
  return Object.values(FRIENDS).map(f => ({id:f.id, label:`${tx('Call','呼ぶ')} ${state.lang==='ja'?f.jaName:f.name}`}));
}

export function useSupport(id, battle, done){
  const friend = FRIENDS[id];
  if(!friend || !battle) return;
  if(state.groupChat < 10){
    battle.log(tx('Group Chat Meter too low.','グルチャゲージが足りない。'));
    return done&&done(false);
  }
  if(battle.enemy.id === 'pattern'){
    const whispers = {
      malik: tx('Malik’s voice cuts through the dark: “Be so for real. You know what this is.”','マリクの声が闇を切る。「現実見て。これが何か、分かってるやろ」'),
      min: tx('Min says nothing. Somehow, the silence reminds Amy she is not alone.','ミンは何も言わない。その沈黙が、エイミーは一人じゃないと思い出させる。'),
      jade: tx('Jade whispers: “Girl. Stand up.”','ジェイドがささやく。「立ちな」'),
      chloe: tx('Chloe whispers: “The evidence is already in you.”','クロエがささやく。「証拠はもう、あなたの中にある」'),
      mia: tx('Mia whispers: “You do not have to chase pain to prove you can love.”','ミアがささやく。「愛せる証明のために、痛みを追いかけなくていい」')
    };
    battle.patternClarity = Math.min(100, (battle.patternClarity||0)+14);
    battle.log(whispers[id] || tx('A friend’s voice reaches Amy.','友だちの声がエイミーに届く。'));
    popFx(tx('FRIEND WHISPER','友だちの声'));
    return done&&done(true);
  }
  if(battle.enemy.id === 'normal_fake' && battle.enemyHp > battle.enemyMaxHp - 50){
    battle.log(tx(`${friend.name}: I don’t know, Amy… he seems like a good guy.`,`${friend.jaName}: うーん、エイミー……いい人そうに見えるけど。`));
    state.groupChat = clamp(state.groupChat - 4);
    return done&&done(true);
  }
  state.groupChat = clamp(state.groupChat - 10);
  playSupportSummon(state.lang==='ja'?friend.jaName:friend.name, ()=>{
    let damage = 12;
    if(battle.enemy.id === 'algorithm') damage = 6;
    if(id === 'chloe') state.redFlagData += 1;
    if(id === 'min') state.clarity = clamp(state.clarity + 12);
    if(id === 'malik') state.selfRespect = clamp(state.selfRespect + 12);
    if(id === 'jade') state.selfRespect = clamp(state.selfRespect + 14);
    if(id === 'mia') state.peace = clamp(state.peace + 10);
    battle.enemyHp = Math.max(0, battle.enemyHp - damage);
    battle.log(tx(`${friend.name}: ${friend.line}`,`${friend.jaName}: ${friend.line}`));
    popFx(id==='min'?'SIDE-EYE':id==='chloe'?'RECEIPTS':id==='jade'?'STAND UP':'SUPPORT');
    done&&done(true);
  });
}
