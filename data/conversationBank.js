// Friend Conversation Bank
// Random conversations that play when Amy visits safe areas (non-battle locations)
// Each conversation is a set of dialogue lines using character: field for portrait lookup
// Conversations are tagged by friend and can be used in any safe area

export const FRIEND_CONVERSATIONS = {
  // === MALIK ===
  malik: [
    [
      {character:'malik', speaker:{en:'Malik',ja:'マリク'}, text:{en:'Yo, Amy! I was just thinking about you. You been okay? You look like you\'ve been fighting the entire male population.',ja:'よ、エイミー！ちょうど君のこと考えてたんだ。大丈夫か？男全員と戦ってるみたいな顔してるよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Not all of them. Just the ones on LoveLoop.',ja:'全部じゃないよ。LoveLoopにいるやつだけ。'}},
      {character:'malik', speaker:{en:'Malik',ja:'マリク'}, text:{en:'Girl, you need a break. Come on, I\'m buying. What do you want?',ja:'もう休みなよ。ほら、俺のおごりだ。何がいい？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Malik, you\'re the only man who hasn\'t tried to love-bomb me this week.',ja:'マリク、今週私をラブボムしようとしなかった唯一の男だよ。'}},
      {character:'malik', speaker:{en:'Malik',ja:'マリク'}, text:{en:'That\'s because I actually respect you. Wild concept, right?',ja:'それは俺が実際に君を尊重してるからだよ。狂った概念だよね？'}}
    ],
    [
      {character:'malik', speaker:{en:'Malik',ja:'マリク'}, text:{en:'Hey, I saw your last date on the LoveLoop recap. That was ROUGH.',ja:'や、LoveLoopのまとめで前回のデート見たよ。ひどかったな。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You watch the recaps?',ja:'まとめ見てるの？'}},
      {character:'malik', speaker:{en:'Malik',ja:'マリク'}, text:{en:'For research! And entertainment. Mostly entertainment.',ja:'研究のためだよ！あと娯楽。ほぼ娯楽。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'At least someone\'s enjoying my suffering.',ja:'少なくとも誰かは私の苦しみを楽しんでるね。'}},
      {character:'malik', speaker:{en:'Malik',ja:'マリク'}, text:{en:'I\'m enjoying your GROWTH. There\'s a difference. Now eat something, you\'ve been fighting red flags on an empty stomach.',ja:'君の成長を楽しんでるんだよ。違うよ。さあ、何か食べて。空腹で地雷と戦ってるだろ。'}}
    ]
  ],

  // === MIN ===
  min: [
    [
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'Oh, Amy. You\'re here. I made tea. Sit.',ja:'あ、エイミー。来てたの。お茶入れとくね。座って。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Min, you always know when I need tea and silence.',ja:'ミン、私がお茶と静寂を必要としてる時がいつもわかるね。'}},
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'I can tell by your shoulders. They\'re up by your ears again.',ja:'肩でわかるよ。また耳のところまで上がってる。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I went on another date. It was... an experience.',ja:'またデート行ったの。それは……体験だった。'}},
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'A good experience or a "I need to process this for three weeks" experience?',ja:'いい体験？それとも「3週間処理が必要」な体験？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The second one. Always the second one.',ja:'2番目。いつも2番目。'}},
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'Then drink your tea. We\'ll sit. And when you\'re ready, you\'ll tell me everything.',ja:'じゃあお茶飲んで。座ろう。準備できたら全部話して。'}}
    ],
    [
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'I brought you something.',ja:'これ、持ってきたの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A book?',ja:'本？'}},
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'It\'s about boundaries. I highlighted the good parts. Which is most of it.',ja:'境界線についての本。いいところはマークしたよ。ほとんど全部だけど。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Min, you\'re the friend everyone deserves and nobody appreciates enough.',ja:'ミン、あなたはみんなが持つべき友達で、誰も十分に感謝してないよ。'}},
      {character:'min', speaker:{en:'Min',ja:'ミン'}, text:{en:'I don\'t need appreciation. I need you to stop dating men who think "no" is a negotiation.',ja:'感謝はいらない。君が「ダメ」を交渉だと思う男とデートするのをやめてくれたら。'}}
    ]
  ],

  // === JADE ===
  jade: [
    [
      {character:'jade', speaker:{en:'Jade',ja:'ジェード'}, text:{en:'Okay, spill. I saw your last LoveLoop match and I already have notes.',ja:'さあ、話して。前回のLoveLoopマッチ見たけど、もうメモあるから。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You have notes?',ja:'メモあるの？'}},
      {character:'jade', speaker:{en:'Jade',ja:'ジェード'}, text:{en:'Amy, babe, I ALWAYS have notes. The man said "I don\'t usually go for girls like you." That\'s not a compliment. That\'s a hate crime.',ja:'エイミー、ベイビー、いつもあるの。その男「普段君みたいな子はタイプじゃないんだ」って言ったでしょ。それは褒め言葉じゃない。ヘイトクライムだよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I... didn\'t realize you were tracking my matches that closely.',ja:'そんなに私のマッチ追跡してたの……知らなかった。'}},
      {character:'jade', speaker:{en:'Jade',ja:'ジェード'}, text:{en:'I track everything, babe. It\'s called love. Now come on, we\'re getting drinks and I\'m roasting every single one of your matches.',ja:'全部追跡してるよ、ベイビー。それは愛って言うの。さあ、飲みに行くよ。君のマッチ全員をローストするから。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Jade, you\'re terrifying and I love you.',ja:'ジェード、怖いよ、でも大好き。'}}
    ],
    [
      {character:'jade', speaker:{en:'Jade',ja:'ジェード'}, text:{en:'Listen. I have a theory.',ja:'聞いて。理論があるの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You always have a theory.',ja:'いつも理論あるよね。'}},
      {character:'jade', speaker:{en:'Jade',ja:'ジェード'}, text:{en:'Because I\'m always right. My theory is: LoveLoop is designed to show you the worst men first, so that when a mediocre one shows up, you\'ll settle.',ja:'いつも正しいから。私の理論は：LoveLoopは最悪の男を最初に見せるように設計されてるの。平凡なのが現れた時に妥協するように。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s... actually terrifying and plausible.',ja:'それは……実際怖くてありそう。'}},
      {character:'jade', speaker:{en:'Jade',ja:'ジェード'}, text:{en:'I know. Now eat your fries and let\'s strategize. You\'re not settling for mediocre. You\'re not settling for ANYTHING.',ja:'でしょ。さあ、ポテト食べて戦略練ろう。平凡には妥協しない。何にも妥協しないの。'}}
    ]
  ],

  // === CHLOE ===
  chloe: [
    [
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'OMG AMY! I haven\'t seen you in FOREVER! How are you? Are you eating? Are you sleeping? Did you block that guy?',ja:'ねえエイミー！久しぶり！元気？食べてる？寝てる？あの男ブロックした？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Chloe, it\'s been two days.',ja:'クロエ、2日しか経ってないよ。'}},
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'Two days is FOREVER in Amy time! I was worried! I made you cookies!',ja:'エイミータイムでは2日は永遠だよ！心配だったの！クッキー作ったの！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You made me cookies because you were worried about my dating life?',ja:'私の恋愛生活心配してクッキー作ったの？'}},
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'I made you cookies because I love you AND because your dating life is a disaster. Both things can be true!',ja:'愛してるからと、恋愛生活が災難だから！どっちも本当だよ！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Chloe, you\'re the human equivalent of a warm hug.',ja:'クロエ、あなたは温かいハグの人間版だよ。'}}
    ],
    [
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'Okay, I need to tell you something. I went on a date last night and it was PERFECT.',ja:'ねえ、言いたいことがあるの。昨日デートしたんだけど、完璧だったの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A perfect date? Does such a thing exist?',ja:'完璧なデート？そんなもの存在するの？'}},
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'He opened doors! He asked about my day! He didn\'t mention his ex ONCE!',ja:'ドア開けてくれたの！一日どうだったか聞いてくれた！元カノの話一度もしなかったの！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s... literally the bare minimum, Chloe.',ja:'それは……文字通り最低限だよ、クロエ。'}},
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'I know! But after the guys YOU\'ve been dating, the bare minimum feels like a fairy tale!',ja:'わかってる！でもエイミーがデートしてる男たちの後だと、最低限がおとぎ話に感じるの！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'...That\'s the saddest thing I\'ve ever heard.',ja:'……今まで聞いた中で一番悲しいことだよ。'}},
      {character:'chloe', speaker:{en:'Chloe',ja:'クロエ'}, text:{en:'Eat your cookie, Amy. We\'re raising our standards together.',ja:'クッキー食べて、エイミー。一緒に基準を上げよう。'}}
    ]
  ],

  // === MIA ===
  mia: [
    [
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'Amy! Perfect timing. I just pulled a fresh batch from the oven. Sit, sit!',ja:'エイミー！ちょうどいい時に。オーブンから焼きたて出したところ。座って、座って！'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Mia, you always have food ready. It\'s like you knew I was coming.',ja:'ミア、いつも食べ物準備してるね。来るってわかってたみたいに。'}},
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'I didn\'t! But you always look hungry after a bad date, so I keep things ready just in case.',ja:'知らなかったの！でも悪いデートの後いつもお腹空いてる顔してるから、念のため準備してるの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s either the most thoughtful thing or the most prophetic thing anyone\'s ever said to me.',ja:'それは今まで言われた中で一番思いやりがあるか、一番預言的かどっちかだよ。'}},
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'It\'s both! Now eat. You\'re too skinny when you\'re stressed. And you\'re always stressed.',ja:'両方だよ！さあ食べて。ストレスの時は細すぎるの。いつもストレスだけど。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Mia, you\'re the friend who feeds my soul. And my stomach.',ja:'ミア、あなたは魂に餌をくれる友達だよ。お腹にも。'}}
    ],
    [
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'So... I heard about the last one.',ja:'あのね……前の人のこと聞いたよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Which one? You\'ll need to be more specific.',ja:'どの人？もっと具体的に言って。'}},
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'The one who said "you\'re so mature for your age." Amy, that man was FORTY-SEVEN.',ja:'「年齢の割に成熟してる」って言った人。エイミー、その人47歳だったの。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I know. I checked his ID. He\'s older than my dad\'s vintage wine.',ja:'知ってる。身分証確認したの。お父さんのヴィンテージワインより古かった。'}},
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'You need to stop attracting men who peaked before you were born. Here, have another plate.',ja:'君が生まれる前にピークを迎えた男を引き寄せるのやめて。ほら、もう一皿。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'I\'m not ATTRACTING them, they\'re being assigned to me by an algorithm.',ja:'引き寄せてないよ、アルゴリズムに割り当てられてるの。'}},
      {character:'mia', speaker:{en:'Mia',ja:'ミア'}, text:{en:'Then we\'re fighting the algorithm AND the men. Pass the butter.',ja:'じゃあアルゴリズムと男たち両方と戦うのね。バター取って。'}}
    ]
  ]
};

