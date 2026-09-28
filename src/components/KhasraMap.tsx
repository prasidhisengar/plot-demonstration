import React, { useState } from 'react';
import { MapPin, CheckCircle, Navigation, Layers, Check } from 'lucide-react';

interface KhasraMapProps {
  khasraNo: string;
  village: string;
  areaHa: number;
  onPolygonVerified: (verified: boolean) => void;
  isVerified?: boolean;
}

export const KhasraMap: React.FC<KhasraMapProps> = ({
  khasraNo,
  village,
  areaHa,
  onPolygonVerified,
  isVerified = false,
}) => {
  const [highlighted, setHighlighted] = useState(isVerified);
  const [mapType, setMapType] = useState<'satellite' | 'cadastral'>('satellite');

  const handlePolygonClick = () => {
    const nextState = !highlighted;
    setHighlighted(nextState);
    onPolygonVerified(nextState);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Map Card Header */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#008B72]">
          <MapPin size={18} className="text-[#008B72]" />
          <div>
            <h3 className="font-semibold text-sm text-slate-800 leading-tight">
              खसरा मानचित्र (Khasra Map No: {khasraNo})
            </h3>
            <p className="text-[11px] text-slate-500">ग्राम: {village} | MP GeoPortal Sync</p>
          </div>
        </div>

        <button
          onClick={handlePolygonClick}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            highlighted
              ? 'bg-[#008B72] text-white'
              : 'bg-[#008B72] text-white hover:bg-[#007661] active:scale-95'
          }`}
        >
          {highlighted ? (
            <>
              <CheckCircle size={14} />
              <span>खसरा सत्यापित (Approved)</span>
            </>
          ) : (
            <>
              <Navigation size={13} />
              <span>खसरा हाइलाइट करें</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Map Visual Area */}
      <div className="relative w-full h-56 bg-slate-800 overflow-hidden select-none">
        {/* Background Satellite or Vector Map */}
        {mapType === 'satellite' ? (
          <div className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80')`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-emerald-950 p-4 flex items-center justify-center">
            {/* Cadastral Grid Pattern */}
            <svg className="w-full h-full opacity-30" width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#acf4a4" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Map Type Switcher */}
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-lg p-1 border border-white/20 flex gap-1 z-10">
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              mapType === 'satellite' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapType('cadastral')}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
              mapType === 'cadastral' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Cadastral
          </button>
        </div>

        {/* Khasra Polygon Feature */}
        <button
          onClick={handlePolygonClick}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-6 focus:outline-none"
          title="Tap plot to highlight & confirm area"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 300 180">
              {/* Surrounding Neighbor Plots */}
              <polygon points="20,20 110,15 100,70 15,60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="35" y="45" fill="rgba(255,255,255,0.7)" fontSize="10">141/2</text>

              <polygon points="190,15 280,25 285,80 195,75" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="220" y="45" fill="rgba(255,255,255,0.7)" fontSize="10">143</text>

              <polygon points="25,100 115,95 120,165 20,160" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="50" y="135" fill="rgba(255,255,255,0.7)" fontSize="10">142/2</text>

              {/* Target Khasra Polygon (Interactive) */}
              <polygon
                points="110,25 185,30 180,140 105,135"
                fill={highlighted ? 'rgba(46, 125, 50, 0.55)' : 'rgba(251, 140, 0, 0.35)'}
                stroke={highlighted ? '#acf4a4' : '#f57c00'}
                strokeWidth={highlighted ? '3.5' : '2'}
                strokeDasharray={highlighted ? 'none' : '4 2'}
                className="transition-all duration-300 cursor-pointer"
              />
              <text
                x="125"
                y="80"
                fill="#ffffff"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none drop-shadow"
              >
                खसरा {khasraNo}
              </text>
              <text
                x="125"
                y="98"
                fill={highlighted ? '#acf4a4' : '#ffe0b2'}
                fontSize="11"
                fontWeight="600"
                className="pointer-events-none drop-shadow"
              >
                {areaHa} Ha
              </text>
            </svg>

            {/* GPS Pin marker on centroid */}
            <div className="absolute top-[48%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className={`p-1.5 rounded-full shadow-lg transition-transform ${highlighted ? 'bg-emerald-600 scale-110 ring-4 ring-emerald-300/50' : 'bg-[#f57c00] animate-bounce'}`}>
                {highlighted ? <Check size={16} className="text-white" /> : <MapPin size={16} className="text-white" />}
              </div>
            </div>
          </div>
        </button>

        {/* Floating Area & Coordinates Overlay */}
        <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg border border-white/10 text-xs flex items-center gap-2 shadow-md">
          <Layers size={13} className="text-emerald-400" />
          <span>स्वीकृत क्षेत्रफल: <strong className="text-amber-300">{areaHa} हेक्टेयर</strong></span>
          <span className="text-[10px] text-slate-400">| GPS Lat: 23.332, Lng: 77.781</span>
        </div>
      </div>

      {/* Verification instruction banner */}
      <div
        onClick={handlePolygonClick}
        className={`p-2.5 text-center text-xs font-medium cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
          highlighted
            ? 'bg-green-100 text-[#008B72]'
            : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
        }`}
      >
        {highlighted ? (
          <>
            <CheckCircle size={15} className="text-[#008B72]" />
            <span>प्लॉट सीमा की पुष्टि की जा चुकी है (Polygon Area Verified)</span>
          </>
        ) : (
          <span>
            👉 खसरा क्षेत्र की पुष्टि हेतु ऊपर मानचित्र में प्लॉट पर टैप करें (Tap inside plot polygon)
          </span>
        )}
      </div>
    </div>
  );
};
