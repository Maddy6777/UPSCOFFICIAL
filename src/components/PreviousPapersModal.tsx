import React, { useState } from 'react';
import { Language, PreviousPaper } from '../types/upsc';
import { PREVIOUS_PAPERS_LIST } from '../data/upscData';
import { Emblem, TricolorBar } from './Emblem';
import { BookOpen, Download, FileText, CheckCircle2, Search, Printer } from 'lucide-react';

interface PreviousPapersModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PreviousPapersModal: React.FC<PreviousPapersModalProps> = ({ isOpen, onClose, lang }) => {
  const [selectedPaper, setSelectedPaper] = useState<PreviousPaper>(PREVIOUS_PAPERS_LIST[0]);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredList = PREVIOUS_PAPERS_LIST.filter(
    (p) =>
      p.examName.toLowerCase().includes(search.toLowerCase()) ||
      p.paperName.toLowerCase().includes(search.toLowerCase()) ||
      p.year.toString().includes(search)
  );

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
                {lang === 'hi'
                  ? 'पिछले वर्षों के प्रश्न पत्र एवं उत्तर कुंजी'
                  : 'Previous Years Question Papers & Official Keys'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग · संदर्भ एवं अध्ययन सामग्री' : 'Union Public Service Commission · Candidate Reference Repository'}
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
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto text-stone-800 text-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Left list of papers */}
            <div className="space-y-2.5">
              <input
                type="text"
                placeholder={lang === 'hi' ? 'प्रश्न पत्र खोजें...' : 'Search question paper...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden mb-2"
              />

              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {filteredList.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className={`w-full text-left p-3 rounded border transition-all ${
                      selectedPaper.id === paper.id
                        ? 'bg-amber-50 border-amber-600 shadow-xs ring-1 ring-amber-500'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-stone-500 mb-0.5">
                      <span className="font-mono font-bold text-amber-900">{paper.year}</span>
                      <span className="font-mono">{paper.duration}</span>
                    </div>
                    <div className="font-bold text-xs text-stone-900">{paper.paperName}</div>
                    <div className="text-[11px] text-stone-600 truncate">{paper.examName}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Question Paper Reading View */}
            <div className="md:col-span-2 border border-stone-300 rounded-md p-4 bg-stone-50/60 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 pb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">
                    {selectedPaper.examName} ({selectedPaper.year})
                  </span>
                  <h3 className="font-serif-heading text-sm font-bold text-stone-900">
                    {selectedPaper.paperName}
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-2.5 py-1 bg-[#1b2a4a] text-white rounded font-medium flex items-center gap-1 text-[11px]"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Exam specs */}
              <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded border border-stone-200 text-center text-[11px]">
                <div>
                  <span className="text-stone-500 block">Maximum Marks</span>
                  <span className="font-bold font-mono">{selectedPaper.maxMarks}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Duration</span>
                  <span className="font-bold font-mono">{selectedPaper.duration}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Language</span>
                  <span className="font-bold">Bilingual (English / Hindi)</span>
                </div>
              </div>

              {/* Sample Questions Excerpt */}
              <div className="space-y-3">
                <span className="font-bold text-stone-900 block text-xs border-b border-stone-200 pb-1">
                  {lang === 'hi' ? 'वास्तविक प्रश्न संग्रह (Sample Questions):' : 'Authentic Question Excerpts:'}
                </span>

                {selectedPaper.sampleQuestions.map((q) => (
                  <div key={q.qNo} className="p-3 bg-white rounded border border-stone-200 space-y-1">
                    <div className="flex justify-between items-center text-[11px] text-stone-500">
                      <span className="font-bold text-amber-900">Question #{q.qNo}</span>
                      <span className="font-mono text-stone-600">[{q.marks} Marks]</span>
                    </div>
                    <p className="text-xs text-stone-800 leading-relaxed font-medium">
                      {q.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Instructions on question paper */}
              <div className="p-2.5 bg-amber-50/80 rounded border border-amber-200 text-[10px] text-amber-950 space-y-0.5">
                <span className="font-bold block">INSTRUCTIONS TO CANDIDATES:</span>
                <p>1. Immediately after commencement of the examination, check that this booklet does not have any unprinted or torn pages.</p>
                <p>2. Encode clearly the Test Booklet Series A, B, C or D in the appropriate place in the OMR Answer Sheet.</p>
                <p>3. All items carry equal marks. Penalty for wrong answers is 1/3rd of the marks assigned to that question.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
