import React, { useState } from 'react';
import { Language, ContrastMode, ExamNotification } from './types/upsc';
import { LATEST_NOTIFICATIONS } from './data/upscData';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { NoticeTicker } from './components/NoticeTicker';
import { HeroBanners } from './components/HeroBanners';
import { ActiveExamsTab } from './components/ActiveExamsTab';
import { OTRModal } from './components/OTRModal';
import { AdmitCardModal } from './components/AdmitCardModal';
import { ResultCheckerModal } from './components/ResultCheckerModal';
import { MockTestModal } from './components/MockTestModal';
import { CalendarModal } from './components/CalendarModal';
import { PreviousPapersModal } from './components/PreviousPapersModal';
import { CutoffExplorerModal } from './components/CutoffExplorerModal';
import { AboutCommissionModal } from './components/AboutCommissionModal';
import { NotificationDetailModal } from './components/NotificationDetailModal';
import { RTIModal } from './components/RTIModal';
import { AnnouncementTicker } from './components/AnnouncementTicker';
import { Footer } from './components/Footer';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [contrast, setContrast] = useState<ContrastMode>('normal');
  const [fontSize, setFontSize] = useState<number>(16);

  // Modals state
  const [isOtrOpen, setIsOtrOpen] = useState(false);
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMockTestOpen, setIsMockTestOpen] = useState(false);
  const [isPreviousPapersOpen, setIsPreviousPapersOpen] = useState(false);
  const [isCutoffOpen, setIsCutoffOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [aboutInitialTab, setAboutInitialTab] = useState('commission');
  const [isRtiOpen, setIsRtiOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<ExamNotification | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleOpenPortal = (portal: string) => {
    switch (portal) {
      case 'otr':
        setIsOtrOpen(true);
        break;
      case 'admit_card':
        setIsAdmitCardOpen(true);
        break;
      case 'results':
        setIsResultsOpen(true);
        break;
      case 'calendar':
        setIsCalendarOpen(true);
        break;
      case 'mock_test':
        setIsMockTestOpen(true);
        break;
      case 'previous_papers':
        setIsPreviousPapersOpen(true);
        break;
      case 'cutoff':
        setIsCutoffOpen(true);
        break;
      case 'about_commission':
        setAboutInitialTab('commission');
        setIsAboutOpen(true);
        break;
      case 'about_constitutional':
        setAboutInitialTab('constitutional');
        setIsAboutOpen(true);
        break;
      case 'about_history':
        setAboutInitialTab('history');
        setIsAboutOpen(true);
        break;
      case 'about_charter':
        setAboutInitialTab('charter');
        setIsAboutOpen(true);
        break;
      case 'rti':
        setIsRtiOpen(true);
        break;
      case 'contact':
        setShowContactModal(true);
        break;
      case 'active_exams':
        const el = document.getElementById('active-exams-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const contrastClasses =
    contrast === 'high'
      ? 'bg-black text-yellow-300 contrast-125'
      : contrast === 'night'
      ? 'bg-slate-950 text-slate-100'
      : 'bg-slate-50 text-slate-800';

  return (
    <div
      style={{ fontSize: `${fontSize}px` }}
      className={`min-h-screen flex flex-col font-portal ${contrastClasses} transition-colors duration-150`}
    >
      {/* Header */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        contrast={contrast}
        onContrastChange={setContrast}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onSearchSelect={(query) => {
          // If query matches any exam, open details or calendar
          setIsCalendarOpen(true);
        }}
        onOpenPortal={handleOpenPortal}
      />

      {/* Main Navigation */}
      <Navbar lang={lang} onOpenPortal={handleOpenPortal} activeSection="home" />

      {/* Notice / What's New Ticker */}
      <NoticeTicker
        notifications={LATEST_NOTIFICATIONS}
        lang={lang}
        onSelectNotification={(notif) => setSelectedNotification(notif)}
        onViewAll={() => {
          const el = document.getElementById('active-exams-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Full-width announcement ticker below What's New */}
      <AnnouncementTicker onResultClick={() => handleOpenPortal('results')} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* Hero & Quick Action Portals */}
        <HeroBanners lang={lang} onOpenPortal={handleOpenPortal} />

        {/* Tabbed Activity Center: Active Exams, Results, Notifications */}
        <div id="active-exams-section">
          <ActiveExamsTab
            notifications={LATEST_NOTIFICATIONS}
            lang={lang}
            onOpenPortal={handleOpenPortal}
            onSelectNotification={(notif) => setSelectedNotification(notif)}
          />
        </div>

        {/* Institutional Significance & Dholpur House Architectural Strip */}
        <section className="bg-stone-50 py-10 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-serif-heading font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <span>{lang === 'hi' ? 'संवैधानिक शुचिता' : 'Constitutional Autonomy'}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'संविधान के अनुच्छेद 315-323 के अंतर्गत संघ लोक सेवा आयोग को कार्यपालिका के किसी भी हस्तक्षेप से मुक्त स्वतंत्र दर्जा प्राप्त है।'
                    : 'Endowed with constitutional independence under Articles 315-323 of the Constitution of India, guaranteeing fair and merit-driven civil appointments.'}
                </p>
                <button
                  onClick={() => handleOpenPortal('about_constitutional')}
                  className="text-xs font-semibold text-amber-800 hover:underline pt-1 inline-block"
                >
                  {lang === 'hi' ? 'अनुच्छेद 315-323 पढ़ें →' : 'Read Constitutional Provisions →'}
                </button>
              </div>

              <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#1b2a4a] font-serif-heading font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>{lang === 'hi' ? 'अखिल भारतीय सेवाएं' : 'All India Services (AIS)'}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'आयोग द्वारा IAS, IPS एवं IFS सहित 24 केंद्रीय सेवाओं के लिए प्रतिवर्ष विश्वस्तरीय सिविल सेवा परीक्षा का आयोजन किया जाता है।'
                    : 'Conducts the world-renowned Civil Services Examination annually for induction into IAS, IPS, IFS, IRS, and 20+ premier central civil services.'}
                </p>
                <button
                  onClick={() => handleOpenPortal('results')}
                  className="text-xs font-semibold text-amber-800 hover:underline pt-1 inline-block"
                >
                  {lang === 'hi' ? 'अनुशंसा सूची देखें →' : 'View Recommended List →'}
                </button>
              </div>

              <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-serif-heading font-bold text-sm">
                  <MapPin className="w-5 h-5 text-rose-700" />
                  <span>{lang === 'hi' ? 'धौलपुर हाउस, नई दिल्ली' : 'Dholpur House Landmark'}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'hi'
                    ? 'नई दिल्ली के इंडिया गेट के निकट स्थित ऐतिहासिक धौलपुर हाउस 1952 से संघ लोक सेवा आयोग का आधिकारिक मुख्यालय है।'
                    : 'Situated at Shahjahan Road near India Gate, New Delhi, the iconic red sandstone Dholpur House has been the UPSC headquarters since 1952.'}
                </p>
                <button
                  onClick={() => handleOpenPortal('about_history')}
                  className="text-xs font-semibold text-amber-800 hover:underline pt-1 inline-block"
                >
                  {lang === 'hi' ? 'ऐतिहासिक परिप्रेक्ष्य →' : 'Historical Evolution →'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenPortal={handleOpenPortal} />

      {/* Interactive Feature Modals */}
      <OTRModal isOpen={isOtrOpen} onClose={() => setIsOtrOpen(false)} lang={lang} />
      <AdmitCardModal isOpen={isAdmitCardOpen} onClose={() => setIsAdmitCardOpen(false)} lang={lang} />
      <ResultCheckerModal isOpen={isResultsOpen} onClose={() => setIsResultsOpen(false)} lang={lang} />
      <MockTestModal isOpen={isMockTestOpen} onClose={() => setIsMockTestOpen(false)} lang={lang} />
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} lang={lang} />
      <PreviousPapersModal isOpen={isPreviousPapersOpen} onClose={() => setIsPreviousPapersOpen(false)} lang={lang} />
      <CutoffExplorerModal isOpen={isCutoffOpen} onClose={() => setIsCutoffOpen(false)} lang={lang} />
      <AboutCommissionModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={lang}
        initialTab={aboutInitialTab}
      />
      <RTIModal isOpen={isRtiOpen} onClose={() => setIsRtiOpen(false)} lang={lang} />
      <NotificationDetailModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        lang={lang}
        onApply={() => setIsOtrOpen(true)}
      />

      {/* Contact & Facilitation Counter Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-2xl overflow-hidden my-6">
            <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
              <h3 className="font-serif-heading font-bold text-base">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग - संपर्क एवं सुविधा केंद्र' : 'UPSC - Contact & Facilitation Counter'}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-slate-300 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 text-xs text-stone-800 space-y-4">
              <div className="border border-stone-200 p-4 rounded bg-stone-50 space-y-2">
                <span className="font-bold text-stone-900 text-sm block">Headquarters:</span>
                <p className="text-stone-700 leading-relaxed">
                  Union Public Service Commission (UPSC)<br />
                  Dholpur House, Shahjahan Road, New Delhi - 110069
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-stone-200 p-3 rounded space-y-1">
                  <span className="font-bold text-amber-900 block">Facilitation Counter (Gate No. 2)</span>
                  <p className="text-stone-600">For candidate examination queries:</p>
                  <div className="font-mono font-bold text-stone-900">011-23385271 / 23381125</div>
                  <div className="text-[11px] text-stone-500">Open 10:00 AM to 5:00 PM (Working days)</div>
                </div>

                <div className="border border-stone-200 p-3 rounded space-y-1">
                  <span className="font-bold text-amber-900 block">Toll-Free Helpline</span>
                  <p className="text-stone-600">Candidate assistance:</p>
                  <div className="font-mono font-bold text-emerald-800 text-sm">1800-11-8772</div>
                  <div className="text-[11px] text-stone-500">All India Toll-Free</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-4 py-2 bg-[#1b2a4a] text-white rounded font-bold text-xs"
                >
                  {lang === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
