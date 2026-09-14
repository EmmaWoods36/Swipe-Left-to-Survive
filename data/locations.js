// ============================================================
// SLTS Location System — Data-Driven World Map & Locations
// Restored per ChatGPT spec: SLTS_NON_BATTLE_WORLD_LOGIC_HANDOFF.md
// ============================================================
// 9 main-map pins. Sublocations are nested, NOT map pins.
// Backgrounds use actual asset files from the repo.
// Hours gate availability based on game time.
// ============================================================

// --- Time-to-daypart mapping ---
// Sunrise (5:30AM-6:59AM), Day (7AM-5:59PM), Sunset (6PM-7:59PM), Night (8PM-5:29AM)
export function getDaypart(timeStr) {
  const t = (timeStr || '').toLowerCase();
  if (t.includes('sunrise') || t.includes('morning')) return 'day';
  if (t.includes('day')) return 'day';
  if (t.includes('afternoon') || t.includes('evening') || t.includes('sunset')) return 'afternoon';
  if (t.includes('dusk') || t.includes('night')) return 'night';
  return 'day'; // fallback
}

// --- Map time string to daypart for background selection ---
export function getMapDaypart(timeStr) {
  const t = (timeStr || '').toLowerCase();
  if (t.includes('sunrise') || t.includes('morning') || t.includes('day')) return 'day';
  if (t.includes('afternoon') || t.includes('evening') || t.includes('sunset')) return 'afternoon';
  if (t.includes('dusk') || t.includes('night')) return 'night';
  return 'day';
}

// --- Background index: location -> daypart -> asset file ---
// Uses ONLY actual files confirmed in assets/backgrounds/
export const LOCATION_BACKGROUNDS = {
  cityMap: {
    day: 'assets/backgrounds/bg_city_map_day.png',
    afternoon: 'assets/backgrounds/bg_city_map_afternoon.png',
    night: 'assets/backgrounds/bg_city_map_night.png'
  },
  apartment: {
    day: 'assets/backgrounds/bg_apartment_day.png',
    afternoon: 'assets/backgrounds/apartment_sunset.png',
    sunset: 'assets/backgrounds/bg_apartment_sunset.png',
    night: 'assets/backgrounds/bg_apartment_night.png'
  },
  bedroom: {
    day: 'assets/backgrounds/bg_bedroom_day.png',
    sunset: 'assets/backgrounds/bg_bedroom_sunset.png',
    night: 'assets/backgrounds/bg_bedroom_night.png'
  },
  office: {
    day: 'assets/backgrounds/bg_office_day.png'
  },
  library: {
    day: 'assets/backgrounds/bg_library_day.png',
    afternoon: 'assets/backgrounds/bg_library_afternoon.png'
  },
  bar: {
    day: 'assets/backgrounds/bg_bar_day.png',
    night: 'assets/backgrounds/bg_bar_night.png'
  },
  park: {
    day: 'assets/backgrounds/bg_park_day.png',
    sunset: 'assets/backgrounds/bg_park_sunset.png',
    night: 'assets/backgrounds/bg_park_night.png'
  },
  beach: {
    day: 'assets/backgrounds/bg_beach_day.png',
    sunset: 'assets/backgrounds/bg_beach_sunset.png',
    night: 'assets/backgrounds/bg_beach_night.png'
  },
  beachsideCafe: {
    day: 'assets/backgrounds/bg_beachside_cafe_day.png',
    sunset: 'assets/backgrounds/bg_beachside_cafe_sunset.png',
    night: 'assets/backgrounds/bg_beachside_cafe_night.png'
  },
  restaurant: {
    day: 'assets/backgrounds/bg_restaurant_day.png',
    night: 'assets/backgrounds/bg_restaurant_night.png'
  },
  mall: {
    day: 'assets/backgrounds/bg_mall_day.png'
  },
  spa: {
    day: 'assets/backgrounds/bg_spa.png',
    night: 'assets/backgrounds/bg_spa_night.png'
  },
  closet: {
    day: 'assets/backgrounds/bg_closet.png',
    night: 'assets/backgrounds/bg_closet_night.png'
  },
  villainApartment: {
    default: 'assets/backgrounds/villain_apartment.png'
  },
  car: {
    day: 'assets/backgrounds/bg_car_day.png',
    sunset: 'assets/backgrounds/bg_car_sunset.png',
    night: 'assets/backgrounds/bg_car_night.png'
  }
};