// NPC conversations for safe area encounters
export const NPC_CONVERSATIONS = {
  eli: [
    [
      {character:'eli', speaker:{en:'Eli',ja:'エリ'}, text:{en:'Hey, Amy. Slow day, huh? You want the usual?',ja:'や、エイミー。暇な日だね。いつものでいい？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'The usual being judgment and coffee?',ja:'いつものって批判とコーヒー？'}},
      {character:'eli', speaker:{en:'Eli',ja:'エリ'}, text:{en:'Free coffee and honest opinions. Best deal in the city.',ja:'無料コーヒーと正直な意見。街で一番のお得なセットだよ。'}}
    ]
  ],
  sabrina: [
    [
      {character:'sabrina', speaker:{en:'Sabrina',ja:'サブリナ'}, text:{en:'Amy! Come in, come in. You look like you need a cocktail and a reality check.',ja:'エイミー！おいで、おいで。カクテルと現実確認が必要そうな顔してるよ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Can I get the reality check without the cocktail?',ja:'カクテルなしで現実確認だけもらえる？'}},
      {character:'sabrina', speaker:{en:'Sabrina',ja:'サブリナ'}, text:{en:'No. They come as a pair. That\'s the deal.',ja:'ダメ。セットなの。それがルール。'}}
    ]
  ],
  val: [
    [
      {character:'val', speaker:{en:'Val',ja:'ヴァル'}, text:{en:'Back again? You\'re becoming a regular.',ja:'また来たの？常連になりつつあるね。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Bad dates keep bringing me back.',ja:'悪いデートが連れ戻すの。'}},
      {character:'val', speaker:{en:'Val',ja:'ヴァル'}, text:{en:'At least your taste in bars is improving. That\'s something.',ja:'少なくともバーのセンスは上がってるね。それは何かだ。'}}
    ]
  ]
};

// Green flag pre-unlock conversations (before they become official green flags)
// These characters appear as nice NPCs in their respective areas
export const GREEN_FLAG_NPC_CONVERSATIONS = {
  xavier: [
    [
      {character:'xavier', speaker:{en:'Xavier',ja:'ザビエル'}, text:{en:'Oh, hey. You\'re the girl from the library, right? Amy?',ja:'あ、君は図書館の……エイミーだっけ？'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You remembered my name.',ja:'名前覚えてたの。'}},
      {character:'xavier', speaker:{en:'Xavier',ja:'ザビエル'}, text:{en:'I remember the books you checked out. You have good taste. Most people just grab whatever\'s on the display table.',ja:'借りた本を覚えてたんだ。センスいいね。ほとんどの人は展示台のやつを適当に持っていくけど。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s... the nicest thing a stranger has said to me in months.',ja:'それは……数ヶ月で初めての、知らない人からの一番優しい言葉だよ。'}},
      {character:'xavier', speaker:{en:'Xavier',ja:'ザビエル'}, text:{en:'Well, we\'re not really strangers anymore, are we? Same shelf, same taste. That\'s practically destiny.',ja:'もう知らない人じゃないでしょ？同じ棚、同じセンス。それはほぼ運命だよ。'}}
    ]
  ],
  james: [
    [
      {character:'james', speaker:{en:'James',ja:'ジェームズ'}, text:{en:'Hey! Amy, right? I saved you a seat. The fries are on me tonight.',ja:'や！エイミーだよね？席取っておいたよ。今夜のポテトは俺のおごり。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You saved me a seat? We\'ve talked twice.',ja:'席取っておいたの？2回しか話してないのに。'}},
      {character:'james', speaker:{en:'James',ja:'ジェームズ'}, text:{en:'Three times, actually. You always sit at the bar. I figured I\'d make it easier.',ja:'3回だよ。いつもバーに座るから、楽にしてあげようと思って。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'That\'s either very sweet or very concerning.',ja:'とても優しいか、とても心配かどっちかだね。'}},
      {character:'james', speaker:{en:'James',ja:'ジェームズ'}, text:{en:'Let\'s go with sweet. I promise I\'m not weird. Just... observant. And I like fries.',ja:'優しいにしよう。変じゃないよ、約束する。ただ……観察好きなだけ。あとポテトが好き。'}}
    ]
  ],
  andrew: [
    [
      {character:'andrew', speaker:{en:'Andrew',ja:'アンドリュー'}, text:{en:'Oh, hey Amy! Beautiful day, right? I was just walking the dog.',ja:'あ、エイミー！いい天気だね。犬の散歩してたんだ。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You have a dog?',ja:'犬飼ってるの？'}},
      {character:'andrew', speaker:{en:'Andrew',ja:'アンドリュー'}, text:{en:'Yeah, this is Biscuit. He\'s a rescue. He\'s also the reason I get up before 7 AM every day.',ja:'うん、これはビスケット。保護犬なんだ。毎朝7時前に起きる理由でもある。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A man who rescues dogs and wakes up early. Are you real?',ja:'犬を保護して早起きする男。本物？'}},
      {character:'andrew', speaker:{en:'Andrew',ja:'アンドリュー'}, text:{en:'Very real. Biscuit can vouch for me. He\'s not a great reference, but he\'s honest.',ja:'本物だよ。ビスケットが保証するよ。あんまりいい参考人じゃないけど、正直だよ。'}}
    ]
  ],
  christy: [
    [
      {character:'christy', speaker:{en:'Christy',ja:'クリスティ'}, text:{en:'Amy! I was hoping I\'d run into you. I tried that tea you recommended. You were right — it\'s amazing.',ja:'エイミー！会えると思ってたの。勧めてもらったお茶試したよ。やっぱり合ってた——すごくおいしい。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You actually tried it?',ja:'実際に試したの？'}},
      {character:'christy', speaker:{en:'Christy',ja:'クリスティ'}, text:{en:'Of course! When someone with good taste recommends something, you listen. That\'s my rule.',ja:'もちろん！いいセンスの人が勧めてくれたら聞くの。それが私のルール。'}},
      {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Christy, you might be the most thoughtful person I\'ve met this year.',ja:'クリスティ、今年会った中で一番思いやりがある人かもしれない。'}},
      {character:'christy', speaker:{en:'Christy',ja:'クリスティ'}, text:{en:'That\'s because you\'ve been dating the wrong people, sweetie. Stick around — I\'ll show you what "normal" looks like.',ja:'それは間違った人たちとデートしてるからよ、ハニー。ここにいて——「普通」がどういうものか見せてあげる。'}}
    ]
  ]
};

// === Andrew pre-unlock conversations (encounters 1-2, speaker = ???) ===
export const ANDREW_PRE_UNLOCK_CONVERSATIONS = [
  // Encounter 1
  [
    {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'Oh — sorry. Didn\'t mean to startle you. Just walking the dog.',ja:'あ——ごめん。驚かせるつもりじゃなかったんだ。犬の散歩してただけで。'}},
    {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'No, it\'s fine. He\'s cute. What\'s his name?',ja:'ううん、大丈夫。可愛いね。名前は？'}},
    {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'Biscuit. Found him at the shelter last year. He\'s the reason I\'m out here this early.',ja:'ビスケット。去年シェルターで見つけたんだ。この時間にここにいる理由だよ。'}},
    {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'A man who rescues dogs. That\'s... actually really nice.',ja:'犬を保護する人。それは……本当に素敵だね。'}}
  ],
  // Encounter 2
  [
    {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'Hey again. Biscuit remembered you. He doesn\'t remember most people.',ja:'また会ったね。ビスケットが君のこと覚えてたよ。あんまり人を覚えない子なんだけど。'}},
    {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Well, I\'m flattered. You walk him here every day?',ja:'光栄だな。毎日ここで散歩してるの？'}},
    {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'Most days. It\'s quiet in the morning. Good place to think.',ja:'だいたいね。朝は静かだし、考えるのにいい場所なんだ。'}},
    {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'You know, I don\'t even know your name. You just keep showing up with a dog.',ja:'名前も知らないんだよね。犬連れて現れ続ける人。'}},
    {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'Maybe next time. I\'m bad at introductions.',ja:'今度ね。自己紹介苦手なんだ。'}}
  ]
];

