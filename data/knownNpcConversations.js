// James and Xavier text restored from f21f900 (June 15, 2026).
// Each exchange is a complete encounter, not one randomly selected line.
const names = {amy:['Amy','エイミー'],james:['James','ジェームズ'],xavier:['Xavier','ザビエル'],christy:['Christy','クリスティ']};
const line = (character,en,ja,expression='neutral') => ({character,speaker:{en:names[character][0],ja:names[character][1]},text:{en,ja},expression});
export const KNOWN_NPC_CONVERSATIONS = {
  james: [
    [line('james','Hey. What can I get started for you?','やあ。まず何にする？','welcome'),
     line('amy','Something with fries.','ポテトがついてるもの。'),
     line('james','Emotionally or literally?','気持ちの話？それとも本当に？','amused'),
     line('amy','Both.','両方。'),
     line('james','Parmesan fries it is.','じゃあ、パルメザンフライだね。','smile')],
    [line('james','Usual?','いつもの？','welcome'),
     line('amy','You remember?','覚えてるの？'),
     line('james','It’s my job. Also, you looked deeply betrayed by the menu last time until you found fries.','仕事だからね。それに前回、ポテトを見つけるまでメニューに裏切られたみたいな顔をしてたから。','amused')],
    [line('james','Water first?','まず水にする？','gentle'),
     line('amy','Do I look that bad?','そんなにひどい顔してる？'),
     line('james','You look like somebody said something stupid and expected you to be grateful.','誰かにバカなことを言われて、しかも感謝まで求められたような顔をしてる。','concerned')]
  ],
  xavier: [
    [line('xavier','Looking for anything specific?','何か探してる？','welcome'),
     line('amy','A book that will make me forget dating apps exist.','マッチングアプリの存在を忘れられる本。'),
     line('xavier','Fiction, nonfiction, or spiritual emergency?','小説、ノンフィクション、それとも心の緊急事態？','amused'),
     line('amy','Surprise me.','お任せする。')],
    [line('xavier','This one has romance, but nobody sends “wyd” at midnight.','これには恋愛があるけど、真夜中に「何してる？」なんて送る人はいない。','smile'),
     line('amy','So fantasy.','じゃあファンタジーね。'),
     line('xavier','Technically literary fiction.','分類上は文芸小説だよ。','amused')],
    [line('xavier','You come here when you need quiet.','静かな時間が欲しい時にここに来るんだね。','gentle'),
     line('amy','Is it obvious?','そんなにわかる？'),
     line('xavier','Only because you relax before you sit down.','座る前からほっとしてるから。','smile')]
  ],
  christy: [
    [line('christy','Welcome to Beachside Cafe, Amy. Sit wherever you like.','ビーチサイドカフェへようこそ、エイミー。好きな席に座ってね。','welcome'),
     line('amy','Somewhere quiet, preferably.','できれば静かなところがいいな。'),
     line('christy','Try the window. And if you want a recommendation, the passion fruit iced tea is lovely.','窓際はどう？おすすめなら、パッションフルーツアイスティーがおいしいわよ。','smile'),
     line('amy','A view and a plan. I can work with that.','景色もあって、何にするかも決まった。それならいけそう。')],
    [line('christy','Back again? You have the look of someone who found their spot.','また来たのね。自分の居場所を見つけたって顔をしてるわ。','welcome'),
     line('amy','The window seat is doing a lot for my peace of mind.','あの窓際の席、心の平和にすごく効くの。'),
     line('christy','Then take your time. The ocean isn’t going anywhere.','じゃあ、ゆっくりしていって。海は逃げないから。','gentle')]
  ]
};
export function pickKnownNpcConversation(id, encounter=1){
  const bank=KNOWN_NPC_CONVERSATIONS[id];
  if(!bank?.length) return null;
  return bank[(Math.max(1,encounter)-1)%bank.length];
}
