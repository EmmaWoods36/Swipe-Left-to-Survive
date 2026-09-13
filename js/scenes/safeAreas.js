// Safe Area Encounter System
// When Amy visits a non-battle location, randomly spawn 1-2 friends/NPCs
// and play a conversation from the conversation bank
import {setBackground} from '../assets.js';
import {playScene} from '../dialogueEngine.js';
import {showMessage} from '../screens.js';
import {state} from '../state.js';
import {tx} from '../localization.js';
import {
  SAFE_AREAS,
  pickFriendConversation,
  pickRandomFriends,
  pickNpcConversation,
  pickGreenFlagNpcConversation,
  FRIEND_CONVERSATIONS,
  GREEN_FLAG_NPC_CONVERSATIONS
} from '../../data/conversationBank.js';

// Check if green flags are officially unlocked (after beating Algorithm and Pattern)
function greenFlagsUnlocked(){
  return state.defeated && state.defeated.has('pattern');
}

// Start a safe area encounter
export function visitSafeArea(areaId, onReturn){
  const area = SAFE_AREAS[areaId];
  if(!area){
    // Unknown area, just return
    if(onReturn) onReturn();
    return;
  }

  setBackground(area.bg);

  // Decide who appears:
  // 1. If green flags are unlocked, they appear as official green flags (green box)
  // 2. Before that, green flag NPCs appear as blue-box NPCs (pre-unlock)
  // 3. Friends always appear with blue boxes
  // 4. NPCs (eli, sabrina, val) appear with blue boxes

  const possibleEncounters = [];

  // Friends for this area
  if(area.friends && area.friends.length > 0){
    // Pick 1-2 random friends
    const friendCount = Math.random() < 0.3 ? 2 : 1;
    const selected = pickRandomFriends(area.friends, friendCount);
    // Filter to only friends available in this area
    const areaFriends = selected.filter(f => area.friends.includes(f));
    if(areaFriends.length > 0){
      possibleEncounters.push({type:'friends', ids:areaFriends});
    }
  }

  // NPC for this area
  if(area.npc){
    possibleEncounters.push({type:'npc', id:area.npc});
  }

  // Green flag NPC (pre-unlock) for this area
  if(area.greenFlagNpc && !greenFlagsUnlocked()){
    possibleEncounters.push({type:'greenFlagNpc', id:area.greenFlagNpc});
  }

  if(possibleEncounters.length === 0){
    // Nobody here — show empty area message
    showMessage(
      tx(area.name.en, area.name.ja || area.name.en),
      tx('Nobody here right now. Amy takes a moment to breathe.', '今は誰もいない。エイミーは少し息を整える。'),
      [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:onReturn}]
    );
    return;
  }

  // Pick a random encounter from the possibilities
  const encounter = possibleEncounters[Math.floor(Math.random() * possibleEncounters.length)];

  if(encounter.type === 'friends'){
    // Build a conversation from the selected friend(s)
    const conversations = encounter.ids.map(fid => pickFriendConversation(fid)).filter(Boolean);
    if(conversations.length === 0){
      showMessage(
        tx(area.name.en, area.name.ja || area.name.en),
        tx('Nobody here right now. Amy takes a moment to breathe.', '今は誰もいない。エイミーは少し息を整える。'),
        [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:onReturn}]
      );
      return;
    }
    // Use the first friend's conversation (could interleave in future)
    const lines = conversations[0];
    playScene(lines, {onComplete:onReturn, skippable:true});
  } else if(encounter.type === 'npc'){
    const lines = pickNpcConversation(encounter.id);
    if(lines){
      playScene(lines, {onComplete:onReturn, skippable:true});
    } else {
      showMessage(
        tx(area.name.en, area.name.ja || area.name.en),
        tx('Nobody here right now.', '今は誰もいない。'),
        [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:onReturn}]
      );
    }
  } else if(encounter.type === 'greenFlagNpc'){
    const lines = pickGreenFlagNpcConversation(encounter.id);
    if(lines){
      playScene(lines, {onComplete:onReturn, skippable:true});
    } else {
      showMessage(
        tx(area.name.en, area.name.ja || area.name.en),
        tx('Nobody here right now.', '今は誰もいない。'),
        [{label:tx('Back to Map','マップへ戻る'), className:'primary', onClick:onReturn}]
      );
    }
  }
}

// Get safe area locations for the map
export function getSafeAreaLocations(){
  return Object.entries(SAFE_AREAS).map(([id, area]) => ({
    id,
    name: area.name,
    bg: area.bg
  }));
}
