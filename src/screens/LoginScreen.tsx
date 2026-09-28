import React, { useState } from 'react';
import { ScreenType } from '../types';
import { Smartphone, Lock, ArrowRight, ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [userType, setUserType] = useState('DDA Officer (उप निदेशक कृषि)');
  const [mobileOrUser, setMobileOrUser] = useState('9827300011');
  const [password, setPassword] = useState('••••••••');
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('4829');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen bg-[#f7fbf1] flex flex-col justify-between p-4 max-w-md mx-auto">
      {/* Top Section - Government Logo & Title */}
      <div className="flex flex-col items-center text-center pt-6 pb-4">
        {/* State Emblem Container */}
        <div className="w-20 h-20 rounded-full bg-white p-2 shadow-md border-2 border-[#008B72] flex items-center justify-center mb-3">
          <svg className="w-14 h-14 text-[#008B72]" viewBox="0 0 100 100" fill="currentColor">
            {/* Emblem representation */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M50 15 L58 35 L80 35 L62 48 L68 70 L50 56 L32 70 L38 48 L20 35 L42 35 Z" fill="#008B72" />
            <text x="50" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#008B72">
              म.प्र. शासन
            </text>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#008B72] tracking-tight leading-tight">
          मध्य प्रदेश किसान पोर्टल
        </h1>
        <p className="text-xs text-slate-600 font-medium mt-1">
          डिजिटल सशक्तिकरण की ओर एक कदम (DDA Field Operations)
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 my-auto">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-green-100 text-[#008B72] flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">अधिकारी एवं कृषक लॉगिन</h2>
            <p className="text-xs text-slate-500">कृपया अपनी पंजीकृत जानकारी दर्ज करें</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* User Type Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">उपयोगकर्ता का प्रकार (User Type)</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008B72]"
            >
              <option>DDA Officer (उप निदेशक कृषि)</option>
              <option>ADO / SADO Inspector</option>
              <option>Demonstration Plot Incharge</option>
              <option>Farmer / किसान</option>
            </select>
          </div>

          {/* Mobile / Username */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700">
              पंजीकृत मोबाइल नंबर / ई-मेल
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <Smartphone size={18} />
              </span>
              <input
                type="text"
                value={mobileOrUser}
                onChange={(e) => setMobileOrUser(e.target.value)}
                placeholder="मोबाइल नंबर दर्ज करें"
                className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008B72]"
                required
              />
            </div>
          </div>

          {loginMode === 'password' ? (
            /* Password Input */
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">पासवर्ड (Password)</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="पासवर्ड दर्ज करें"
                  className="w-full h-11 bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008B72]"
                  required
                />
              </div>
            </div>
          ) : (
            /* OTP Input */
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">ओटीपी (OTP Code)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  placeholder="4-अंकीय OTP"
                  className="flex-1 h-11 bg-slate-50 border border-slate-300 rounded-lg px-3 text-sm font-bold text-center tracking-widest text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008B72]"
                  maxLength={4}
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="px-3 bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg hover:bg-amber-200"
                >
                  {otpSent ? 'पुनः भेजें' : 'OTP भेजें'}
                </button>
              </div>
              {otpSent && (
                <p className="text-[11px] text-[#008B72] font-medium">
                  ✓ OTP नंबर +91 {mobileOrUser.slice(-4)} पर भेजा गया है
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#008B72] hover:bg-[#007661] text-white font-semibold text-base rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all mt-2"
          >
            <span>लॉगिन</span>
            <ArrowRight size={18} />
          </button>

          {/* Toggle Login Mode */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-2 text-xs text-slate-400 uppercase font-medium">अथवा</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={() => {
              setLoginMode(loginMode === 'password' ? 'otp' : 'password');
              if (loginMode === 'password') handleSendOtp();
            }}
            className="w-full h-10 border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            {loginMode === 'password'
              ? '💬 OTP के माध्यम से लॉगिन करें'
              : '🔑 पासवर्ड द्वारा लॉगिन करें'}
          </button>
        </form>
      </div>

      {/* Footer Support Section */}
      <div className="flex flex-col items-center text-center gap-2 pt-4 pb-2">
        <p className="text-xs font-semibold text-slate-700">सहायता चाहिए?</p>
        <div className="flex items-center gap-4 text-xs font-medium text-[#008B72]">
          <a href="tel:18001801551" className="flex items-center gap-1 hover:underline">
            <PhoneCall size={14} />
            <span>हेल्पलाइन: 1800-180-1551</span>
          </a>
          <span>|</span>
          <button
            onClick={() => alert('उपयोग निर्देश: DDA अधिकारी अपने जिले Raisen के अन्तर्गत डेमोंस्ट्रेशन प्लॉट निरीक्षण हेतु इस पोर्टल का उपयोग करें।')}
            className="flex items-center gap-1 hover:underline text-slate-700"
          >
            <HelpCircle size={14} />
            <span>उपयोग निर्देश</span>
          </button>
        </div>
      </div>
    </div>
  );
};
