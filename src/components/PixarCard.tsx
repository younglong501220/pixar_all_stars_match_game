import React from 'react';
import { PlayingCard } from '../types';
import { PIXAR_BALL_SVG } from '../data/cards';

interface PixarCardProps {
  card: PlayingCard;
  index: number;
  disabled: boolean;
  onClick: (card: PlayingCard) => void;
}

export const PixarCard: React.FC<PixarCardProps> = ({
  card,
  index,
  disabled,
  onClick,
}) => {
  const handleClick = () => {
    if (disabled || card.isFlipped || card.isMatched) return;
    onClick(card);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={card.isMatched ? -1 : 0}
      aria-label={`卡牌 ${index + 1}: ${card.isFlipped || card.isMatched ? card.name : '未翻開'}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative w-full aspect-square perspective-1000 select-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-300 rounded-2xl group ${
        card.isMatched ? 'cursor-default pointer-events-none' : ''
      }`}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-2xl ${
          card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
        } ${card.isMatched ? 'animate-match' : ''}`}
      >
        {/* 卡牌背面 (皮克斯經典球 Luxo Ball) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden flex items-center justify-center p-2.5 transition-all duration-200 border-3 border-white/90 shadow-md ${
            'bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-200 hover:border-amber-400 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <div
            className="w-[82%] h-[82%] flex items-center justify-center pointer-events-none transition-transform duration-200 group-hover:scale-105"
            dangerouslySetInnerHTML={{ __html: PIXAR_BALL_SVG }}
          />
        </div>

        {/* 卡牌正面 (皮克斯角色徽章) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-between p-2 sm:p-3 bg-white border-3 transition-all duration-200 ${
            card.isMatched
              ? 'border-amber-400 bg-gradient-to-b from-white to-amber-50 shadow-[0_0_20px_rgba(251,191,36,0.65)]'
              : 'border-white shadow-md'
          }`}
        >
          {/* 角色 SVG 視覺 */}
          <div
            className="w-[72%] h-[72%] flex items-center justify-center pointer-events-none mt-0.5 filter drop-shadow-sm transition-transform duration-200"
            dangerouslySetInnerHTML={{ __html: card.svg }}
          />

          {/* 角色名稱標籤 */}
          <div className="w-full flex flex-col items-center justify-center pointer-events-none pb-0.5">
            <span className="text-[11px] sm:text-xs font-black text-slate-800 tracking-wide truncate max-w-full">
              {card.name}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-sky-700/80 -mt-0.5 truncate max-w-full">
              {card.movie}
            </span>
          </div>

          {/* 配對完成小徽章 */}
          {card.isMatched && (
            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-400 text-amber-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
              ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
