import React, { useState } from 'react';
import { ScreenType } from '../types';
import { User, MapPin, Building, Shield, RefreshCcw, LogOut, Phone, Mail, Check } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [synced, setSynced] = useState(false);

  const handleSync = () => {
    setSynced(true);
    setTimeout(() => {
      alert('सर्वर डेटा सफलता पूर्वक सिंक हो गया है! (Data Sync Complete)');
      setSynced(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24">
      {/* Officer Header Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col items-center text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-[#008B72]/10 text-[#008B72] border-2 border-[#008B72]/20 flex items-center justify-center font-bold text-2xl shadow-sm mb-3">
          DDA
        </div>

        <h2 className="text-lg font-bold text-slate-800">DDA Officer User</h2>
        <p className="text-xs text-[#008B72] font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200 mt-1">
          उप निदेशक कृषि (Deputy Director Agriculture)
        </p>

        <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-left text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">जिला (District)</span>
            <p className="font-bold text-slate-800">Raisen (रायसेन)</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">राज्य (State)</span>
            <p className="font-bold text-slate-800">Madhya Pradesh</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">User ID</span>
            <p className="font-mono font-bold text-slate-800">DDA-RSN-2026</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">वित्तीय वर्ष</span>
            <p className="font-bold text-slate-800">2026-27</p>
          </div>
        </div>
      </div>

      {/* Sync & Offline Status Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-[#008B72]" />
            <span className="font-bold text-sm text-slate-800">डेटा सिंक स्थिति (Sync Status)</span>
          </div>
          <span className="bg-green-100 text-[#008B72] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Online Mode
          </span>
        </div>

        <p className="text-xs text-slate-500">
          अंतिम सिंक समय: आज सुबह 10:15 AM | 04 ऑफ़लाइन सर्वे स्थानीय रूप से सुरक्षित हैं।
        </p>

        <button
          onClick={handleSync}
          disabled={synced}
          className="w-full h-11 bg-[#008B72] hover:bg-[#007661] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <RefreshCcw size={16} className={synced ? 'animate-spin' : ''} />
          <span>{synced ? 'सिंक हो रहा है...' : 'अभी डेटा सिंक करें (Sync Data)'}</span>
        </button>
      </div>

      {/* App Support Contact */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col gap-2 text-xs">
        <p className="font-bold text-slate-800">तकनीकी सहायता / NIC MP Kisan Helpline</p>
        <div className="flex items-center gap-2 text-slate-600">
          <Phone size={14} className="text-[#008B72]" />
          <span>हेल्पलाइन: 1800-180-1551 (टोल फ्री)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Mail size={14} className="text-[#008B72]" />
          <span>ईमेल: mpkisan-support@mp.gov.in</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full h-11 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut size={16} />
        <span>लॉगआउट करें (Logout)</span>
      </button>
    </div>
  );
};
