import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { Award, Calendar, FileText, CheckCircle2, ChevronRight, BarChart3, Clock, Download, ExternalLink } from 'lucide-react';

interface ExaminationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenPortal: (portal: string) => void;
}

export const ExaminationsModal: React.FC<ExaminationsModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scheme' | 'guidelines' | 'faq'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 font-portal">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-4xl overflow-hidden my-4 sm:my-6">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={32} />
            </div>
            <div>
              <h2 className="font-serif-heading text-base sm:text-lg font-bold">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग - परीक्षाएं' : 'UPSC Examinations Portal'}
              </h2>
              <span className="text-[11px] text-slate-300">
                Union Public Service Commission · Annual Calendar, Scheme & Notifications
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

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-4 pt-2 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'परीक्षा अवलोकन एवं पोर्टल्स' : 'Examinations Overview'}
          </button>
          <button
            onClick={() => setActiveTab('scheme')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'scheme'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'परीक्षा योजना व पाठ्यक्रम' : 'Examination Scheme & Syllabus'}
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'guidelines'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'उम्मीदवार दिशा-निर्देश' : 'Candidate Guidelines'}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'faq'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'प्रश्नोत्तरी (FAQs)' : 'Examination FAQs'}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto text-stone-800 text-xs space-y-5">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-bold text-sm text-blue-950">
                  {lang === 'hi'
                    ? 'संघ लोक सेवा आयोग द्वारा आयोजित प्रमुख परीक्षाएं'
                    : 'Major Examinations Conducted by UPSC'}
                </h3>
                <p className="mt-1 text-blue-900 leading-relaxed text-xs">
                  {lang === 'hi'
                    ? 'आयोग प्रतिवर्ष सिविल सेवा परीक्षा (CSE), राष्ट्रीय रक्षा अकादमी (NDA), सम्मिलित रक्षा सेवा (CDS), केंद्रीय सशस्त्र पुलिस बल (CAPF), अभियांत्रिकी सेवा परीक्षा (ESE) सहित 24 से अधिक राष्ट्रीय स्तर की परीक्षाएं निष्पक्ष व पारदर्शी तरीके से आयोजित करता है।'
                    : 'The Commission conducts over 24 prestigious national-level examinations annually, including Civil Services Examination (CSE), NDA, CDS, CAPF, Engineering Services (ESE), Indian Forest Service (IFS), and Combined Medical Services (CMS).'}
                </p>
              </div>

              {/* Quick Examination Portals Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div
                  onClick={() => {
                    onClose();
                    onOpenPortal('calendar');
                  }}
                  className="p-3.5 bg-white border border-stone-200 hover:border-amber-500 rounded-md cursor-pointer hover:shadow-md transition-all group flex items-start justify-between"
                >
                  <div className="flex gap-2.5">
                    <Calendar className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900 group-hover:text-blue-900">
                        {lang === 'hi' ? 'वार्षिक परीक्षा कैलेंडर 2026' : 'Annual Exam Calendar 2026'}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {lang === 'hi' ? 'सभी 24 परीक्षाओं की तिथियां एवं अधिसूचना समय-सारणी' : 'Schedule of notification, exams & duration for all 24 examinations'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-800 shrink-0" />
                </div>

                <div
                  onClick={() => {
                    onClose();
                    onOpenPortal('cutoff');
                  }}
                  className="p-3.5 bg-white border border-stone-200 hover:border-amber-500 rounded-md cursor-pointer hover:shadow-md transition-all group flex items-start justify-between"
                >
                  <div className="flex gap-2.5">
                    <BarChart3 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900 group-hover:text-blue-900">
                        {lang === 'hi' ? 'कट-ऑफ अंक विश्लेषण' : 'Cut-Off Marks Explorer'}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {lang === 'hi' ? 'विगत वर्षों (2021-2025) की आधिकारिक श्रेणीवार कट-ऑफ' : 'Year-wise & category-wise minimum qualifying standards'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-800 shrink-0" />
                </div>

                <div
                  onClick={() => {
                    onClose();
                    onOpenPortal('previous_papers');
                  }}
                  className="p-3.5 bg-white border border-stone-200 hover:border-amber-500 rounded-md cursor-pointer hover:shadow-md transition-all group flex items-start justify-between"
                >
                  <div className="flex gap-2.5">
                    <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900 group-hover:text-blue-900">
                        {lang === 'hi' ? 'विगत वर्षों के प्रश्न पत्र' : 'Previous Years Question Papers'}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {lang === 'hi' ? 'प्रिलिम्स एवं मेन्स के आधिकारिक प्रश्न पत्र डाउनलोड करें' : 'Download official GS-I, CSAT & Mains papers with answer keys'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-800 shrink-0" />
                </div>

                <div
                  onClick={() => {
                    onClose();
                    onOpenPortal('results');
                  }}
                  className="p-3.5 bg-white border border-stone-200 hover:border-amber-500 rounded-md cursor-pointer hover:shadow-md transition-all group flex items-start justify-between"
                >
                  <div className="flex gap-2.5">
                    <Award className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900 group-hover:text-blue-900">
                        {lang === 'hi' ? 'परीक्षा परिणाम (Results Portal)' : 'Examination Results (524 Pages PDF)'}
                      </h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {lang === 'hi' ? 'सिविल सेवा मुख्य परीक्षा 2026 परिणाम व मेधा सूची' : 'Civil Services Mains 2026 qualified candidates list'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-blue-800 shrink-0" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scheme' && (
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200 rounded p-4 space-y-3">
                <h3 className="font-bold text-sm text-stone-900">
                  Civil Services Examination Scheme (Three-Tier System)
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white border-l-4 border-l-blue-600 rounded shadow-2xs">
                    <span className="font-bold text-blue-950 block">Stage 1: Preliminary Examination (Objective)</span>
                    <p className="text-stone-600 text-xs mt-1">
                      Paper-I (General Studies - 200 Marks) + Paper-II (CSAT - 200 Marks, qualifying with minimum 33%). Used for shortlisting for Mains.
                    </p>
                  </div>
                  <div className="p-3 bg-white border-l-4 border-l-amber-600 rounded shadow-2xs">
                    <span className="font-bold text-amber-950 block">Stage 2: Main Examination (Written - 1750 Marks)</span>
                    <p className="text-stone-600 text-xs mt-1">
                      9 Conventional Descriptive Papers: 2 Qualifying Language Papers (300 Marks each) + Essay (250) + 4 General Studies Papers (1000) + 2 Optional Papers (500).
                    </p>
                  </div>
                  <div className="p-3 bg-white border-l-4 border-l-emerald-600 rounded shadow-2xs">
                    <span className="font-bold text-emerald-950 block">Stage 3: Personality Test / Interview (275 Marks)</span>
                    <p className="text-stone-600 text-xs mt-1">
                      Conducted by the UPSC Board at Dholpur House, New Delhi to evaluate intellectual caliber, leadership, integrity, and public service suitability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div className="space-y-3 leading-relaxed">
              <h3 className="font-bold text-sm text-stone-900">Important Candidate Rules & Instructions</h3>
              <ul className="list-disc pl-5 space-y-2 text-stone-700">
                <li>Candidates must submit their One Time Registration (OTR) profile once before filling any application form.</li>
                <li>Mobile phones, smartwatches, calculators, and any electronic transmission devices are strictly banned in examination halls.</li>
                <li>e-Admit Cards must be preserved until declaration of the final results; no physical admit cards are issued by post.</li>
                <li>Negative marking of 1/3rd (0.33) marks is applicable for every incorrect answer in objective prelims papers.</li>
                <li>DAF-I (Detailed Application Form) submission is mandatory for candidates qualifying the written examination.</li>
              </ul>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-900 block">Q: Can I change examination center after submitting form?</span>
                <p className="text-stone-600 mt-1">
                  A: No request for change of center is entertained once the application window is closed, except under extraordinary circumstances notified by the Commission.
                </p>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-900 block">Q: What is the age limit for Civil Services Examination?</span>
                <p className="text-stone-600 mt-1">
                  A: Minimum 21 years and maximum 32 years as on 1st August of the exam year (with age relaxation for OBC, SC/ST, and PwBD candidates as per Central Government rules).
                </p>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="font-bold text-stone-900 block">Q: How to obtain marksheet and answer representations?</span>
                <p className="text-stone-600 mt-1">
                  A: Marksheets are published on upsconline.nic.in within 15 days of final result declaration. Representations can be filed via the Online Representation portal during the scheduled window.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-600">
            Official UPSC Examination Division · Union Public Service Commission
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1b2a4a] text-white rounded font-bold hover:bg-stone-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
