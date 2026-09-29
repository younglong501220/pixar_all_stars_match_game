import React, { useState } from 'react';
import { Trophy, RotateCcw, Share2, Check, Star } from 'lucide-react';
import { DifficultyMode } from '../types';

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  timeFormatted: string;
  totalPairs: number;
  isNewBest: boolean;
  onRestart: () => void;
  onSelectDifficulty?: (mode: DifficultyMode) => void;
  currentDifficulty: DifficultyMode;
}

export const WinModal: React.FC<WinModalProps> = ({
  isOpen,
  moves,
  timeFormatted,
  totalPairs,
  isNewBest,
  onRestart,
  onSelectDifficulty,
  currentDifficulty,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Calculate star rating
  // Perfect is totalPairs (ideal minimum moves)
  let stars = 1;
  if (moves <= totalPairs + 3) {
    stars = 3;
  } else if (moves <= totalPairs * 2) {
    stars = 2;
  }

  const handleShare = () => {
    const starText = '⭐'.repeat(stars);
    const text = `🎈 我在《皮克斯翻牌記憶大考驗》以 ${moves} 步、耗時 ${timeFormatted} 獲得了 ${starText}！快來挑戰你的記憶力！`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 text-center shadow-2xl border-4 border-amber-300 transform animate-in zoom-in-95 duration-300">
        {/* 頂部裝飾獎盃 */}
        <div className="w-20 h-20 mx-auto -mt-14 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <Trophy className="w-10 h-10 text-amber-900 drop-shadow" />
        </div>

        <h2 className="mt-3 text-3xl font-black text-red-600 tracking-wider">
          YOU WIN!
        </h2>
        <p className="text-sm font-bold text-sky-800 mt-1">
          太棒了！所有皮克斯好朋友都找到了！
        </p>

        {/* 星等評價 */}
        <div className="flex justify-center items-center gap-1.5 my-3">
          {[1, 2, 3].map((starIndex) => (
            <Star
              key={starIndex}
              className={`w-8 h-8 ${
                starIndex <= stars
                  ? 'fill-amber-400 text-amber-500 scale-110'
                  : 'fill-slate-200 text-slate-300'
              } transition-transform`}
            />
          ))}
        </div>

        {/* 新紀錄提示 */}
        {isNewBest && (
          <div className="inline-block bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm mb-3 animate-pulse">
            🎉 刷新個人最佳紀錄！
          </div>
        )}

        {/* 成績數據面板 */}
        <div className="grid grid-cols-2 gap-3 bg-sky-50 rounded-2xl p-3.5 mb-5 border border-sky-100">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-sky-700/80">總步數</span>
            <span className="text-2xl font-black text-sky-950">{moves}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-sky-700/80">通關時間</span>
            <span className="text-2xl font-black text-sky-950 font-mono">{timeFormatted}</span>
          </div>
        </div>

        {/* 難度選擇 */}
        {onSelectDifficulty && (
          <div className="mb-4">
            <div className="text-xs font-bold text-slate-500 mb-1.5">切換難度</div>
            <div className="flex justify-center gap-1.5">
              {(['easy', 'classic', 'expert'] as DifficultyMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => onSelectDifficulty(mode)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all ${
                    currentDifficulty === mode
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mode === 'easy' ? '輕鬆 (6對)' : mode === 'classic' ? '經典 (8對)' : '挑戰 (10對)'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onRestart}
            className="w-full py-3 px-6 bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 text-amber-950 font-black text-base rounded-2xl shadow-[0_4px_0_#d97706] hover:brightness-105 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            再玩一次 ✨
          </button>

          <button
            onClick={handleShare}
            className="w-full py-2.5 px-4 bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                已複製成績分享文字！
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-sky-700" />
                分享成績
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
