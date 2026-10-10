import React from 'react';
import { ExamNotification, Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { Download, Printer, ExternalLink, Calendar, FileText } from 'lucide-react';

interface NotificationDetailModalProps {
  notification: ExamNotification | null;
  onClose: () => void;
  lang: Language;
  onApply?: () => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  onClose,
  lang,
  onApply,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-3xl overflow-hidden my-6 font-portal">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={30} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                OFFICIAL NOTICE / आधिकारिक सूचना
              </span>
              <h2 className="font-serif-heading text-sm sm:text-base font-bold truncate max-w-lg">
                {notification.examCode}: {lang === 'hi' ? notification.titleHi : notification.titleEn}
              </h2>
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

        {/* Gazette Notice Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto text-stone-900 text-xs space-y-4">
          <div className="border border-stone-300 p-5 bg-stone-50/50 rounded-xs space-y-4">
            {/* Official Letterhead */}
            <div className="text-center border-b border-stone-300 pb-3 space-y-1">
              <div className="flex justify-center text-amber-900">
                <Emblem size={40} />
              </div>
              <h3 className="font-serif-heading text-sm sm:text-base font-bold text-[#1b2a4a]">
                संघ लोक सेवा आयोग / UNION PUBLIC SERVICE COMMISSION
              </h3>
              <p className="text-[11px] text-stone-600">
                धौलपुर हाउस, शाहजहां रोड, नई दिल्ली - 110069 / Dholpur House, Shahjahan Road, New Delhi - 110069
              </p>
              <div className="text-[10px] text-stone-500 font-mono mt-1">
                Ref No: UPSC/EXAM/{notification.examCode}/2026 · Dated: {notification.date}
              </div>
            </div>

            {/* Title */}
            <div className="text-center font-bold text-xs sm:text-sm text-stone-900 px-4">
              {lang === 'hi' ? notification.titleHi : notification.titleEn}
            </div>

            {/* Document Prose */}
            <div className="text-stone-800 leading-relaxed space-y-3 text-xs">
              <p>
                {lang === 'hi'
                  ? `संघ लोक सेवा आयोग द्वारा एतद्द्वारा सूचित किया जाता है कि ${notification.titleHi} से संबंधित विस्तृत दिशा-निर्देश, पात्रता मानदंड, पदों की संख्या एवं परीक्षा की रूपरेखा आयोग की आधिकारिक वेबसाइट पर जारी कर दी गई है।`
                  : `The Union Public Service Commission hereby notifies that detailed guidelines, eligibility criteria, vacancies, and examination scheme regarding ${notification.titleEn} have been published on the Commission's official web portal.`}
              </p>

              <div className="p-3 bg-white rounded border border-stone-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-600">Examination Code:</span>
                  <span className="font-mono font-bold text-stone-900">{notification.examCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-600">Date of Release:</span>
                  <span className="font-mono text-stone-900">{notification.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-600">Official Gazetted File:</span>
                  <span className="font-mono text-stone-900">UPSC_{notification.examCode}_Notification.pdf ({notification.fileSize || '1.2 MB'})</span>
                </div>
              </div>

              <p>
                {lang === 'hi'
                  ? 'इच्छुक एवं पात्र उम्मीदवार संघ लोक सेवा आयोग के ऑनलाइन पोर्टल (upsconline.nic.in) पर निर्धारित अंतिम तिथि तक अपना आवेदन प्रस्तुत कर सकते हैं। समय सीमा के पश्चात प्राप्त किसी भी आवेदन पर विचार नहीं किया जाएगा।'
                  : 'Candidates are required to apply online using the official website upsc.gov.in / upsconline.nic.in. The online applications can be filled up to 6:00 PM on the designated last date, after which the link will be disabled.'}
              </p>
            </div>

            {/* Signatory */}
            <div className="pt-4 flex justify-between items-end border-t border-stone-200 text-[11px] text-stone-600">
              <div>
                <span>Place: New Delhi</span>
                <div className="font-mono text-[10px]">Date: {notification.date}</div>
              </div>

              <div className="text-right">
                <span className="font-bold text-stone-900 block">( परीक्षा नियंत्रक / Controller of Examinations )</span>
                <span>संघ लोक सेवा आयोग / Union Public Service Commission</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 border border-stone-300 rounded text-stone-800 hover:bg-stone-100 flex items-center gap-1.5 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'सूचना प्रिंट करें' : 'Print Notice'}</span>
            </button>

            <div className="flex gap-2">
              {notification.applyLink && onApply && (
                <button
                  onClick={() => {
                    onClose();
                    onApply();
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'ऑनलाइन आवेदन पोर्टल (Apply)' : 'Apply Online (OTR)'}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#1b2a4a] text-white rounded text-xs font-bold hover:bg-stone-800"
              >
                {lang === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
