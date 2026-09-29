import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles, BookOpen, Info, X } from 'lucide-react';
import { PlayingCard, DifficultyMode, BestRecord } from './types';
import { PIXAR_CARDS, DIFFICULTY_PRESETS } from './data/cards';
import { PixarCard } from './components/PixarCard';
import { PixarClouds } from './components/PixarCloud';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { WinModal } from './components/WinModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [difficulty, setDifficulty] = useState<DifficultyMode>('classic');
  const [cards, setCards] = useState<PlayingCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<PlayingCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.muted);
  const [combo, setCombo] = useState(1);
  const [showGuide, setShowGuide] = useState(false);
  const [bestRecords, setBestRecords] = useState<Record<DifficultyMode, BestRecord | null>>({
    easy: null,
    classic: null,
    expert: null,
  });
  const [isNewBest, setIsNewBest] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Load best records from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixar_memory_records');
      if (saved) {
        setBestRecords(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const currentConfig = DIFFICULTY_PRESETS[difficulty];
  const totalPairs = currentConfig.pairs;

  // Format seconds to mm:ss
  const formatTime = (totalSecs: number) => {
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Fisher-Yates Shuffle
  const shuffle = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Initialize or Reset Game
  const initGame = useCallback(
    (targetDifficulty: DifficultyMode = difficulty) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      setIsTimerRunning(false);
      setSecondsElapsed(0);
      setMoves(0);
      setMatchedPairs(0);
      setFlippedCards([]);
      setIsBoardLocked(false);
      setIsGameWon(false);
      setIsNewBest(false);
      setCombo(1);

      const config = DIFFICULTY_PRESETS[targetDifficulty];
      // Select the first N cards based on difficulty
      const selectedDefs = PIXAR_CARDS.slice(0, config.pairs);

      // Create pairs
      const deck: PlayingCard[] = [];
      selectedDefs.forEach((def) => {
        deck.push({
          instanceId: `${def.id}-1`,
          cardId: def.id,
          name: def.name,
          movie: def.movie,
          color: def.color,
          svg: def.svg,
          isFlipped: false,
          isMatched: false,
        });
        deck.push({
          instanceId: `${def.id}-2`,
          cardId: def.id,
          name: def.name,
          movie: def.movie,
          color: def.color,
          svg: def.svg,
          isFlipped: false,
          isMatched: false,
        });
      });

      const shuffledDeck = shuffle(deck);
      setCards(shuffledDeck);
      soundManager.playShuffle();
    },
    [difficulty]
  );

  // Initial load
  useEffect(() => {
    initGame(difficulty);
  }, []);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  // Handle Card Click
  const handleCardClick = (clickedCard: PlayingCard) => {
    if (isBoardLocked) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Start timer on first move
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    soundManager.playFlip();

    // Flip card visually
    const nextCards = cards.map((c) =>
      c.instanceId === clickedCard.instanceId ? { ...c, isFlipped: true } : c
    );
    setCards(nextCards);

    const nextFlipped = [...flippedCards, clickedCard];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsBoardLocked(true);

      const [cardA, cardB] = nextFlipped;
      const isMatch = cardA.cardId === cardB.cardId;

      if (isMatch) {
        // MATCH SUCCESS
        setTimeout(() => {
          soundManager.playMatch(combo);
          setCombo((prev) => prev + 1);

          setCards((prev) =>
            prev.map((c) =>
              c.cardId === cardA.cardId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );

          setMatchedPairs((prev) => {
            const newCount = prev + 1;
            if (newCount === totalPairs) {
              handleGameWin();
            }
            return newCount;
          });

          setFlippedCards([]);
          setIsBoardLocked(false);
        }, 320);
      } else {
        // MISMATCH
        setTimeout(() => {
          soundManager.playMismatch();
          setCombo(1); // Reset combo
          setCards((prev) =>
            prev.map((c) =>
              c.instanceId === cardA.instanceId || c.instanceId === cardB.instanceId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsBoardLocked(false);
        }, 850);
      }
    }
  };

  // Handle Victory
  const handleGameWin = () => {
    setIsTimerRunning(false);
    soundManager.playVictory();
    setIsGameWon(true);

    // Check Best Record
    const currentBest = bestRecords[difficulty];
    const isBetter =
      !currentBest ||
      moves + 1 < currentBest.moves ||
      (moves + 1 === currentBest.moves && secondsElapsed < currentBest.timeSeconds);

    if (isBetter) {
      setIsNewBest(true);
      const updatedBest: BestRecord = {
        moves: moves + 1,
        timeSeconds: secondsElapsed,
      };
      const newRecords = { ...bestRecords, [difficulty]: updatedBest };
      setBestRecords(newRecords);
      try {
        localStorage.setItem('pixar_memory_records', JSON.stringify(newRecords));
      } catch {
        // ignore
      }
    }
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Change difficulty
  const handleSelectDifficulty = (mode: DifficultyMode) => {
    setDifficulty(mode);
    initGame(mode);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-3 px-3 sm:px-6 overflow-x-hidden bg-gradient-to-b from-[#3a9bdc] via-[#84caef] to-[#e8f7fd] font-sans text-slate-800 select-none">
      {/* 浮動皮克斯雲朵 (Andy's Room Clouds) */}
      <PixarClouds />

      {/* 勝利彩色拉炮 */}
      <ConfettiCanvas active={isGameWon} />

      {/* 頁首標題列 */}
      <header className="w-full max-w-[480px] flex flex-col items-center z-10 mb-3">
        <div className="flex items-center justify-between w-full mb-2">
          {/* 角色圖鑑按鈕 */}
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1 text-xs font-black text-sky-900 bg-white/80 hover:bg-white px-2.5 py-1.5 rounded-xl shadow-sm border border-sky-100 transition-all cursor-pointer"
            title="查看經典皮克斯角色介紹"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            <span>角色圖鑑</span>
          </button>

          {/* 標題 */}
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow-[0_2px_4px_rgba(15,62,102,0.4)] flex items-center gap-1.5">
            <span className="text-2xl">🎈</span>
            皮克斯翻牌大考驗
          </h1>

          {/* 難度標籤切換 */}
          <div className="flex items-center bg-white/70 p-0.5 rounded-xl shadow-sm border border-sky-100">
            {(['easy', 'classic', 'expert'] as DifficultyMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => handleSelectDifficulty(mode)}
                className={`text-[11px] font-black px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  difficulty === mode
                    ? 'bg-amber-400 text-amber-950 shadow-sm'
                    : 'text-sky-800 hover:text-sky-950'
                }`}
              >
                {mode === 'easy' ? '輕鬆' : mode === 'classic' ? '經典' : '挑戰'}
              </button>
            ))}
          </div>
        </div>

        {/* 遊戲數據狀態列 */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_20px_rgba(18,75,120,0.15)] border border-white/80 flex items-center justify-between">
          {/* 翻牌步數 */}
          <div className="flex flex-col items-center px-1.5">
            <span className="text-[10px] sm:text-xs font-black text-sky-700/80 uppercase tracking-wider">
              步數
            </span>
            <span className="text-lg sm:text-xl font-black text-sky-950 tabular-nums">
              {moves}
            </span>
          </div>

          {/* 配對進度 */}
          <div className="flex flex-col items-center px-1.5">
            <span className="text-[10px] sm:text-xs font-black text-sky-700/80 uppercase tracking-wider">
              已配對
            </span>
            <span className="text-lg sm:text-xl font-black text-sky-950 tabular-nums">
              {matchedPairs} / {totalPairs}
            </span>
          </div>

          {/* 耗時 */}
          <div className="flex flex-col items-center px-1.5">
            <span className="text-[10px] sm:text-xs font-black text-sky-700/80 uppercase tracking-wider">
              耗時
            </span>
            <span className="text-lg sm:text-xl font-black text-sky-950 font-mono tabular-nums">
              {formatTime(secondsElapsed)}
            </span>
          </div>

          {/* 功能按鈕組 */}
          <div className="flex items-center gap-1.5 pl-1">
            {/* 音效開關 */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl text-sky-800 font-bold transition-all shadow-sm cursor-pointer ${
                isMuted
                  ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                  : 'bg-sky-100 hover:bg-sky-200 text-sky-800'
              }`}
              title={isMuted ? '開啟音效' : '靜音'}
              aria-label="音效開關"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* 重新開始按鈕 */}
            <button
              onClick={() => initGame(difficulty)}
              className="py-1.5 px-3 bg-gradient-to-b from-amber-300 to-amber-400 text-amber-950 font-black text-xs sm:text-sm rounded-xl shadow-[0_3px_0_#d97706] hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 cursor-pointer"
              title="重新洗牌開局"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>重玩</span>
            </button>
          </div>
        </div>

        {/* 連擊特效提示 */}
        {combo > 2 && (
          <div className="mt-1.5 px-3 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 text-xs font-black rounded-full shadow-sm animate-bounce flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{combo - 1} 連勝配對！COMBO BONUS!</span>
          </div>
        )}
      </header>

      {/* 卡牌主網格區域 */}
      <main className="w-full max-w-[480px] flex items-center justify-center z-10 my-auto">
        <div
          className={`w-full grid gap-2 sm:gap-2.5 aspect-square ${
            difficulty === 'easy'
              ? 'grid-cols-3 sm:grid-cols-4 max-w-[390px]'
              : difficulty === 'classic'
              ? 'grid-cols-4 max-w-[460px]'
              : 'grid-cols-4 sm:grid-cols-5 max-w-[490px]'
          }`}
          aria-label="皮克斯卡牌翻牌區"
        >
          {cards.map((card, idx) => (
            <PixarCard
              key={card.instanceId}
              card={card}
              index={idx}
              disabled={isBoardLocked}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </main>

      {/* 底部紀錄資訊 */}
      <footer className="w-full max-w-[480px] z-10 mt-3 flex items-center justify-between text-[11px] font-bold text-sky-900/80 px-2">
        <div>
          {bestRecords[difficulty] ? (
            <span>
              🏆 最佳：{bestRecords[difficulty]?.moves} 步 ({formatTime(bestRecords[difficulty]?.timeSeconds || 0)})
            </span>
          ) : (
            <span>💡 點擊卡牌展開冒險，連擊有驚喜音效！</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-sky-900/70">
          <span>皮克斯幾何純向量繪製</span>
        </div>
      </footer>

      {/* 勝利結算彈窗 */}
      <WinModal
        isOpen={isGameWon}
        moves={moves}
        timeFormatted={formatTime(secondsElapsed)}
        totalPairs={totalPairs}
        isNewBest={isNewBest}
        onRestart={() => initGame(difficulty)}
        onSelectDifficulty={handleSelectDifficulty}
        currentDifficulty={difficulty}
      />

      {/* 角色圖鑑彈窗 */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md max-h-[85vh] bg-white rounded-3xl p-5 shadow-2xl flex flex-col border-4 border-amber-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <h3 className="text-lg font-black text-slate-800">皮克斯經典角色圖鑑</h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-3 space-y-2.5 pr-1">
              {PIXAR_CARDS.map((char) => (
                <div
                  key={char.id}
                  className="flex items-center gap-3 p-2 rounded-2xl bg-sky-50/70 border border-sky-100"
                >
                  <div
                    className="w-14 h-14 shrink-0 bg-white rounded-xl p-1 shadow-sm border border-slate-100 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: char.svg }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{char.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                        {char.movie}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {char.id === 'alien' && '經典披薩星球三眼怪！「爪子是我們的主人～」'}
                      {char.id === 'mike' && '怪獸電力公司驚嚇專員與毛怪最佳拍檔大眼仔！'}
                      {char.id === 'up' && '卡爾爺爺用彩色氣球載著回憶小屋飛向仙境瀑布。'}
                      {char.id === 'nemo' && '擁有特別幸運右鰭的小丑魚，在大海勇敢探索！'}
                      {char.id === 'cars' && '傳奇 95 號跑車閃電麥坤！Ka-Chow！'}
                      {char.id === 'ratatouille' && '「人人都可烹飪！」天才料理鼠王雷米。'}
                      {char.id === 'walle' && '在地球默默清理垃圾數百年的深情機器人。'}
                      {char.id === 'incredibles' && '超能先生一家的金色發光「i」英雄標誌！'}
                      {char.id === 'woody_badge' && '胡迪警長胸前的金色五角星星警徽！'}
                      {char.id === 'coco_guitar' && '骷髏裝飾的白色吉他，彈奏〈Remember Me〉。'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-3 w-full py-2.5 bg-sky-600 text-white font-bold text-sm rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
            >
              我知道了，開始挑戰！
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
