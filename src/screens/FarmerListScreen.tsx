import React, { useState } from 'react';
import { ScreenType, Farmer, StageId } from '../types';
import {
  Search,
  Mic,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
  Phone,
  Users,
  Eye,
  Navigation,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface FarmerListScreenProps {
  farmers: Farmer[];
  currentStageId: StageId;
  onSelectFarmer: (farmer: Farmer) => void;
  onNavigate: (screen: ScreenType) => void;
  stageTitle: string;
}

export const FarmerListScreen: React.FC<FarmerListScreenProps> = ({
  farmers,
  currentStageId,
  onSelectFarmer,
  onNavigate,
  stageTitle,
}) => {
  const [selectedCircle, setSelectedCircle] = useState<string>('All');
  const [selectedVillage, setSelectedVillage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  // Filter logic
  const filteredFarmers = farmers.filter((farmer) => {
    const stageStatus = farmer.stageStatuses[currentStageId];

    if (activeTab === 'pending' && stageStatus !== 'pending') return false;
    if (activeTab === 'completed' && stageStatus !== 'completed') return false;

    if (selectedCircle !== 'All' && farmer.circle !== selectedCircle) return false;
    if (selectedVillage !== 'All' && farmer.village !== selectedVillage) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = farmer.name.toLowerCase().includes(q);
      const matchMobile = farmer.mobile.includes(q);
      const matchAppId = farmer.applicationId.toLowerCase().includes(q);
      const matchKhasra = farmer.khasraNo.toLowerCase().includes(q);
      return matchName || matchMobile || matchAppId || matchKhasra;
    }

    return true;
  });

  const totalCount = farmers.length;
  const pendingCount = farmers.filter((f) => f.stageStatuses[currentStageId] === 'pending').length;
  const completedCount = farmers.filter((f) => f.stageStatuses[currentStageId] === 'completed').length;

  return (
    <div className="flex flex-col gap-3 p-4 max-w-md mx-auto pb-24">
      {/* Header Stage Bar */}
      <div className="bg-[#008B72] text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
            STAGE {currentStageId} INSPECTION
          </span>
          <h2 className="font-bold text-base text-white">{stageTitle}</h2>
        </div>
        <button
          onClick={() => onNavigate('inspection_dashboard')}
          className="text-xs bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg border border-white/30 font-medium"
        >
          बदलाव करें
        </button>
      </div>

      {/* Filter & Search Bar Section */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Circle Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-slate-600">हल्का (Circle)</label>
            <select
              value={selectedCircle}
              onChange={(e) => setSelectedCircle(e.target.value)}
              className="w-full h-9 bg-slate-100 border-none rounded-lg px-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
            >
              <option value="All">सभी हल्का (All Circles)</option>
              <option value="सबा खेड़ा (12)">सबा खेड़ा (12)</option>
              <option value="रामपुरा (08)">रामपुरा (08)</option>
            </select>
          </div>

          {/* Village Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-slate-600">ग्राम (Village)</label>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full h-9 bg-slate-100 border-none rounded-lg px-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
            >
              <option value="All">सभी गांव (All Villages)</option>
              <option value="सबा खेड़ा">सबा खेड़ा</option>
              <option value="बड़ोदिया">बड़ोदिया</option>
              <option value="बकानिया">बकानिया</option>
            </select>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="किसान का नाम या आईडी से खोजें..."
            className="w-full h-10 bg-slate-100 border-none rounded-lg pl-10 pr-9 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72] outline-none"
          />
          <button
            onClick={() => alert('आवाज द्वारा खोजें सुविधा सक्रिय की जा रही है...')}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-[#008B72]"
            title="Voice Search"
          >
            <Mic size={18} />
          </button>
        </div>
      </div>

      {/* Stats Chips Row & Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#008B72] text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <Users size={15} />
          <span>कुल कृषक ({totalCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${
            activeTab === 'pending'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'bg-orange-50 border border-orange-200 text-orange-900'
          }`}
        >
          <Clock size={15} />
          <span>लंबित ({pendingCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-shrink-0 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-[#008B72] text-white shadow-sm'
              : 'bg-green-50 border border-green-200 text-green-900'
          }`}
        >
          <CheckCircle2 size={15} />
          <span>पूर्ण ({completedCount})</span>
        </button>
      </div>

      {/* Farmer List Cards */}
      <div className="flex flex-col gap-3.5 mt-1">
        {filteredFarmers.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-2">
            <Filter size={32} className="text-slate-300" />
            <p className="font-bold text-slate-700 text-sm">कोई परिणाम नहीं मिला</p>
            <p className="text-xs text-slate-500">
              कृपया सर्च अथवा फिल्टर बदलकर पुन: प्रयास करें
            </p>
            <button
              onClick={() => {
                setSelectedCircle('All');
                setSelectedVillage('All');
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-2 text-xs font-bold text-[#008B72] underline"
            >
              फिल्टर रीसेट करें
            </button>
          </div>
        ) : (
          filteredFarmers.map((farmer) => {
            const isCompleted = farmer.stageStatuses[currentStageId] === 'completed';

            return (
              <div
                key={farmer.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Farmer Card Top Header */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-[#008B72]/10 border border-[#008B72]/20 flex items-center justify-center font-bold text-[#008B72] shrink-0 text-sm">
                        {farmer.name.slice(0, 1)}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 leading-tight">
                          {farmer.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                          <Phone size={13} className="text-[#008B72]" />
                          <span>{farmer.mobile}</span>
                          <span className="text-slate-300">|</span>
                          <span>ID: {farmer.applicationId}</span>
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {isCompleted ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase shrink-0">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-[10px] font-bold uppercase shrink-0">
                        Pending
                      </span>
                    )}
                  </div>

                  {/* Grid Key Details */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-500">योजना (Scheme)</p>
                      <p className="font-medium text-slate-900">{farmer.scheme}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">गांव (Village)</p>
                      <p className="font-medium text-slate-900">{farmer.village}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">खसरा एवं फसल</p>
                      <p className="font-medium text-slate-900">
                        No. {farmer.khasraNo} ({farmer.crop})
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">क्षेत्रफल (Area)</p>
                      <p className="font-bold text-[#008B72]">{farmer.areaHa} Hectare</p>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                {isCompleted ? (
                  <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50">
                    <button
                      onClick={() => {
                        onSelectFarmer(farmer);
                        onNavigate('inspection_form');
                      }}
                      className="h-10 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 border-r border-slate-200 hover:bg-slate-100"
                    >
                      <Eye size={16} />
                      <span>फॉर्म देखें (View)</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectFarmer(farmer);
                        onNavigate('inspection_form');
                      }}
                      className="h-10 font-bold text-xs text-[#008B72] flex items-center justify-center gap-1.5 hover:bg-slate-100"
                    >
                      <Navigation size={15} />
                      <span>लोकेशन (Map)</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onSelectFarmer(farmer);
                      onNavigate('inspection_form');
                    }}
                    className="w-full py-2.5 bg-[#008B72] hover:bg-[#007661] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>निरीक्षण शुरू करें (Start Inspection)</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
