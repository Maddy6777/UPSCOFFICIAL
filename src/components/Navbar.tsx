import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { ChevronDown, Home, BookOpen, Award, UserCheck, FileText, Phone, HelpCircle } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onOpenPortal: (portal: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onOpenPortal, activeSection }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      id: 'home',
      labelEn: 'Home',
      labelHi: 'मुख्य पृष्ठ',
      icon: <Home className="w-4 h-4 mr-1.5" />,
      action: 'home',
    },
    {
      id: 'about',
      labelEn: 'About Us',
      labelHi: 'हमारे बारे में',
      icon: <BookOpen className="w-4 h-4 mr-1.5" />,
      action: 'about_commission',
      subItems: [
        { labelEn: 'The Commission & Members', labelHi: 'आयोग एवं सदस्य', action: 'about_commission' },
        { labelEn: 'Constitutional Provisions (Art. 315-323)', labelHi: 'संवैधानिक प्रावधान (अनु. 315-323)', action: 'about_constitutional' },
        { labelEn: 'Historical Perspective (Since 1926)', labelHi: 'ऐतिहासिक परिप्रेक्ष्य (1926 से)', action: 'about_history' },
        { labelEn: "Citizen's Charter", labelHi: 'नागरिक अधिकार पत्र', action: 'about_charter' },
      ],
    },
    {
      id: 'examinations',
      labelEn: 'Examinations',
      labelHi: 'परीक्षाएं',
      icon: <Award className="w-4 h-4 mr-1.5" />,
      action: 'examinations',
      subItems: [
        { labelEn: 'Annual Calendar 2026', labelHi: 'वार्षिक परीक्षा कैलेंडर 2026', action: 'calendar' },
        { labelEn: 'Active Examinations', labelHi: 'सक्रिय परीक्षाएं', action: 'active_exams' },
        { labelEn: 'Previous Question Papers', labelHi: 'पिछले प्रश्न पत्र', action: 'previous_papers' },
        { labelEn: 'Cut-Off Marks Explorer', labelHi: 'कट-ऑफ अंक विश्लेषण', action: 'cutoff' },
        { labelEn: 'Answer Keys & Representations', labelHi: 'उत्तर कुंजी एवं प्रतिवेदन', action: 'previous_papers' },
      ],
    },
    {
      id: 'candidate_corner',
      labelEn: 'Candidate Corner',
      labelHi: 'उम्मीदवार कॉर्नर',
      icon: <UserCheck className="w-4 h-4 mr-1.5" />,
      action: 'candidate_corner',
      subItems: [
        { labelEn: 'One Time Registration (OTR)', labelHi: 'एकमुश्त पंजीकरण (OTR पोर्टल)', action: 'otr' },
        { labelEn: 'Download e-Admit Card (Hall Ticket)', labelHi: 'ई-प्रवेश पत्र डाउनलोड', action: 'admit_card' },
        { labelEn: 'Result - Civil Services Mains 2026', labelHi: 'परिणाम (Result) - सिविल सेवा मुख्य 2026', action: 'results' },
        { labelEn: 'Prelims Mock Test (OMR Practice)', labelHi: 'प्रिलिम्स मॉक टेस्ट (ओएमआर अभ्यास)', action: 'mock_test' },
      ],
    },
    {
      id: 'recruitment',
      labelEn: 'Recruitment',
      labelHi: 'भर्ती',
      icon: <FileText className="w-4 h-4 mr-1.5" />,
      action: 'recruitment',
      subItems: [
        { labelEn: 'Online Recruitment Application (ORA)', labelHi: 'ऑनलाइन भर्ती आवेदन (ORA)', action: 'recruitment' },
        { labelEn: 'Recruitment Advertisements', labelHi: 'भर्ती विज्ञापन', action: 'recruitment' },
        { labelEn: 'Interview Schedule & Status', labelHi: 'साक्षात्कार अनुसूची एवं स्थिति', action: 'recruitment' },
      ],
    },
    {
      id: 'rti',
      labelEn: 'RTI',
      labelHi: 'सूचना का अधिकार',
      action: 'rti',
    },
    {
      id: 'contact',
      labelEn: 'Contact Us',
      labelHi: 'संपर्क करें',
      icon: <Phone className="w-4 h-4 mr-1.5" />,
      action: 'contact',
    },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#162744] text-white shadow-md border-b-2 border-amber-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between py-0.5">
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const hasSub = item.subItems && item.subItems.length > 0;
              const isActive = activeSection === item.id;
              const isDropdownOpen = openDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative shrink-0"
                  onMouseEnter={() => hasSub && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="inline-flex items-center">
                    {/* Main Clickable Button - Opens the Section Modal immediately */}
                    <button
                      onClick={() => {
                        onOpenPortal(item.action);
                        setOpenDropdown(null);
                      }}
                      className={`flex items-center pl-2.5 pr-1.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-l cursor-pointer ${
                        isActive
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'text-slate-100 hover:bg-slate-800/80 hover:text-amber-300'
                      }`}
                    >
                      {item.icon}
                      <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                    </button>

                    {/* Submenu Dropdown Arrow Toggle */}
                    {hasSub && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(isDropdownOpen ? null : item.id);
                        }}
                        className={`py-2 pr-2 pl-0.5 text-xs text-slate-200 hover:text-amber-300 rounded-r cursor-pointer transition-colors ${
                          isDropdownOpen ? 'bg-slate-800 text-amber-300' : ''
                        }`}
                        title="View sub-options"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Submenu Dropdown Menu */}
                  {hasSub && isDropdownOpen && (
                    <div className="absolute left-0 top-full w-64 bg-white text-slate-800 rounded-b-md shadow-2xl border border-stone-300 py-1 z-50 animate-fadeIn">
                      {item.subItems!.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            onOpenPortal(sub.action);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-amber-50 hover:text-amber-900 border-b border-stone-100 last:border-none transition-colors cursor-pointer"
                        >
                          {lang === 'hi' ? sub.labelHi : sub.labelEn}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Helpline Ribbon on right */}
          <div className="hidden lg:flex items-center gap-2 pl-4 text-xs text-amber-300 font-mono shrink-0">
            <span className="bg-amber-500/20 px-2.5 py-1 rounded border border-amber-400/30 text-[11px] font-semibold">
              Toll-Free: 1800-11-8772
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};
