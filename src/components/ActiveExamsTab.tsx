import React, { useState } from 'react';
import { ExamNotification, Language } from '../types/upsc';
import { FileText, Download, ExternalLink, Calendar, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface ActiveExamsTabProps {
  notifications: ExamNotification[];
  lang: Language;
  onOpenPortal: (portal: string) => void;
  onSelectNotification: (notif: ExamNotification) => void;
}

export const ActiveExamsTab: React.FC<ActiveExamsTabProps> = ({
  notifications,
  lang,
  onOpenPortal,
  onSelectNotification,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'examination' | 'result' | 'recruitment' | 'press_release'>('all');

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((item) => item.category === activeTab);

  const tabs = [
    { id: 'all', labelEn: 'All Updates', labelHi: 'सभी सूचनाएं' },
    { id: 'examination', labelEn: 'Active Examinations', labelHi: 'सक्रिय परीक्षाएं' },
    { id: 'result', labelEn: 'Examination Results', labelHi: 'परीक्षा परिणाम' },
    { id: 'recruitment', labelEn: 'Recruitments (ORA)', labelHi: 'भर्ती (ORA)' },
    { id: 'press_release', labelEn: 'Press Notes & Notices', labelHi: 'प्रेस नोट एवं सूचना' },
  ];

  return (
    <section className="w-full bg-white py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main 2-Column: Tabbed Notifications & Active Exams List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-200 gap-2">
              <div>
                <h2 className="font-serif-heading text-xl font-bold text-stone-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-700" />
                  <span>{lang === 'hi' ? 'आयोग की सक्रिय गतिविधियां एवं सूचनाएं' : 'Active Examinations & Notifications'}</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'hi' ? 'अधिसूचनाएं, आवेदन लिंक, प्रवेश पत्र एवं परिणाम' : 'Official notifications, online application links & press releases'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenPortal('calendar')}
                  className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline underline-offset-2 flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'परीक्षा कैलेंडर 2026' : 'Exam Calendar 2026'}</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-md border border-stone-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#1b2a4a] text-white shadow-xs font-semibold'
                      : 'text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {lang === 'hi' ? tab.labelHi : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Table / List View */}
            <div className="border border-stone-200 rounded-md overflow-hidden bg-white shadow-xs">
              <div className="divide-y divide-stone-200">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 hover:bg-amber-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="font-mono bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                          {item.examCode}
                        </span>
                        <span>·</span>
                        <span className="font-mono">{item.date}</span>
                        {item.fileSize && (
                          <>
                            <span>·</span>
                            <span>PDF ({item.fileSize})</span>
                          </>
                        )}
                        {item.isNew && (
                          <span className="bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.2 rounded-xs uppercase tracking-wide">
                            {lang === 'hi' ? 'नवीन' : 'NEW'}
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => onSelectNotification(item)}
                        className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-amber-800 cursor-pointer leading-snug"
                      >
                        {lang === 'hi' ? item.titleHi : item.titleEn}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.applyLink && (
                        <button
                          onClick={() => onOpenPortal('otr')}
                          className="px-2.5 py-1 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{lang === 'hi' ? 'आवेदन करें' : 'Apply Online'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectNotification(item)}
                        className="px-2.5 py-1 text-xs font-medium bg-[#1b2a4a] hover:bg-stone-800 text-white rounded transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{lang === 'hi' ? 'विज्ञप्ति देखें' : 'View PDF'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar 1-Column: Important Notices, Forms & Quick Tools */}
          <div className="space-y-6">
            {/* Quick Helper Notice Box */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    {lang === 'hi' ? 'उम्मीदवारों के लिए महत्वपूर्ण सूचना' : 'Notice to Candidates'}
                  </h3>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    {lang === 'hi'
                      ? 'संघ लोक सेवा आयोग द्वारा किसी भी कोचिंग संस्थान या अनधिकृत पोर्टल से संबंध नहीं रखा जाता है। आवेदन केवल आधिकारिक upsc.gov.in या upsconline.nic.in पर ही करें।'
                      : 'UPSC does not endorse any coaching institutes or unauthorized third-party apps. Please fill applications strictly via official upsc.gov.in portals.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Links Panel */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
              <h3 className="font-serif-heading text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                {lang === 'hi' ? 'त्वरित लिंक एवं प्रपत्र' : 'Important Candidate Links'}
              </h3>

              <div className="space-y-2 text-xs">
                <button
                  onClick={() => onOpenPortal('admit_card')}
                  className="w-full text-left p-2.5 bg-white hover:bg-amber-50 rounded border border-stone-200 flex items-center justify-between text-stone-800 transition-colors"
                >
                  <span className="font-medium">{lang === 'hi' ? 'ई-प्रवेश पत्र डाउनलोड पोर्टल' : 'e-Admit Card Portal'}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => onOpenPortal('results')}
                  className="w-full text-left p-2.5 bg-white hover:bg-amber-50 rounded border border-stone-200 flex items-center justify-between text-stone-800 transition-colors"
                >
                  <span className="font-medium">{lang === 'hi' ? 'सिविल सेवा मुख्य परीक्षा 2026 परिणाम' : 'Civil Services Mains Examination, 2026 Results'}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => onOpenPortal('mock_test')}
                  className="w-full text-left p-2.5 bg-white hover:bg-amber-50 rounded border border-stone-200 flex items-center justify-between text-stone-800 transition-colors"
                >
                  <span className="font-medium">{lang === 'hi' ? 'यूपीएससी जीएस-1 प्रिलिम्स अभ्यास टेस्ट' : 'UPSC GS-1 Mock Simulator'}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => onOpenPortal('cutoff')}
                  className="w-full text-left p-2.5 bg-white hover:bg-amber-50 rounded border border-stone-200 flex items-center justify-between text-stone-800 transition-colors"
                >
                  <span className="font-medium">{lang === 'hi' ? 'विगत वर्षों के कट-ऑफ अंक' : 'Historical Cut-Off Marks'}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => onOpenPortal('rti')}
                  className="w-full text-left p-2.5 bg-white hover:bg-amber-50 rounded border border-stone-200 flex items-center justify-between text-stone-800 transition-colors"
                >
                  <span className="font-medium">{lang === 'hi' ? 'सूचना का अधिकार (RTI) प्रकटीकरण' : 'RTI Act 2005 Proactive Disclosure'}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>
            </div>

            {/* Helpline Gate 2 Card */}
            <div className="bg-gradient-to-br from-stone-900 to-slate-800 text-white rounded-lg p-4 shadow-sm space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                {lang === 'hi' ? 'सुविधा केंद्र' : 'Facilitation Counter'}
              </span>
              <h4 className="text-sm font-semibold">
                {lang === 'hi' ? 'धौलपुर हाउस मुख्य द्वार (गेट संख्या 2)' : 'Dholpur House Gate No. 2'}
              </h4>
              <p className="text-xs text-slate-300">
                {lang === 'hi'
                  ? 'कार्य दिवसों में प्रातः 10:00 से सायं 5:00 बजे तक व्यक्तिगत अथवा दूरभाष पर संपर्क किया जा सकता है।'
                  : 'Open on all working days from 10:00 AM to 5:00 PM for candidate inquiries.'}
              </p>
              <div className="pt-2 text-xs font-mono text-amber-300">
                📞 011-23385271 / 23381125
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
