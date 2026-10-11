import React from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { UserCheck, FileText, Award, Download, CheckCircle, ExternalLink, HelpCircle, Shield, AlertCircle } from 'lucide-react';

interface CandidateCornerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenPortal: (portal: string) => void;
}

export const CandidateCornerModal: React.FC<CandidateCornerModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenPortal,
}) => {
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
                {lang === 'hi' ? 'उम्मीदवार कॉर्नर (Candidate Corner)' : 'Candidate Corner'}
              </h2>
              <span className="text-[11px] text-slate-300">
                Union Public Service Commission · Services & Facilities for Applicants
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
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto text-stone-800 text-xs space-y-5">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-950">
            <h3 className="font-bold text-xs uppercase tracking-wide">
              {lang === 'hi' ? 'उम्मीदवारों के लिए एकल खिड़की सुविधा' : 'Single Window Facilities for Candidates'}
            </h3>
            <p className="text-xs text-amber-900 mt-1 leading-relaxed">
              {lang === 'hi'
                ? 'यहाँ से आप वन टाइम रजिस्ट्रेशन (OTR), ई-प्रवेश पत्र डाउनलोड, मुख्य परीक्षा परिणाम, मॉडल प्रश्न पत्र एवं मॉक टेस्ट का सीधा उपयोग कर सकते हैं।'
                : 'Access One Time Registration (OTR), e-Admit Card downloads, official examination results, question paper banks, and mock test OMR practice from a single unified portal.'}
            </p>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 border border-stone-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-stone-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-900 rounded-md">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    {lang === 'hi' ? 'एकमुश्त पंजीकरण (OTR पोर्टल)' : 'One Time Registration (OTR)'}
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1">
                    {lang === 'hi' ? 'सभी यूपीएससी परीक्षाओं के लिए एकल जीवनभर पंजीकरण' : 'Mandatory one-time profile registration for all UPSC exam applications'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenPortal('otr');
                }}
                className="w-full py-2 bg-blue-900 hover:bg-blue-950 text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open OTR Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 border border-stone-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all bg-stone-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-900 rounded-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    {lang === 'hi' ? 'सिविल सेवा मुख्य परीक्षा 2026 परिणाम' : 'Civil Services Mains 2026 Results'}
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1">
                    {lang === 'hi' ? 'आधिकारिक 524 पृष्ठों की मेरिट लिस्ट देखें व डाउनलोड करें' : 'View official Press Note and complete 524-page merit list PDF'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenPortal('results');
                }}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Results & PDF</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 border border-stone-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all bg-stone-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-900 rounded-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    {lang === 'hi' ? 'ई-प्रवेश पत्र (Hall Ticket)' : 'e-Admit Card (Hall Ticket)'}
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1">
                    {lang === 'hi' ? 'सिविल सेवा, एनडीए एवं सीडीएस प्रवेश पत्र डाउनलोड' : 'Download official e-Admit Cards for upcoming active examinations'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenPortal('admit_card');
                }}
                className="w-full py-2 bg-[#1b2a4a] hover:bg-stone-800 text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Download Admit Card</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 border border-stone-200 rounded-lg hover:border-purple-500 hover:shadow-md transition-all bg-stone-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 text-purple-900 rounded-md">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                    {lang === 'hi' ? 'प्रिलिम्स मॉक टेस्ट (OMR अभ्यास)' : 'Prelims Mock Test (OMR Sheet)'}
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1">
                    {lang === 'hi' ? 'वास्तविक परीक्षा समय में जीएस-1 अभ्यास एवं परिणाम' : 'Practice official UPSC standard multiple-choice questions with OMR'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenPortal('mock_test');
                }}
                className="w-full py-2 bg-purple-800 hover:bg-purple-900 text-white rounded font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Start Mock Test</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Special Facilities for PwBD Candidates */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-md space-y-2">
            <h4 className="font-bold text-xs text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-blue-800" />
              <span>Facilities for PwBD (Persons with Benchmark Disabilities)</span>
            </h4>
            <p className="text-stone-600 text-xs leading-relaxed">
              UPSC provides compensatory time of 20 minutes per hour for visually impaired and locomotor disabled candidates. Scribe assistance can be opted online through the OTR/application dashboard or candidates can bring their own scribe following commission guidelines.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-600">
            Candidate Assistance Helpline: 1800-11-8772 (Toll-Free, 10 AM to 5 PM)
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
