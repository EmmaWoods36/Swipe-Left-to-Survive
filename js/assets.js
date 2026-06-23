export const Asset = {
  backgrounds: {
    apartmentDay: ['assets/backgrounds/apartment_day.png','Assets/backgrounds/apartment_day.png'],
    apartmentEvening: ['assets/cgs/amy_couch_evening.png','assets/cgs/amy_on_couch_evening.png','assets/cgs/opening_amy_couch.png','assets/backgrounds/apartment_sunset.png','Assets/cgs/amy_couch_evening.png'],
    apartmentNight: ['assets/backgrounds/apartment_night.png'],
    map: ['assets/backgrounds/city_map_day.png','assets/backgrounds/city_map_afternoon.png'],
    closet: ['assets/backgrounds/closet.png','assets/backgrounds/boutique.png'],
    loveLoop: ['assets/backgrounds/apartment_sunset.png'],
    battle: ['assets/backgrounds/apartment_night.png'],
    algorithm: ['assets/backgrounds/bedroom_glitch_algorithm.png','assets/backgrounds/dream_world_algorithm.png'],
    pattern: ['assets/backgrounds/dream_world_pattern.png','assets/backgrounds/bedroom_glitch_pattern.png'],
    beach: ['assets/backgrounds/beach_sunset.png'],
    library: ['assets/backgrounds/library.png'],
    bar: ['assets/backgrounds/bar.png'],
    park: ['assets/backgrounds/park.png'],
    cafe: ['assets/backgrounds/beachside_cafe.png']
  },
  portraits: {
    amy: ['assets/characters/main/amy_headshot.png','assets/characters/main/amy_headshot.jpg','Assets/characters/main/amy_headshot.jpg','assets/characters/cards/amy_card.png'],
    goddessAmy: ['assets/characters/main/goddess_amy_headshot.png'],
    malik: ['assets/characters/friends/malik_headshot.png','assets/characters/friends/malik_card.png'],
    min: ['assets/characters/friends/min_headshot.png','assets/characters/friends/min_card.png'],
    jade: ['assets/characters/friends/jade_headshot.png','assets/characters/friends/jade_card.png'],
    chloe: ['assets/characters/friends/chloe_headshot.png','assets/characters/friends/chloe_card.png'],
    mia: ['assets/characters/friends/mia_headshot.png','assets/characters/friends/mia_card.png'],
    xavier: ['assets/characters/green_flags/xavier_headshot.png','assets/characters/green_flags/xavier_card.png'],
    james: ['assets/characters/green_flags/james_headshot.png','assets/characters/green_flags/james_card.png'],
    andrew: ['assets/characters/green_flags/andrew_headshot.png','assets/characters/green_flags/andrew_card.png'],
    christy: ['assets/characters/green_flags/christy_headshot.png','assets/characters/green_flags/christy_card.png'],
    algorithm: ['assets/characters/bosses/algorithm_headshot.png','assets/sprites/scenes/bosses/the_algorithm/algorithm_scene_01.png'],
    pattern: ['assets/characters/bosses/pattern_headshot.png','assets/sprites/scenes/bosses/the_pattern/pattern_scene_01.png']
  },
  sprites: {
    amy: {
      idle: ['assets/sprites/amy/amy_idle.png','assets/characters/main/amy_headshot.png'],
      punch: ['assets/sprites/amy/amy_punch.png'],
      kick: ['assets/sprites/amy/amy_high_kick.png'],
      special: ['assets/sprites/amy/amy_special_flag_beam.png','assets/sprites/amy/amy_ultimate_girl_stand_up.png'],
      hurt: ['assets/sprites/amy/amy_hurt.png'],
      victory: ['assets/sprites/amy/amy_victory.png']
    }
  },
  cutins: {
    amy: ['assets/cutins/amy/amy_special_cutin.png','assets/sprites/amy/amy_ultimate_girl_stand_up.png'],
    support: ['assets/cutins/support/malik_support_cutin.png','assets/cutins/support/min_support_cutin.png'],
    algorithm: ['assets/cutins/bosses/algorithm_cutin.png'],
    pattern: ['assets/cutins/bosses/pattern_cutin.png']
  },
  paperDoll: {
    base: ['assets/dressup/base/amy_paper_doll_base.png','assets/dressup/base/amy_base.png'],
    placeholder: ['assets/characters/main/amy_headshot.png']
  }
};

export function firstPath(list){ return Array.isArray(list) ? list[0] : list; }

export function imageWithFallback(paths, alt='', className=''){
  const img = new Image();
  const srcs = Array.isArray(paths) ? paths.slice() : [paths];
  let i = 0;
  img.alt = alt;
  if(className) img.className = className;
  img.onerror = () => {
    if(i < srcs.length) img.src = srcs[i++];
    else img.dataset.missing = 'true';
  };
  img.src = srcs[i++];
  return img;
}

export function setBackground(key){
  const el = document.getElementById('sceneBg');
  if(!el) return;
  const candidates = Asset.backgrounds[key] || Asset.backgrounds.apartmentEvening;
  el.style.backgroundImage = 'radial-gradient(circle at 50% 40%,rgba(255,124,199,.18),transparent 40%),linear-gradient(135deg,#3f1644,#170918 70%)';
  let i = 0;
  function tryNext(){
    if(i >= candidates.length) return;
    const src = candidates[i++];
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `linear-gradient(180deg,rgba(14,4,16,.08),rgba(14,4,16,.42)), url('${src}')`; };
    img.onerror = tryNext;
    img.src = src;
  }
  tryNext();
}
