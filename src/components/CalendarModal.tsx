import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { ANNUAL_CALENDAR_2026 } from '../data/upscData';
import { Emblem, TricolorBar } from './Emblem';
import { Calendar, Search, Printer, Download, Clock, AlertCircle } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredCalendar = ANNUAL_CALENDAR_2026.filter((item) => {
    return (
      item.examNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examNameHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examDate.includes(searchTerm)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-5xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={32} />
            </div>
            <div>
              <h2 className="font-serif-heading text-base sm:text-lg font-bold">
                {lang === 'hi'
                  ? 'संघ लोक सेवा आयोग - वार्षिक परीक्षा कैलेंडर 2026'
                  : 'UPSC - Annual Programme of Examinations & RTs 2026'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'आधिकारिक परीक्षा कार्यक्रम एवं अधिसूचना तिथियां' : 'Official Examination Schedule & Notification Dates'}
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
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto space-y-4 text-stone-800 text-xs">
          {/* Note */}
          <div className="p-3 bg-stone-100 border border-stone-200 rounded text-stone-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-[11px]">
              <span className="font-bold">
                {lang === 'hi' ? 'महत्वपूर्ण सूचना:' : 'Note for Candidates:'}
              </span>
              <p className="mt-0.5 leading-relaxed">
                {lang === 'hi'
                  ? 'अधिसूचना की तिथियां, आवेदन की अंतिम तिथि एवं परीक्षा की तिथियां परिस्थितियों के अनुसार परिवर्तनीय हैं। परीक्षा रविवार या शनिवार को आयोजित की जाती है।'
                  : 'The dates of notification, commencement and duration of Examinations / RTs are liable to alteration if circumstances so warrant. Civil Services (Prelims) is scheduled for 24.05.2026.'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={lang === 'hi' ? 'परीक्षा का नाम या तिथि खोजें...' : 'Search examination or date...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-stone-300 rounded text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2" />
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-[#1b2a4a] text-white rounded font-semibold text-xs hover:bg-stone-800 flex items-center gap-1.5 self-end sm:self-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'कैलेंडर प्रिंट करें' : 'Print Calendar'}</span>
            </button>
          </div>

          {/* Calendar Table */}
          <div className="border border-stone-200 rounded-md overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#1b2a4a] text-white text-[11px]">
                <tr>
                  <th className="p-2.5 border-r border-slate-700 w-12 text-center">क्र. सं. / S.No.</th>
                  <th className="p-2.5 border-r border-slate-700">परीक्षा का नाम / Name of Examination</th>
                  <th className="p-2.5 border-r border-slate-700">अधिसूचना तिथि / Notification</th>
                  <th className="p-2.5 border-r border-slate-700">अंतिम तिथि / Last Date</th>
                  <th className="p-2.5 border-r border-slate-700">परीक्षा तिथि / Exam Date</th>
                  <th className="p-2.5 text-center">अवधि / Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {filteredCalendar.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                    <td className="p-2.5 text-center font-mono font-bold text-stone-500 border-r border-stone-100">
                      {idx + 1}
                    </td>
                    <td className="p-2.5 font-semibold text-stone-900 border-r border-stone-100">
                      {lang === 'hi' ? item.examNameHi : item.examNameEn}
                    </td>
                    <td className="p-2.5 font-mono text-stone-700 border-r border-stone-100">
                      {item.notificationDate}
                    </td>
                    <td className="p-2.5 font-mono text-stone-700 border-r border-stone-100">
                      {item.lastDateToApply}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-amber-900 border-r border-stone-100">
                      {item.examDate}
                    </td>
                    <td className="p-2.5 text-center font-mono text-stone-600">
                      {item.durationDays} {item.durationDays === 1 ? 'Day' : 'Days'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
