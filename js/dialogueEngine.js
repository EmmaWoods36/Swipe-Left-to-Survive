import {state} from './state.js';
import {t} from './localization.js';
import {imageWithFallback,Asset} from './assets.js';
import {RED_FLAGS} from '../data/redFlags.js';
import {GREEN_FLAGS} from '../data/greenFlags.js';
import {SCENE_SPRITES} from '../data/sceneSprites.js';
import {FRIENDS} from '../data/characters.js';

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
    if(!current?.normalNpc && state.defeated && state.defeated.has('pattern')) return 'green';
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
  if(characterId === 'andrew' && !state.andrewNameKnown) return '???';
  if(characterId === 'amy') return 'Amy';
  if(characterId === 'goddess_amy') return 'Goddess Amy';
  if(characterId === 'algorithm') return state.lang === 'ja' ? 'アルゴリズム' : 'The Algorithm';
  if(characterId === 'pattern') return state.lang === 'ja' ? 'パターン' : 'The Pattern';
  const rf = RED_FLAGS[characterId];
  if(rf) return state.lang === 'ja' ? (rf.jaName || rf.name) : rf.name;
  const gf = GREEN_FLAGS[characterId];
  if(gf) return state.lang === 'ja' ? (gf.jaName || gf.name) : gf.name;
  const friend = FRIENDS[characterId];
  if(friend) return state.lang === 'ja' ? friend.jaName : friend.name;
  return ({val: 'Val',sabrina: 'Sabrina',eli: 'Eli'})[characterId] || characterId;
}

// Get full-body scene sprite for a character
function resolveSceneSprite(characterId, lineIndex){
  if(!characterId) return null;
  const expressions = SCENE_SPRITES[characterId];
  if(expressions?.length) return expressions[(lineIndex || 0) % expressions.length];
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
  // Amy does NOT get a conversation sprite — only battle sprites and CGs
  if(characterId === 'amy' || characterId === 'goddess_amy') return null;
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
        sceneSprite: resolveSceneSprite(line.character, lines.indexOf(line)),
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

export function playScene(lines, {onComplete=null, skippable=true, normalNpc=false}={}){
  stopDialogue();
  current = {lines, index:0, onComplete, skippable, normalNpc, fullLine:'', speakers:[]};
  current.speakers = buildSpeakerRegistry(lines);
  state.dialogueActive = true;
  layer().classList.remove('hidden');
  renderDialogueBox();
  window.addEventListener('slts:languageChanged', rerenderCurrentLine);
  renderLine();
}

function renderDialogueBox(){
  const speakers = current.speakers;

  // Build speaker tabs HTML — Amy always left, all others right
  const amySpeakers = speakers.filter(s => s.id === 'amy' || s.id === 'goddess_amy');
  const otherSpeakers = speakers.filter(s => s.id !== 'amy' && s.id !== 'goddess_amy');
  function buildTabs(arr) {
    return arr.map(s => {
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
  }
  const amyTabsHtml = buildTabs(amySpeakers);
  const otherTabsHtml = buildTabs(otherSpeakers);

  // Build nested colored outlines for all participants
  const nestedBorders = speakers.map(s =>
    `<div class="vn-nested-border vn-nested-${s.color}" data-speaker="${s.id}"></div>`
  ).join('');

  layer().innerHTML = `
    <div class="vn-overlay-bg"></div>
    <div id="vnSceneSprite" class="vn-scene-sprite"></div>
    <div class="vn-wrap ${speakers.length > 1 ? 'multi-speaker' : ''}">
      <div id="vnSpeakerTabs" class="vn-tabs-row"><div class="vn-tabs-left">${amyTabsHtml}</div><div class="vn-tabs-right">${otherTabsHtml}</div></div>
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
  state.dialogueActive = false;
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
  if(line.character === 'andrew') return state.andrewNameKnown ? (state.lang==='ja'?'アンドリュー':'Andrew') : '???';
  if(['james','xavier','christy'].includes(line.character)) return speakerName(line.character);
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
  if(line.revealsName && line.character==='andrew') state.andrewNameKnown = true;
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
    const name = speakerName(tab.dataset.speaker);
    tab.querySelector('.vn-tab-name').textContent = name;
    const portrait = tab.querySelector('img');
    if(portrait) portrait.alt = name;
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
      // Resolve each speaking turn, never cache the first expression in the registry.
      // Keep the other character present while Amy answers.
      if(speakerId && speakerId!=='amy' && speakerId!=='goddess_amy') current.lastSceneCharacter = speakerId;
      const sceneId = current.lastSceneCharacter;
      const turn = current.lines.slice(0,current.index+1).filter(l=>l.character===sceneId).length-1;
      const spritePath = line.sceneSprite || line.reactions?.[sceneId] || resolveSceneSprite(sceneId,Math.max(0,turn));
      if(spritePath){
        spriteEl.append(imageWithFallback(spritePath, speakerName(current.lastSceneCharacter), 'vn-scene-sprite-img'));
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
  document.querySelectorAll('.vn-tab').forEach(tab=>{tab.querySelector('.vn-tab-name').textContent=speakerName(tab.dataset.speaker);});
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
  if(skipped && current?.lines.some(l=>l.character==='andrew' && l.revealsName)) state.andrewNameKnown=true;
  const cb = current && current.onComplete;
  stopDialogue();
  if(cb) cb({skipped});
}
