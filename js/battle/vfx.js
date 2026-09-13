import {imageWithFallback} from '../assets.js';
import {tx} from '../localization.js';
import {RED_FLAGS} from '../../data/redFlags.js';

const fx = () => document.getElementById('fxLayer');

// VFX sprite path lookup: character_id -> { move_slug: vfx_path }
const VFX_SPRITES = {
  two_am: {
    'wyd': 'assets/vfx/red_flags/two_am/01_wyd_wave.png',
    'You Up?': 'assets/vfx/red_flags/two_am/02_you_up_beam.png',
    'Come Thru': 'assets/vfx/red_flags/two_am/03_come_through_curse.png',
    'No Pressure': 'assets/vfx/red_flags/two_am/04_no_pressure_pressure.png',
    'Midnight Doorway': 'assets/vfx/red_flags/two_am/05_midnight_doorway.png'
  },
  preference: {
    'You Look Like Beyoncé': 'assets/vfx/red_flags/preference/01_you_look_like_beyonc.png',
    'Preference Not Fetish': 'assets/vfx/red_flags/preference/02_preference_not_fetish.png',
    'I Grew Up Around It': 'assets/vfx/red_flags/preference/03_i_grew_up_around_it.png',
    'Parents Would Never Accept You': 'assets/vfx/red_flags/preference/04_parents_would_never_accept_you.png',
    'Exotic Compliment Chain': 'assets/vfx/red_flags/preference/05_exotic_compliment_chain.png'
  },
  coworker: {
    'After-Hours Slack': 'assets/vfx/red_flags/coworker/01_after_hours_ping.png',
    'You\'re Different': 'assets/vfx/red_flags/coworker/02_youre_different.png',
    'I\'m Just Curious': 'assets/vfx/red_flags/coworker/03_im_just_curious.png',
    'Don\'t Make It Weird': 'assets/vfx/red_flags/coworker/04_dont_make_it_weird.png',
    'HR Poster Peels Off': 'assets/vfx/red_flags/coworker/05_hr_poster_peels_off.png'
  },
  love_bomber: {
    'Compliment Pop': 'assets/vfx/red_flags/love_bomber/01_move_1.png',
    'Future Fake Grenade': 'assets/vfx/red_flags/love_bomber/02_move_2.png',
    'Love Bomb Airstrike': 'assets/vfx/red_flags/love_bomber/05_special.png'
  },
  dark_humor: {
    'Just Kidding': 'assets/vfx/red_flags/dark_humor/01_just_kidding_jab.png',
    'Too Sensitive': 'assets/vfx/red_flags/dark_humor/02_too_sensitive_slash.png',
    'Dark Humor Defense': 'assets/vfx/red_flags/dark_humor/03_dark_humor_defense.png',
    'Relax, I\'m Playing': 'assets/vfx/red_flags/dark_humor/04_relax_im_playing.png',
    'Schrödinger\'s Threat': 'assets/vfx/red_flags/dark_humor/05_schr_dingers_threat.png'
  },
  demon: {
    'Handle Me At My Worst': 'assets/vfx/red_flags/demon/05_handle_me_at_my_worst.png',
    'Fighting My Demons': 'assets/vfx/red_flags/demon/01_fighting_my_demons.png',
    'Loyalty Test': 'assets/vfx/red_flags/demon/02_loyalty_test.png',
    'Military School Flashback': 'assets/vfx/red_flags/demon/03_military_school_flashback.png',
    'Hot Disaster Aura': 'assets/vfx/red_flags/demon/04_hot_disaster_aura.png'
  },
  body_bag: {
    'Trunk Click': 'assets/vfx/red_flags/body_bag/02_trunk_click.png',
    'Dateline Cold Open': 'assets/vfx/red_flags/body_bag/05_dateline_cold_open.png',
    'Choose One': 'assets/vfx/red_flags/body_bag/01_choose_one.png',
    'Don\'t Be Scared': 'assets/vfx/red_flags/body_bag/03_dont_be_scared.png',
    'Empty Parking Lot': 'assets/vfx/red_flags/body_bag/04_empty_parking_lot.png'
  },
  nico_boundary_pusher: {
    'Just Kidding Touch': 'assets/vfx/red_flags/nico_boundary_pusher/02_just_kidding_touch.png',
    'Pushy Playfulness': 'assets/vfx/red_flags/nico_boundary_pusher/05_pushy_playfulness.png',
    'Boundary Creep': 'assets/vfx/red_flags/nico_boundary_pusher/01_boundary_creep.png',
    'Why So Serious?': 'assets/vfx/red_flags/nico_boundary_pusher/03_why_so_serious.png',
    'Read-the-Room Failure': 'assets/vfx/red_flags/nico_boundary_pusher/04_read_the_room_failure.png'
  },
  lucien_reservation_mirage: {
    'Reservation Mirage': 'assets/vfx/red_flags/lucien_reservation_mirage/01_table_for_never.png',
    'Vanishing Host Stand': 'assets/vfx/red_flags/lucien_reservation_mirage/05_next_time_i_swear.png',
    'Promise Loop': 'assets/vfx/red_flags/lucien_reservation_mirage/02_promise_loop.png',
    'Plan Swap': 'assets/vfx/red_flags/lucien_reservation_mirage/03_plan_swap.png',
    'Charm Fog': 'assets/vfx/red_flags/lucien_reservation_mirage/04_charm_fog.png'
  },
  roman_industry_mystery: {
    'NDA Flirt': 'assets/vfx/red_flags/roman_industry_mystery/01_ambiguous_income.png',
    'I Broke Her': 'assets/vfx/red_flags/roman_industry_mystery/05_i_broke_her.png',
    'Retirement Flex': 'assets/vfx/red_flags/roman_industry_mystery/02_retirement_flex.png',
    'Shock Reveal': 'assets/vfx/red_flags/roman_industry_mystery/03_shock_reveal.png',
    'Open-Mindedness Check': 'assets/vfx/red_flags/roman_industry_mystery/04_open_mindedness_check.png'
  },
  house_date: {
    'Come Over Instead': 'assets/vfx/red_flags/house_date/01_couch_date_trap.png',
    'Bare Minimum Audit': 'assets/vfx/red_flags/house_date/05_bare_minimum_audit.png',
    'I Don\'t Want To Be Used': 'assets/vfx/red_flags/house_date/02_i_dont_want_to_be_used.png',
    'You Pay Then': 'assets/vfx/red_flags/house_date/03_you_pay_then.png',
    'Coffee Is Expensive': 'assets/vfx/red_flags/house_date/04_coffee_is_expensive.png'
  },
  broke_dreamer: {
    'Invest in Me Emotionally': 'assets/vfx/red_flags/broke_dreamer/01_unreleased_track.png',
    'You Don\'t Support Dreams': 'assets/vfx/red_flags/broke_dreamer/05_you_dont_support_dreams.png',
    'Value Meal Serenade': 'assets/vfx/red_flags/broke_dreamer/02_value_meal_serenade.png',
    'Manifesting': 'assets/vfx/red_flags/broke_dreamer/03_manifesting.png',
    'Can You Spot Me?': 'assets/vfx/red_flags/broke_dreamer/04_can_you_spot_me.png'
  },
  millionaire: {
    'Subtle Flex': 'assets/vfx/red_flags/millionaire/01_low_key_millionaire_mirage.png',
    'Fake Quiet Luxury': 'assets/vfx/red_flags/millionaire/05_real_woman_requirement.png',
    'Believe In Me Barrage': 'assets/vfx/red_flags/millionaire/02_believe_in_me_barrage.png',
    'Between Opportunities': 'assets/vfx/red_flags/millionaire/03_between_opportunities.png',
    'Do You Want My Kids?': 'assets/vfx/red_flags/millionaire/04_do_you_want_my_kids.png'
  },
  normal_fake: {
    'Good Guy Mask': 'assets/vfx/red_flags/normal_fake/01_normal_guy_mask.png',
    'Advanced Threat Reveal': 'assets/vfx/red_flags/normal_fake/05_advanced_threat_reveal.png',
    'My Ex Was Crazy': 'assets/vfx/red_flags/normal_fake/02_my_ex_was_crazy.png',
    'Brutal Honesty': 'assets/vfx/red_flags/normal_fake/03_brutal_honesty.png',
    'You\'re Overthinking It': 'assets/vfx/red_flags/normal_fake/04_youre_overthinking_it.png'
  },
  old_young: {
    'Mature For Your Age': 'assets/vfx/red_flags/old_young/02_mature_for_your_age.png',
    'Midlife Trophy Case': 'assets/vfx/red_flags/old_young/05_midlife_trophy_case.png',
    'Young Girl Comment': 'assets/vfx/red_flags/old_young/01_young_girl_comment.png',
    'Drink Theft': 'assets/vfx/red_flags/old_young/03_drink_theft.png',
    'Women My Age Are Bitter': 'assets/vfx/red_flags/old_young/04_women_my_age_are_bitter.png'
  },
  julian_softboi_savior: {
    'Therapy-Speak Trap': 'assets/vfx/red_flags/julian_softboi_savior/01_therapy_speak_trap.png',
    'The Healing Era Monologue': 'assets/vfx/red_flags/julian_softboi_savior/05_the_healing_era_monologue.png',
    'Hold Space Shield': 'assets/vfx/red_flags/julian_softboi_savior/02_hold_space_shield.png',
    'Not Like Other Men': 'assets/vfx/red_flags/julian_softboi_savior/03_not_like_other_men.png',
    'Weaponized Vulnerability': 'assets/vfx/red_flags/julian_softboi_savior/04_weaponized_vulnerability.png'
  },
  blake_disruptor: {
    'Blockchain Monologue': 'assets/vfx/red_flags/blake_disruptor/01_blockchain_monologue.png',
    'The Pitch Deck': 'assets/vfx/red_flags/blake_disruptor/05_the_pitch_deck.png',
    'Passive Income Flex': 'assets/vfx/red_flags/blake_disruptor/02_passive_income_flex.png',
    'Founder Aura': 'assets/vfx/red_flags/blake_disruptor/03_founder_aura.png',
    'Actually, Let Me Explain': 'assets/vfx/red_flags/blake_disruptor/04_actually_let_me_explain.png'
  },
  algorithm: {
    '99+ Likes': 'assets/effects/amy/goddess/goddess_amy_fx_01_name_the_pattern.png',
    'Engagement Trap': 'assets/effects/amy/goddess/goddess_amy_fx_06_block_and_delete.png'
  },
  pattern: {
    'Familiar Ache': 'assets/effects/amy/goddess/goddess_amy_fx_03_i_know_this_feeling.png',
    'Choose the Old Wound': 'assets/effects/amy/goddess/goddess_amy_fx_04_thats_not_love.png'
  }
};