// --- Resolve a location background with deterministic fallback ---
export function getLocationBg(locationKey, daypart) {
  const loc = LOCATION_BACKGROUNDS[locationKey];
  if (!loc) return null;

  // Try exact daypart match
  if (loc[daypart]) return loc[daypart];

  // Fallback chain: requested -> nearest valid -> default
  const fallbackOrder = {
    day: ['afternoon', 'sunset', 'default', 'day'],
    afternoon: ['day', 'sunset', 'default', 'night'],
    sunset: ['afternoon', 'day', 'default', 'night'],
    night: ['sunset', 'afternoon', 'default', 'day']
  };

  const chain = fallbackOrder[daypart] || ['default', 'day'];
  for (const key of chain) {
    if (loc[key]) return loc[key];
  }

  // Last resort: any available variant
  return loc.default || loc.day || loc.night || Object.values(loc)[0] || null;
}

// --- Location hours (24h format) ---
// null = always open. Closed locations show an overlay with hours.
export const LOCATION_HOURS = {
  apartment: null,       // Always accessible
  office: { open: 8, close: 18 },      // 8AM-6PM
  library: { open: 6, close: 19 },     // 6AM-7PM
  bar: null,                           // 24/7
  park: null,                          // Always accessible
  restaurant: { open: 7, close: 25 }, // 7AM-1AM (25 = 1AM next day)
  mall: { open: 8, close: 23 },       // 8AM-11PM
  villainApartment: null,             // Story-gated
  beach: null                          // Always accessible
};

// Sublocation hours
export const SUBLOCATION_HOURS = {
  spa: { open: 8, close: 22 },         // 8AM-10PM
  beachsideCafe: { open: 6, close: 23 }, // 6AM-11PM
  closet: null                         // Always accessible (in apartment)
};

// --- Check if a location is currently open ---
export function isLocationOpen(locationId, currentTimeStr) {
  const hours = LOCATION_HOURS[locationId] || SUBLOCATION_HOURS[locationId];
  if (!hours) return true; // null = always open

  // Parse approximate hour from time string
  const t = (currentTimeStr || '').toLowerCase();
  let hour;
  if (t.includes('sunrise')) hour = 6;
  else if (t.includes('morning')) hour = 8;
  else if (t.includes('day') && !t.includes('evening')) hour = 12;
  else if (t.includes('afternoon')) hour = 14;
  else if (t.includes('evening')) hour = 18;
  else if (t.includes('sunset')) hour = 19;
  else if (t.includes('dusk')) hour = 20;
  else if (t.includes('night')) hour = 22;
  else hour = 12;

  if (hours.open <= hours.close) {
    return hour >= hours.open && hour < hours.close;
  }
  // Overnight (close > 24, e.g. restaurant closes at 25 = 1AM)
  if (hours.close > 24) {
    return hour >= hours.open || hour < (hours.close - 24);
  }
  return hour >= hours.open || hour < hours.close;
}

// --- Format location hours for display ---
export function formatHours(locationId) {
  const hours = LOCATION_HOURS[locationId] || SUBLOCATION_HOURS[locationId];
  if (!hours) return null;
  const fmt = (h) => {
    if (h > 24) return `${h - 24}:00`;
    return `${h}:00`;
  };
  return `${fmt(hours.open)}–${fmt(hours.close)}`;
}

// --- 9 Main Map Pins ---
// Coordinates are semantic anchors: pin TIP touches building entrance/frontage
export const MAP_PINS = [
  { id: 'apartment',    label: { en: "Amy's Apartment", ja: 'エイミーの部屋' },     x: 33.5, y: 46.5, labelPos: 'left' },
  { id: 'office',       label: { en: 'Office', ja: 'オフィス' },                     x: 70.5, y: 36.5, labelPos: 'right' },
  { id: 'library',      label: { en: 'Library', ja: '図書館' },                      x: 53.5, y: 50.5, labelPos: 'left' },
  { id: 'bar',          label: { en: 'Bar', ja: 'バー' },                             x: 73.0, y: 56.0, labelPos: 'right' },
  { id: 'park',         label: { en: 'Park', ja: '公園' },                           x: 28.5, y: 71.5, labelPos: 'left' },
  { id: 'restaurant',   label: { en: 'Restaurant', ja: 'レストラン' },               x: 51.5, y: 76.5, labelPos: 'right' },
  { id: 'mall',         label: { en: 'Mall', ja: 'モール' },                          x: 77.0, y: 83.5, labelPos: 'right' },
  { id: 'villainApt',   label: { en: 'Villain Apt', ja: 'ヴィランの部屋' },           x: 93.5, y: 61.0, labelPos: 'left' },
  { id: 'beach',        label: { en: 'Beach', ja: '海辺' },                          x: 21.5, y: 70.5, labelPos: 'left' }
];

