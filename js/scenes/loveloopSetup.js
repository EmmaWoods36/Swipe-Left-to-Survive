import {state} from '../state.js';
import {tx} from '../localization.js';
import {clearStage, button, renderHud} from '../screens.js';
import {setBackground, imageWithFallback, Asset} from '../assets.js';
import {continueAfterLoveLoopSetup} from './opening.js';

const defaults = {alphabet:'Amy', hiragana:'えいみー', katakana:'エイミー'};

export function showLoveLoopNameInput(){
  clearStage(); setBackground('loveLoop'); renderHud();
  const layer = document.getElementById('screenLayer');
  layer.innerHTML = `
    <div class="center-screen"><section class="panel light">
      <h2>LOVELOOP</h2>
      <p class="subtitle">${tx('Let’s make your profile.','プロフィールを作成しましょう。')}</p>
      <div class="closet-layout">
        <div class="paper-doll-stage" id="amyProfilePreview"></div>
        <div>
          <h3>${tx('What name should your matches see?','マッチ相手に表示する名前を入力してください。')}</h3>
          <div class="field">
            <label>${tx('Input style','入力形式')}</label>
            <div id="nameModes" class="mode-tabs"></div>
          </div>
          <div class="field">
            <label>${tx('Display name','表示名')}</label>
            <input id="playerNameInput" maxlength="24" />
          </div>
          <p class="muted">${tx('Do not make me regret this, tiny heart app.','後悔させないでよね、小さいハートのアプリ。')}</p>
          <div id="nameActions" class="choice-grid"></div>
        </div>
      </div>
    </section></div>`;
  const preview = document.getElementById('amyProfilePreview');
  const img = imageWithFallback(Asset.portraits.amy, 'Amy headshot', '');
  preview.append(img);
  img.style.maxWidth='82%'; img.style.maxHeight='430px'; img.style.objectFit='contain';
  const modes = document.getElementById('nameModes');
  ['alphabet','hiragana','katakana'].forEach(mode=>{
    const label = mode==='alphabet'?'Alphabet':mode==='hiragana'?'ひらがな':'カタカナ';
    const b = button(label, ()=>setMode(mode), mode===state.nameMode?'selected':'');
    b.dataset.mode = mode; modes.append(b);
  });
  const input = document.getElementById('playerNameInput'); input.value = defaults[state.nameMode] || 'Amy';
  function setMode(mode){
    state.nameMode = mode;
    document.querySelectorAll('#nameModes .btn').forEach(b=>b.classList.toggle('selected', b.dataset.mode===mode));
    input.value = defaults[mode] || 'Amy';
  }
  document.getElementById('nameActions').append(button(tx('Continue','続ける'), ()=>{
    state.playerName = input.value.trim() || defaults[state.nameMode] || 'Amy';
    showPreferenceChoice();
  }, 'primary wide'));
}

export function showPreferenceChoice(){
  clearStage(); setBackground('loveLoop'); renderHud();
  const layer = document.getElementById('screenLayer');
  layer.innerHTML = `
    <div class="center-screen"><section class="panel light">
      <h2>LOVELOOP</h2>
      <p class="subtitle">${tx('Nice to meet you,','はじめまして、')} ${state.playerName}.</p>
      <h3>${tx('Who would you like LoveLoop to show you?','LoveLoopに表示してほしい相手を選んでください。')}</h3>
      <p>${tx('You can change this later in Profile Settings.','この設定は、あとからプロフィール設定で変更できます。')}</p>
      <div id="prefChoices" class="choice-grid"></div>
    </section></div>`;
  const choices = document.getElementById('prefChoices');
  choices.append(button(tx('Guys','男性'), ()=>{state.preference='guys'; continueAfterLoveLoopSetup();}, 'primary'));
  choices.append(button(tx('Guys and girls','男性と女性'), ()=>{state.preference='guys_and_girls'; continueAfterLoveLoopSetup();}, 'primary'));
}
