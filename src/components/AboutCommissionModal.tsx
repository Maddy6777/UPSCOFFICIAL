import React, { useState, useEffect } from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { Shield, BookOpen, Landmark, Users, CheckCircle2 } from 'lucide-react';

interface AboutCommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTab?: string;
}

export const AboutCommissionModal: React.FC<AboutCommissionModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTab = 'commission',
}) => {
  const [activeTab, setActiveTab] = useState<'commission' | 'constitutional' | 'history' | 'charter'>('commission');

  useEffect(() => {
    if (initialTab && ['commission', 'constitutional', 'history', 'charter'].includes(initialTab)) {
      setActiveTab(initialTab as 'commission' | 'constitutional' | 'history' | 'charter');
    }
  }, [initialTab, isOpen]);

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
                {lang === 'hi' ? 'संघ लोक सेवा आयोग - परिचय एवं संवैधानिक अधिदेश' : 'Union Public Service Commission - Mandate & History'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'धौलपुर हाउस, शाहजहां रोड, नई दिल्ली - 110069' : 'Dholpur House, Shahjahan Road, New Delhi - 110069'}
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

        {/* Tab Strip */}
        <div className="flex border-b border-stone-200 bg-stone-100 text-xs font-semibold px-4 pt-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('commission')}
            className={`py-2 px-3 rounded-t border-t border-x transition-colors ${
              activeTab === 'commission'
                ? 'bg-white text-[#1b2a4a] border-stone-300 border-b-transparent'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'आयोग एवं सदस्य' : 'The Commission & Members'}
          </button>

          <button
            onClick={() => setActiveTab('constitutional')}
            className={`py-2 px-3 rounded-t border-t border-x transition-colors ${
              activeTab === 'constitutional'
                ? 'bg-white text-[#1b2a4a] border-stone-300 border-b-transparent'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'संवैधानिक प्रावधान (अनुच्छेद 315-323)' : 'Constitutional Articles (315-323)'}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-3 rounded-t border-t border-x transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-[#1b2a4a] border-stone-300 border-b-transparent'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'ऐतिहासिक परिप्रेक्ष्य (1926 से)' : 'Historical Perspective'}
          </button>

          <button
            onClick={() => setActiveTab('charter')}
            className={`py-2 px-3 rounded-t border-t border-x transition-colors ${
              activeTab === 'charter'
                ? 'bg-white text-[#1b2a4a] border-stone-300 border-b-transparent'
                : 'text-stone-600 border-transparent hover:text-stone-900'
            }`}
          >
            {lang === 'hi' ? 'नागरिक अधिकार पत्र (Citizen Charter)' : "Citizen's Charter"}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 max-h-[72vh] overflow-y-auto text-stone-800 text-xs leading-relaxed space-y-4">
          {activeTab === 'commission' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded border border-amber-200">
                <Users className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-950 text-sm">
                    {lang === 'hi' ? 'आयोग की संरचना' : 'Composition of the Commission'}
                  </h3>
                  <p className="mt-1 text-stone-700">
                    {lang === 'hi'
                      ? 'संघ लोक सेवा आयोग में एक अध्यक्ष तथा संविधान द्वारा निर्धारित अन्य सदस्य शामिल होते हैं। वर्तमान में आयोग में अध्यक्ष एवं अन्य प्रतिष्ठित प्रशासनिक, शैक्षणिक तथा न्यायिक क्षेत्रों के विशेषज्ञ सदस्य कार्यरत हैं।'
                      : 'The Union Public Service Commission consists of a Chairman and other Members appointed by the President of India under Article 316 of the Constitution.'}
                  </p>
                </div>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-stone-300 p-3 rounded bg-stone-50">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">माननीय अध्यक्ष / Hon'ble Chairman</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">Dr. Manoj Soni</h4>
                  <p className="text-[11px] text-stone-600 mt-1">Eminent educationist and former Vice-Chancellor of MS University of Baroda.</p>
                </div>

                <div className="border border-stone-300 p-3 rounded bg-stone-50">
                  <span className="text-[10px] uppercase font-bold text-stone-600 block">माननीय सदस्य / Hon'ble Member</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">Lt. Gen. Raj Shukla (Retd.)</h4>
                  <p className="text-[11px] text-stone-600 mt-1">Former GOC-in-C Army Training Command (ARTRAC), PVSM, YSM, SM.</p>
                </div>

                <div className="border border-stone-300 p-3 rounded bg-stone-50">
                  <span className="text-[10px] uppercase font-bold text-stone-600 block">माननीय सदस्य / Hon'ble Member</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">Ms. Preeti Sudan, IAS (Retd.)</h4>
                  <p className="text-[11px] text-stone-600 mt-1">Former Union Health Secretary, Government of India.</p>
                </div>

                <div className="border border-stone-300 p-3 rounded bg-stone-50">
                  <span className="text-[10px] uppercase font-bold text-stone-600 block">माननीय सदस्य / Hon'ble Member</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">Dr. Suman Sharma, IRS (Retd.)</h4>
                  <p className="text-[11px] text-stone-600 mt-1">Distinguished tax administrator and former MD of Solar Energy Corporation of India.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'constitutional' && (
            <div className="space-y-3">
              <h3 className="font-serif-heading text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                Articles 315 to 323 of the Constitution of India (Part XIV, Chapter II)
              </h3>

              <div className="space-y-2.5">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold text-amber-900 font-mono">Article 315:</span>
                  <p className="mt-0.5 text-stone-700">Public Service Commissions for the Union and for the States. Mandates the creation of UPSC.</p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold text-amber-900 font-mono">Article 316:</span>
                  <p className="mt-0.5 text-stone-700">Appointment and term of office of members. Chairman and members appointed by the President for a term of 6 years or until age 65.</p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold text-amber-900 font-mono">Article 317:</span>
                  <p className="mt-0.5 text-stone-700">Removal and suspension of a member of a Public Service Commission on grounds of misbehaviour after inquiry by Supreme Court.</p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold text-amber-900 font-mono">Article 320:</span>
                  <p className="mt-0.5 text-stone-700">Functions of Public Service Commissions: To conduct examinations for appointments to services of the Union and advising on recruitment methods and disciplinary matters.</p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded">
                  <span className="font-bold text-amber-900 font-mono">Article 322:</span>
                  <p className="mt-0.5 text-stone-700">Expenses of Public Service Commissions charged on the Consolidated Fund of India.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h3 className="font-serif-heading text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                Milestones in the Evolution of UPSC (1923 - 2026)
              </h3>

              <div className="space-y-2 border-l-2 border-amber-600 pl-4">
                <div>
                  <span className="font-bold text-amber-900 font-mono">1923:</span>
                  <p className="text-stone-700">Royal Commission on Superior Civil Services under Lord Lee of Fareham recommends establishment of PSC.</p>
                </div>
                <div>
                  <span className="font-bold text-amber-900 font-mono">1 October 1926:</span>
                  <p className="text-stone-700">First Public Service Commission established in India under the Chairmanship of Sir Ross Barker.</p>
                </div>
                <div>
                  <span className="font-bold text-amber-900 font-mono">1 April 1937:</span>
                  <p className="text-stone-700">Reconstituted as the Federal Public Service Commission under the Government of India Act, 1935.</p>
                </div>
                <div>
                  <span className="font-bold text-amber-900 font-mono">26 January 1950:</span>
                  <p className="text-stone-700">Inauguration of the Constitution of India; designated as the Union Public Service Commission (UPSC).</p>
                </div>
                <div>
                  <span className="font-bold text-amber-900 font-mono">1952:</span>
                  <p className="text-stone-700">UPSC moves to its iconic sandstone headquarters at Dholpur House, Shahjahan Road, New Delhi.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'charter' && (
            <div className="space-y-3">
              <h3 className="font-serif-heading text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                Citizen's Charter & Commitment to Candidates
              </h3>

              <ul className="space-y-2 text-stone-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fair and impartial selection of candidates based strictly on merit without fear or favor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Timely conduct of examinations as scheduled in the Annual Calendar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prompt redressal of grievances through Facilitation Counter and CPGRAMS portal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Complete confidentiality and integrity in the evaluation of answer scripts and interview proceedings.</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
