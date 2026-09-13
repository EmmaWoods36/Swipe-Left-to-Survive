import {playScene} from '../dialogueEngine.js';
import {setBackground} from '../assets.js';

// Pre-battle dialogue scenes: character_id -> scene function
// Each scene calls onComplete() to start the actual battle
const PRE_BATTLE_SCENES = {
  // === LOVE BOMBER (Adrian Vale) — already existed, keeping ===
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
  },

  // === TWO AM (Jay) ===
  two_am: (onComplete) => {
    setBackground('apartmentNight');
    return playScene([
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'It was 1:47 AM. My phone buzzed. One word. No punctuation. No plan.',ja:'午前1時47分。スマホが鳴った。一文字。句読点なし。予定なし。'}},
      {character:'two_am', speaker:{en:'Jay',ja:'ジェイ'}, text:{en:'wyd',ja:'今なにしてる？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Sleeping. Like a person.',ja:'寝てる。人間のように。'}},
      {character:'two_am', speaker:{en:'Jay',ja:'ジェイ'}, text:{en:'come thru',ja:'こっち来なよ'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Jay. It is almost 2 AM. You have never asked me to coffee. You have never asked me to lunch. You have never asked me to anything that happens in daylight.',ja:'ジェイ。もうすぐ午前2時よ。あなたはコーヒーに誘ったことない。ランチにも。昼間に起こることに一度も誘ったことない。'}},
      {character:'two_am', speaker:{en:'Jay',ja:'ジェイ'}, text:{en:'ur so dramatic lol',ja:'大げさだなw'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I am not a convenience store. I am not open at 2 AM.',ja:'私はコンビニじゃない。午前2時に開いてない。'}}
    ], {onComplete, skippable:true});
  },

  // === PREFERENCE (Connor) ===
  preference: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'preference', speaker:{en:'Connor',ja:'コナー'}, text:{en:'You\'re so exotic. I mean that as a compliment. I just — I love your culture.',ja:'エキゾチックだね。褒め言葉として言ってるんだけど。君の文化が大好きなんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You\'ve known me for forty minutes and you\'ve mentioned my "culture" six times.',ja:'私を知ってから40分で「文化」を6回も言ったね。'}},
      {character:'preference', speaker:{en:'Connor',ja:'コナー'}, text:{en:'It\'s just my preference! You look like Beyoncé. That\'s a compliment.',ja:'ただの好みだよ！ビヨンセに似てるって。褒め言葉だよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A preference is a coffee order, Connor. Not a type of person.',ja:'好みはコーヒーの注文よ、コナー。人のタイプじゃない。'}},
      {character:'preference', speaker:{en:'Connor',ja:'コナー'}, text:{en:'You\'re being too sensitive. It\'s not a fetish, it\'s a preference!',ja:'敏感すぎるよ。フェチじゃない、好みだって！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'If you have to say "it\'s not a fetish" that many times, it might be a fetish.',ja:'「フェチじゃない」って何回も言わなきゃいけないなら、フェチかもしれないね。'}}
    ], {onComplete, skippable:true});
  },

  // === COWORKER ===
  coworker: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'coworker', speaker:{en:'Coworker',ja:'同僚'}, text:{en:'We have such a connection at work, you know? Nobody gets me like you do.',ja:'職場でこんなに気の合う人いないよね？君みたいにわかってくれる人はいないよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'We\'re on the same Slack channel. That\'s not a connection, that\'s a notification.',ja:'同じSlackチャンネルにいるだけ。それは繋がりじゃなくて通知だよ。'}},
      {character:'coworker', speaker:{en:'Coworker',ja:'同僚'}, text:{en:'I was thinking — we should do something after hours. Just us. Off the clock.',ja:'思ったんだけど——勤務外で何かしようよ。二人きりで。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You\'ve been work-wife-ing me for three months. HR sent you an email. You read it. You ignored it.',ja:'3ヶ月も仕事妻扱いしてきて。HRからメール来たよね。読んだよね。無視したよね。'}},
      {character:'coworker', speaker:{en:'Coworker',ja:'同僚'}, text:{en:'You\'re overreacting. Can\'t two coworkers just... vibe?',ja:'大げさだよ。同僚二人がただ……バイブス出すだけじゃダメ？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The compliance poster on the wall is peeling itself off to avoid this conversation.',ja:'壁のコンプライアンスポスターがこの会話から逃げるために剥がれ落ちてる。'}}
    ], {onComplete, skippable:true});
  },

  // === HOUSE DATE (Terrence) ===
  house_date: (onComplete) => {
    setBackground('apartmentEvening');
    return playScene([
      {character:'house_date', speaker:{en:'Terrence',ja:'テレンス'}, text:{en:'Why go out when my couch is right here? I got Netflix. I got DoorDash. What more do you need?',ja:'なんで外に出るの？ソファーはここにあるよ。Netflixもある。DoorDashもある。他に何が必要？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A date. An actual date. With a sky. And a sun. And a restaurant that doesn\'t deliver.',ja:'デート。本当のデート。空と太陽があって。デリバリーしないレストランで。'}},
      {character:'house_date', speaker:{en:'Terrence',ja:'テレンス'}, text:{en:'Going out is so expensive. Come on, we can just chill. Bare minimum, maximum comfort.',ja:'外に出るの高いよ。ほら、チルしようよ。最低限の努力で最大の快適さ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Terrence. You haven\'t left this apartment in six days. The delivery guy knows your order by heart.',ja:'テレンス。6日間も部屋から出てないよね。デリバリーのお兄さんに注文覚えられてるよ。'}},
      {character:'house_date', speaker:{en:'Terrence',ja:'テレンス'}, text:{en:'That\'s efficiency, babe.',ja:'効率だよ、ベイビー。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s a red flag, babe. And the ROI on this relationship is deeply negative.',ja:'それは地雷だよ、ベイビー。この関係のROIは深深的にマイナス。'}}
    ], {onComplete, skippable:true});
  },

  // === DEMON (Dante) ===
  demon: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'demon', speaker:{en:'Dante',ja:'ダンテ'}, text:{en:'I\'m just fighting my demons right now. You wouldn\'t understand.',ja:'今は悪魔と戦ってるんだ。君にはわからないよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I wouldn\'t understand because you won\'t tell me. You just use it as a reason to be unavailable.',ja:'わからないのは教えてくれないから。ただ都合が悪い理由として使ってるだけ。'}},
      {character:'demon', speaker:{en:'Dante',ja:'ダンテ'}, text:{en:'If you can\'t handle me at my worst, you don\'t deserve me at my best.',ja:'僕の最悪な時を受け入れられないなら、最高な時に君にふさわしくないよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Dante. You\'re not "at your worst." You\'re just not trying. There\'s a difference.',ja:'ダンテ。「最悪な時」じゃない。努力してないだけ。それは違う。'}},
      {character:'demon', speaker:{en:'Dante',ja:'ダンテ'}, text:{en:'You don\'t believe in me. Nobody believes in me. I have to fight everything alone.',ja:'君は僕を信じてない。誰も信じてない。全部一人で戦わなきゃいけないんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The demons are not real, Dante. But your unpaid bills, your unanswered texts, and your refusal to grow — those are very real.',ja:'悪魔は実在しないよ、ダンテ。でも未払いの請求書、返信しないメッセージ、成長しようとしないこと——それはとても本物。'}}
    ], {onComplete, skippable:true});
  },

  // === BROKE DREAMER (Joey) ===
  broke_dreamer: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'broke_dreamer', speaker:{en:'Joey',ja:'ジョーイ'}, text:{en:'I\'m about to blow up. Like, any day now. You just gotta invest in me — emotionally.',ja:'もうすぐ大爆発するよ。マジで。もうすぐだから。感情的に投資してくれれば。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Joey. You\'ve been "about to blow up" since I met you. What exactly are you blowing up into?',ja:'ジョーイ。出会った時から「もうすぐ爆発」って言ってるよね。何に爆発するの？'}},
      {character:'broke_dreamer', speaker:{en:'Joey',ja:'ジョーイ'}, text:{en:'You don\'t support dreams! That\'s the problem. Nobody supports the vision.',ja:'夢を応援しないんだね！それが問題だ。誰もビジョンを応援しない。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I asked you what the vision was and you said "I\'ll tell you when it\'s ready." It\'s been eight months.',ja:'ビジョンは何って聞いたら「準備できたら教える」って。8ヶ月経ってるけど。'}},
      {character:'broke_dreamer', speaker:{en:'Joey',ja:'ジョーイ'}, text:{en:'Basic standards are betraying art, Amy.',ja:'基本的な基準がアートを裏切ってるんだ、エイミー。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Art doesn\'t skip rent, Joey. And neither should you.',ja:'アートは家賃を飛ばさないよ、ジョーイ。あなたもそうすべき。'}}
    ], {onComplete, skippable:true});
  },

  // === MILLIONAIRE (Marquis) ===
  millionaire: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'millionaire', speaker:{en:'Marquis',ja:'マーカス'}, text:{en:'I don\'t like to talk about money. It\'s tacky. But I\'m doing very well for myself.',ja:'お金の話は好きじゃないんだ。品がないから。でも、とてもうまくいってるよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You\'ve mentioned that three times in ten minutes. For someone who doesn\'t like to talk about money, you talk about money a lot.',ja:'10分で3回も言ったね。お金の話が好きじゃない人が、よくお金の話するね。'}},
      {character:'millionaire', speaker:{en:'Marquis',ja:'マーカス'}, text:{en:'This watch? Patek. Subtle. Quiet luxury. You wouldn\'t know.',ja:'この時計？パテック。控えめ。クワイエットラグジュアリー。君はわからないだろうけど。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Marquis. You asked me to split fries. At Applebee\'s. On a first date.',ja:'マーカス。初デートでアップルビーズでフライドポテト割り勘にしたよね。'}},
      {character:'millionaire', speaker:{en:'Marquis',ja:'マーカス'}, text:{en:'That\'s called being financially responsible.',ja:'財政的に責任があるっていうんだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s called wearing a Patek to Applebee\'s and asking me to pay for my half of the fries. The luxury is not quiet, Marquis. It\'s fake.',ja:'パテックをつけてアップルビーズに行って、ポテトの自分の分を払わせること。ラグジュアリーは控えめじゃない。偽物だよ、マーカス。'}}
    ], {onComplete, skippable:true});
  },

  // === BODY BAG (Reggie) ===
  body_bag: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'body_bag', speaker:{en:'Reggie',ja:'レジー'}, text:{en:'Don\'t be scared. It\'s just a parking lot. I know a spot.',ja:'怖がらないで。ただの駐車場だよ。いい場所知ってるんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Reggie. You said you knew a "great restaurant." We are in a parking structure. At 11 PM. Behind a dumpster.',ja:'レジー。「すごいレストラン知ってる」って言ったよね。今は午後11時に駐車場にいる。ゴミ箱の後ろに。'}},
      {character:'body_bag', speaker:{en:'Reggie',ja:'レジー'}, text:{en:'It\'s intimate. Come on. Don\'t be like that.',ja:'親密な雰囲気だろ。ほら。そういうこと言わないで。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I heard a trunk click. Reggie. I heard a trunk click and I am choosing life.',ja:'トランクの音が聞こえた。レジー。トランクの音が聞こえた。私は生きる方を選ぶ。'}},
      {character:'body_bag', speaker:{en:'Reggie',ja:'レジー'}, text:{en:'You\'re overreacting. I\'m a nice guy!',ja:'大げさだよ。いい人だよ俺！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'"She thought it was just a bad date..." Not today, Reggie.',ja:'「彼女はただの悪いデートだと思っていた……」今日は違うよ、レジー。'}}
    ], {onComplete, skippable:true});
  },

  // === DARK HUMOR (Derrick) ===
  dark_humor: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'dark_humor', speaker:{en:'Derrick',ja:'デリック'}, text:{en:'What, you can\'t take a joke? It\'s dark humor. It\'s my coping mechanism.',ja:'何だ、冗談受け付けないの？ダークユーモアだよ。コーピングメカニズムなんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Derrick. You just made a joke about my trauma. That\'s not dark humor. That\'s a weapon with plausible deniability.',ja:'デリック。私のトラウマについて冗談言ったよね。それはダークユーモアじゃない。否認可能な武器だよ。'}},
      {character:'dark_humor', speaker:{en:'Derrick',ja:'デリック'}, text:{en:'I\'m just kidding! God, you\'re so sensitive. Schrödinger\'s joke — it\'s funny until you don\'t laugh.',ja:'冗談だよ！もう、敏感すぎる。シュレーディンガーの冗談——笑わないと冗談じゃなくなる。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'If I laugh, it was a joke. If I don\'t, I\'m the problem. That\'s not humor, Derrick. That\'s a trap.',ja:'笑えば冗談。笑わなければ私が問題。それはユーモアじゃない、デリック。罠だよ。'}},
      {character:'dark_humor', speaker:{en:'Derrick',ja:'デリック'}, text:{en:'You\'re killing my vibe. I thought you were cool.',ja:'バイブス殺してるよ。クールだと思ってたのに。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Your vibe is a blade wrapped in a punchline. And I am not the punchline.',ja:'あなたのバイブスはパンチラインに包まれた刃だよ。私はパンチラインじゃない。'}}
    ], {onComplete, skippable:true});
  },

  // === OLD YOUNG (Victor) ===
  old_young: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'old_young', speaker:{en:'Victor',ja:'ヴィクター'}, text:{en:'You\'re so mature for your age. That\'s why I like you. You\'re not like other girls your age.',ja:'君は年齢の割に成熟してるね。だから好きなんだ。同年代の他の子とは違う。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Victor. You\'re forty-seven. You told me you "don\'t do age gaps" and then asked me what zodiac sign I am.',ja:'ヴィクター。47歳でしょ。「年の差はしない」って言ってから、星座聞いてきたよね。'}},
      {character:'old_young', speaker:{en:'Victor',ja:'ヴィクター'}, text:{en:'Age is just a number. I have the energy of a twenty-five-year-old.',ja:'年齢はただの数字だよ。25歳のエネルギーがあるんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You have the energy of a man who peaked in 2003 and has been side-questing ever since.',ja:'2003年にピークを迎えて、それからずっと横道にそれてる人のエネルギーだよ。'}},
      {character:'old_young', speaker:{en:'Victor',ja:'ヴィクター'}, text:{en:'I could give you everything a young man can\'t. Stability. Experience. Maturity.',ja:'若い男にはできないことを全部あげられるよ。安定、経験、成熟。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I am not a trophy for your midlife crisis, Victor. And "mature for your age" is not a compliment. It\'s a target.',ja:'私はあなたのミッドライフクライシスのトロフィーじゃないよ、ヴィクター。「年齢の割に成熟してる」は褒め言葉じゃない。ターゲットだよ。'}}
    ], {onComplete, skippable:true});
  },

  // === LUCIEN RESERVATION MIRAGE ===
  lucien_reservation_mirage: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'lucien_reservation_mirage', speaker:{en:'Lucien',ja:'ルシアン'}, text:{en:'I know a place. It\'s exclusive. I made a reservation.',ja:'いい場所を知ってるんだ。限定の場所だよ。予約したんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You said that three weeks ago. The reservation shimmered. The table did not exist.',ja:'3週間前に言ったよね。予約は光ってた。でもテーブルは存在しなかった。'}},
      {character:'lucien_reservation_mirage', speaker:{en:'Lucien',ja:'ルシアン'}, text:{en:'I\'m a busy man, Amy. These things take time. I have connections.',ja:'忙しいんだ、エイミー。こういうことは時間がかかるんだ。コネクションがあるんだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Your connections are a Google search and a lot of confidence, Lucien. The host stand doesn\'t know you.',ja:'コネクションはGoogle検索と自信だけだね、ルシアン。ホストスタンドはあなたを知らないよ。'}},
      {character:'lucien_reservation_mirage', speaker:{en:'Lucien',ja:'ルシアン'}, text:{en:'You\'re being difficult. I\'m trying to give you an experience.',ja:'難しい子だな。いい体験をさせようとしてるんだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The experience is a mirage, Lucien. You promise reservations you can\'t make, at places you can\'t afford, to impress a woman you can\'t be honest with.',ja:'その体験はミラージュだよ、ルシアン。予約できないレストランの予約を約束して、払えない場所で、正直になれない女性を感動させようとしてる。'}}
    ], {onComplete, skippable:true});
  },

  // === ROMAN VEGA ===
  roman_industry_mystery: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'roman_industry_mystery', speaker:{en:'Roman',ja:'ローマン'}, text:{en:'I can\'t really say what I do. It\'s... sensitive. Industry stuff.',ja:'何してるかは言えないんだ。機密事項で。業界の話だから。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Roman. You\'ve said "I can\'t say" seven times tonight. At some point that\'s not mystery, that\'s unemployment.',ja:'ローマン。今夜「言えない」を7回言ったよね。ある時点からミステリーじゃなくて無職だよ。'}},
      {character:'roman_industry_mystery', speaker:{en:'Roman',ja:'ローマン'}, text:{en:'I signed an NDA. You wouldn\'t understand. The people I work with are very powerful.',ja:'NDAに署名したんだ。君にはわからないよ。俺の仕事相手はとても権力があるんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You turned unemployment into classified information. That\'s actually impressive.',ja:'無職を機密情報に変えたんだね。それは実はすごい。'}},
      {character:'roman_industry_mystery', speaker:{en:'Roman',ja:'ローマン'}, text:{en:'I broke her, you know. The last one. She couldn\'t handle it.',ja:'壊したんだよ、最後の彼女を。彼女には無理だったんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Roman. You mistook discomfort for awe. She didn\'t leave because she couldn\'t handle it. She left because she could.',ja:'ローマン。不安を畏怖と勘違いしてる。彼女は無理だったから去ったんじゃない。できたから去ったんだよ。'}}
    ], {onComplete, skippable:true});
  },

  // === NICO BOUNDARY PUSHER ===
  nico_boundary_pusher: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'nico_boundary_pusher', speaker:{en:'Nico',ja:'ニコ'}, text:{en:'Relax, I\'m just playing. Why are you so tense?',ja:'リラックスしてよ、冗談だから。なんでそんなに緊張してるの？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Nico. I said no. Three times. You heard me. You did it anyway.',ja:'ニコ。3回「ダメ」って言った。聞こえてたよね。それなのにやった。'}},
      {character:'nico_boundary_pusher', speaker:{en:'Nico',ja:'ニコ'}, text:{en:'I was just testing! It\'s how I flirt. No big deal.',ja:'試してただけだよ！それが俺のフリの仕方。大したことないって。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'"No" is not a door you try to jiggle, Nico. It\'s a wall. And I\'m changing the locks.',ja:'「ダメ」はジグリしようとするドアじゃないよ、ニコ。壁だよ。鍵を変える。'}},
      {character:'nico_boundary_pusher', speaker:{en:'Nico',ja:'ニコ'}, text:{en:'You\'re overreacting. I\'m a good guy. I respect women.',ja:'大げさだよ。いい人だよ俺。女性を尊重してる。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Respect is listening the first time, Nico. Not after the fourth "just kidding."',ja:'尊重は最初に聞くことだよ、ニコ。「冗談だから」が4回目の後じゃない。'}}
    ], {onComplete, skippable:true});
  },

  // === BLAKE DISRUPTOR ===
  blake_disruptor: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'blake_disruptor', speaker:{en:'Blake',ja:'ブレイク'}, text:{en:'I\'m building something huge. It\'s going to disrupt everything. You should get in early.',ja:'すごいものを作ってるんだ。全部変えるよ。早く入るべきだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Blake. You\'ve been "disrupting" for two years. The pitch deck has 47 slides and zero revenue.',ja:'ブレイク。2年間「ディスラプト」してるよね。ピッチデッキは47スライドで売上ゼロ。'}},
      {character:'blake_disruptor', speaker:{en:'Blake',ja:'ブレイク'}, text:{en:'Revenue is a lagging indicator! We\'re pre-revenue. Pre-everything. It\'s called vision.',ja:'売上は遅行指標だよ！プレレベニューだ。プレ全部。ビジョンって言うんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The date became a webinar, Blake. You pitched me a token I can\'t spend, at a restaurant I can\'t afford, with a tip you "forgot."',ja:'デートがウェビナーになったよ、ブレイク。使えないトークンを提案されて、払えないレストランで、チップは「忘れた」って。'}},
      {character:'blake_disruptor', speaker:{en:'Blake',ja:'ブレイク'}, text:{en:'You just don\'t get the vision. When this moons, you\'ll regret not being early.',ja:'ビジョンがわかってないだけだよ。これが爆発したら、早く入らなかったこと後悔するよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I\'m not investing in buzzwords, Blake. And I\'m not your beta tester.',ja:'バズワードに投資しないよ、ブレイク。ベータテスターでもない。'}}
    ], {onComplete, skippable:true});
  },

  // === JULIAN SOFTBOI SAVIOR ===
  julian_softboi_savior: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'julian_softboi_savior', speaker:{en:'Julian',ja:'ジュリアン'}, text:{en:'I want to hold space for you. I see you. I honor your journey.',ja:'君のためにスペースを持ちたいんだ。君が見えてるよ。君の旅路を尊重する。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Julian. You just used seven therapy words to say absolutely nothing.',ja:'ジュリアン。セラピー用語7個使って、何も言ってないよ。'}},
      {character:'julian_softboi_savior', speaker:{en:'Julian',ja:'ジュリアン'}, text:{en:'I\'m just deeply in touch with my emotions. I do the work. I read the books.',ja:'自分の感情と深く繋がってるだけだよ。ワークしてるんだ。本も読んでる。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You read the books but you don\'t do the work, Julian. "Holding space" is not the same as showing up.',ja:'本は読んでるけど、ワークはしてないよね、ジュリアン。「スペースを持つ」ことと、現れることは違うよ。'}},
      {character:'julian_softboi_savior', speaker:{en:'Julian',ja:'ジュリアン'}, text:{en:'You\'re triggering me right now. This is my healing era. I need patience.',ja:'今トリガーされてるんだ。これはヒーリングの時代なんだよ。忍耐が必要なんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Your healing era needs a therapist and a timer, Julian. I am not your emotional support girlfriend.',ja:'あなたのヒーリングの時代にはセラピストとタイマーが必要だよ、ジュリアン。私はあなたの感情サポート彼女じゃない。'}}
    ], {onComplete, skippable:true});
  },

  // === NORMAL FAKE (Evan) ===
  normal_fake: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'normal_fake', speaker:{en:'Evan',ja:'エヴァン'}, text:{en:'I\'m just a normal guy. I like coffee, movies, long walks. No drama.',ja:'普通の男だよ。コーヒー、映画、散歩が好き。ドラマなしで。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Evan. You said "I\'m just brutally honest" four minutes ago. Nobody who is actually honest needs to announce it.',ja:'エヴァン。4分前に「ただ正直なだけ」って言ったよね。本当に正直な人は、それを宣言する必要がないよ。'}},
      {character:'normal_fake', speaker:{en:'Evan',ja:'エヴァン'}, text:{en:'I\'m a good guy! I open doors. I pay for dinner. I don\'t play games.',ja:'いい人だよ！ドアを開ける。ディナーを払う。ゲームはしない。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The mask is smiling, Evan. But the room got colder. You said you don\'t play games, but I\'ve been auditing your words and every sentence has a trap door.',ja:'仮面は笑ってるよ、エヴァン。でも部屋が寒くなった。ゲームしないって言ったけど、言葉を監査してて、すべての文に罠の扉がある。'}},
      {character:'normal_fake', speaker:{en:'Evan',ja:'エヴァン'}, text:{en:'You\'re reading too much into this. I\'m the most normal guy you\'ll ever meet.',ja:'考えすぎだよ。君が会う中で一番普通の男だよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Behind the pleasant café, there is a courtroom, Evan. And you\'re the judge and the victim. That\'s not normal. That\'s the advanced threat.',ja:'快適なカフェの後ろに法廷があるよ、エヴァン。そしてあなたは裁判官で被害者。それは普通じゃない。上級脅威だよ。'}}
    ], {onComplete, skippable:true});
  },

  // === IVY MERCER (Girl Red Flag) ===
  ivy_mercer: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'ivy_mercer', speaker:{en:'Ivy',ja:'アイヴィー'}, text:{en:'Consistency is such a heavy word, don\'t you think? I prefer... mystery.',ja:'一貫性って重い言葉だよね？私は……ミステリーがいいな。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Ivy. You texted me at 2 AM, ignored me for three days, then liked my story. That\'s not mystery. That\'s a breadcrumb trail to nowhere.',ja:'アイヴィー。午前2時にメッセージして、3日間無視して、ストーリーいいねしたよね。それはミステリーじゃない。どこにも行かないパンくずの跡だよ。'}},
      {character:'ivy_mercer', speaker:{en:'Ivy',ja:'アイヴィー'}, text:{en:'You\'re so impatient. Beautiful things take time. I\'m worth the wait.',ja:'せっかちだね。美しいものは時間がかかるの。待つ価値があるよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The trail went nowhere beautifully, Ivy. And I\'m tired of being the one who follows it.',ja:'その跡は綺麗にどこにも行かなかったよ、アイヴィー。ついていくのはもう疲れたの。'}}
    ], {onComplete, skippable:true});
  },

  // === SIMONE BROOKS (Girl Red Flag) ===
  simone_brooks: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'simone_brooks', speaker:{en:'Simone',ja:'シモーヌ'}, text:{en:'So, are you actually queer? Because I need to know. Prove you belong here.',ja:'で、実際にクィアなの？知る必要があるの。ここに属してるって証明して。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Simone. Attraction is not a pop quiz. I don\'t need to pass your gold-star exam.',ja:'シモーヌ。魅力はクイズじゃない。ゴールドスター試験に合格する必要ないよ。'}},
      {character:'simone_brooks', speaker:{en:'Simone',ja:'シモーヌ'}, text:{en:'I\'m just protecting our community. Not everyone belongs.',ja:'コミュニティを守ってるだけ。誰もが属してるわけじゃないの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Belonging is not stamped by someone else, Simone. And gatekeeping is just insecurity with better lighting.',ja:'所属は他の誰かがスタンプするものじゃないよ、シモーヌ。ゲートキーピングは照明がマシな不安症だよ。'}}
    ], {onComplete, skippable:true});
  },

  // === CAMILA REYES (Girl Red Flag) ===
  camila_reyes: (onComplete) => {
    setBackground('battle');
    return playScene([
      {character:'camila_reyes', speaker:{en:'Camila',ja:'カミラ'}, text:{en:'No face, no case. I don\'t do labels. We\'re just... vibing.',ja:'顔なし、ケースなし。ラベルはしないの。ただ……バイブス出してるだけ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Camila. I\'ve been on your Close Friends list for three weeks. You post me without my face. I\'m a silhouette with an emoji.',ja:'カミラ。3週間親しい友達リストにいるよ。顔なしで投稿してる。私は絵文字付きのシルエットだよ。'}},
      {character:'camila_reyes', speaker:{en:'Camila',ja:'カミラ'}, text:{en:'It\'s called a soft launch! It\'s romantic. You should be flattered.',ja:'ソフトローンチっていうの！ロマンチックでしょ。光栄に思うべきだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Close Friends swallowed the relationship status, Camila. And I am not a mystery to be revealed at your convenience.',ja:'親しい友達リストが関係ステータスを飲み込んだよ、カミラ。私はあなたの都合で明かされるミステリーじゃないの。'}}
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
  },

  two_am: (onComplete) => {
    return playScene([
      {character:'two_am', speaker:{en:'Jay',ja:'ジェイ'}, text:{en:'whatever, ur loss lol',ja:'なんでもいい、君の損だよw'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Goodnight, Jay. The 2 AM summoner has been logged. Receipts kept.',ja:'おやすみ、ジェイ。午前2時の召喚者を記録したよ。証拠は保管済み。'}}
    ], {onComplete, skippable:true});
  },

  preference: (onComplete) => {
    return playScene([
      {character:'preference', speaker:{en:'Connor',ja:'コナー'}, text:{en:'You\'re just like the others. You can\'t handle a real preference.',ja:'他の連中と同じだね。本当の好みは扱えないんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A preference is a coffee order, Connor. People are not coffee. Goodbye.',ja:'好みはコーヒーの注文だよ、コナー。人はコーヒーじゃない。さようなら。'}}
    ], {onComplete, skippable:true});
  },

  coworker: (onComplete) => {
    return playScene([
      {character:'coworker', speaker:{en:'Coworker',ja:'同僚'}, text:{en:'This is going to be awkward at work tomorrow.',ja:'明日の仕事で気まずいな。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Only for you. I CC\'d HR on the way out. Have a nice Monday.',ja:'あなただけね。出る時にHRをCCに入れたよ。良い月曜日を。'}}
    ], {onComplete, skippable:true});
  },

  house_date: (onComplete) => {
    return playScene([
      {character:'house_date', speaker:{en:'Terrence',ja:'テレンス'}, text:{en:'So... DoorDash?',ja:'で……DoorDashは？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Order for one, Terrence. The couch is all yours.',ja:'一人分を注文してね、テレンス。ソファーは全部あなたのものだよ。'}}
    ], {onComplete, skippable:true});
  },

  demon: (onComplete) => {
    return playScene([
      {character:'demon', speaker:{en:'Dante',ja:'ダンテ'}, text:{en:'I\'ll always be fighting my demons...',ja:'悪魔と戦い続けるよ……'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Then fight them with a therapist, Dante. I\'m not your unpaid crisis manager.',ja:'ならセラピストと戦ってね、ダンテ。私は無給の危機管理担当じゃないよ。'}}
    ], {onComplete, skippable:true});
  },

  broke_dreamer: (onComplete) => {
    return playScene([
      {character:'broke_dreamer', speaker:{en:'Joey',ja:'ジョーイ'}, text:{en:'You\'ll see. One day I\'ll make it. And you\'ll wish you invested.',ja:'いつかわかるよ。成功するから。投資すればよかったって後悔するよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I invest in people who show up, Joey. Not promises. Good luck with the vision.',ja:'現れる人に投資するよ、ジョーイ。約束じゃなくて。ビジョンと頑張ってね。'}}
    ], {onComplete, skippable:true});
  },

  millionaire: (onComplete) => {
    return playScene([
      {character:'millionaire', speaker:{en:'Marquis',ja:'マーカス'}, text:{en:'You don\'t know what you\'re missing. I\'m a catch.',ja:'何を逃してるかわかってないよ。俺は掘り出し物だよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You\'re a Patek at Applebee\'s asking to split fries, Marquis. I know exactly what I\'m missing.',ja:'アップルビーズでパテックをつけてポテト割り勘してる人だよ、マーカス。何を逃してるか完全にわかってるよ。'}}
    ], {onComplete, skippable:true});
  },

  body_bag: (onComplete) => {
    return playScene([
      {character:'body_bag', speaker:{en:'Reggie',ja:'レジー'}, text:{en:'You\'re making a mistake. I\'m a nice guy!',ja:'間違えてるよ。いい人だよ俺！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'She thought it was just a bad date... but not today, Reggie. Not today.',ja:'彼女はただの悪いデートだと思っていた……でも今日は違うよ、レジー。今日は違う。'}}
    ], {onComplete, skippable:true});
  },

  dark_humor: (onComplete) => {
    return playScene([
      {character:'dark_humor', speaker:{en:'Derrick',ja:'デリック'}, text:{en:'Can\'t you take a joke? It was just a joke...',ja:'冗談受け付けないの？冗談だよ……'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'It was never a joke, Derrick. And I was never the punchline.',ja:'冗談じゃなかったよ、デリック。私はパンチラインじゃなかった。'}}
    ], {onComplete, skippable:true});
  },

  old_young: (onComplete) => {
    return playScene([
      {character:'old_young', speaker:{en:'Victor',ja:'ヴィクター'}, text:{en:'You\'ll come around. They always do.',ja:'そのうち戻ってくるよ。みんなそうだから。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I\'m not "they," Victor. And your midlife crisis needs a therapist, not a trophy.',ja:'私は「みんな」じゃないよ、ヴィクター。あなたのミッドライフクライシスにはトロフィーじゃなくてセラピストが必要だよ。'}}
    ], {onComplete, skippable:true});
  },

  lucien_reservation_mirage: (onComplete) => {
    return playScene([
      {character:'lucien_reservation_mirage', speaker:{en:'Lucien',ja:'ルシアン'}, text:{en:'I\'ll get that reservation. Just you wait.',ja:'予約取るよ。待ってて。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The mirage was beautiful, Lucien. But I\'m hungry for something real.',ja:'ミラージュは綺麗だったよ、ルシアン。でも私は本物のものが食べたいの。'}}
    ], {onComplete, skippable:true});
  },

  roman_industry_mystery: (onComplete) => {
    return playScene([
      {character:'roman_industry_mystery', speaker:{en:'Roman',ja:'ローマン'}, text:{en:'You don\'t know what I\'m capable of.',ja:'俺に何ができるかわかってないよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Neither do you, Roman. That\'s the problem.',ja:'あなたもわかってないよ、ローマン。それが問題だよ。'}}
    ], {onComplete, skippable:true});
  },

  nico_boundary_pusher: (onComplete) => {
    return playScene([
      {character:'nico_boundary_pusher', speaker:{en:'Nico',ja:'ニコ'}, text:{en:'I was just playing... I didn\'t mean anything by it.',ja:'冗談だったよ……悪意はないんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I changed the locks, Nico. And "no" is not a game. It never was.',ja:'鍵を変えたよ、ニコ。「ダメ」はゲームじゃない。今までも、これからも。'}}
    ], {onComplete, skippable:true});
  },

  blake_disruptor: (onComplete) => {
    return playScene([
      {character:'blake_disruptor', speaker:{en:'Blake',ja:'ブレイク'}, text:{en:'You\'ll regret this when we moon.',ja:'爆発したら後悔するよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I\'m not investing in buzzwords, Blake. And my portfolio is my peace.',ja:'バズワードに投資しないよ、ブレイク。私のポートフォリオは平穏だよ。'}}
    ], {onComplete, skippable:true});
  },

  julian_softboi_savior: (onComplete) => {
    return playScene([
      {character:'julian_softboi_savior', speaker:{en:'Julian',ja:'ジュリアン'}, text:{en:'I need to process this. This is part of my healing journey.',ja:'これを処理する必要があるんだ。ヒーリングの旅の一部なんだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Then process it with a professional, Julian. I\'m not your emotional support system.',ja:'なら専門家と処理してね、ジュリアン。私はあなたの感情サポートシステムじゃないよ。'}}
    ], {onComplete, skippable:true});
  },

  normal_fake: (onComplete) => {
    return playScene([
      {character:'normal_fake', speaker:{en:'Evan',ja:'エヴァン'}, text:{en:'I really am a good guy. You\'ll see.',ja:'本当にいい人なんだよ。そのうちわかる。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The courtroom is closed, Evan. The mask is on the floor. And I see exactly what\'s underneath.',ja:'法廷は閉まったよ、エヴァン。仮面は床に落ちてる。下にあるものが完全に見えたよ。'}}
    ], {onComplete, skippable:true});
  },

  ivy_mercer: (onComplete) => {
    return playScene([
      {character:'ivy_mercer', speaker:{en:'Ivy',ja:'アイヴィー'}, text:{en:'The trail went nowhere beautifully...',ja:'その跡は綺麗にどこにも行かなかった……'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'And I\'m done following breadcrumbs, Ivy. My peace is not a mystery to be solved.',ja:'パンくずを追うのは終わりだよ、アイヴィー。私の平穏は解決すべきミステリーじゃないの。'}}
    ], {onComplete, skippable:true});
  },

  simone_brooks: (onComplete) => {
    return playScene([
      {character:'simone_brooks', speaker:{en:'Simone',ja:'シモーヌ'}, text:{en:'Maybe you do belong here. Maybe.',ja:'ここに属してるのかもね。たぶん。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I don\'t need your "maybe," Simone. I belong wherever I choose to stand.',ja:'「たぶん」はいらないよ、シモーヌ。私は立つことを選んだ場所に属するの。'}}
    ], {onComplete, skippable:true});
  },

  camila_reyes: (onComplete) => {
    return playScene([
      {character:'camila_reyes', speaker:{en:'Camila',ja:'カミラ'}, text:{en:'I\'ll soft launch the next one. No hard feelings.',ja:'次はソフトローンチするよ。悪気はないの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'No feelings at all, Camila. That was the problem.',ja:'気持ちはないよ、カミラ。それが問題だったの。'}}
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
