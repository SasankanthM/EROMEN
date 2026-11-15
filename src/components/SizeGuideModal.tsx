import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, Scissors, Sparkles } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [tab, setTab] = useState<'shirts' | 'trousers' | 'suits'>('shirts');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121419] border border-[#2b2e3c] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232631] bg-[#0e1014]">
          <div className="flex items-center space-x-2">
            <Ruler size={16} className="text-[#c5a880]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
              EROMEN ATELIER SIZE & FIT CHART
            </span>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 rounded-full text-[#a09a8e] hover:text-white hover:bg-[#1f222d] transition-all"
            aria-label="Close Size Guide"
          >
            <X size={18} />
          </button>
        </div>

        {/* TABS & UNIT TOGGLE */}
        <div className="px-6 py-3 bg-[#161820] border-b border-[#232631] flex items-center justify-between flex-wrap gap-2">
          <div className="flex space-x-2">
            {(['shirts', 'trousers', 'suits'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded capitalize transition-all ${
                  tab === t
                    ? 'bg-[#c5a880] text-[#0e0f12] font-bold shadow-md'
                    : 'text-[#a09a8e] hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 bg-[#101217] p-1 rounded border border-[#282b37] text-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-2.5 py-0.5 rounded ${unit === 'inches' ? 'bg-[#c5a880] text-[#0e0f12] font-bold' : 'text-[#a09a8e]'}`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-0.5 rounded ${unit === 'cm' ? 'bg-[#c5a880] text-[#0e0f12] font-bold' : 'text-[#a09a8e]'}`}
            >
              CM
            </button>
          </div>
        </div>

        {/* TABLES */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'shirts' && (
            <div className="space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#282b37] text-[#c5a880] uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                    <th className="py-2.5 px-3">Length</th>
                    <th className="py-2.5 px-3">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e202a] text-[#d6d0c4]">
                  {[
                    { size: '38 (S)', chest: unit === 'inches' ? '39-40"' : '99-102 cm', sh: unit === 'inches' ? '17.5"' : '44.5 cm', len: unit === 'inches' ? '29"' : '73.5 cm', sl: unit === 'inches' ? '25"' : '63.5 cm' },
                    { size: '40 (M)', chest: unit === 'inches' ? '41-42"' : '104-107 cm', sh: unit === 'inches' ? '18.25"' : '46.5 cm', len: unit === 'inches' ? '29.5"' : '75 cm', sl: unit === 'inches' ? '25.5"' : '65 cm' },
                    { size: '42 (L)', chest: unit === 'inches' ? '43-44"' : '109-112 cm', sh: unit === 'inches' ? '19"' : '48 cm', len: unit === 'inches' ? '30"' : '76 cm', sl: unit === 'inches' ? '26"' : '66 cm' },
                    { size: '44 (XL)', chest: unit === 'inches' ? '45-46"' : '114-117 cm', sh: unit === 'inches' ? '19.75"' : '50 cm', len: unit === 'inches' ? '30.5"' : '77.5 cm', sl: unit === 'inches' ? '26.5"' : '67 cm' },
                    { size: '46 (XXL)', chest: unit === 'inches' ? '47-48"' : '119-122 cm', sh: unit === 'inches' ? '20.5"' : '52 cm', len: unit === 'inches' ? '31"' : '78.5 cm', sl: unit === 'inches' ? '27"' : '68.5 cm' },
                  ].map(row => (
                    <tr key={row.size} className="hover:bg-[#181a22]">
                      <td className="py-3 px-3 font-bold text-white">{row.size}</td>
                      <td className="py-3 px-3">{row.chest}</td>
                      <td className="py-3 px-3">{row.sh}</td>
                      <td className="py-3 px-3">{row.len}</td>
                      <td className="py-3 px-3">{row.sl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'trousers' && (
            <div className="space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#282b37] text-[#c5a880] uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3">Waist Tag</th>
                    <th className="py-2.5 px-3">Actual Waist</th>
                    <th className="py-2.5 px-3">Hip</th>
                    <th className="py-2.5 px-3">Thigh</th>
                    <th className="py-2.5 px-3">Inseam Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e202a] text-[#d6d0c4]">
                  {[
                    { size: '30 Waist', waist: unit === 'inches' ? '30-31"' : '76-79 cm', hip: unit === 'inches' ? '38"' : '96.5 cm', thigh: unit === 'inches' ? '23"' : '58.5 cm', ins: unit === 'inches' ? '32"' : '81 cm' },
                    { size: '32 Waist', waist: unit === 'inches' ? '32-33"' : '81-84 cm', hip: unit === 'inches' ? '40"' : '101.5 cm', thigh: unit === 'inches' ? '24"' : '61 cm', ins: unit === 'inches' ? '32"' : '81 cm' },
                    { size: '34 Waist', waist: unit === 'inches' ? '34-35"' : '86-89 cm', hip: unit === 'inches' ? '42"' : '106.5 cm', thigh: unit === 'inches' ? '25"' : '63.5 cm', ins: unit === 'inches' ? '32.5"' : '82.5 cm' },
                    { size: '36 Waist', waist: unit === 'inches' ? '36-37"' : '91-94 cm', hip: unit === 'inches' ? '44"' : '111.5 cm', thigh: unit === 'inches' ? '26"' : '66 cm', ins: unit === 'inches' ? '33"' : '84 cm' },
                    { size: '38 Waist', waist: unit === 'inches' ? '38-39"' : '96-99 cm', hip: unit === 'inches' ? '46"' : '116.5 cm', thigh: unit === 'inches' ? '27"' : '68.5 cm', ins: unit === 'inches' ? '33"' : '84 cm' },
                  ].map(row => (
                    <tr key={row.size} className="hover:bg-[#181a22]">
                      <td className="py-3 px-3 font-bold text-white">{row.size}</td>
                      <td className="py-3 px-3">{row.waist}</td>
                      <td className="py-3 px-3">{row.hip}</td>
                      <td className="py-3 px-3">{row.thigh}</td>
                      <td className="py-3 px-3">{row.ins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'suits' && (
            <div className="space-y-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#282b37] text-[#c5a880] uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3">Suit Size</th>
                    <th className="py-2.5 px-3">Jacket Chest</th>
                    <th className="py-2.5 px-3">Waistcoat</th>
                    <th className="py-2.5 px-3">Trouser Drop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e202a] text-[#d6d0c4]">
                  {[
                    { size: '38R', chest: unit === 'inches' ? '38-39"' : '96-99 cm', vest: unit === 'inches' ? '37"' : '94 cm', drop: 'Drop 6 (32 Waist)' },
                    { size: '40R', chest: unit === 'inches' ? '40-41"' : '101-104 cm', vest: unit === 'inches' ? '39"' : '99 cm', drop: 'Drop 6 (34 Waist)' },
                    { size: '42R', chest: unit === 'inches' ? '42-43"' : '106-109 cm', vest: unit === 'inches' ? '41"' : '104 cm', drop: 'Drop 6 (36 Waist)' },
                    { size: '44R', chest: unit === 'inches' ? '44-45"' : '111-114 cm', vest: unit === 'inches' ? '43"' : '109 cm', drop: 'Drop 6 (38 Waist)' },
                  ].map(row => (
                    <tr key={row.size} className="hover:bg-[#181a22]">
                      <td className="py-3 px-3 font-bold text-white">{row.size}</td>
                      <td className="py-3 px-3">{row.chest}</td>
                      <td className="py-3 px-3">{row.vest}</td>
                      <td className="py-3 px-3 text-[#c5a880]">{row.drop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PERUNDURAI IN-STORE TAILOR PROMISE */}
          <div className="mt-6 bg-[#161822] border border-[#2d303f] p-4 rounded-xl flex items-start space-x-3 text-xs text-[#a09a8e]">
            <Scissors size={20} className="text-[#c5a880] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Between sizes? Don't worry.</span>
              <p className="mt-0.5">
                Visit our Tex Valley flagship in Perundurai. Every garment purchased includes a complimentary 45-minute on-site custom tailoring fitting.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3 border-t border-[#232631] bg-[#0e1014] text-right">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 bg-[#c5a880] text-[#0e0f12] text-xs font-bold uppercase tracking-wider rounded"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
