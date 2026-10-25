import {playScene} from '../dialogueEngine.js';
import {setBackground} from '../assets.js';
import {OPENING_PRE_SETUP, OPENING_AFTER_SETUP} from '../../data/dialogueOpening.js';
import {showLoveLoopNameInput} from './loveloopSetup.js';
import {startBattle} from '../battle/battleEngine.js';
import {AudioManager} from '../audioManager.js';
import {state} from '../state.js';

export function startOpening(){
  // Standard story always begins on Day 0 at 6:00 PM.
  state.day = 0;
  state.clockMinutes = 18 * 60;
  state.time = 'Sunset';
  AudioManager.playSceneMusic('prologue');
  setBackground('apartmentEvening');
  playScene(OPENING_PRE_SETUP, {onComplete:showLoveLoopNameInput, skippable:true});
}

export function continueAfterLoveLoopSetup(){
  // The first mandatory encounter is canonically the 2 A.M. Summoner.
  // Keep the story on Day 0 until the prologue battle is resolved and Amy sleeps.
  state.day = 0;
  state.clockMinutes = 2 * 60;
  state.time = 'Night';
  AudioManager.playSceneMusic('prologue');
  setBackground('loveLoop');
  playScene(OPENING_AFTER_SETUP, {onComplete:()=>startBattle('two_am'), skippable:true});
}
