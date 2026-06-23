import {playScene} from '../dialogueEngine.js';
import {setBackground} from '../assets.js';
import {startBattleRaw} from '../battle/battleEngine.js';

export function playBossCutscene(id){
  if(id === 'algorithm'){
    setBackground('algorithm');
    return playScene([
      {speaker:{en:'LoveLoop',ja:'LOVELOOP'}, text:{en:'Not finding what you’re looking for?',ja:'お探しの相手が見つかりませんか？'}},
      {speaker:{en:'LoveLoop',ja:'LOVELOOP'}, text:{en:'Your dissatisfaction is still engagement.',ja:'あなたの不満も、エンゲージメントの一種です。'}},
      {speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Oh. So you are the problem.',ja:'ああ。問題はそっちなんだ。'}},
      {speaker:{en:'THE ALGORITHM',ja:'アルゴリズム'}, text:{en:'Correction: I am the system.',ja:'訂正します。私はシステムです。'}}
    ], {onComplete:()=>startBattleRaw('algorithm'), skippable:true});
  }
  if(id === 'pattern'){
    setBackground('pattern');
    return playScene([
      {speaker:{en:'Narrator',ja:'ナレーター'}, text:{en:'That night, Amy went to sleep with her phone face down.',ja:'その夜、エイミーはスマホを伏せて眠った。'}},
      {speaker:{en:'Narrator',ja:'ナレーター'}, text:{en:'The room dissolved into an old feeling.',ja:'部屋は、懐かしい痛みに溶けていった。'}},
      {speaker:{en:'THE PATTERN',ja:'パターン'}, text:{en:'You know me.',ja:'あなたは私を知っている。'}},
      {speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I do. That is the problem.',ja:'知ってる。だから問題なんだ。'}}
    ], {onComplete:()=>startBattleRaw('pattern'), skippable:true});
  }
  startBattleRaw(id);
}
