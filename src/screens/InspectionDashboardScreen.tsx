import React from 'react';
import { ScreenType, StageInfo, StageId } from '../types';
import { Sprout, ClipboardList, Tractor, GraduationCap, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface InspectionDashboardScreenProps {
  stages: StageInfo[];
  onSelectStage: (stageId: StageId) => void;
  onNavigate: (screen: ScreenType) => void;
  adminUnlocked: boolean;
}

export const InspectionDashboardScreen: React.FC<InspectionDashboardScreenProps> = ({
  stages,
  onSelectStage,
  onNavigate,
  adminUnlocked,
}) => {
  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'sprout':
        return <Sprout size={28} />;
      case 'inventory':
        return <ClipboardList size={28} />;
      case 'agriculture':
        return <Tractor size={28} />;
      case 'school':
        return <GraduationCap size={28} />;
      default:
        return <Sprout size={28} />;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24">
      {/* Welcome Inspector Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#008B72] p-4 text-white shadow-md">
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
            FIELD INSPECTION OPERATIONS
          </span>
          <h2 className="text-xl font-bold">नमस्ते, निरीक्षक (Inspection Kshetra)</h2>
          <p className="text-xs text-white/90 font-medium">
            प्रक्रमबद्ध चार चरणों का अवलोकन एवं निरीक्षण करें
          </p>
        </div>

        {/* Decorative background leaf/field graphic */}
        <div className="absolute right-[-10px] top-[-10px] opacity-15 pointer-events-none">
          <svg className="w-36 h-36 text-white" viewBox="0 0 200 200" fill="currentColor">
            <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.7,89.3,-0.7C88.1,14.3,80.6,28.6,71.1,41.2C61.6,53.8,50.1,64.7,36.6,71.7C23.1,78.7,7.5,81.8,-8.1,79.5C-23.7,77.2,-39.3,69.5,-51.7,58.8C-64.1,48.1,-73.3,34.4,-78.6,19.3C-83.9,4.2,-85.3,-12.3,-80.4,-27.1C-75.5,-41.9,-64.3,-55,-50.7,-62.1C-37.1,-69.2,-21.1,-70.3,-5.1,-61.5C10.9,-52.7,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Sequential Stages Rule Info Bar */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-amber-900 text-xs">
        <span className="text-amber-600 font-bold shrink-0 mt-0.5">ⓘ</span>
        <div className="leading-snug">
          <strong>अनुक्रमिक नियम (Sequential Workflow):</strong> स्टेज 1 (बुआई) पूर्ण होने पर ही स्टेज 2 (सामान्य) अनलॉक होगा। इसी प्रकार स्टेज 3 एवं 4 अनलॉक होंगे।
        </div>
      </div>

      {/* Stage Cards List */}
      <div className="flex flex-col gap-3.5">
        {stages.map((stage) => {
          const isUnlocked = stage.isUnlocked || adminUnlocked;
          const progressPercent = Math.round(
            (stage.completedCount / (stage.completedCount + stage.pendingCount || 1)) * 100
          );
          const isFullyCompleted = stage.pendingCount === 0;

          return (
            <div
              key={stage.id}
              className={`rounded-xl p-4 shadow-sm transition-all border ${
                isUnlocked
                  ? 'bg-white border-slate-200 hover:border-[#008B72]'
                  : 'bg-white opacity-60 grayscale border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-[#008B72]/10 text-[#008B72] border border-[#008B72]/20'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {getStageIcon(stage.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-[#008B72] uppercase bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                        Stage {stage.id}
                      </span>
                      <h3 className="font-bold text-base text-slate-800 leading-tight">
                        {stage.titleHindi}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{stage.titleEng}</p>
                  </div>
                </div>

                {/* Status Badge */}
                {isFullyCompleted ? (
                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200 uppercase">
                    <CheckCircle2 size={13} />
                    <span>Done</span>
                  </span>
                ) : isUnlocked ? (
                  <span className="bg-[#008B72] text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-xs uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
                    <span>Open</span>
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase">
                    <Lock size={12} />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-3 my-2">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Pending (लंबित)
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      stage.pendingCount > 0 ? 'text-orange-600' : 'text-slate-400'
                    }`}
                  >
                    {stage.pendingCount}
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Completed (पूर्ण)
                  </span>
                  <span className="text-lg font-bold text-[#008B72]">
                    {stage.completedCount}
                  </span>
                </div>
              </div>



              {/* Action Button */}
              {isUnlocked ? (
                <button
                  onClick={() => {
                    onSelectStage(stage.id);
                    onNavigate('farmer_list');
                  }}
                  className="w-full mt-3 bg-[#008B72] hover:bg-[#007661] text-white h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
                >
                  <span>निरीक्षण प्रारंभ करें (Start Inspection)</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <div className="mt-3 p-2.5 bg-slate-100 rounded-xl text-center text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 border border-slate-200">
                  <Lock size={14} className="text-slate-400" />
                  <span>
                    स्टेज {stage.id - 1} की सभी लंबित जांच पूर्ण होने पर स्वतः अनलॉक होगा
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
