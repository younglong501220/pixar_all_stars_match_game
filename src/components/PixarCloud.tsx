import React from 'react';

export const PixarClouds: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 經典玩具總動員臥室風雲朵 1 */}
      <div className="absolute top-[8%] -left-36 animate-float-cloud-1 opacity-70">
        <div className="relative w-36 h-12 bg-white/70 rounded-full shadow-sm">
          <div className="absolute -top-7 left-6 w-16 h-16 bg-white/70 rounded-full" />
          <div className="absolute -top-5 left-18 w-12 h-12 bg-white/70 rounded-full" />
        </div>
      </div>

      {/* 雲朵 2 (反向漂浮) */}
      <div className="absolute top-[22%] -right-44 animate-float-cloud-2 opacity-60">
        <div className="relative w-44 h-14 bg-white/70 rounded-full shadow-sm">
          <div className="absolute -top-8 left-8 w-18 h-18 bg-white/70 rounded-full" />
          <div className="absolute -top-6 left-24 w-14 h-14 bg-white/70 rounded-full" />
        </div>
      </div>

      {/* 雲朵 3 (低空緩慢) */}
      <div className="absolute top-[68%] -left-48 animate-float-cloud-3 opacity-40 hidden sm:block">
        <div className="relative w-48 h-14 bg-white/50 rounded-full">
          <div className="absolute -top-9 left-10 w-20 h-20 bg-white/50 rounded-full" />
          <div className="absolute -top-7 left-26 w-16 h-16 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};
