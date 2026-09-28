import React from 'react';
import { ScreenType } from '../types';
import {
  Sprout,
  Database,
  School,
  LogOut,
  MapPin,
  Calendar,
  Layers,
  Users,
  Target,
  FileCheck,
  CreditCard,
  BarChart2,
  ChevronRight,
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onLogout,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24">
      {/* Hero Banner Section */}
      <div className="relative h-40 w-full rounded-2xl overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80"
          alt="Agriculture Field MP"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#008B72] via-[#008B72]/50 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center gap-1.5 text-amber-300 mb-1">
            <MapPin size={15} />
            <span className="text-xs font-bold uppercase tracking-wider">
              MADHYA PRADESH STATE
            </span>
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            नमस्ते, आपका स्वागत है
          </h2>
          <p className="text-xs text-white/90 font-medium">
            उप निदेशक कृषि (DDA Office Raisen)
          </p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-[#008B72]/10 text-[#008B72] flex items-center justify-center shrink-0 border border-[#008B72]/20">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-800">DDA Officer User</h3>
            <span className="bg-green-100 text-[#008B72] text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-green-200">
              Active
            </span>
          </div>
          <div className="flex flex-col gap-0.5 mt-1 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-[#008B72]" />
              <span>District: <strong>Raisen (रायसेन)</strong></span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={13} className="text-[#008B72]" />
              <span>Financial Year: <strong>2026-27</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50/80 border border-green-200/80 p-3 rounded-xl flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#008B72] text-white flex items-center justify-center shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#008B72] uppercase tracking-wider">
              Total Demo Plots
            </p>
            <p className="text-lg font-bold text-[#008B72]">128</p>
          </div>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              Farmers
            </p>
            <p className="text-lg font-bold text-orange-600">842</p>
          </div>
        </div>
      </div>

      {/* Menu Cards Title */}
      <div className="flex items-center justify-between px-1 mt-1">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          पोर्टल सेवाएं (PORTAL SERVICES)
        </h3>
        <span className="text-[11px] text-[#008B72] font-semibold">मध्य प्रदेश कृषि विभाग</span>
      </div>

      {/* Menu Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Demonstration Plot Card - PRIMARY HIGHLIGHT */}
        <button
          onClick={() => onNavigate('filters')}
          className="col-span-2 relative p-4 bg-gradient-to-r from-[#008B72] to-[#007661] text-white rounded-xl shadow-md flex items-center justify-between active:scale-[0.98] transition-all border border-[#008B72] group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 border border-white/30">
              <Sprout size={28} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-lg leading-tight">डेमोंस्ट्रेशन प्लॉट</h4>
                <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                  Active
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium mt-0.5">
                Demonstration Plot Inspection
              </p>
            </div>
          </div>
          <ChevronRight size={22} className="text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Master Data */}
        <button
          onClick={() => alert('मास्टर डेटा विवरण केवल आधिकारिक डेस्कटॉप एक्सेस हेतु उपलब्ध है।')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs flex flex-col items-center text-center active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-[#008B72]/10 text-[#008B72] flex items-center justify-center mb-2">
            <Database size={22} />
          </div>
          <span className="font-bold text-sm text-slate-800">मास्टर डाटा</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Master Data</span>
        </button>

        {/* Training */}
        <button
          onClick={() => onNavigate('inspection_dashboard')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs flex flex-col items-center text-center active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-[#008B72]/10 text-[#008B72] flex items-center justify-center mb-2">
            <School size={22} />
          </div>
          <span className="font-bold text-sm text-slate-800">प्रशिक्षण</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Training</span>
        </button>

        {/* Target Management */}
        <button
          onClick={() => alert('लक्ष्य प्रबंधन (Target Management) मोड्यूल सक्रीय है।')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs flex flex-col items-center text-center active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
            <Target size={22} />
          </div>
          <span className="font-bold text-sm text-slate-800">लक्ष्य प्रबंधन</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Target Management</span>
        </button>

        {/* Disposal */}
        <button
          onClick={() => alert('निपटान मॉड्यूल प्रदर्शित किया जा रहा है।')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs flex flex-col items-center text-center active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-xl bg-[#008B72]/10 text-[#008B72] flex items-center justify-center mb-2">
            <FileCheck size={22} />
          </div>
          <span className="font-bold text-sm text-slate-800">निपटान</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Disposal</span>
        </button>

        {/* Disbursement */}
        <button
          onClick={() => alert('संवितरण विवरण (Disbursement) विवरण उपलब्ध है।')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs flex flex-col items-center text-center active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
            <CreditCard size={22} />
          </div>
          <span className="font-bold text-sm text-slate-800">संवितरण</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Disbursement</span>
        </button>

        {/* Reports */}
        <button
          onClick={() => onNavigate('reports')}
          className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs flex flex-col items-center text-center active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
            <BarChart2 size={22} />
          </div>
          <span className="font-bold text-sm text-slate-800">रिपोर्ट्स</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Reports</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="col-span-2 p-3.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-xl text-rose-700 flex items-center justify-center gap-2 font-bold text-sm transition-colors active:scale-98"
        >
          <LogOut size={18} />
          <span>लॉगआउट (Logout)</span>
        </button>
      </div>
    </div>
  );
};
