import { CardDefinition, DifficultyConfig } from '../types';

export const PIXAR_BALL_SVG = `
  <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm">
    <defs>
      <radialGradient id="luxoBallGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#fffde0"/>
        <stop offset="25%" stop-color="#fed130"/>
        <stop offset="90%" stop-color="#e2a806"/>
        <stop offset="100%" stop-color="#be8702"/>
      </radialGradient>
      <linearGradient id="luxoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2a72d4"/>
        <stop offset="100%" stop-color="#144488"/>
      </linearGradient>
    </defs>
    <!-- 球體底色 -->
    <circle cx="50" cy="50" r="46" fill="url(#luxoBallGrad)" stroke="#da9e06" stroke-width="2"/>
    <!-- 紅色彩帶弧線條紋 -->
    <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#eb2328" opacity="0.94"/>
    <path d="M 6 39 Q 50 67 94 39 L 96 52 Q 50 80 4 52 Z" fill="#d91b20"/>
    <!-- 經典五角深藍星星 -->
    <polygon points="50,20 55,35 71,35 58,45 63,60 50,50 37,60 42,45 29,35 45,35" fill="url(#luxoBlueGrad)"/>
    <!-- 立體圓弧反光高光 -->
    <path d="M 22 18 A 42 42 0 0 1 52 8" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.65"/>
    <circle cx="28" cy="24" r="2.5" fill="#ffffff" opacity="0.8"/>
  </svg>
`;

