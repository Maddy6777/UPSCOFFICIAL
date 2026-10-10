import React from 'react';
import { Language } from '../types/upsc';
import { UserCheck, FileCheck, Award, Calendar, BookOpen, HelpCircle, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroBannersProps {
  lang: Language;
  onOpenPortal: (portal: string) => void;
}

export const HeroBanners: React.FC<HeroBannersProps> = ({ lang, onOpenPortal }) => {
  const quickActions = [
    {
      id: 'otr',
      titleEn: 'One Time Registration (OTR)',
      titleHi: 'एकमुश्त पंजीकरण (OTR)',
      descEn: 'Single window registration for all UPSC online applications.',
      descHi: 'सभी संघ लोक सेवा आयोग परीक्षाओं हेतु एकल खिड़की पंजीकरण।',
      icon: <UserCheck className="w-6 h-6 text-amber-700" />,
      badge: lang === 'hi' ? 'अनिवार्य' : 'MANDATORY',
      action: 'otr',
      accent: 'border-amber-600',
    },
    {
      id: 'admit_card',
      titleEn: 'e-Admit Card (Hall Ticket)',
      titleHi: 'ई-प्रवेश पत्र (हॉल टिकट)',
      descEn: 'Download official e-admit cards for CSP 2026, NDA, CDS.',
      descHi: 'सिविल सेवा, एनडीए एवं सीडीएस परीक्षाओं के प्रवेश पत्र डाउनलोड करें।',
      icon: <FileCheck className="w-6 h-6 text-blue-700" />,
      badge: lang === 'hi' ? 'सक्रिय' : 'ACTIVE',
      action: 'admit_card',
      accent: 'border-blue-600',
    },
    {
      id: 'results',
      titleEn: 'Result',
      titleHi: 'परिणाम (Result)',
      descEn: 'Civil Services Mains Examination, 2026 Results',
      descHi: 'सिविल सेवा मुख्य परीक्षा, 2026 परिणाम (Civil Services Mains Examination, 2026 Results)',
      icon: <Award className="w-6 h-6 text-emerald-700" />,
      badge: lang === 'hi' ? 'घोषित' : 'DECLARED',
      action: 'results',
      accent: 'border-emerald-600',
    },
    {
      id: 'calendar',
      titleEn: 'Annual Exam Calendar 2026',
      titleHi: 'वार्षिक परीक्षा कैलेंडर 2026',
      descEn: 'Comprehensive schedule of all 24 UPSC examinations.',
      descHi: 'सभी 24 संघ लोक सेवा आयोग परीक्षाओं की अधिकृत समय सारणी।',
      icon: <Calendar className="w-6 h-6 text-purple-700" />,
      badge: '2026',
      action: 'calendar',
      accent: 'border-purple-600',
    },
    {
      id: 'mock_test',
      titleEn: 'Prelims GS-1 Mock Test',
      titleHi: 'प्रिलिम्स जीएस-1 मॉक टेस्ट',
      descEn: 'Practice real UPSC standard questions with OMR bubble sheet.',
      descHi: 'ओएमआर बबल शीट के साथ वास्तविक यूपीएससी मानक प्रश्नों का अभ्यास।',
      icon: <HelpCircle className="w-6 h-6 text-rose-700" />,
      badge: lang === 'hi' ? 'अभ्यास' : 'PRACTICE',
      action: 'mock_test',
      accent: 'border-rose-600',
    },
    {
      id: 'previous_papers',
      titleEn: 'Previous Question Papers',
      titleHi: 'पिछले प्रश्न पत्र एवं उत्तर कुंजी',
      descEn: 'Download GS I, CSAT, Essay & Optional subjects papers.',
      descHi: 'जीएस I, सीसैट, निबंध और वैकल्पिक विषयों के प्रश्न पत्र।',
      icon: <BookOpen className="w-6 h-6 text-cyan-700" />,
      badge: '2019-2025',
      action: 'previous_papers',
      accent: 'border-cyan-600',
    },
  ];

  return (
    <section className="w-full bg-stone-100 py-6 sm:py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner Card: Dholpur House Neoclassical Architectural Illustration */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#17253d] via-[#1c335a] to-[#203a66] text-white shadow-md border border-stone-300 mb-8">
          {/* Subtle architectural background texture pattern */}
          <div
            className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
            aria-hidden="true"
          />

          <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded border border-amber-400/30">
                <Shield className="w-3.5 h-3.5" />
                <span>
                  {lang === 'hi'
                    ? 'संविधान का भाग XIV · अनुच्छेद 315 से 323'
                    : 'Part XIV of the Constitution · Articles 315 to 323'}
                </span>
              </div>

              <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {lang === 'hi'
                  ? 'राष्ट्र निर्माण के लिए योग्यता और शुचिता का संरक्षक'
                  : 'Merit, Integrity & Fairness in Nation Building'}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {lang === 'hi'
                  ? 'संघ लोक सेवा आयोग भारत का प्रमुख केंद्रीय भर्ती अभिकरण है। यह सिविल सेवाओं एवं रक्षा बलों के लिए उच्चतम निष्पक्षता, पारदर्शिता एवं गुणवत्ता के साथ भर्ती का संचालन करता है।'
                  : 'The Union Public Service Commission is India’s premier central recruitment agency, mandated to select the finest talent for civil and defence services through transparent, rigorous, and merit-based examinations.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? '100% पारदर्शी चयन प्रक्रिया' : '100% Transparent Selection'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? 'अखिल भारतीय सेवाएं (IAS, IPS, IFS)' : 'All India Services (IAS, IPS, IFS)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'hi' ? 'धौलपुर हाउस, नई दिल्ली' : 'Dholpur House, New Delhi'}</span>
                </div>
              </div>
            </div>

            {/* Architectural Dholpur House Badge / Stamp */}
            <div className="shrink-0 bg-white/10 backdrop-blur-xs p-5 rounded-lg border border-white/20 text-center w-full lg:w-72 shadow-lg">
              <div className="text-amber-400 font-serif-heading text-xl font-bold">
                {lang === 'hi' ? 'धौलपुर हाउस' : 'DHOLPUR HOUSE'}
              </div>
              <div className="text-[11px] text-slate-300 tracking-wider uppercase mt-0.5">
                {lang === 'hi' ? 'आयोग का ऐतिहासिक मुख्यालय' : 'Headquarters of the Commission'}
              </div>

              <div className="my-3 py-2 border-y border-white/10 text-xs text-left space-y-1.5 text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'hi' ? 'स्थापना:' : 'Established:'}</span>
                  <span className="font-semibold text-white">01 Oct 1926</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'hi' ? 'अध्यक्ष:' : 'Hon\'ble Chairman:'}</span>
                  <span className="font-semibold text-white">Dr. Manoj Soni</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{lang === 'hi' ? 'कार्यकाल:' : 'Article:'}</span>
                  <span className="font-semibold text-amber-300">Article 315</span>
                </div>
              </div>

              <button
                onClick={() => onOpenPortal('about_commission')}
                className="w-full text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-3 rounded transition-colors flex items-center justify-center gap-1"
              >
                <span>{lang === 'hi' ? 'आयोग के बारे में विस्तार से' : 'About The Commission'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Online Candidate Portals Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-heading text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <span className="w-2 h-5 bg-amber-600 rounded-xs inline-block" />
              {lang === 'hi' ? 'ऑनलाइन सेवाएं एवं उम्मीदवार पोर्टल' : 'Online Candidate Services & Portals'}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              {lang === 'hi' ? 'अधिकृत डिजिटल सेवाएं' : 'Official Digital Services'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenPortal(item.action)}
                className={`text-left p-4 bg-white rounded-lg border-2 ${item.accent} shadow-xs hover:shadow-md transition-all group hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 bg-stone-50 rounded-md border border-stone-200 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm text-stone-900 group-hover:text-amber-800 transition-colors">
                    {lang === 'hi' ? item.titleHi : item.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {lang === 'hi' ? item.descHi : item.descEn}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                  <span>{lang === 'hi' ? 'पोर्टल खोलें' : 'Open Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