// === Andrew name exchange (encounter 3) ===
export const ANDREW_NAME_EXCHANGE = [
  {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'You\'re here again. I\'m starting to think you come here just for Biscuit.',ja:'また来たね。ビスケットに会いに来てるのかな。'}},
  {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Maybe. Or maybe the company is growing on me. I\'m Amy, by the way.',ja:'かもね。それか、一緒にいる人に慣れてきたとか。エイミーだよ、ちなみに。'}},
  {character:'andrew', speaker:{en:'???',ja:'???'}, text:{en:'Andrew. I\'m Andrew. Sorry it took three meetings to say that.',ja:'アンドリュー。僕はアンドリュー。3回も会ってから言ってごめん。'}},
  {character:'amy', speaker:{en:'Amy',ja:'エイミー'}, text:{en:'Nice to finally meet you, Andrew. Biscuit, you already knew.',ja:'やっと会えたね、アンドリュー。ビスケットはもう知ってたけど。'}},
  {character:'andrew', speaker:{en:'Andrew',ja:'アンドリュー'}, text:{en:'He\'s smarter than me, honestly. See you tomorrow, Amy?',ja:'彼の方が僕より賢いんだ、正直。また明日会える？エイミー。'}}
];

// Pick an Andrew conversation based on encounter stage
// Stage 1 = first stranger meeting, 2 = second stranger meeting, 3 = name exchange, 4+ = post-name
export function pickAndrewConversation(stage){
  if(stage <= 1){
    // First encounter (stage 0 or 1)
    return ANDREW_PRE_UNLOCK_CONVERSATIONS[0];
  } else if(stage === 2){
    // Second encounter
    return ANDREW_PRE_UNLOCK_CONVERSATIONS[1] || ANDREW_PRE_UNLOCK_CONVERSATIONS[0];
  } else if(stage === 3){
    // Name exchange moment
    return ANDREW_NAME_EXCHANGE;
  } else {
    // Post-name: use regular green flag conversations
    const bank = GREEN_FLAG_NPC_CONVERSATIONS.andrew;
    if(!bank || !bank.length) return null;
    return bank[Math.floor(Math.random() * bank.length)];
  }
}

