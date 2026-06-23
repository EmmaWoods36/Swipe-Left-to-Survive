import {state} from '../state.js';

export function applyCheat(code){
  const normalized = String(code||'').trim().toUpperCase();
  if(normalized === 'BESTIE ROUTES'){
    state.unlocked.bestieRoutes = true;
    return {ok:true, message:'BESTIE ROUTES unlocked: Malik, Min, and Mia.'};
  }
  if(normalized === 'I LEARNED MY LESSON'){
    state.unlocked.peacefulReplay = true;
    return {ok:true, message:'Peaceful replay unlocked.'};
  }
  return {ok:false, message:'Unknown cheat.'};
}

export function isGreenFlagUnlocked(gf){
  if(!gf.requires) return true;
  return !!state.unlocked[gf.requires];
}
