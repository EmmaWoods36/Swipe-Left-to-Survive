import {state} from './state.js';
import {t} from './localization.js';

let current = null;
let typingTimer = null;
let charIndex = 0;
let renderedText = '';

const layer = () => document.getElementById('dialogueLayer');

export function isDialogueActive(){ return !!current; }

export function playScene(lines, {onComplete=null, skippable=true}={}){
  stopDialogue();
  current = {lines, index:0, onComplete, skippable, fullLine:''};
  layer().classList.remove('hidden');
  layer().innerHTML = `
    <div class="vn-wrap"><div class="vn-box">
      <div class="vn-pulse">VN MODE</div>
      <div id="vnSpeaker" class="vn-speaker"></div>
      <div id="vnText" class="vn-text"></div>
      <div class="vn-actions">
        <button id="vnSkip" class="btn vn-skip">${t('skip')}</button>
        <button id="vnContinue" class="btn primary vn-continue">${t('continue')}</button>
      </div>
    </div></div>`;
  document.getElementById('vnContinue').onclick = advanceOrReveal;
  document.getElementById('vnSkip').onclick = () => finishScene(true);
  document.getElementById('vnSkip').style.display = skippable ? '' : 'none';
  layer().onclick = e => {
    if(e.target.closest('button')) return;
    advanceOrReveal();
  };
  window.addEventListener('slts:languageChanged', rerenderCurrentLine);
  renderLine();
}

export function stopDialogue(){
  if(typingTimer) clearInterval(typingTimer);
  typingTimer = null;
  current = null;
  layer().classList.add('hidden');
  layer().innerHTML = '';
  window.removeEventListener('slts:languageChanged', rerenderCurrentLine);
}

function lineText(line){
  if(!line) return '';
  if(typeof line.text === 'string') return line.text;
  return (line.text && (line.text[state.lang] || line.text.en)) || '';
}
function lineSpeaker(line){
  if(!line) return '';
  if(typeof line.speaker === 'string') return line.speaker;
  return (line.speaker && (line.speaker[state.lang] || line.speaker.en)) || '';
}

function renderLine(){
  if(!current) return;
  const line = current.lines[current.index];
  if(!line) return finishScene(false);
  if(typingTimer) clearInterval(typingTimer);
  charIndex = 0;
  renderedText = '';
  current.fullLine = lineText(line);
  document.getElementById('vnSpeaker').textContent = lineSpeaker(line);
  document.getElementById('vnText').textContent = '';
  if(line.fx) window.dispatchEvent(new CustomEvent('slts:sceneFx',{detail:line.fx}));
  typingTimer = setInterval(()=>{
    charIndex += 1;
    renderedText = current.fullLine.slice(0,charIndex);
    const el = document.getElementById('vnText');
    if(el) el.textContent = renderedText;
    if(charIndex >= current.fullLine.length){
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 18);
}

function rerenderCurrentLine(){
  if(!current) return;
  const line = current.lines[current.index];
  if(!line) return;
  current.fullLine = lineText(line);
  document.getElementById('vnSpeaker').textContent = lineSpeaker(line);
  if(typingTimer){
    document.getElementById('vnText').textContent = current.fullLine.slice(0, charIndex);
  }else{
    document.getElementById('vnText').textContent = current.fullLine;
  }
  const skip = document.getElementById('vnSkip'); if(skip) skip.textContent = t('skip');
  const cont = document.getElementById('vnContinue'); if(cont) cont.textContent = t('continue');
}

export function advanceOrReveal(){
  if(!current) return;
  if(typingTimer){
    clearInterval(typingTimer);
    typingTimer = null;
    document.getElementById('vnText').textContent = current.fullLine;
    return;
  }
  current.index += 1;
  renderLine();
}

function finishScene(skipped){
  const cb = current && current.onComplete;
  stopDialogue();
  if(cb) cb({skipped});
}
