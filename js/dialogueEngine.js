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
// purple = Amy, red = villain, green = green flag (only after Pattern defeated), blue = friend/NPC/green-flag-pre-unlock, black = boss
function speakerColor(characterId){
  if(!characterId) return 'blue';
  if(characterId === 'amy' || characterId === 'goddess_amy') return 'purple';
  if(characterId === 'algorithm' || characterId === 'pattern') return 'black';
  if(RED_FLAGS[characterId]) return 'red';
  if(GREEN_FLAGS[characterId]){
    // Green flags are blue-box NPCs until Amy clears the Pattern battle
    if(state.defeated && state.defeated.has('pattern')) return 'green';
    return 'blue';
  }
  return 'blue'; // friends and NPCs
}

// Check if this speaker is a boss (obscured portrait)
// Only Algorithm and Pattern get obscured — Evan (normal_fake) looks normal
function isBoss(characterId){
  return characterId === 'algorithm' || characterId === 'pattern';
}

// Get speaker display name
function speakerName(characterId){
  if(!characterId) return '';
  if(characterId === 'amy') return 'Amy';
  if(characterId === 'goddess_amy') return 'Goddess Amy';
  if(characterId === 'algorithm') return state.lang === 'ja' ? 'アルゴリズム' : 'The Algorithm';
  if(characterId === 'pattern') return state.lang === 'ja' ? 'パターン' : 'The Pattern';
  const rf = RED_FLAGS[characterId];
  if(rf) return state.lang === 'ja' ? (rf.jaName || rf.name) : rf.name;
  const gf = GREEN_FLAGS[characterId];
  if(gf) return state.lang === 'ja' ? (gf.jaName || gf.name) : gf.name;
  return characterId;
}

// Get full-body scene sprite for a character
function resolveSceneSprite(characterId){
  if(!characterId) return null;
  // Use scene sprites for friends/NPCs
  const sceneSpriteMap = {
    malik: 'assets/sprites/scenes/friends/malik/malik_scene_01.png',
    min: 'assets/sprites/scenes/friends/min/min_scene_01.png',
    jade: 'assets/sprites/scenes/friends/jade/jade_scene_01.png',
    chloe: 'assets/sprites/scenes/friends/chloe/chloe_scene_01.png',
    mia: 'assets/sprites/scenes/friends/mia/mia_scene_01.png',
    eli: 'assets/sprites/scenes/npcs/eli/eli_scene_01.png',
    sabrina: 'assets/sprites/scenes/npcs/sabrina/sabrina_scene_01.png',
    val: 'assets/sprites/scenes/npcs/val/val_scene_01.png',
  };
  if(sceneSpriteMap[characterId]) return sceneSpriteMap[characterId];
  // Use battle sprites for villains
  if(RED_FLAGS[characterId]){
    const rf = RED_FLAGS[characterId];
    return rf?.battleSprite || rf?.sprite || rf?.portrait || null;
  }
  // Use portrait for green flags
  if(GREEN_FLAGS[characterId]){
    const gf = GREEN_FLAGS[characterId];
    return gf?.portrait || gf?.sprite || null;
  }
  // Amy
  if(characterId === 'amy' || characterId === 'goddess_amy'){
    return Asset.sprites?.amy?.idle || Asset.portraits.amy || null;
  }
  return Asset.portraits[characterId] || null;
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
        portrait: Asset.portraits[line.character] || line.portrait || null,
        sceneSprite: resolveSceneSprite(line.character),
        isBoss: isBoss(line.character)
      };
    }
  });
  // Sort: Amy first, then everyone else in order of appearance
  const speakers = Object.values(registry);
  speakers.sort((a, b) => {
    if(a.id === 'amy' || a.id === 'goddess_amy') return -1;
    if(b.id === 'amy' || b.id === 'goddess_amy') return 1;
    return 0;
  });
  return speakers;
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

  // Build speaker tabs HTML — Amy always left, all others right
  const tabsHtml = speakers.map(s => {
    const portraitSrc = s.portrait ? (Array.isArray(s.portrait) ? s.portrait[0] : s.portrait) : null;
    let portraitHtml = '';
    if(s.isBoss){
      portraitHtml = `<div class="vn-tab-img vn-tab-obscured"><span class="vn-tab-unknown">?</span></div>`;
    } else if(portraitSrc){
      portraitHtml = `<img src="${portraitSrc}" alt="${s.name}" class="vn-tab-img" onerror="this.style.display='none'">`;
    } else {
      portraitHtml = `<div class="vn-tab-img vn-tab-placeholder"></div>`;
    }
    return `<div class="vn-tab vn-tab-${s.color}" data-speaker="${s.id}">
      ${portraitHtml}
      <span class="vn-tab-name">${s.name}</span>
    </div>`;
  }).join('');

  // Build nested colored outlines for all participants
  const nestedBorders = speakers.map(s =>
    `<div class="vn-nested-border vn-nested-${s.color}" data-speaker="${s.id}"></div>`
  ).join('');

  layer().innerHTML = `
    <div class="vn-overlay-bg"></div>
    <div id="vnSceneSprite" class="vn-scene-sprite"></div>
    <div class="vn-wrap ${speakers.length > 1 ? 'multi-speaker' : ''}">
      <div id="vnSpeakerTabs" class="vn-tabs-row">${tabsHtml}</div>
      <div id="vnNestedBorders" class="vn-nested-stack">
        ${nestedBorders}
        <div id="vnActiveBox" class="vn-box vn-box-blue">
          <div class="vn-content">
            <div id="vnSpeaker" class="vn-speaker"></div>
            <div id="vnText" class="vn-text"></div>
          </div>
          <div class="vn-actions">
            <button id="vnSkip" class="btn vn-skip">${t('skip')}</button>
            <button id="vnContinue" class="btn primary vn-continue">${t('continue')}</button>
          </div>
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

  const speakerId = line.character || '';
  const color = speakerColor(speakerId);

  // Update tabs — highlight active
  const tabs = document.querySelectorAll('.vn-tab');
  tabs.forEach(tab => {
    const isActive = tab.dataset.speaker === speakerId;
    tab.classList.toggle('active', isActive);
    tab.classList.toggle('inactive', !isActive);
  });

  // Update nested borders — active speaker's border highlighted
  const borders = document.querySelectorAll('.vn-nested-border');
  borders.forEach(border => {
    const isActive = border.dataset.speaker === speakerId;
    border.classList.toggle('active-border', isActive);
    border.classList.toggle('inactive-border', !isActive);
  });

  // Update box color
  const box = document.getElementById('vnActiveBox');
  if(box){
    box.className = 'vn-box vn-box-' + color;
    box.classList.add('box-change');
    setTimeout(() => box.classList.remove('box-change'), 300);
  }

  // Show full-body scene sprite — mid-screen, on top of the background
  const spriteEl = document.getElementById('vnSceneSprite');
  if(spriteEl){
    spriteEl.innerHTML = '';
    const isBossSpeaker = isBoss(speakerId);
    if(isBossSpeaker){
      spriteEl.innerHTML = '<div class="vn-scene-obscured"><span>?</span></div>';
    } else {
      const speaker = current.speakers.find(s => s.id === speakerId);
      const spritePath = speaker?.sceneSprite || resolveSceneSprite(speakerId);
      if(spritePath){
        spriteEl.append(imageWithFallback(spritePath, lineSpeaker(line), 'vn-scene-sprite-img'));
      }
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
