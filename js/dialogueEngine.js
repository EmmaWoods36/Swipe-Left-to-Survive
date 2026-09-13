import {state} from './state.js';
import {t} from './localization.js';
import {imageWithFallback,Asset} from './assets.js';
import {RED_FLAGS} from '../data/redFlags.js';
import {GREEN_FLAGS} from '../data/greenFlags.js';

let current = null;
let typingTimer = null;
let charIndex = 0;
let renderedText = '';

const layer = () => document.getElementById('dialogueLayer');

export function isDialogueActive(){ return !!current; }

// Determine speaker color based on character type
// purple = Amy, red = villain, green = green flag, blue = friend/NPC
function speakerColor(characterId){
  if(!characterId) return 'blue';
  if(characterId === 'amy' || characterId === 'goddess_amy') return 'purple';
  if(RED_FLAGS[characterId]) return 'red';
  if(characterId === 'algorithm' || characterId === 'pattern') return 'red';
  if(GREEN_FLAGS[characterId]) return 'green';
  return 'blue'; // friends and NPCs
}

// Get speaker display name
function speakerName(characterId){
  if(!characterId) return '';
  if(characterId === 'amy') return 'Amy';
  if(characterId === 'goddess_amy') return 'Goddess Amy';
  const rf = RED_FLAGS[characterId];
  if(rf) return state.lang === 'ja' ? (rf.jaName || rf.name) : rf.name;
  const gf = GREEN_FLAGS[characterId];
  if(gf) return state.lang === 'ja' ? (gf.jaName || gf.name) : gf.name;
  return characterId;
}

// Build speaker registry from scene lines
function buildSpeakerRegistry(lines){
  const registry = {};
  lines.forEach(line => {
    if(line.character && !registry[line.character]){
      registry[line.character] = {
        id: line.character,
        name: speakerName(line.character),
        color: speakerColor(line.character),
        portrait: Asset.portraits[line.character] || line.portrait || null
      };
    }
  });
  return Object.values(registry);
}

export function playScene(lines, {onComplete=null, skippable=true}={}){
  stopDialogue();
  const speakers = buildSpeakerRegistry(lines);
  current = {lines, index:0, onComplete, skippable, fullLine:'', speakers};
  layer().classList.remove('hidden');
  renderDialogueBox();
  window.addEventListener('slts:languageChanged', rerenderCurrentLine);
  renderLine();
}

function renderDialogueBox(){
  const speakers = current.speakers;
  // Build speaker tabs HTML
  const tabsHtml = speakers.map(s => {
    const isActive = false; // will be set in renderLine
    return `<div class="vn-tab vn-tab-${s.color}" data-speaker="${s.id}">
      ${s.portrait ? `<img src="${Array.isArray(s.portrait) ? s.portrait[0] : s.portrait}" alt="${s.name}" class="vn-tab-img" onerror="this.style.display='none'">` : ''}
      <span class="vn-tab-name">${s.name}</span>
    </div>`;
  }).join('');

  layer().innerHTML = `
    <div class="vn-wrap">
      <div id="vnSpeakerTabs" class="vn-tabs-row">${tabsHtml}</div>
      <div id="vnActiveBox" class="vn-box vn-box-blue">
        <div class="vn-portrait-row">
          <div id="vnPortrait" class="vn-portrait"></div>
          <div class="vn-content">
            <div id="vnSpeaker" class="vn-speaker"></div>
            <div id="vnText" class="vn-text"></div>
          </div>
        </div>
        <div class="vn-actions">
          <button id="vnSkip" class="btn vn-skip">${t('skip')}</button>
          <button id="vnContinue" class="btn primary vn-continue">${t('continue')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('vnContinue').onclick = advanceOrReveal;
  document.getElementById('vnSkip').onclick = () => finishScene(true);
  document.getElementById('vnSkip').style.display = current.skippable ? '' : 'none';
  layer().onclick = e => {
    if(e.target.closest('button')) return;
    advanceOrReveal();
  };
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

function resolvePortrait(line){
  if(!line) return null;
  if(line.portrait) return line.portrait;
  if(line.character && Asset.portraits[line.character]){
    return Asset.portraits[line.character];
  }
  return null;
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

  // Update active speaker tab and box color
  const speakerId = line.character || '';
  const color = speakerColor(speakerId);

  // Update tabs — highlight active
  const tabs = document.querySelectorAll('.vn-tab');
  tabs.forEach(tab => {
    const isActive = tab.dataset.speaker === speakerId;
    tab.classList.toggle('active', isActive);
    tab.classList.toggle('inactive', !isActive);
  });

  // Update box color
  const box = document.getElementById('vnActiveBox');
  if(box){
    box.className = 'vn-box vn-box-' + color;
  }

  // Show portrait
  const portraitEl = document.getElementById('vnPortrait');
  if(portraitEl){
    portraitEl.innerHTML = '';
    const portraitPath = resolvePortrait(line);
    if(portraitPath){
      portraitEl.append(imageWithFallback(portraitPath, lineSpeaker(line), 'vn-portrait-img'));
    }
  }
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