export const PIXAR_CARDS: CardDefinition[] = [
  {
    id: 'alien',
    name: '三眼怪',
    movie: '玩具總動員',
    color: '#7ac943',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 天線 -->
        <path d="M 50 28 L 50 14" stroke="#7ac943" stroke-width="4" stroke-linecap="round"/>
        <circle cx="50" cy="12" r="5.5" fill="#7ac943"/>
        <!-- 尖耳朵 -->
        <polygon points="20,45 6,34 16,56" fill="#7ac943"/>
        <polygon points="80,45 94,34 84,56" fill="#7ac943"/>
        <!-- 圓圓頭型 -->
        <ellipse cx="50" cy="54" rx="34" ry="24" fill="#7ac943"/>
        <!-- 三隻眼睛 -->
        <circle cx="34" cy="50" r="7.5" fill="#fff"/>
        <circle cx="50" cy="47" r="8.5" fill="#fff"/>
        <circle cx="66" cy="50" r="7.5" fill="#fff"/>
        <circle cx="34" cy="50" r="3.2" fill="#222"/>
        <circle cx="50" cy="47" r="3.5" fill="#222"/>
        <circle cx="66" cy="50" r="3.2" fill="#222"/>
        <circle cx="33" cy="48.5" r="1" fill="#fff"/>
        <circle cx="49" cy="45.5" r="1.1" fill="#fff"/>
        <circle cx="65" cy="48.5" r="1" fill="#fff"/>
        <!-- 嘴巴 -->
        <path d="M 40 66 Q 50 72 60 66" stroke="#487e22" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- 藍領子 -->
        <path d="M 32 75 Q 50 82 68 75 L 72 86 L 28 86 Z" fill="#225ca3"/>
      </svg>
    `
  },
  {
    id: 'mike',
    name: '大眼仔',
    movie: '怪獸電力公司',
    color: '#99cf33',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 小尖角 -->
        <polygon points="34,28 30,16 40,24" fill="#d7cca8"/>
        <polygon points="66,28 70,16 60,24" fill="#d7cca8"/>
        <!-- 大眼仔圓綠身軀 -->
        <circle cx="50" cy="52" r="35" fill="#99cf33"/>
        <!-- 巨大單眼 -->
        <circle cx="50" cy="46" r="19" fill="#ffffff"/>
        <circle cx="50" cy="46" r="11" fill="#46a394"/>
        <circle cx="50" cy="46" r="6" fill="#1b3f3a"/>
        <circle cx="47" cy="43" r="2.5" fill="#ffffff"/>
        <!-- 開心大嘴 -->
        <path d="M 36 67 Q 50 80 64 67 Z" fill="#582a2a"/>
        <!-- 上下白牙齒 -->
        <polygon points="46,67 50,71 54,67" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'up',
    name: '天外奇蹟',
    movie: '天外奇蹟',
    color: '#3b9de6',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 氣球串線條 -->
        <path d="M 50 72 L 40 45 M 50 72 L 50 45 M 50 72 L 60 45 M 50 72 L 44 80 L 56 80 Z" stroke="#888" stroke-width="1.2"/>
        <!-- 彩色氣球堆疊 -->
        <circle cx="36" cy="38" r="12" fill="#ea2825"/>
        <circle cx="64" cy="36" r="12" fill="#3b9de6"/>
        <circle cx="50" cy="24" r="13" fill="#fed130"/>
        <circle cx="32" cy="24" r="10" fill="#99cf33"/>
        <circle cx="66" cy="22" r="11" fill="#ea5d98"/>
        <circle cx="50" cy="40" r="13" fill="#f37021"/>
        <circle cx="48" cy="38" r="3" fill="#fff" opacity="0.4"/>
        <!-- 懸掛的經典老木屋 -->
        <rect x="42" y="80" width="16" height="12" fill="#d29662"/>
        <polygon points="40,80 50,71 60,80" fill="#9b392a"/>
        <rect x="47" y="86" width="6" height="6" fill="#ffffff"/>
      </svg>
    `
  },
  {
    id: 'nemo',
    name: '尼莫',
    movie: '海底總動員',
    color: '#f46e1d',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 尾鰭 -->
        <polygon points="22,50 10,38 14,50 10,62" fill="#f46e1d"/>
        <polygon points="12,42 10,38 14,50" fill="#ffffff"/>
        <!-- 小丑魚身體 -->
        <ellipse cx="52" cy="50" rx="34" ry="22" fill="#f46e1d"/>
        <!-- 背鰭與腹鰭 -->
        <path d="M 44 29 Q 55 24 64 30 Z" fill="#f46e1d"/>
        <path d="M 50 71 Q 57 76 64 70 Z" fill="#f46e1d"/>
        <!-- 經典白色垂直條紋 (附黑邊) -->
        <path d="M 40 32 Q 46 50 40 68 Q 36 50 36 32 Z" fill="#ffffff" stroke="#222" stroke-width="1.5"/>
        <path d="M 60 28 Q 66 50 60 72 Q 54 50 54 28 Z" fill="#ffffff" stroke="#222" stroke-width="1.5"/>
        <!-- 大眼睛 -->
        <circle cx="72" cy="46" r="6.5" fill="#ffffff"/>
        <circle cx="73.5" cy="46" r="3.2" fill="#222"/>
        <circle cx="72" cy="44.5" r="1.2" fill="#ffffff"/>
        <!-- 招牌幸運小右鰭 -->
        <ellipse cx="58" cy="56" rx="5" ry="3" fill="#f46e1d" stroke="#222" stroke-width="1"/>
      </svg>
    `
  },
  {
    id: 'cars',
    name: '閃電麥坤',
    movie: '汽車總動員',
    color: '#e01824',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 麥坤紅色基底徽章 -->
        <circle cx="50" cy="50" r="42" fill="#e01824"/>
        <circle cx="50" cy="50" r="39" fill="none" stroke="#fed130" stroke-width="2"/>
        <!-- 閃電符號 -->
        <polygon points="26,48 54,34 46,50 74,38 42,72 48,56" fill="#fed130" stroke="#f68b1f" stroke-width="1.5"/>
        <!-- 95 賽車號碼 -->
        <text x="50" y="65" font-size="28" font-weight="900" font-style="italic" fill="#ffffff" text-anchor="middle" font-family="Impact, sans-serif" stroke="#900d14" stroke-width="1.2">95</text>
      </svg>
    `
  },
  {
    id: 'ratatouille',
    name: '主廚雷米',
    movie: '料理鼠王',
    color: '#d5a06c',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 背景木湯匙交叉裝飾 -->
        <line x1="26" y1="74" x2="74" y2="26" stroke="#d5a06c" stroke-width="4" stroke-linecap="round"/>
        <circle cx="74" cy="26" r="7" fill="#d5a06c"/>
        <!-- 白色膨脹主廚帽 (Toque) -->
        <path d="M 32 60 C 20 48 30 30 42 36 C 45 22 60 22 66 32 C 78 30 84 48 72 60 Z" fill="#ffffff" stroke="#c0d4e4" stroke-width="2.5"/>
        <!-- 廚師帽底部束帶 -->
        <rect x="33" y="60" width="38" height="11" rx="3" fill="#ffffff" stroke="#c0d4e4" stroke-width="2"/>
        <!-- 小老鼠雷米的粉嫩鼻子與鬍鬚 -->
        <ellipse cx="52" cy="79" rx="3.5" ry="2.5" fill="#f8a5a5"/>
        <path d="M 46 78 L 32 75 M 46 80 L 30 82 M 58 78 L 72 75 M 58 80 L 74 82" stroke="#688198" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'walle',
    name: '瓦力',
    movie: '瓦力',
    color: '#bfa044',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 連結脖子關節 -->
        <rect x="46" y="58" width="8" height="18" fill="#7a7873"/>
        <!-- 瓦力招牌雙筒斜角雙眼外框 -->
        <g transform="rotate(-6 50 48)">
          <!-- 左眼 -->
          <rect x="20" y="32" width="26" height="30" rx="7" fill="#bfa044" stroke="#66531d" stroke-width="2.5"/>
          <circle cx="33" cy="47" r="9" fill="#1b242a"/>
          <circle cx="33" cy="47" r="7" fill="#367098"/>
          <circle cx="33" cy="47" r="4" fill="#0d1419"/>
          <circle cx="31" cy="44" r="2" fill="#ffffff"/>
          <!-- 右眼 -->
          <rect x="54" y="32" width="26" height="30" rx="7" fill="#bfa044" stroke="#66531d" stroke-width="2.5"/>
          <circle cx="67" cy="47" r="9" fill="#1b242a"/>
          <circle cx="67" cy="47" r="7" fill="#367098"/>
          <circle cx="67" cy="47" r="4" fill="#0d1419"/>
          <circle cx="65" cy="44" r="2" fill="#ffffff"/>
          <!-- 中間連接眉心螺栓 -->
          <rect x="45" y="44" width="10" height="6" rx="2" fill="#66531d"/>
        </g>
      </svg>
    `
  },
  {
    id: 'incredibles',
    name: '超人特攻隊',
    movie: '超人特攻隊',
    color: '#ea2825',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 黑色橢圓基底標誌 -->
        <ellipse cx="50" cy="50" rx="42" ry="32" fill="#101010"/>
        <!-- 外圍金黃色發光軌道 -->
        <path d="M 18 58 C 24 34 76 28 84 46" fill="none" stroke="#fed130" stroke-width="6" stroke-linecap="round"/>
        <path d="M 20 62 C 34 74 74 68 82 52" fill="none" stroke="#ea2825" stroke-width="5" stroke-linecap="round"/>
        <!-- 標誌性超人「i」字母 -->
        <circle cx="50" cy="38" r="5" fill="#fed130"/>
        <path d="M 45 48 C 45 48 55 45 55 58 C 55 64 45 66 45 66" fill="none" stroke="#fed130" stroke-width="6.5" stroke-linecap="round"/>
      </svg>
    `
  },
  // Bonus Pixar Cards for Expert mode
  {
    id: 'woody_badge',
    name: '胡迪警徽',
    movie: '玩具總動員',
    color: '#f5b041',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 經典警長星星徽章 -->
        <polygon points="50,15 58,35 80,35 63,49 69,70 50,57 31,70 37,49 20,35 42,35" fill="#fecf1c" stroke="#cf9004" stroke-width="2.5"/>
        <circle cx="50" cy="15" r="4.5" fill="#cf9004"/>
        <circle cx="80" cy="35" r="4.5" fill="#cf9004"/>
        <circle cx="69" cy="70" r="4.5" fill="#cf9004"/>
        <circle cx="31" cy="70" r="4.5" fill="#cf9004"/>
        <circle cx="20" cy="35" r="4.5" fill="#cf9004"/>
        <circle cx="50" cy="46" r="14" fill="#ffffff" opacity="0.3"/>
        <text x="50" y="50" font-size="11" font-weight="900" fill="#784705" text-anchor="middle" font-family="sans-serif">SHERIFF</text>
      </svg>
    `
  },
  {
    id: 'coco_guitar',
    name: '米高吉他',
    movie: '可可夜總會',
    color: '#9b59b6',
    svg: `
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- 骷髏白吉他琴頭與琴身 -->
        <circle cx="50" cy="66" r="23" fill="#fcfcfc" stroke="#333" stroke-width="2"/>
        <circle cx="50" cy="46" r="16" fill="#fcfcfc" stroke="#333" stroke-width="2"/>
        <circle cx="50" cy="56" r="7" fill="#2d3436"/>
        <rect x="47" y="14" width="6" height="30" fill="#2d3436"/>
        <polygon points="43,12 57,12 54,20 46,20" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
        <!-- 黑色亡靈節墨繪花紋 -->
        <circle cx="43" cy="65" r="3" fill="#333"/>
        <circle cx="57" cy="65" r="3" fill="#333"/>
        <path d="M 44 76 Q 50 80 56 76" stroke="#333" stroke-width="2" fill="none"/>
      </svg>
    `
  }
];

export const DIFFICULTY_PRESETS: Record<DifficultyConfig['id'], DifficultyConfig> = {
  easy: {
    id: 'easy',
    name: '輕鬆 (6 對)',
    pairs: 6,
    gridCols: 'grid-cols-3 sm:grid-cols-4',
    gridClass: 'grid-cols-3 sm:grid-cols-4 max-w-[380px]',
    description: '12 張卡牌，適合熱身或小朋友遊玩'
  },
  classic: {
    id: 'classic',
    name: '經典 (8 對)',
    pairs: 8,
    gridCols: 'grid-cols-4',
    gridClass: 'grid-cols-4 max-w-[460px]',
    description: '16 張卡牌 4x4 經典配置，考驗記憶力'
  },
  expert: {
    id: 'expert',
    name: '挑戰 (10 對)',
    pairs: 10,
    gridCols: 'grid-cols-4 sm:grid-cols-5',
    gridClass: 'grid-cols-4 sm:grid-cols-5 max-w-[540px]',
    description: '20 張卡牌，加入可可夜總會與胡迪警徽'
  }
};