function findVfxSprite(enemyId, moveName){
  const charVfx = VFX_SPRITES[enemyId];
  if(!charVfx) return null;
  return charVfx[moveName] || null;
}

export function popFx(text, opts={}){
  const el = document.createElement('div');
  el.className = 'fx-pop';
  el.textContent = text;
  fx().append(el);
  // Show VFX sprite overlay if provided
  if(opts.vfxPath){
    const vfxImg = imageWithFallback(opts.vfxPath, text + ' VFX');
    vfxImg.className = 'vfx-overlay';
    vfxImg.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:60%;max-height:60%;pointer-events:none;z-index:10;opacity:0.9;animation:vfxFlash 0.9s ease-out;';
    fx().append(vfxImg);
    setTimeout(()=>vfxImg.remove(), 900);
  }
  setTimeout(()=>el.remove(), 950);
}

export function popEnemyVfx(enemyId, moveName){
  const vfxPath = findVfxSprite(enemyId, moveName);
  if(vfxPath){
    const vfxImg = imageWithFallback(vfxPath, moveName + ' VFX');
    vfxImg.className = 'vfx-overlay enemy-vfx';
    vfxImg.style.cssText = 'position:absolute;top:50%;left:35%;transform:translate(-50%,-50%);max-width:55%;max-height:55%;pointer-events:none;z-index:10;opacity:0.85;animation:vfxFlash 0.9s ease-out;';
    fx().append(vfxImg);
    setTimeout(()=>vfxImg.remove(), 900);
  }
}