// --- Office Work Events (15 rotating outcomes) ---
// Exact rewards from ChatGPT spec
export const OFFICE_EVENTS = [
  { id: 'powerpoint',     text: { en: 'Survived a PowerPoint with too many transitions.', ja: '切り替え多すぎるPowerPointを生き延びた。' },           reward: 750 },
  { id: 'spreadsheet',    text: { en: 'Closed 12 spreadsheet tabs. Felt powerful.', ja: 'スプレッドシートのタブを12個閉じた。強くなった気分。' }, reward: 650 },
  { id: 'meetings',       text: { en: 'Sat through five meetings that could have been emails.', ja: 'メールで済む会議に5回座った。' },                        reward: 800 },
  { id: 'reformat',       text: { en: 'Reformatted a deck nobody asked for. They noticed.', ja: '誰も頼んでないデッキを整形した。気づかれた。' },        reward: 700 },
  { id: 'emails',         text: { en: 'Cleared the urgent emails. Inbox zero... for five minutes.', ja: '緊急メールを処理した。5分だけゼロに。' },         reward: 600 },
  { id: 'tracker',        text: { en: 'Updated the project tracker. It\'s wrong, but it\'s current.', ja: 'プロジェクトトラッカーを更新した。間違ってるが最新だ。' }, reward: 750 },
  { id: 'circle_back',    text: { en: 'Told someone you\'d circle back. Did not circle back.', ja: '「また戻ります」と言った。戻らなかった。' },           reward: 650 },
  { id: 'formula',        text: { en: 'Fixed a broken formula. Discovered three more.', ja: '壊れた数式を直した。さらに3つ見つけた。' },                  reward: 700 },
  { id: 'repeat_meeting', text: { en: 'Had the same meeting twice. Same outcome. Nothing.', ja: '同じ会議を2回やった。同じ結果。何もなし。' },            reward: 600 },
  { id: 'summary',        text: { en: 'Built a summary table. Management was impressed.', ja: 'サマリーテーブルを作った。経営陣が感心した。' },          reward: 850 },
  { id: 'calendar',      text: { en: 'Calendar combat: moved three meetings to next week.', ja: 'カレンダー戦闘：3つの会議を来週に移動させた。' },        reward: 650 },
  { id: 'status_update', text: { en: 'Gave a neutral status update. Nobody asked follow-ups. Victory.', ja: '中立な状況報告をした。質問なし。勝利。' },     reward: 700 },
  { id: 'screen_share',  text: { en: 'Lost the screen-share file. Found it. Lost it again.', ja: '画面共有ファイルを失くした。見つけた。また失くした。' },  reward: 600 },
  { id: 'dashboard',     text: { en: 'Built a dashboard in Excel. It\'s ugly but it works.', ja: 'Excelでダッシュボードを作った。醜いが動く。' },          reward: 850 },
  { id: 'finish',        text: { en: 'Finished actual work. Proved you exist.', ja: '実際の仕事を終わらせた。存在を証明した。' },                       reward: 900 },
  // Expanded absurd corporate BS pool — these are randomly selected, NOT a menu
  { id: 'meeting_about_meetings', text: { en: 'Amy spent three hours in a meeting about why there are too many meetings.', ja: '会議が多すぎる理由についての会議に3時間費やした。' }, reward: 750 },
  { id: 'socialize_offline', text: { en: 'Someone said "let\'s socialize this offline" and nobody knew what that meant.', ja: '「オフラインで共有しよう」と誰かが言った。誰も意味がわからなかった。' }, reward: 650 },
  { id: 'urgent_457', text: { en: 'Amy received an "URGENT" email at 4:57 PM asking for something nobody had mentioned for six weeks.', ja: '午後4時57分に「緊急」メールを受け取った。6週間誰も言及してなかったことについて。' }, reward: 900 },
  { id: 'tracker_tracker', text: { en: 'Amy updated a tracker whose only purpose was tracking whether everyone had updated the other tracker.', ja: 'トラッカーを更新した。そのトラッカーの唯一の目的は、全員がもう一つのトラッカーを更新したか追跡することだった。' }, reward: 600 },
  { id: 'stakeholder_alignment', text: { en: 'Stakeholder alignment meeting about stakeholder alignment. Everyone aligned on needing more alignment.', ja: 'ステークホルダーのすり合わせについてのステークホルダーすり合わせ会議。全員がもっとすり合わせが必要で合意した。' }, reward: 700 },
  { id: 'deck_nobody_reads', text: { en: 'Amy made a beautiful deck. Nobody will read it. She knows this. She made it beautiful anyway.', ja: '美しいデッキを作った。誰も読まない。わかっている。それでも美しく作った。' }, reward: 800 },
  { id: 'synergy', text: { en: 'Someone used "synergy" unironically. Amy did not flinch. She has evolved.', ja: '誰かが皮肉抜きで「シナジー」を使った。エイミーは動じなかった。進化したのだ。' }, reward: 650 },
  { id: 'parking_lot', text: { en: '"Let\'s take this offline." They did not take it offline. It died in the parking lot of good intentions.', ja: '「オフラインで話そう。」話さなかった。善意の駐車場で死んだ。' }, reward: 550 },
  { id: 'cc_everyone', text: { en: 'Someone CC\'d the entire company on a reply-all chain. Amy watched it burn.', ja: '誰かが全社員をCCに入れた。エイミーは燃え盛るのを見守った。' }, reward: 750 },
  { id: 'quick_call', text: { en: '"Can we hop on a quick call?" The call was 47 minutes. Nothing was quick.', ja: '「ちょっと電話できる？」電話は47分だった。何も早くなかった。' }, reward: 700 },
  { id: 'asap_subjective', text: { en: 'ASAP was used without a deadline. Amy interpreted ASAP as "eventually."', ja: 'ASAPが期限なしで使われた。エイミーはASAPを「いずれ」と解釈した。' }, reward: 600 },
  { id: 'spreadsheet_archaeology', text: { en: 'Amy dug through a spreadsheet from 2019. Found a comment from someone who left the company. Felt haunted.', ja: '2019年のスプレッドシートを掘り起こした。退職した誰かのコメントを見つけた。呪われた気分。' }, reward: 850 }
];

