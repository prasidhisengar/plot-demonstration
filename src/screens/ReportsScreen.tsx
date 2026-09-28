import React from 'react';
import { ScreenType, BlockSummary, StageInfo } from '../types';
import { BarChart2, PieChart, Download, FileSpreadsheet, CheckCircle, RefreshCw } from 'lucide-react';

interface ReportsScreenProps {
  blocks: BlockSummary[];
  stages: StageInfo[];
  onNavigate: (screen: ScreenType) => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  blocks,
  stages,
  onNavigate,
}) => {
  const totalPending = stages.reduce((acc, s) => acc + s.pendingCount, 0);
  const totalCompleted = stages.reduce((acc, s) => acc + s.completedCount, 0);
  const totalPlots = totalPending + totalCompleted;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24">
      {/* Top Banner */}
      <div className="bg-[#008B72] text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
            DISTRICT RAISEN ANALYTICS
          </span>
          <h2 className="text-xl font-bold">निरीक्षण रिपोर्ट्स (Reports)</h2>
          <p className="text-xs text-white/90 mt-0.5">
            वित्तीय वर्ष 2026-27 | प्रगति विवरण
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-amber-300">
          <BarChart2 size={24} />
        </div>
      </div>

      {/* Progress Cards */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 text-[#008B72]">
          <PieChart size={18} />
          <span>निरीक्षण प्रगति सारांश (Summary)</span>
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 font-bold uppercase">कुल प्लॉट</span>
            <p className="text-lg font-bold text-slate-800">{totalPlots}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 p-2.5 rounded-xl">
            <span className="text-[10px] text-orange-900 font-bold uppercase">लंबित</span>
            <p className="text-lg font-bold text-orange-600">{totalPending}</p>
          </div>
          <div className="bg-green-50 border border-green-200 p-2.5 rounded-xl">
            <span className="text-[10px] text-green-900 font-bold uppercase">पूर्ण</span>
            <p className="text-lg font-bold text-[#008B72]">{totalCompleted}</p>
          </div>
        </div>


      </div>

      {/* Block-wise Breakdown Table */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
        <h3 className="font-bold text-sm text-[#008B72]">
          ब्लॉक-वार स्थिति (Block Breakdown)
        </h3>

        <div className="divide-y divide-slate-100">
          {blocks.map((block) => (
            <div key={block.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">
                  {block.nameHindi} ({block.code})
                </p>
                <p className="text-[10px] text-slate-500">
                  Pending: {block.pendingCount} | Done: {block.completedCount}
                </p>
              </div>
              <span className="px-2 py-1 rounded bg-green-100 text-[#008B72] font-bold text-[11px]">
                {Math.round(
                  (block.completedCount / (block.completedCount + block.pendingCount || 1)) * 100
                )}
                %
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Export Reports */}
      <div className="flex gap-2.5">
        <button
          onClick={() => alert('PDF रिपोर्ट डाउनलोड प्रारंभ हो गई है (Export PDF Started)')}
          className="flex-1 h-11 bg-[#008B72] hover:bg-[#007661] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Download size={15} />
          <span>Export PDF</span>
        </button>

        <button
          onClick={() => alert('Excel डेटा शीट डाउनलोड की गई है (Export Excel Sheet)')}
          className="flex-1 h-11 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <FileSpreadsheet size={15} className="text-[#008B72]" />
          <span>Export Excel</span>
        </button>
      </div>
    </div>
  );
};
