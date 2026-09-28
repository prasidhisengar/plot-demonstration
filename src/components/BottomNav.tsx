import React from 'react';
import { ScreenType } from '../types';
import { LayoutDashboard, Sprout, FileText, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  pendingPlotsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  pendingPlotsCount = 2,
}) => {
  if (currentScreen === 'login') return null;

  const navItems = [
    {
      id: 'dashboard' as ScreenType,
      labelHindi: 'डैशबोर्ड',
      labelEng: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'filters' as ScreenType,
      labelHindi: 'डेमोंस्ट्रेशन प्लॉट',
      labelEng: 'Plot Filters',
      icon: Sprout,
      badge: pendingPlotsCount,
    },
    {
      id: 'reports' as ScreenType,
      labelHindi: 'रिपोर्ट्स',
      labelEng: 'Reports',
      icon: FileText,
    },
    {
      id: 'profile' as ScreenType,
      labelHindi: 'प्रोफाइल',
      labelEng: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'filters' &&
              (currentScreen === 'inspection_dashboard' ||
                currentScreen === 'farmer_list' ||
                currentScreen === 'inspection_form'));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
                isActive
                  ? 'text-[#008B72] font-semibold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div
                className={`relative px-4 py-1 rounded-full transition-colors ${
                  isActive ? 'bg-[#008B72]/10 text-[#008B72]' : 'bg-transparent'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge ? (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] uppercase tracking-wider mt-0.5 leading-tight text-center font-bold">
                {item.labelHindi}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
