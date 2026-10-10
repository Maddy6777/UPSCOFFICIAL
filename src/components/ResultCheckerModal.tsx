import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { PRESS_NOTE_TEXT, MAINS_QUALIFIED_CANDIDATES } from '../data/mainsResultData';
import { downloadOfficialResultPdf } from '../utils/generateResultPdf';
import { Download, Printer, Search, FileText, CheckCircle2, ChevronLeft, ChevronRight, Eye, ExternalLink } from 'lucide-react';

interface ResultCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ResultCheckerModal: React.FC<ResultCheckerModalProps> = ({ isOpen, onClose, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pdf_viewer' | 'press_note' | 'search_table'>('pdf_viewer');
  const [page, setPage] = useState(1);
  const pageSize = 28;

  if (!isOpen) return null;

  const filteredCandidates = MAINS_QUALIFIED_CANDIDATES.filter((c) => {
    return (
      c.rollNo.includes(searchTerm) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.srNo.toString() === searchTerm
    );
  });

  const totalPages = Math.ceil(filteredCandidates.length / pageSize);
  const currentCandidates = filteredCandidates.slice((page - 1) * pageSize, page * pageSize);

  const handleDownload = () => {
    downloadOfficialResultPdf('Civil_Services_Mains_Examination_2026_Result.pdf');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 font-portal">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-5xl overflow-hidden my-3 sm:my-5">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-3.5 sm:p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={32} />
            </div>
            <div>
              <h2 className="font-serif-heading text-sm sm:text-base font-bold">
                {lang === 'hi'
                  ? 'सिविल सेवा मुख्य परीक्षा, 2026 परिणाम (524 पृष्ठ)'
                  : 'Civil Services (Mains) Examination, 2026 Results (524 Pages)'}
              </h2>
              <span className="text-[11px] text-slate-300">
                PRESS INFORMATION BUREAU · GOVERNMENT OF INDIA · 14,624 CANDIDATES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              title="Download entire 524-page PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (524 Pages)</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white text-lg font-bold p-1 rounded hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        <TricolorBar className="h-1 w-full" />

        {/* Tab & Search Bar */}
        <div className="p-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('pdf_viewer')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                activeTab === 'pdf_viewer'
                  ? 'bg-[#1b2a4a] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-red-400" />
              <span>Full PDF Viewer (524 Pages)</span>
            </button>

            <button
              onClick={() => setActiveTab('press_note')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                activeTab === 'press_note'
                  ? 'bg-[#1b2a4a] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              Press Note (Page 1)
            </button>

            <button
              onClick={() => setActiveTab('search_table')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1 ${
                activeTab === 'search_table'
                  ? 'bg-[#1b2a4a] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Roll Order List (14,624 Candidates)</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              title="Download entire 524-page PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF (524 Pages)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-2.5 py-1.5 bg-white border border-stone-300 rounded hover:bg-stone-50 text-stone-700 font-medium flex items-center gap-1 shadow-xs"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href="./Civil_Services_Mains_Examination_2026_Result.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-medium flex items-center gap-1"
              title="Open in new window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-5 max-h-[75vh] overflow-y-auto text-stone-900 text-xs bg-stone-100/60">
          {/* TAB 1: FULL PDF VIEWER (ALL 524 PAGES) */}
          {activeTab === 'pdf_viewer' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold">
                    Complete Official Gazette File Loaded (524 Pages · 14,624 Candidates)
                  </span>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download All 524 Pages</span>
                </button>
              </div>

              {/* PDF iframe viewer */}
              <div className="border-2 border-stone-400 rounded-md overflow-hidden bg-white shadow-sm h-[580px] w-full">
                <iframe
                  src="./Civil_Services_Mains_Examination_2026_Result.pdf#view=FitH"
                  title="Civil Services Mains Examination 2026 Results - Complete 524 Pages"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PRESS NOTE (PAGE 1) */}
          {activeTab === 'press_note' && (
            <div className="bg-white border-2 border-stone-800 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-6 font-serif">
              <div className="text-center space-y-1 border-b border-stone-300 pb-4">
                <h3 className="font-bold text-sm tracking-widest uppercase text-stone-900">
                  PRESS INFORMATION BUREAU
                </h3>
                <h4 className="font-bold text-xs tracking-wider uppercase text-stone-800">
                  GOVERNMENT OF INDIA
                </h4>
                <div className="pt-2 font-bold text-xs uppercase tracking-widest text-stone-700">
                  PRESS NOTE
                </div>
                <div className="text-sm sm:text-base font-bold text-stone-950 pt-2 underline underline-offset-4">
                  RESULT OF THE CIVIL SERVICES (MAINS) EXAMINATION, 2026
                </div>
              </div>

              <div className="text-right font-bold text-xs text-stone-900 font-sans">
                Dated: 11th OCTOBER, 2026
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
                <p>{PRESS_NOTE_TEXT.p1}</p>
                <p>{PRESS_NOTE_TEXT.p2}</p>
                <p>{PRESS_NOTE_TEXT.p3}</p>
              </div>

              <div className="text-center font-bold text-stone-600 text-sm tracking-widest pt-2">
                *********
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-200 font-sans text-xs">
                <span className="text-stone-500">Document: Page 1 of 524</span>
                <button
                  onClick={() => setActiveTab('pdf_viewer')}
                  className="px-4 py-2 bg-[#1b2a4a] text-white rounded font-bold hover:bg-stone-800 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View All 524 Pages</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SEARCH TABLE */}
          {activeTab === 'search_table' && (
            <div className="bg-white border-2 border-stone-800 p-4 sm:p-6 shadow-sm max-w-3xl mx-auto space-y-4 font-sans">
              <div className="text-center border-b border-stone-300 pb-3">
                <h3 className="font-bold text-xs sm:text-sm text-stone-900 uppercase tracking-wide">
                  CIVIL SERVICES (MAINS) EXAMINATION, 2026
                </h3>
                <h4 className="font-semibold text-xs text-stone-700 uppercase tracking-wider mt-0.5">
                  NAME WISE ROLL ORDR LIST OF WRITTEN QUALIFIED CANDIDATES
                </h4>
              </div>

              {/* Search filter input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type roll number or name (e.g. 0139081, SAHIL SONI, RAWAL MONTU)..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5" />
              </div>

              {/* Table */}
              <div className="border border-stone-400 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#1b2a4a] text-white">
                    <tr>
                      <th className="p-2 border border-slate-700 w-20 text-center font-bold">SR. NO.</th>
                      <th className="p-2 border border-slate-700 w-32 font-bold font-mono">ROLL NO.</th>
                      <th className="p-2 border border-slate-700 font-bold">NAME</th>
                      <th className="p-2 border border-slate-700 w-28 text-center font-bold">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {currentCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-stone-500">
                          No candidate found matching &quot;{searchTerm}&quot;. Check the full 524-page PDF.
                        </td>
                      </tr>
                    ) : (
                      currentCandidates.map((c) => (
                        <tr key={c.srNo} className="hover:bg-amber-50/70 transition-colors">
                          <td className="p-2 border-r border-stone-200 text-center font-mono font-semibold text-stone-600">
                            {c.srNo}
                          </td>
                          <td className="p-2 border-r border-stone-200 font-mono font-bold text-stone-900">
                            {c.rollNo}
                          </td>
                          <td className="p-2 border-r border-stone-200 font-semibold text-stone-900 uppercase">
                            {c.name}
                          </td>
                          <td className="p-2 text-center">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Qualified</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2 text-xs text-stone-600">
                  <span>
                    Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredCandidates.length)} of {filteredCandidates.length}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                      className="px-2.5 py-1 border border-stone-300 rounded hover:bg-stone-100 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono font-bold px-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-2.5 py-1 border border-stone-300 rounded hover:bg-stone-100 disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-stone-100 border-t border-stone-300 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <FileText className="w-4 h-4 text-red-600" />
            <span className="font-medium">
              Official PDF Document: Civil_Services_Mains_Examination_2026_Result.pdf (524 Pages · 4.84 MB)
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full PDF (524 Pages)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1b2a4a] text-white rounded font-bold hover:bg-stone-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
