import {state} from '../state.js';
import {tx} from '../localization.js';
import {SAFE_AREAS,pickFriendConversation,pickNpcConversation} from '../../data/conversationBank.js';
import {pickKnownNpcConversation} from '../../data/knownNpcConversations.js';
import {playScene} from '../dialogueEngine.js';
import {showMessage,clearStage,renderHud} from '../screens.js';
import {AudioManager} from '../audioManager.js';
import {getDaypartFromClock,getLocationBg} from '../../data/locations.js';

// A named action must always target that person. Random selection is confined
// to the area's friend pool and never changes a named NPC action's identity.
export function visitSafeArea(areaId,onReturn,{characterId=null,friendsOnly=false}={}){
  const area=SAFE_AREAS[areaId];
  if(!area){onReturn?.();return;}
  const locationKey=areaId==='cafe'?'beachsideCafe':areaId;
  const allowed=[...(area.friends||[]),area.npc,area.greenFlagNpc].filter(Boolean);
  let id=characterId;
  if(id && !allowed.includes(id)){onReturn?.();return;}
  if(!id && !friendsOnly) id=area.greenFlagNpc||area.npc;
  if(!id && area.friends?.length) id=area.friends[Math.floor(Math.random()*area.friends.length)];
  const encounterKey=`${id}EncounterStage`;
  const nextEncounter=(state[encounterKey]||0)+1;
  const lines=pickKnownNpcConversation(id,nextEncounter) ||
    (area.friends?.includes(id)?pickFriendConversation(id):pickNpcConversation(id));
  clearStage();
  state.screen=locationKey;
  const bg=getLocationBg(locationKey,getDaypartFromClock(state.clockMinutes));
  if(bg) document.getElementById('sceneBg').style.backgroundImage=`url("${bg}")`;
  AudioManager.playSceneMusic(area.musicTrack||area.bg);
  if(!lines){
    showMessage(tx(area.name.en,area.name.ja),tx('Nobody here right now.','今は誰もいない。'),[
      {label:tx('Back','戻る'),onClick:onReturn}]);return;
  }
  playScene(lines,{normalNpc:true,skippable:true,onComplete:()=>{
    state[encounterKey]=nextEncounter;
    if(['james','xavier','christy'].includes(id)) state[`${id}NameKnown`]=true;
    onReturn?.();
  }});
  renderHud();
}
export function getSafeAreaLocations(){return Object.entries(SAFE_AREAS).map(([id,area])=>({id,name:area.name,bg:area.bg}));}
