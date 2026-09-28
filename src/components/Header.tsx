import React from 'react';
import { ScreenType } from '../types';
import { ArrowLeft, User, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  screenTitle?: string;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  isMobileDeviceFrame: boolean;
  onToggleFrame: () => void;
  adminUnlocked: boolean;
  onToggleAdminUnlocked: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  screenTitle,
  onNavigate,
  onBack,
  isMobileDeviceFrame,
  onToggleFrame,
  adminUnlocked,
  onToggleAdminUnlocked,
}) => {
  const getTitle = () => {
    if (screenTitle) return screenTitle;
    switch (currentScreen) {
      case 'login':
        return 'मध्य प्रदेश किसान पोर्टल';
      case 'dashboard':
        return 'Dashboard / डैशबोर्ड';
      case 'filters':
        return 'Demonstration Plot Filters';
      case 'inspection_dashboard':
        return 'Inspection Dashboard (निरीक्षण क्षेत्र)';
      case 'farmer_list':
        return 'Farmer List (कृषक सूची)';
      case 'inspection_form':
        return 'Farmer Inspection Form';
      case 'reports':
        return 'Reports & Analytics';
      case 'profile':
        return 'DDA Officer Profile';
      default:
        return 'MP Kisan Portal';
    }
  };

  const showBackButton = currentScreen !== 'dashboard' && currentScreen !== 'login';

  return (
    <header className="sticky top-0 z-40 bg-[#008B72] text-white shadow-md transition-colors">
      <div className="flex items-center justify-between px-4 h-14 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBackButton ? (
            <button
              onClick={onBack || (() => onNavigate('dashboard'))}
              className="p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors flex items-center justify-center text-white shrink-0"
              title="Back"
            >
              <ArrowLeft size={22} />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm p-1">
              {/* Emblem icon */}
              <svg className="w-5 h-5 text-[#008B72]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          )}

          <div className="truncate">
            <h1 className="font-bold text-base leading-tight truncate text-white">
              {getTitle()}
            </h1>
            <p className="text-[10px] text-white/90 font-medium tracking-wide uppercase">
              मध्य प्रदेश किसान पोर्टल • DDA RAISEN
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Admin stage unlock toggle pill */}
          <button
            onClick={onToggleAdminUnlocked}
            className={`px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 transition-all ${
              adminUnlocked
                ? 'bg-amber-400 text-slate-900 border border-amber-200 shadow-sm'
                : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
            }`}
            title="Toggle Admin Mode to simulate stage progression"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${adminUnlocked ? 'bg-emerald-900 animate-ping' : 'bg-emerald-200'}`}></span>
            {adminUnlocked ? 'Unlock Stages ON' : 'Rule Lock'}
          </button>

          {/* Toggle Mobile Frame View */}
          <button
            onClick={onToggleFrame}
            className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors hidden sm:flex items-center justify-center"
            title={isMobileDeviceFrame ? "Switch to Full Screen" : "Switch to Mobile App Frame View"}
          >
            {isMobileDeviceFrame ? <Monitor size={17} /> : <Smartphone size={17} />}
          </button>

          {/* User Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors shadow-sm"
            title="DDA User Profile"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
