import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { Briefcase, FileText, CheckCircle, ExternalLink, Calendar, Users, AlertCircle } from 'lucide-react';

interface RecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenPortal: (portal: string) => void;
}

export const RecruitmentModal: React.FC<RecruitmentModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'advertisements' | 'ora' | 'rules'>('advertisements');

  if (!isOpen) return null;

  const currentVacancies = [
    {
      post: 'Specialist Grade-III Assistant Professor (Cardiology)',
      dept: 'Ministry of Health and Family Welfare',
      vacancies: 18,
      lastDate: '30/10/2026',
      adNo: '16/2026',
    },
    {
      post: 'Assistant Public Prosecutor',
      dept: 'Central Bureau of Investigation (CBI), DoPT',
      vacancies: 42,
      lastDate: '24/10/2026',
      adNo: '15/2026',
    },
    {
      post: 'Director (Air Safety & Regulations)',
      dept: 'Directorate General of Civil Aviation (DGCA)',
      vacancies: 4,
      lastDate: '15/11/2026',
      adNo: '14/2026',
    },
    {
      post: 'Scientist-B (Hydrogeology & Geophysics)',
      dept: 'Central Ground Water Board, Ministry of Jal Shakti',
      vacancies: 29,
      lastDate: '05/11/2026',
      adNo: '14/2026',
    },
  ];

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
                {lang === 'hi' ? 'सीधी भर्ती एवं चयन (Recruitment Portal)' : 'Direct Recruitment & Selection Portal'}
              </h2>
              <span className="text-[11px] text-slate-300">
                Union Public Service Commission · Online Recruitment Application (ORA)
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
            onClick={() => setActiveTab('advertisements')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'advertisements'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'सक्रिय भर्ती विज्ञापन' : 'Active Advertisements'}
          </button>
          <button
            onClick={() => setActiveTab('ora')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'ora'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'ऑनलाइन भर्ती आवेदन (ORA प्रणाली)' : 'Online Application (ORA System)'}
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-2 font-bold rounded-t-md transition-colors ${
              activeTab === 'rules'
                ? 'bg-white text-blue-900 border-t-2 border-amber-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'भर्ती नियमावली एवं साक्षात्कार' : 'Recruitment Rules & Interview'}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto text-stone-800 text-xs space-y-4">
          {activeTab === 'advertisements' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-950 flex items-center justify-between">
                <div>
                  <span className="font-bold">Direct Recruitment through Interview / Computer Based RT</span>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    Applications are invited from eligible Indian citizens for the following specialist & gazetted posts.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPortal('otr');
                  }}
                  className="px-3 py-1.5 bg-[#1b2a4a] text-white rounded font-bold hover:bg-stone-800 flex items-center gap-1 shrink-0 ml-3"
                >
                  <span>Apply Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Vacancy Table */}
              <div className="border border-stone-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#1b2a4a] text-white">
                    <tr>
                      <th className="p-2.5 font-bold">Post Designation</th>
                      <th className="p-2.5 font-bold">Ministry / Department</th>
                      <th className="p-2.5 font-bold text-center">Vacancies</th>
                      <th className="p-2.5 font-bold">Closing Date</th>
                      <th className="p-2.5 font-bold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {currentVacancies.map((v, i) => (
                      <tr key={i} className="hover:bg-amber-50/50">
                        <td className="p-2.5 font-semibold text-stone-900">{v.post}</td>
                        <td className="p-2.5 text-stone-600">{v.dept}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-blue-900">{v.vacancies}</td>
                        <td className="p-2.5 font-mono text-stone-700">{v.lastDate}</td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenPortal('otr');
                            }}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[11px]"
                          >
                            Apply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ora' && (
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200 rounded p-4 space-y-3">
                <h3 className="font-bold text-sm text-stone-900">Online Recruitment Application (ORA) Portal Workflow</h3>
                <ol className="list-decimal pl-5 space-y-2 text-stone-700 leading-relaxed">
                  <li><strong>Registration:</strong> Register once with basic demographic and educational details on OTR.</li>
                  <li><strong>Application Submission:</strong> Choose the advertised post, upload educational documents, experience certificates, and category proofs.</li>
                  <li><strong>Application Fee:</strong> Fee of ₹25/- (Exempted for Female/SC/ST/PwBD candidates).</li>
                  <li><strong>Shortlisting:</strong> Candidates are scrutinized based on essential and desirable qualifications. Shortlisted candidates are called for Interview or Recruitment Test (RT).</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3 leading-relaxed">
              <h3 className="font-bold text-sm text-stone-900">Recruitment Rules & Selection Criteria</h3>
              <p className="text-stone-700">
                The Union Public Service Commission advises the Government on all matters relating to methods of recruitment to civil services and for civil posts. Under Article 320(3)(a) and (b) of the Constitution of India, framing and amendment of Recruitment Rules (RRs) for all Group &apos;A&apos; and Group &apos;B&apos; posts in the Ministries/Departments are processed through the Commission.
              </p>
              <div className="p-3 bg-stone-100 rounded border border-stone-200">
                <span className="font-bold text-stone-900 block">Interview Venue:</span>
                <span className="text-stone-700">
                  UPSC Board Rooms, Dholpur House, Shahjahan Road, New Delhi - 110069
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-600">
            Recruitment Branch · Union Public Service Commission
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
