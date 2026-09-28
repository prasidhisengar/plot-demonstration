import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isFrameEnabled: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, isFrameEnabled }) => {
  const [timeStr, setTimeStr] = useState('10:42');

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${h}:${m}`);
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  if (!isFrameEnabled) {
    return <div className="min-h-screen bg-[#f7fbf1]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-2 sm:p-6 overflow-x-hidden">
      {/* Android Device Outer Frame */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-700/80 flex flex-col overflow-hidden">
        {/* Top Phone Speaker / Punch Hole Camera */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2">
          <div className="w-16 h-3 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
            <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800"></div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-7 bg-[#008B72] text-white px-6 flex items-center justify-between text-[11px] font-semibold shrink-0 pt-1 z-40 select-none">
          <span>{timeStr}</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <span className="text-[9px] font-mono tracking-tighter">5G</span>
            <Signal size={12} />
            <Wifi size={12} />
            <BatteryMedium size={14} />
          </div>
        </div>

        {/* Screen Content Window */}
        <div className="flex-1 bg-[#f7fbf1] overflow-y-auto relative rounded-b-[32px] no-scrollbar">
          {children}
        </div>

        {/* Android Bottom Gesture Bar */}
        <div className="h-5 bg-white flex items-center justify-center shrink-0 border-t border-slate-100 z-40">
          <div className="w-28 h-1 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