// --- Library Reading Choices ---
// Books cost time, not Soft Life Funds
export const LIBRARY_BOOKS = [
  { id: 'romance',   label: { en: 'Romance', ja: 'ロマンス' },       stats: { peace: 10, hope: 5 } },
  { id: 'mystery',   label: { en: 'Mystery', ja: 'ミステリー' },     stats: { clarity: 12 } },
  { id: 'selfhelp',  label: { en: 'Self-Help', ja: '自己啓発' },     stats: { selfRespect: 12, clarity: 5 } },
  { id: 'fantasy',   label: { en: 'Fantasy', ja: 'ファンタジー' },    stats: { peace: 12, amyHp: 5 } },
  { id: 'poetry',    label: { en: 'Poetry', ja: '詩' },              stats: { peace: 8, selfRespect: 5 } }
];

// --- Restaurant Menu ---
export const RESTAURANT_MENU = [
  { id: 'pasta',    label: { en: 'Solo Pasta', ja: 'パスタ' },           price: 350 },
  { id: 'salad',    label: { en: 'Fancy Salad', ja: 'サラダ' },          price: 280 },
  { id: 'steak',    label: { en: 'Steak Dinner', ja: 'ステーキ' },       price: 700 },
  { id: 'seafood',  label: { en: 'Seafood Plate', ja: 'シーフード' },     price: 600 },
  { id: 'dessert',  label: { en: 'Dessert Sampler', ja: 'デザート盛合' }, price: 450 }
];

