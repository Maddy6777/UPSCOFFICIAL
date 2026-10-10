import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { CUTOFF_HISTORY } from '../data/upscData';
import { Emblem, TricolorBar } from './Emblem';
import { BarChart3, TrendingUp, Info } from 'lucide-react';

interface CutoffExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CutoffExplorerModal: React.FC<CutoffExplorerModalProps> = ({ isOpen, onClose, lang }) => {
  const [stage, setStage] = useState<'prelims' | 'mains' | 'final'>('prelims');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-4xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={32} />
            </div>
            <div>
              <h2 className="font-serif-heading text-base sm:text-lg font-bold">
                {lang === 'hi' ? 'सिविल सेवा परीक्षा कट-ऑफ अंक विश्लेषण' : 'Civil Services Examination Cut-Off Marks Analysis'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग · श्रेणीवार न्यूनतम योग्यता अंक' : 'Category-wise Minimum Qualifying Marks (2022-2025)'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white text-lg font-bold p-1 rounded hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <TricolorBar className="h-1 w-full" />

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto text-stone-800 text-xs space-y-5">
          {/* Stage Selector */}
          <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-md border border-stone-200">
            <button
              onClick={() => setStage('prelims')}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${
                stage === 'prelims'
                  ? 'bg-[#1b2a4a] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              {lang === 'hi' ? 'प्रारंभिक परीक्षा (GS-1 / 200 अंक)' : 'Preliminary (GS-I out of 200)'}
            </button>
            <button
              onClick={() => setStage('mains')}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${
                stage === 'mains'
                  ? 'bg-[#1b2a4a] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              {lang === 'hi' ? 'मुख्य परीक्षा (लिखित / 1750 अंक)' : 'Mains Written (out of 1750)'}
            </button>
            <button
              onClick={() => setStage('final')}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${
                stage === 'final'
                  ? 'bg-[#1b2a4a] text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              {lang === 'hi' ? 'अंतिम चयन (कुल / 2025 अंक)' : 'Final Recommendation (out of 2025)'}
            </button>
          </div>

          {/* Explanation Banner */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-950 flex items-start gap-2 text-[11px]">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {stage === 'prelims'
                  ? 'CSAT Qualifying Criteria:'
                  : stage === 'mains'
                  ? 'Mains Evaluation Scheme:'
                  : 'Final Merit Recommendation:'}
              </span>
              <p className="mt-0.5 leading-relaxed">
                {stage === 'prelims'
                  ? 'GS Paper-II (CSAT) is qualifying with minimum 33% (66 marks out of 200). Preliminary cutoff is based purely on GS Paper-I marks.'
                  : stage === 'mains'
                  ? 'Candidates must secure at least 10% marks in each of the 7 competitive papers (Essay, GS-I to GS-IV, and Optional Paper-I & II).'
                  : 'Final cutoff is the aggregate marks secured by the last recommended candidate in Written Examination + Personality Test.'}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-stone-200 rounded-md overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1b2a4a] text-white text-[11px]">
                <tr>
                  <th className="p-2.5 border-r border-slate-700">परीक्षा वर्ष / Year</th>
                  <th className="p-2.5 border-r border-slate-700 text-center font-bold">General</th>
                  <th className="p-2.5 border-r border-slate-700 text-center font-bold">EWS</th>
                  <th className="p-2.5 border-r border-slate-700 text-center font-bold">OBC</th>
                  <th className="p-2.5 border-r border-slate-700 text-center font-bold">SC</th>
                  <th className="p-2.5 border-r border-slate-700 text-center font-bold">ST</th>
                  <th className="p-2.5 text-center font-bold">PwBD-1</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-xs">
                {CUTOFF_HISTORY.map((item) => {
                  const cutoffs = item[stage];
                  return (
                    <tr key={item.year} className="hover:bg-amber-50/50">
                      <td className="p-2.5 font-bold text-amber-900 border-r border-stone-100 font-sans">
                        CSE {item.year}
                      </td>
                      <td className="p-2.5 text-center font-bold text-stone-900 border-r border-stone-100">
                        {cutoffs.general}
                      </td>
                      <td className="p-2.5 text-center text-stone-700 border-r border-stone-100">
                        {cutoffs.ews}
                      </td>
                      <td className="p-2.5 text-center text-stone-700 border-r border-stone-100">
                        {cutoffs.obc}
                      </td>
                      <td className="p-2.5 text-center text-stone-700 border-r border-stone-100">
                        {cutoffs.sc}
                      </td>
                      <td className="p-2.5 text-center text-stone-700 border-r border-stone-100">
                        {cutoffs.st}
                      </td>
                      <td className="p-2.5 text-center text-stone-600">
                        {cutoffs.pwbd1}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
