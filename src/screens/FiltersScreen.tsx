import React, { useState } from 'react';
import { ScreenType, FilterState, BlockSummary } from '../types';
import { Filter, Search, RotateCcw, Map, ChevronRight, Sprout, AlertCircle } from 'lucide-react';

interface FiltersScreenProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onSearch: () => void;
  onReset: () => void;
  blocks: BlockSummary[];
  onNavigate: (screen: ScreenType) => void;
}

export const FiltersScreen: React.FC<FiltersScreenProps> = ({
  filterState,
  onFilterChange,
  onSearch,
  onReset,
  blocks,
  onNavigate,
}) => {
  const [selectedBlock, setSelectedBlock] = useState<string>(filterState.block || '');

  const handleBlockCardSelect = (blockId: string) => {
    setSelectedBlock(blockId);
    onFilterChange({ block: blockId });
  };

  const handleSearchClick = () => {
    if (!selectedBlock) {
      alert('कृपया आगे बढ़ने के लिए ब्लॉक का चयन करें (Please select a Block first)');
      return;
    }
    onFilterChange({ block: selectedBlock });
    onSearch();
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24">
      {/* Interactive Header Greeting Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#008B72] p-4 text-white shadow-md flex items-center justify-between">
        <div className="z-10 flex-1">
          <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-0.5">
            <Sprout size={14} />
            <span>Demonstration Plot</span>
          </div>
          <h2 className="text-xl font-bold">नमस्ते! डी.डी.ए. अधिकारी</h2>
          <p className="text-xs text-white/90 mt-0.5">
            प्लॉट विवरण देखने के लिए फिल्टर का चयन करें
          </p>
        </div>
        <div className="w-16 h-16 text-white/20 shrink-0 flex items-center justify-center">
          <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11a2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Form Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#008B72] border-b border-slate-100 pb-2">
          <Filter size={18} />
          <h3 className="font-bold text-sm text-slate-800">फिल्टर खोजें (Select Filters)</h3>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-3">
          {/* Financial Year */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
              वित्तीय वर्ष * <span className="text-[#008B72]">(FY)</span>
            </label>
            <select
              value={filterState.financialYear}
              onChange={(e) => onFilterChange({ financialYear: e.target.value })}
              className="w-full h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
            >
              <option value="2026-27">2026-2027</option>
              <option value="2025-26">2025-2026</option>
              <option value="2024-25">2024-2025</option>
            </select>
          </div>

          {/* Season */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
              मौसम * <span className="text-[#008B72]">(Season)</span>
            </label>
            <select
              value={filterState.season}
              onChange={(e) => onFilterChange({ season: e.target.value })}
              className="w-full h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
            >
              <option value="खरीफ (Kharif)">खरीफ (Kharif)</option>
              <option value="रबी (Rabi)">रबी (Rabi)</option>
              <option value="वार्षिक (Annual)">वार्षिक सीजन</option>
            </select>
          </div>
        </div>

        {/* Scheme */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-700">
            योजना * <span className="text-[#008B72]">(Scheme)</span>
          </label>
          <select
            value={filterState.scheme}
            onChange={(e) => onFilterChange({ scheme: e.target.value })}
            className="w-full h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
          >
            <option value="NFSM Pulses">एनएफएसएम - दलहन (NFSM Pulses)</option>
            <option value="RKVY">राष्ट्रीय कृषि विकास योजना (RKVY)</option>
            <option value="Oilseeds">तेलहन मिशन (Oilseeds)</option>
            <option value="Cereals">खाद्यान्न उत्पादन (Cereals)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Block */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
              ब्लॉक * <span className="text-[#008B72]">(Block)</span>
            </label>
            <select
              value={selectedBlock}
              onChange={(e) => {
                setSelectedBlock(e.target.value);
                onFilterChange({ block: e.target.value });
              }}
              className={`w-full h-10 border rounded-lg px-2.5 text-xs font-medium focus:ring-2 focus:ring-[#008B72] outline-none ${
                selectedBlock
                  ? 'bg-green-50 border-[#008B72] text-[#008B72] font-bold'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <option value="">ब्लॉक चुनें (Select)</option>
              {blocks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nameHindi} ({b.nameEng})
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
              स्थिति <span className="text-[#008B72]">(Status)</span>
            </label>
            <select
              value={filterState.status}
              onChange={(e) => onFilterChange({ status: e.target.value as any })}
              className="w-full h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
            >
              <option value="Pending">लंबित (Pending)</option>
              <option value="Completed">पूर्ण (Completed)</option>
              <option value="All">सभी (All Status)</option>
            </select>
          </div>
        </div>

        {/* Filter Action Buttons */}
        <div className="flex gap-2.5 mt-2">
          <button
            onClick={() => {
              setSelectedBlock('');
              onReset();
            }}
            className="flex-1 h-11 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw size={16} />
            <span>रीसेट</span>
          </button>

          <button
            onClick={handleSearchClick}
            className={`flex-[2] h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              selectedBlock
                ? 'bg-[#008B72] hover:bg-[#007661] text-white active:scale-95'
                : 'bg-slate-300 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Search size={18} />
            <span>खोजें (Search)</span>
          </button>
        </div>
      </div>

      {/* Special Flow Section: Block Cards when Block is not selected */}
      {!selectedBlock ? (
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
              <AlertCircle size={15} className="text-orange-500" />
              <span>कृपया ब्लॉक का चयन करें (Select Block)</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              जिला: रायसेन (कुल {blocks.length})
            </span>
          </div>

          {/* Block Selection Cards */}
          <div className="flex flex-col gap-2.5">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => handleBlockCardSelect(block.id)}
                className="bg-white hover:bg-green-50/50 border border-slate-200 hover:border-[#008B72] rounded-xl p-3.5 shadow-xs flex items-center justify-between group text-left transition-all active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#008B72]/10 text-[#008B72] flex items-center justify-center shrink-0 font-bold text-sm border border-[#008B72]/20">
                    <Map size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-800 group-hover:text-[#008B72] transition-colors">
                      ब्लॉक {block.nameHindi} ({block.code})
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-900 text-[10px] font-bold">
                        Pending: {block.pendingCount}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-green-100 text-[#008B72] text-[10px] font-bold">
                        Completed: {block.completedCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 group-hover:text-[#008B72]">
                  <span className="text-xs font-semibold group-hover:underline hidden sm:inline">
                    चुनें
                  </span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Block Selected Summary Confirmation Bar */
        <div className="bg-[#008B72] text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs text-white/80 font-medium">चयनित ब्लॉक (Block Selected)</p>
              <h4 className="font-bold text-base">
                {blocks.find((b) => b.id === selectedBlock)?.nameHindi} (
                {blocks.find((b) => b.id === selectedBlock)?.nameEng})
              </h4>
            </div>
          </div>
          <button
            onClick={handleSearchClick}
            className="px-3 py-1.5 bg-amber-400 text-slate-900 rounded-lg text-xs font-bold shadow-sm hover:bg-amber-300"
          >
            प्रारंभ करें →
          </button>
        </div>
      )}
    </div>
  );
};