// --- Bar Menu ---
export const BAR_MENU = [
  { id: 'fries',     label: { en: 'Parmesan Fries', ja: 'パルメザンフライ' },     price: 250 },
  { id: 'mocktail',  label: { en: 'Mocktail', ja: 'モックテール' },              price: 180 },
  { id: 'water',     label: { en: 'Sparkling Water', ja: 'スパークリングウォーター' }, price: 80 },
  { id: 'cocktail',  label: { en: 'Pink Cocktail', ja: 'ピンクカクテル' },        price: 300 },
  { id: 'sliders',  label: { en: 'Late-Night Sliders', ja: '深夜スライダー' },   price: 400 }
];

// --- Beachside Cafe Menu ---
export const CAFE_MENU = [
  { id: 'passion_tea',   label: { en: 'Passion Fruit Iced Tea', ja: 'パッションフルーツアイスティー' }, price: 120 },
  { id: 'matcha',        label: { en: 'Iced Matcha', ja: 'アイス抹茶' },                                price: 150 },
  { id: 'classic_tea',   label: { en: 'Classic Iced Tea', ja: 'クラシックアイスティー' },              price: 80 },
  { id: 'boba',          label: { en: 'Boba', ja: 'タピオカ' },                                         price: 180 },
  { id: 'coconut',       label: { en: 'Coconut Drink', ja: 'ココナッツドリンク' },                      price: 220 },
  { id: 'fruit_tart',    label: { en: 'Fruit Tart', ja: 'フルーツタルト' },                             price: 250 },
  { id: 'croissant',     label: { en: 'Croissant Sandwich', ja: 'クロワッサンサンド' },                  price: 300 },
  { id: 'mango_cake',    label: { en: 'Mango Cheesecake', ja: 'マンゴーチーズケーキ' },                  price: 280 }
];

// --- Spa Packages (nested in Mall) ---
export const SPA_PACKAGES = [
  { id: 'facial',    label: { en: 'Luxury Facial', ja: 'ラグジュアリーフェイシャル' },   price: 300,  effects: { peace: 25, delusion: -10 } },
  { id: 'massage',   label: { en: 'Massage', ja: 'マッサージ' },                       price: 500,  effects: { amyHp: 40, stamina: 30 } },
  { id: 'full',      label: { en: 'Full Soft Life Package', ja: 'フルソフトライフパッケージ' }, price: 1000, effects: { fullRestore: true, selfRespect: 10 } }
];

// --- Friend/NPC Location Routing ---
// From historical conversationBank.js + ChatGPT spec
export const LOCATION_PEOPLE = {
  restaurant: { friends: ['malik', 'jade', 'chloe'], npc: 'eli', greenFlagNpc: null },
  park:       { friends: ['min', 'mia'],              npc: null,  greenFlagNpc: 'andrew' },
  beach:      { friends: ['malik', 'chloe'],          npc: null,  greenFlagNpc: null },
  bar:        { friends: ['jade'],                    npc: 'val', greenFlagNpc: 'james' },
  library:    { friends: ['min'],                     npc: null,  greenFlagNpc: 'xavier' },
  beachsideCafe: { friends: ['mia', 'chloe'],         npc: 'sabrina', greenFlagNpc: 'christy' }
};

// --- Apartment Actions (nested, NOT map pins) ---
export const APARTMENT_ACTIONS = [
  { id: 'loveloop', label: { en: 'Open LoveLoop', ja: 'LoveLoopを開く' }, isBattleEntry: true },
  { id: 'closet',   label: { en: 'Open Closet', ja: 'クローゼットを開く' } },
  { id: 'studio',   label: { en: 'Date Fit Studio', ja: 'デートコーデスタジオ' } },
  { id: 'rest',     label: { en: 'Rest', ja: '休む' } }
];

// --- Beach Sublocations ---
export const BEACH_SUBLOCATIONS = [
  { id: 'beachsideCafe', label: { en: 'Visit Beachside Cafe', ja: '海辺のカフェに行く' } }
];

// --- Mall Sublocations ---
export const MALL_SUBLOCATIONS = [
  { id: 'boutique', label: { en: 'Boutique', ja: 'ブティック' } },
  { id: 'spa',      label: { en: 'Spa', ja: 'スパ' } },
  { id: 'foodCourt',label: { en: 'Food Court', ja: 'フードコート' } }
];
