import React, { useState } from 'react';
import { ScreenType, Farmer, StageId, StageInspectionData } from '../types';
import { KhasraMap } from '../components/KhasraMap';
import { PhotoCapture } from '../components/PhotoCapture';
import {
  Send,
  CheckCircle2,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck2,
  ShieldCheck,
  User,
  Info,
} from 'lucide-react';

interface InspectionFormScreenProps {
  farmer: Farmer;
  currentStageId: StageId;
  onSaveInspection: (farmerId: string, stageId: StageId, data: StageInspectionData) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const InspectionFormScreen: React.FC<InspectionFormScreenProps> = ({
  farmer,
  currentStageId,
  onSaveInspection,
  onNavigate,
}) => {
  const existingData = farmer.inspectionData?.[currentStageId];

  // Stage 1 Fields
  const [sowingDate, setSowingDate] = useState(existingData?.sowingDate || '2026-07-15');
  const [verifiedArea, setVerifiedArea] = useState<number>(existingData?.verifiedAreaHa || farmer.areaHa);
  const [seedQuantity, setSeedQuantity] = useState<number>(existingData?.seedQuantityKg || 40);
  const [germination, setGermination] = useState<number>(existingData?.germinationPercent || 90);
  const [cropCondition, setCropCondition] = useState<string>(existingData?.cropCondition || 'उत्कृष्ट (Good)');
  const [remarks, setRemarks] = useState<string>(existingData?.remarks || 'फील्ड सर्वे के अनुसार बुआई संतोषजनक पाई गई।');
  const [pmfby, setPmfby] = useState<boolean>(existingData?.pmfbyInsured ?? true);
  const [photo1, setPhoto1] = useState<string | undefined>(existingData?.photos?.[0]);
  const [photo2, setPhoto2] = useState<string | undefined>(existingData?.photos?.[1]);
  const [polygonVerified, setPolygonVerified] = useState<boolean>(existingData?.polygonVerified ?? true);

  // Stage 2 Fields
  const [observation, setObservation] = useState(existingData?.observation || 'पौधे स्वस्थ हैं, शाखाएं अच्छी तरह विकसित हो रही हैं।');
  const [growthStage, setGrowthStage] = useState(existingData?.cropGrowthStage || 'वनस्पतिक वृद्धि (Vegetative Stage)');

  // Stage 3 Fields
  const [cuttingDate, setCuttingDate] = useState(existingData?.cuttingDate || '2026-07-28');
  const [demoYield, setDemoYield] = useState<number>(existingData?.demoPlotYield || 22.5);
  const [controlYield, setControlYield] = useState<number>(existingData?.controlPlotYield || 18.0);

  // Stage 4 Fields
  const [trainingDate, setTrainingDate] = useState(existingData?.trainingDate || '2026-07-29');
  const [farmersCount, setFarmersCount] = useState<number>(existingData?.farmersCount || 25);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const photosList = [photo1, photo2].filter(Boolean) as string[];
    if (photosList.length === 0) {
      photosList.push(
        'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80'
      );
    }

    const payload: StageInspectionData = {
      completedAt: new Date().toLocaleString('hi-IN'),
      verifiedAreaHa: Number(verifiedArea),
      sowingDate,
      seedQuantityKg: Number(seedQuantity),
      germinationPercent: Number(germination),
      cropCondition,
      remarks,
      photos: photosList,
      pmfbyInsured: pmfby,
      polygonVerified,
      location: {
        lat: 23.332,
        lng: 77.781,
        address: `${farmer.village}, जिला रायसेन, मध्य प्रदेश`,
      },
      observation,
      cropGrowthStage: growthStage,
      cuttingDate,
      demoPlotYield: Number(demoYield),
      controlPlotYield: Number(controlYield),
      trainingDate,
      farmersCount: Number(farmersCount),
    };

    setTimeout(() => {
      onSaveInspection(farmer.id, currentStageId, payload);
      setIsSubmitting(false);
      setShowSuccessToast(true);

      setTimeout(() => {
        onNavigate('farmer_list');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto pb-24">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-[#008B72] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400 animate-bounce">
          <CheckCircle2 size={24} className="text-amber-300" />
          <div>
            <h4 className="font-bold text-sm">Inspection Saved Successfully!</h4>
            <p className="text-xs text-white/90">सफलतापूर्वक जमा हुआ एवं लोकेशन कैप्चर की गई</p>
          </div>
        </div>
      )}

      {/* Header Farmer Info Banner */}
      <div className="bg-[#008B72] text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
              FARMER DETAILS (कृषक विवरण)
            </span>
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded font-mono">
              Stage {currentStageId}
            </span>
          </div>

          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User size={20} className="text-amber-300" />
            <span>{farmer.name}</span>
          </h2>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/20 text-xs">
            <div>
              <span className="text-white/80 text-[10px]">ग्राम (Village)</span>
              <p className="font-bold text-white">{farmer.village}</p>
            </div>
            <div>
              <span className="text-white/80 text-[10px]">ऐप्लिकेशन ID</span>
              <p className="font-mono font-bold text-amber-300">{farmer.applicationId}</p>
            </div>
            <div>
              <span className="text-white/80 text-[10px]">खसरा क्र. (Khasra)</span>
              <p className="font-bold text-white">No. {farmer.khasraNo}</p>
            </div>
            <div>
              <span className="text-white/80 text-[10px]">कुल क्षेत्रफल</span>
              <p className="font-bold text-white">{farmer.areaHa} हेक्टेयर</p>
            </div>
          </div>
        </div>
      </div>

      {/* Khasra Interactive Map Section */}
      <KhasraMap
        khasraNo={farmer.khasraNo}
        village={farmer.village}
        areaHa={farmer.areaHa}
        isVerified={polygonVerified}
        onPolygonVerified={(v) => setPolygonVerified(v)}
      />

      {/* Dynamic Stage Form Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* STAGE 1 FORM: Sowing Inspection */}
        {currentStageId === 1 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#008B72] border-b border-slate-100 pb-2">
              <FileCheck2 size={18} />
              <h3 className="font-bold text-sm text-slate-800">
                1. रोपण / बुआई निरीक्षण विवरण (Sowing Details)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Sowing Date */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">बुआई की तारीख</label>
                <input
                  type="date"
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                  required
                />
              </div>

              {/* Verified Area */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">सत्यापित क्षेत्रफल (Ha)</label>
                <input
                  type="number"
                  step="0.01"
                  value={verifiedArea}
                  onChange={(e) => setVerifiedArea(Number(e.target.value))}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Seed Quantity */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">बीज मात्रा (kg)</label>
                <input
                  type="number"
                  value={seedQuantity}
                  onChange={(e) => setSeedQuantity(Number(e.target.value))}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                />
              </div>

              {/* Germination % */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">अंकुरण प्रतिशत (%)</label>
                <input
                  type="number"
                  value={germination}
                  onChange={(e) => setGermination(Number(e.target.value))}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                />
              </div>
            </div>

            {/* Crop Condition */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">फसल की स्थिति (Condition)</label>
              <select
                value={cropCondition}
                onChange={(e) => setCropCondition(e.target.value)}
                className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
              >
                <option value="उत्कृष्ट (Good)">उत्कृष्ट (Good)</option>
                <option value="सामान्य (Normal)">सामान्य (Normal)</option>
                <option value="कमजोर (Weak)">कमजोर (Weak)</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">अभ्युक्ति / रिमार्क्स (Remarks)</label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="क्षेत्रीय टिप्पणी यहाँ दर्ज करें..."
                className="bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
              />
            </div>

            {/* PMFBY Insurance Radio */}
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-orange-500" />
                <span className="text-xs font-bold text-amber-900">PMFBY फसल बीमा है?</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="pmfby"
                    checked={pmfby === true}
                    onChange={() => setPmfby(true)}
                    className="accent-[#008B72]"
                  />
                  <span>हाँ</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="pmfby"
                    checked={pmfby === false}
                    onChange={() => setPmfby(false)}
                    className="accent-[#008B72]"
                  />
                  <span>नहीं</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2 FORM: General Inspection */}
        {currentStageId === 2 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#008B72] border-b border-slate-100 pb-2">
              <FileCheck2 size={18} />
              <h3 className="font-bold text-sm text-slate-800">2. सामान्य निरीक्षण (General Inspection)</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">फसल वृद्धि चरण (Growth Stage)</label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value)}
                className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
              >
                <option value="वनस्पतिक वृद्धि (Vegetative Stage)">वनस्पतिक वृद्धि (Vegetative Stage)</option>
                <option value="पुष्पन अवस्था (Flowering Stage)">पुष्पन अवस्था (Flowering Stage)</option>
                <option value="फली/दाना निर्माण (Pod Formation)">फली/दाना निर्माण (Pod Formation)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">निरीक्षण अवलोकन (Observation)</label>
              <textarea
                rows={3}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
              />
            </div>
          </div>
        )}

        {/* STAGE 3 FORM: Crop Cutting */}
        {currentStageId === 3 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#008B72] border-b border-slate-100 pb-2">
              <FileCheck2 size={18} />
              <h3 className="font-bold text-sm text-slate-800">3. फसल कटाई निरीक्षण (Crop Cutting CCE)</h3>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-700">कटाई की तिथि (Date)</label>
              <input
                type="date"
                value={cuttingDate}
                onChange={(e) => setCuttingDate(e.target.value)}
                className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">डेमो प्लॉट उपज (Q/Ha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={demoYield}
                  onChange={(e) => setDemoYield(Number(e.target.value))}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">कंट्रोल प्लॉट उपज (Q/Ha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={controlYield}
                  onChange={(e) => setControlYield(Number(e.target.value))}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4 FORM: Training */}
        {currentStageId === 4 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#008B72] border-b border-slate-100 pb-2">
              <FileCheck2 size={18} />
              <h3 className="font-bold text-sm text-slate-800">4. प्रशिक्षण विवरण (Training Session)</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">प्रशिक्षण तिथि</label>
                <input
                  type="date"
                  value={trainingDate}
                  onChange={(e) => setTrainingDate(e.target.value)}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">उपस्थित किसान संख्या</label>
                <input
                  type="number"
                  value={farmersCount}
                  onChange={(e) => setFarmersCount(Number(e.target.value))}
                  className="h-10 bg-slate-50 border border-slate-300 rounded-lg px-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-[#008B72]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Photo Upload Cards Section (All Stages) */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 text-[#008B72]">
              📸 क्षेत्र तस्वीरें (Geotagged Field Photos)
            </h4>
            <span className="text-[10px] bg-green-100 text-[#008B72] px-2 py-0.5 rounded font-bold">
              GPS Required
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <PhotoCapture
              label="तस्वीर 1 (Plot Photo 1)"
              photoUrl={photo1}
              onPhotoCaptured={(url) => setPhoto1(url)}
            />
            <PhotoCapture
              label="तस्वीर 2 (Plot Photo 2)"
              photoUrl={photo2}
              onPhotoCaptured={(url) => setPhoto2(url)}
            />
          </div>

          <p className="text-[11px] text-slate-500 italic flex items-center gap-1 mt-1">
            <Info size={13} className="text-amber-600 shrink-0" />
            <span>
              सुनिश्चित करें कि फोटो में जिओ-टैग (GPS Coordinates) एवं समय स्पष्ट प्रदर्शित हो रहे हैं।
            </span>
          </p>
        </div>

        {/* Submit Form Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-[#008B72] hover:bg-[#007661] text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50 mt-2"
        >
          {isSubmitting ? (
            <span>प्रोसेसिंग हो रही है...</span>
          ) : (
            <>
              <span>जमा करें (Save & Complete Inspection)</span>
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
