import React from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar, AshokaChakra } from './Emblem';
import { ShieldCheck, ExternalLink, Globe, PhoneCall, Mail } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenPortal: (portal: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenPortal }) => {
  return (
    <footer className="w-full bg-[#111c31] text-slate-300 text-xs font-portal">
      <TricolorBar className="h-1.5 w-full" />

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Government Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white">
              <div className="text-amber-400">
                <Emblem size={36} />
              </div>
              <div>
                <span className="font-serif-heading font-bold text-sm block">
                  {lang === 'hi' ? 'संघ लोक सेवा आयोग' : 'UNION PUBLIC SERVICE COMMISSION'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'hi' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              {lang === 'hi'
                ? 'धौलपुर हाउस, शाहजहां रोड, नई दिल्ली - 110069। संविधान के अनुच्छेद 315 के तहत स्थापित एक स्वतंत्र संवैधानिक निकाय।'
                : 'Dholpur House, Shahjahan Road, New Delhi - 110069. An independent Constitutional Body established under Article 315 of the Constitution of India.'}
            </p>

            <div className="pt-1 text-[11px] text-amber-300 font-mono space-y-1">
              <div>Facilitation Counter: 011-23385271</div>
              <div>Toll Free Helpline: 1800-11-8772</div>
            </div>
          </div>

          {/* Col 2: Key Examination Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {lang === 'hi' ? 'परीक्षा एवं परिणाम' : 'Examinations & Portals'}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => onOpenPortal('calendar')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'वार्षिक परीक्षा कैलेंडर 2026' : 'Annual Examination Calendar 2026'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('admit_card')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'ई-प्रवेश पत्र डाउनलोड (e-Admit Card)' : 'Download e-Admit Card (Hall Ticket)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('results')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'सिविल सेवा अंतिम परिणाम एवं अंकतालिका' : 'Civil Services Final Results & Marks'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('mock_test')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'प्रिलिम्स जीएस-1 अभ्यास टेस्ट (OMR)' : 'Prelims GS-1 Mock Practice (OMR)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('previous_papers')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'विगत वर्षों के प्रश्न पत्र' : 'Previous Question Papers & Keys'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('cutoff')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'कट-ऑफ अंक विश्लेषण (2019-2025)' : 'Cut-off Marks History'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional & Citizen Services */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {lang === 'hi' ? 'नागरिक सेवाएं एवं आयोग' : 'Citizen & Statutory Services'}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => onOpenPortal('otr')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'एकमुश्त पंजीकरण (OTR Portal)' : 'One Time Registration (OTR)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('about_commission')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'आयोग की संरचना एवं सदस्य' : 'Commission Composition & Members'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('about_constitutional')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'संवैधानिक प्रावधान (अनुच्छेद 315-323)' : 'Constitutional Provisions (Art. 315-323)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('rti')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'सूचना का अधिकार (RTI Act 2005)' : 'Right to Information (RTI)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('about_charter')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {lang === 'hi' ? 'नागरिक अधिकार पत्र (Citizen\'s Charter)' : "Citizen's Charter"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: National Portals & Compliance Badges */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider border-b border-slate-700 pb-1.5">
              {lang === 'hi' ? 'राष्ट्रीय पोर्टल एवं अनुपालन' : 'National Portals'}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>National Portal of India (india.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.mygov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>MyGov Portal (mygov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>CPGRAMS Public Grievance Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://rtionline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>RTI Online Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GIGW & WCAG 2.0 (Level AA) Compliant Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Web Policy Strip */}
      <div className="bg-[#0b1322] border-t border-slate-800 text-slate-400 text-[11px] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1">
            <span className="hover:text-slate-200 cursor-pointer">Website Policies</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Help & Feedback</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Use</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Copyright Policy</span>
            <span>·</span>
            <span className="hover:text-slate-200 cursor-pointer">Disclaimer</span>
          </div>

          <div className="text-[10px] space-y-0.5">
            <div>
              {lang === 'hi' ? 'सामग्री स्वामित्व:' : 'Content Owned by:'}{' '}
              <span className="text-slate-200 font-semibold">Union Public Service Commission</span>
            </div>
            <div className="font-mono text-slate-400">
              Last Updated On: 09/10/2026 · Visitor Count:{' '}
              <span className="text-amber-400 font-bold tabular-nums">184,920,412</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