export function popPlayerVfx(moveName){
  const vfxPath = findVfxSprite('amy', moveName);
  if(vfxPath){
    const vfxImg = imageWithFallback(vfxPath, moveName + ' VFX');
    vfxImg.className = 'vfx-overlay player-vfx';
    vfxImg.style.cssText = 'position:absolute;top:50%;right:35%;transform:translate(50%,-50%);max-width:55%;max-height:55%;pointer-events:none;z-index:10;opacity:0.85;animation:vfxFlash 0.9s ease-out;';
    fx().append(vfxImg);
    setTimeout(()=>vfxImg.remove(), 900);
  }
}

export function screenShake(){
  const stage = document.getElementById('stage');
  stage.animate([
    {transform:'translate(0,0)'},{transform:'translate(-7px,3px)'},{transform:'translate(7px,-3px)'},{transform:'translate(0,0)'}
  ], {duration:280, iterations:1});
}

export function playVsIntro({playerName='Amy', enemyName='Enemy', enemySub='', playerImg, enemyImg}, done){
  const layer = fx();
  layer.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'vs-screen';
  wrap.innerHTML = `
    <div class="vs-card player"><div id="vsPlayerImg"></div><div><small>${tx('Player','プレイヤー')}</small><h2>${playerName}</h2></div><div class="vs-badge">VS</div></div>
    <div class="vs-card enemy"><div id="vsEnemyImg"></div><div><small>${tx('Opponent','対戦相手')}</small><h2>${enemyName}</h2><p>${enemySub}</p></div><div class="vs-badge">VS</div></div>
    <div class="vs-center">VS</div>`;
  layer.append(wrap);
  document.getElementById('vsPlayerImg').append(imageWithFallback(playerImg, playerName));
  document.getElementById('vsEnemyImg').append(imageWithFallback(enemyImg, enemyName));
  setTimeout(()=>{wrap.remove(); done&&done();}, 1150);
}

export function playSupportSummon(name, done){
  const wrap = document.createElement('div');
  wrap.className = 'support-aura';
  wrap.innerHTML = `<div class="support-banner">${name}<br><small>${tx('Support Summon','サポート召喚')}</small></div>`;
  fx().append(wrap);
  setTimeout(()=>{wrap.remove(); done&&done();}, 1000);
}

export function playSpecialCutin(label, side='player', done, vfxPath=null){
  popFx(label, {vfxPath});
  screenShake();
  setTimeout(()=>done&&done(), 650);
}

export function playCameraFlash(){
  const div = document.createElement('div');
  div.className = 'flash';
  fx().append(div);
  setTimeout(()=>div.remove(), 850);
}
