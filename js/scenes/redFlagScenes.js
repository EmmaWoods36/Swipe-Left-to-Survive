import {playScene} from '../dialogueEngine.js';
import {setBackground} from '../assets.js';

// Pre-battle dialogue scenes: character_id -> scene function
// Each scene calls onComplete() to start the actual battle
const PRE_BATTLE_SCENES = {
  love_bomber: (onComplete) => {
    setBackground('apartmentEvening');
    return playScene([
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Three dates in one week. Roses on my doorstep. A playlist called "Songs That Remind Me of You." It was... a lot.',ja:'1週間で3回のデート。玄関にバラの花束。「君を思い出す曲」というプレイリスト。それは……多すぎた。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'I just care about you SO much, Amy. You know that, right? Like, I have never felt this way about anyone.',ja:'エイミー、君のことがすごく気になるんだ。わかるよね？こんな気持ちになったこと、今まで一度もないんだ。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'Nobody will love you like I do. Nobody. You\'re mine. Forever.',ja:'僕みたいに君を愛する人はいない。いないよ。君は僕のもの。ずっと。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'...Forever?',ja:'……ずっと？'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'Forever. I already told my mom about you. I changed my phone wallpaper. I deleted all my other contacts. For you.',ja:'ずっと。もう母さんに話したんだ。壁紙も変えた。他の連絡先も全部消した。君のために。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You deleted all your contacts.',ja:'連絡先を全部消したの。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'Because you\'re the only one who matters. I just want to show you how much I care.',ja:'だって君だけが大事だから。どれだけ気にかけてるか見せたいんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You\'ve known me for nine days.',ja:'私を知ってから9日しか経ってないけど。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'Time is a construct. Love is real. And what I feel for you is the most real thing I\'ve ever—',ja:'時間はただの概念だ。愛は本物だ。君に感じるこの気持ちは、僕が今まで感じた中で一番本物の——'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Adrian. Stop.',ja:'エイドリアン。やめて。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You\'re not in love with me. You\'re in love with the rush. The chase. The performance of caring. And now that I\'m asking you to slow down, I can see it — the mask slipping.',ja:'あなたは私を愛してない。その興奮が好きなだけ。追いかけっこ。気にかけてる演技。私が「ゆっくり行こう」って言った瞬間に見えた。仮面がずり落ちた。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'You don\'t understand. This is how I show love. If you can\'t handle someone caring THIS much, then maybe you\'re the one with commitment issues.',ja:'わかってない。これは僕の愛し方なんだ。こんなに気にかけてくれる人が無理なら、コミットメントの問題があるのは君の方じゃないか。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'There it is. The guilt bomb. Right on schedule.',ja:'あった。罪悪感爆弾。予定通り。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Love is not a bombing campaign, Adrian. And I am not a target.',ja:'愛は爆撃作戦じゃない。私はターゲットでもない。'}}
    ], {onComplete, skippable:true});
  }
};

// Post-defeat dialogue scenes: character_id -> scene function
// Called after the enemy is defeated but before the victory message
const POST_DEFEAT_SCENES = {
  love_bomber: (onComplete) => {
    return playScene([
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'You don\'t get it. I was going to give you everything. I was going to be your whole world. How could you throw that away?',ja:'わかってない。僕が全部あげようとしてたんだ。君の世界のすべてになろうとしてた。なんでそれを捨てるんだ？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Because "everything" from you came with terms and conditions written in invisible ink.',ja:'あなたの「全部」には、インクの見えない条件がついてたから。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'You\'ll regret this. Nobody will ever love you the way I did. Nobody.',ja:'後悔するよ。僕みたいに愛する人は二度と現れない。いない。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Good. Because what you called love was a hostage negotiation with better lighting.',ja:'いいね。あなたが愛と呼んでたものは、照明がマシな人質交渉だったから。'}},
      {character:'love_bomber', speaker:{en:'Adrian Vale',ja:'エイドリアン・ヴェイル'}, text:{en:'...You\'ll be back. They always come back.',ja:'……戻ってくる。みんな戻ってくるから。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I won\'t. And that\'s the one thing about me you never understood.',ja:'戻らない。それが、私についてあなたが理解できなかった唯一のこと。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I am not a pattern. I am not a target. And I am not yours.',ja:'私はパターンじゃない。ターゲットじゃない。あなたのものでもない。'}}
    ], {onComplete, skippable:true});
  }
};

export function hasPreBattleScene(id){
  return !!PRE_BATTLE_SCENES[id];
}

export function playPreBattleScene(id, onComplete){
  const scene = PRE_BATTLE_SCENES[id];
  if(!scene) return onComplete();
  scene(onComplete);
}

export function hasPostDefeatScene(id){
  return !!POST_DEFEAT_SCENES[id];
}

export function playPostDefeatScene(id, onComplete){
  const scene = POST_DEFEAT_SCENES[id];
  if(!scene) return onComplete();
  scene(onComplete);
}
