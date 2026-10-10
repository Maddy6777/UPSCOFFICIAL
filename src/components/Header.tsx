import React, { useState, useEffect } from 'react';
import { Emblem, TricolorBar, AshokaChakra } from './Emblem';
import { Language, ContrastMode } from '../types/upsc';
import { Search, PhoneCall, Volume2, Globe, Clock, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  contrast: ContrastMode;
  onContrastChange: (mode: ContrastMode) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  onSearchSelect: (query: string) => void;
  onOpenPortal: (portal: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  contrast,
  onContrastChange,
  fontSize,
  onFontSizeChange,
  onSearchSelect,
  onOpenPortal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const searchSuggestions = [
    { title: lang === 'hi' ? 'सिविल सेवा प्रारंभिक परीक्षा 2026' : 'Civil Services Preliminary Exam 2026', type: 'exam', action: 'calendar' },
    { title: lang === 'hi' ? 'ई-प्रवेश पत्र डाउनलोड (e-Admit Card)' : 'Download e-Admit Card (Hall Ticket)', type: 'admit', action: 'admit_card' },
    { title: lang === 'hi' ? 'एकमुश्त पंजीकरण (OTR Portal)' : 'One Time Registration (OTR)', type: 'otr', action: 'otr' },
    { title: lang === 'hi' ? 'सिविल सेवा परीक्षा 2025 अंतिम परिणाम' : 'Civil Services Examination 2025 Final Result', type: 'result', action: 'results' },
    { title: lang === 'hi' ? 'वार्षिक परीक्षा कैलेंडर 2026' : 'Annual Examination Calendar 2026', type: 'calendar', action: 'calendar' },
    { title: lang === 'hi' ? 'पिछले प्रश्न पत्र (Previous Question Papers)' : 'Previous Question Papers & Keys', type: 'papers', action: 'previous_papers' },
    { title: lang === 'hi' ? 'कट-ऑफ अंक (Cut-Off Marks 2021-2025)' : 'Cut-off Marks History', type: 'cutoff', action: 'cutoff' },
    { title: lang === 'hi' ? 'प्रिलिम्स मॉक टेस्ट (GS Paper 1 Practice)' : 'Prelims Mock Test (OMR Practice)', type: 'mock', action: 'mock_test' },
  ];

  const filteredSuggestions = searchSuggestions.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* Tricolor Ribbon on top */}
      <TricolorBar className="h-1.5 w-full" />

      {/* Top Utility / Accessibility Bar */}
      <div className="bg-[#1b2a4a] text-slate-100 text-xs px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="font-medium tracking-wide">
            {lang === 'hi' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200">
            {lang === 'hi' ? 'संघ लोक सेवा आयोग' : 'UNION PUBLIC SERVICE COMMISSION'}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2 sm:gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono tabular-nums">{currentTime || 'IST Live'}</span>
          </div>

          <a
            href="#main-content"
            className="hidden sm:inline-block hover:text-amber-300 underline underline-offset-2 transition-colors"
          >
            {lang === 'hi' ? 'मुख्य विषय वस्तु पर जाएं' : 'Skip to main content'}
          </a>

          {/* Screen Reader Access */}
          <button
            onClick={() => alert(lang === 'hi' ? 'यह वेबसाइट जीआईजीडब्ल्यू (GIGW) और डब्ल्यूसीएजी 2.0 (WCAG 2.0) मानक का अनुपालन करती है।' : 'This portal complies with GIGW & WCAG 2.0 standard for Screen Reader accessibility.')}
            className="hidden md:flex items-center gap-1 hover:text-amber-300 transition-colors"
            title="Screen Reader Access"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="sr-only">Screen Reader Access</span>
          </button>

          {/* Text Resizer */}
          <div className="flex items-center bg-slate-800/80 rounded px-1.5 py-0.5 border border-slate-700">
            <button
              onClick={() => onFontSizeChange(Math.max(14, fontSize - 1))}
              className="px-1 font-bold hover:text-amber-400 text-[11px]"
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => onFontSizeChange(16)}
              className="px-1 font-bold hover:text-amber-400 text-xs border-x border-slate-700 mx-0.5"
              title="Standard text size"
            >
              A
            </button>
            <button
              onClick={() => onFontSizeChange(Math.min(19, fontSize + 1))}
              className="px-1 font-bold hover:text-amber-400 text-[13px]"
              title="Increase text size"
            >
              A+
            </button>
          </div>

          {/* Contrast Mode Selector */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onContrastChange('normal')}
              className={`w-4 h-4 rounded-sm border ${contrast === 'normal' ? 'ring-1 ring-amber-400' : ''} bg-white`}
              title="Standard View"
            />
            <button
              onClick={() => onContrastChange('high')}
              className={`w-4 h-4 rounded-sm border border-yellow-400 ${contrast === 'high' ? 'ring-1 ring-yellow-300' : ''} bg-black text-yellow-300 text-[9px] flex items-center justify-center font-bold`}
              title="High Contrast View"
            >
              H
            </button>
          </div>

          {/* Bilingual Switcher */}
          <div className="flex items-center bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-medium">
            <Globe className="w-3.5 h-3.5 mr-1" />
            {lang === 'hi' ? (
              <button
                onClick={() => onLanguageChange('en')}
                className="hover:underline font-semibold"
              >
                English
              </button>
            ) : (
              <button
                onClick={() => onLanguageChange('hi')}
                className="hover:underline font-semibold"
              >
                हिन्दी
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Brand Lockup */}
      <div className="px-4 sm:px-8 py-3.5 bg-gradient-to-b from-stone-50/70 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Indian Emblem & Titles */}
          <div className="flex items-center gap-3.5 sm:gap-5 text-left w-full md:w-auto">
            <div className="text-amber-900 shrink-0">
              <Emblem size={58} className="drop-shadow-xs" />
            </div>

            <div className="flex flex-col">
              <span className="font-serif-heading text-lg sm:text-2xl font-bold tracking-tight text-[#1b2a4a] leading-tight">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग' : 'UNION PUBLIC SERVICE COMMISSION'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-stone-700 tracking-wide mt-0.5">
                {lang === 'hi' ? 'UNION PUBLIC SERVICE COMMISSION' : 'संघ लोक सेवा आयोग'}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                <span>{lang === 'hi' ? 'धौलपुर हाउस, शाहजहां रोड, नई दिल्ली - 110069' : 'Dholpur House, Shahjahan Road, New Delhi - 110069'}</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center text-emerald-700 font-medium">
                  <ShieldCheck className="w-3 h-3 mr-0.5" />
                  {lang === 'hi' ? 'संवैधानिक निकाय (अनुच्छेद 315)' : 'Constitutional Body (Art. 315)'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Search Bar & Facilitation Helplines */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[310px]">
              <div className="flex items-center rounded-md border border-stone-300 bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#1b2a4a] focus-within:border-transparent">
                <input
                  type="text"
                  placeholder={lang === 'hi' ? 'परीक्षाएं, परिणाम, प्रवेश पत्र खोजें...' : 'Search exams, results, admit card...'}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  className="w-full px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      onSearchSelect(searchQuery);
                      setShowSearchDropdown(false);
                    }
                  }}
                  className="px-2.5 py-1.5 text-slate-500 hover:text-[#1b2a4a]"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSearchDropdown && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-md shadow-lg z-50 overflow-hidden text-xs">
                  <div className="p-1.5 bg-stone-100 border-b border-stone-200 text-[11px] font-semibold text-stone-600 flex justify-between">
                    <span>{lang === 'hi' ? 'त्वरित लिंक एवं सुझाव' : 'Quick Links & Suggestions'}</span>
                    <button
                      onClick={() => setShowSearchDropdown(false)}
                      className="text-stone-400 hover:text-stone-700 font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-stone-100">
                    {filteredSuggestions.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            onOpenPortal(item.action);
                            setShowSearchDropdown(false);
                            setSearchQuery('');
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-amber-50/80 flex items-center justify-between text-stone-800 transition-colors"
                        >
                          <span className="font-medium">{item.title}</span>
                          <span className="text-[10px] uppercase font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                            {item.type}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Facilitation Counter Tag */}
            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-stone-100/90 border border-stone-200 text-stone-700">
              <PhoneCall className="w-4 h-4 text-amber-700 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold block text-stone-900">
                  {lang === 'hi' ? 'सुविधा काउंटर' : 'Facilitation Counter'}
                </span>
                <span className="font-mono text-stone-600">011-23385271</span>
              </div>
            </div>

            {/* Emblem / 75 Years Badge */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-[#1b2a4a] bg-amber-50 border border-amber-200 px-2 py-1 rounded">
              <AshokaChakra size={18} />
              <div className="leading-tight text-center">
                <span className="block text-[9px] text-amber-800 uppercase tracking-wider">
                  {lang === 'hi' ? 'स्वतंत्रता का' : 'Centenary'}
                </span>
                <span>1926–2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
