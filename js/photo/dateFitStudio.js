import {state} from '../state.js';
import {tx} from '../localization.js';
import {clearStage,button,renderHud} from '../screens.js';
import {setBackground,imageWithFallback,Asset} from '../assets.js';
import {playCameraFlash} from '../battle/vfx.js';

let routes={};
export function configurePhoto(handlers){routes=handlers||{};}

export function showDateFitStudio(){
  clearStage(); setBackground('closet'); renderHud();
  const companions = ['solo','malik','min','jade','chloe','mia','xavier','james','andrew','christy'];
  const layer=document.getElementById('screenLayer');
  layer.innerHTML=`<div class="center-screen"><section class="panel"><h2>${tx('Date Fit Studio','デートコーデスタジオ')}</h2><p class="subtitle">${tx('Choose companion and setting after dressing Amy.','エイミーを着せ替えた後、相手と背景を選ぶ。')}</p><div id="photoChoices" class="choice-grid"></div><div id="photoStage" class="photo-stage"><div class="muted">${tx('Photo preview will appear here.','ここに写真プレビューが出ます。')}</div></div><div id="photoActions" class="choice-grid"></div></section></div>`;
  const choices=document.getElementById('photoChoices');
  companions.forEach(c=>choices.append(button(c==='solo'?tx('Solo Amy','エイミーだけ'):c,()=>takePhoto(c),'primary')));
  const actions=document.getElementById('photoActions');
  actions.append(button(tx('Back to Closet','クローゼットへ戻る'),routes.showCloset||(()=>{})));
  actions.append(button(tx('Back to Map','マップへ戻る'),routes.showMap||(()=>{})));
}

function takePhoto(companion){
  playCameraFlash();
  const stage=document.getElementById('photoStage');
  const fit = Object.values(state.outfit).flat().filter(Boolean).map(x=>x.name).join(', ') || tx('Current outfit','現在のコーデ');
  stage.innerHTML = `<div class="polaroid"><div class="polaroid-frame" id="polaroidFrame"><div><b>Amy ${companion==='solo'?'':'+ '+companion}</b><br><span>${fit}</span></div></div><p>${tx('Soft life snapshot saved to gallery shell.','ソフトライフ写真をギャラリー枠に保存。')}</p></div>`;
  state.gallery.push({companion,fit,date:Date.now()});
}
