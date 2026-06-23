import {playScene} from '../dialogueEngine.js';
import {setBackground} from '../assets.js';
import {OPENING_PRE_SETUP, OPENING_AFTER_SETUP} from '../../data/dialogueOpening.js';
import {showLoveLoopNameInput} from './loveloopSetup.js';
import {startBattle} from '../battle/battleEngine.js';

export function startOpening(){
  setBackground('apartmentEvening');
  playScene(OPENING_PRE_SETUP, {onComplete:showLoveLoopNameInput, skippable:true});
}

export function continueAfterLoveLoopSetup(){
  setBackground('loveLoop');
  playScene(OPENING_AFTER_SETUP, {onComplete:()=>startBattle('two_am'), skippable:true});
}
