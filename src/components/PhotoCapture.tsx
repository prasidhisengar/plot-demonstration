import React, { useState } from 'react';
import { Camera, CheckCircle, RefreshCw, MapPin, Clock } from 'lucide-react';

interface PhotoCaptureProps {
  label: string;
  photoUrl?: string;
  onPhotoCaptured: (url: string) => void;
  required?: boolean;
}

const SAMPLE_FIELD_PHOTOS = [
  'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=600&auto=format&fit=crop&q=80',
];

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
  label,
  photoUrl,
  onPhotoCaptured,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(photoUrl);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      // Pick next photo randomly or sequentially
      const randomIndex = Math.floor(Math.random() * SAMPLE_FIELD_PHOTOS.length);
      const chosenUrl = SAMPLE_FIELD_PHOTOS[randomIndex];
      setCurrentUrl(chosenUrl);
      onPhotoCaptured(chosenUrl);
      setIsCapturing(false);
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCurrentUrl(result);
        onPhotoCaptured(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formattedDate = new Date().toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-700">{label}</span>

      <div
        className={`relative aspect-square rounded-xl border-2 border-dashed transition-all overflow-hidden bg-slate-50 flex flex-col items-center justify-center ${
          currentUrl
            ? 'border-emerald-600 bg-emerald-50/20'
            : 'border-slate-300 hover:border-emerald-600 hover:bg-emerald-50/10'
        }`}
      >
        {isCapturing ? (
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-[#008B72] animate-pulse">
            <RefreshCw size={28} className="animate-spin" />
            <span className="text-xs font-semibold">Geo-tagging photo...</span>
          </div>
        ) : currentUrl ? (
          <div className="relative w-full h-full group">
            <img
              src={currentUrl}
              alt={label}
              className="w-full h-full object-cover"
            />

            {/* Simulated Geotag Overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 backdrop-blur-sm text-white p-2 text-[10px] flex flex-col gap-0.5 border-t border-white/20">
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <MapPin size={10} />
                <span>23.3321° N, 77.7812° E (Raisen, MP)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <Clock size={10} />
                <span>{formattedDate} {formattedTime} IST</span>
              </div>
            </div>

            {/* Verified Badge & Retake Button */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <span className="bg-[#008B72] text-white p-1 rounded-full shadow-md">
                <CheckCircle size={14} />
              </span>
              <button
                type="button"
                onClick={handleCapture}
                className="bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md shadow backdrop-blur-sm"
              >
                Retake
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-green-100 text-[#008B72] flex items-center justify-center shadow-sm">
              <Camera size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">तस्वीर खींचें (Camera)</p>
              <p className="text-[10px] text-slate-500 mt-0.5">जियो-टैग एवं समय स्वतः दर्ज होगा</p>
            </div>

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={handleCapture}
                className="px-3 py-1 bg-[#008B72] text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-[#007661] active:scale-95 transition-all"
              >
                Take Photo
              </button>
              <label className="px-2.5 py-1 bg-slate-200 text-slate-800 text-xs font-medium rounded-lg cursor-pointer hover:bg-slate-300 transition-colors">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