// Pick a random conversation from a friend's bank
export function pickFriendConversation(friendId){
  const bank = FRIEND_CONVERSATIONS[friendId];
  if(!bank || !bank.length) return null;
  return bank[Math.floor(Math.random() * bank.length)];
}

// Pick random friends from a given list
export function pickRandomFriends(friendIds, count = 1){
  const pool = [...friendIds];
  const selected = [];
  for(let i = 0; i < count && pool.length > 0; i++){
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected;
}

// Pick a random NPC conversation
export function pickNpcConversation(npcId){
  const bank = NPC_CONVERSATIONS[npcId];
  if(!bank || !bank.length) return null;
  return bank[Math.floor(Math.random() * bank.length)];
}

// Pick a green flag NPC conversation (pre-unlock)
export function pickGreenFlagNpcConversation(gfId){
  if(gfId === 'andrew'){
    // Andrew uses stage-aware conversations — handled by caller via pickAndrewConversation
    const bank = GREEN_FLAG_NPC_CONVERSATIONS[gfId];
    if(!bank || !bank.length) return null;
    return bank[Math.floor(Math.random() * bank.length)];
  }
  const bank = GREEN_FLAG_NPC_CONVERSATIONS[gfId];
  if(!bank || !bank.length) return null;
  return bank[Math.floor(Math.random() * bank.length)];
}

// Safe area locations and which friends/NPCs can appear there
export const SAFE_AREAS = {
  restaurant: {
    name: {en:'Restaurant',ja:'レストラン'},
    bg: 'restaurant',
    friends: ['malik', 'jade', 'chloe'],
    npc: 'eli',
    greenFlagNpc: null
  },
  park: {
    name: {en:'Park',ja:'公園'},
    bg: 'park',
    friends: ['min', 'mia'],
    npc: null,
    greenFlagNpc: null   // Andrew handled by dedicated Park menu button
  },
  beach: {
    name: {en:'Beach',ja:'ビーチ'},
    bg: 'beach',
    friends: ['malik', 'chloe'],
    npc: null,
    greenFlagNpc: null
  },
  bar: {
    name: {en:'Bar',ja:'バー'},
    bg: 'bar',
    friends: ['jade'],
    npc: 'val',
    greenFlagNpc: 'james'
  },
  library: {
    name: {en:'Library',ja:'図書館'},
    bg: 'library',
    friends: ['min'],
    npc: null,
    greenFlagNpc: 'xavier'
  },
  cafe: {
    name: {en:'Beachside Cafe',ja:'海辺のカフェ'},
    bg: 'cafe',
    friends: ['mia', 'chloe'],
    npc: 'sabrina',
    greenFlagNpc: 'christy'
  },
  beachsideCafe: {
    name: {en:'Beachside Cafe',ja:'海辺のカフェ'},
    bg: 'cafe',
    friends: ['mia', 'chloe'],
    npc: 'sabrina',
    greenFlagNpc: 'christy'
  }
};
