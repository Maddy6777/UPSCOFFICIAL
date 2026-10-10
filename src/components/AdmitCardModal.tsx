import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { Printer, Download, ShieldCheck, AlertCircle, Calendar, MapPin, Clock } from 'lucide-react';

interface AdmitCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdmitCardModal: React.FC<AdmitCardModalProps> = ({ isOpen, onClose, lang }) => {
  const [selectedExam, setSelectedExam] = useState('CSP-2026');
  const [searchMethod, setSearchMethod] = useState<'roll' | 'reg'>('roll');
  const [rollNo, setRollNo] = useState('0834192');
  const [dob, setDob] = useState('1999-08-15');
  const [showCard, setShowCard] = useState(false);

  if (!isOpen) return null;

  const exams = [
    { id: 'CSP-2026', nameEn: 'Civil Services (Preliminary) Examination, 2026', nameHi: 'सिविल सेवा (प्रारंभिक) परीक्षा, 2026', examDate: '24 May 2026' },
    { id: 'NDA-I-2026', nameEn: 'National Defence Academy & Naval Academy (I), 2026', nameHi: 'राष्ट्रीय रक्षा अकादमी परीक्षा (I), 2026', examDate: '21 April 2026' },
    { id: 'CDS-I-2026', nameEn: 'Combined Defence Services Examination (I), 2026', nameHi: 'सम्मिलित रक्षा सेवा परीक्षा (I), 2026', examDate: '21 April 2026' },
  ];

  const currentExamObj = exams.find((e) => e.id === selectedExam) || exams[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCard(true);
  };

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
                {lang === 'hi' ? 'ई-प्रवेश पत्र (e-Admit Card) डाउनलोड पोर्टल' : 'e-Admit Card (Hall Ticket) Download Portal'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग · नई दिल्ली' : 'Union Public Service Commission · New Delhi'}
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto text-stone-800">
          {!showCard ? (
            /* Search Form */
            <form onSubmit={handleGenerate} className="space-y-5 text-xs">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded text-blue-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="font-bold">
                    {lang === 'hi' ? 'निर्देश:' : 'Instructions:'}
                  </span>
                  <p className="mt-0.5 leading-relaxed">
                    {lang === 'hi'
                      ? 'कृपया अपना सही रोल नंबर अथवा पंजीकरण आईडी (RID) एवं जन्मतिथि दर्ज करें। ई-प्रवेश पत्र को ए4 आकार के श्वेत कागज पर प्रिंट करें।'
                      : 'Enter your valid Roll Number or Registration ID along with Date of Birth to download your official e-Admit Card for the examination.'}
                  </p>
                </div>
              </div>

              {/* Select Exam */}
              <div>
                <label className="block font-semibold mb-1 text-stone-700">
                  {lang === 'hi' ? 'परीक्षा का चयन करें*' : 'Select Examination*'}
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-xs bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {lang === 'hi' ? ex.nameHi : ex.nameEn} ({ex.examDate})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search By Toggle */}
              <div>
                <span className="block font-semibold mb-1.5 text-stone-700">
                  {lang === 'hi' ? 'खोज विधि चुनें:' : 'Select Search Method:'}
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="searchMethod"
                      checked={searchMethod === 'roll'}
                      onChange={() => setSearchMethod('roll')}
                      className="accent-[#1b2a4a]"
                    />
                    <span>{lang === 'hi' ? 'रोल नंबर द्वारा (By Roll No)' : 'By Roll Number'}</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="searchMethod"
                      checked={searchMethod === 'reg'}
                      onChange={() => setSearchMethod('reg')}
                      className="accent-[#1b2a4a]"
                    />
                    <span>{lang === 'hi' ? 'पंजीकरण आईडी द्वारा (By Registration ID)' : 'By Registration ID (RID)'}</span>
                  </label>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {searchMethod === 'roll'
                      ? lang === 'hi' ? 'रोल नंबर (7 अंक)*' : 'Roll Number (7 digits)*'
                      : lang === 'hi' ? 'पंजीकरण आईडी (RID)*' : 'Registration ID (RID)*'}
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 0834192"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'जन्म तिथि (DOB)*' : 'Date of Birth (DOB)*'}
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1b2a4a] hover:bg-stone-800 text-white rounded font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'ई-प्रवेश पत्र प्राप्त करें' : 'Download e-Admit Card'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Printable Photorealistic e-Admit Card Document */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <button
                  onClick={() => setShowCard(false)}
                  className="text-xs text-stone-600 hover:text-stone-900 underline"
                >
                  ← {lang === 'hi' ? 'दूसरा प्रवेश पत्र खोजें' : 'Search Another Admit Card'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'प्रिंट / पीडीएफ सेव करें' : 'Print / Save PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Authentic UPSC e-Admit Card Box */}
              <div className="border-2 border-stone-800 p-5 bg-white shadow-md text-stone-900 space-y-4 font-portal">
                {/* Header Lockup inside Admit Card */}
                <div className="text-center border-b-2 border-stone-800 pb-3 relative">
                  <div className="flex justify-center mb-1 text-stone-800">
                    <Emblem size={44} />
                  </div>
                  <h3 className="font-serif-heading font-bold text-sm sm:text-base tracking-wide">
                    संघ लोक सेवा आयोग | UNION PUBLIC SERVICE COMMISSION
                  </h3>
                  <div className="text-xs font-semibold text-stone-700 mt-0.5">
                    धौलपुर हाउस, शाहजहां रोड, नई दिल्ली - 110069
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold bg-stone-100 py-1 border-y border-stone-300">
                    ई-प्रवेश पत्र / e-ADMIT CARD
                  </div>
                  <div className="text-xs font-semibold text-stone-800 mt-1">
                    {lang === 'hi' ? currentExamObj.nameHi : currentExamObj.nameEn}
                  </div>
                </div>

                {/* Candidate Information & Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <div className="md:col-span-3 grid grid-cols-2 gap-y-2 gap-x-4 border border-stone-300 p-3 rounded-xs bg-stone-50/50">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        उम्मीदवार का नाम / Candidate Name
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-stone-900">ADITYA SRIVASTAVA</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        रोल नंबर / Roll Number
                      </span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-stone-900">{rollNo || '0834192'}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        पंजीकरण आईडी / RID
                      </span>
                      <span className="font-mono font-semibold text-stone-800">12409823104</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        श्रेणी / Category & PwBD
                      </span>
                      <span className="font-semibold text-stone-800">General (GEN) / Nil</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        पिता का नाम / Father's Name
                      </span>
                      <span className="font-semibold text-stone-800">V. P. SRIVASTAVA</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        केंद्र / Examination Center
                      </span>
                      <span className="font-semibold text-stone-800">DELHI (Center Code: 08)</span>
                    </div>
                  </div>

                  {/* Photo & Signature Frame */}
                  <div className="flex flex-col items-center justify-between border border-stone-300 p-2 bg-stone-50 rounded-xs">
                    <div className="w-24 h-28 border border-stone-400 bg-stone-200 flex flex-col items-center justify-center text-center p-1">
                      <div className="w-10 h-10 rounded-full bg-stone-400 mb-1" />
                      <span className="text-[9px] text-stone-600 font-bold uppercase">CANDIDATE PHOTO</span>
                    </div>
                    <div className="w-24 h-8 border border-stone-400 bg-white mt-1 flex items-center justify-center font-serif italic text-xs text-stone-600">
                      Aditya S.
                    </div>
                  </div>
                </div>

                {/* Exam Venue Box */}
                <div className="border border-stone-300 p-3 bg-stone-50 rounded-xs text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        परीक्षा स्थल / Examination Venue:
                      </span>
                      <p className="text-stone-800 font-medium mt-0.5">
                        GOVERNMENT BOYS SENIOR SECONDARY SCHOOL, SECTOR-4, R.K. PURAM, NEW DELHI - 110022 (SUB-CENTER: 08-014)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timetable Table */}
                <div className="border border-stone-300 overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#1b2a4a] text-white">
                      <tr>
                        <th className="p-2 border border-slate-700">दिनांक / Date</th>
                        <th className="p-2 border border-slate-700">सत्र / Session</th>
                        <th className="p-2 border border-slate-700">विषय / Subject</th>
                        <th className="p-2 border border-slate-700">समय / Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      <tr>
                        <td className="p-2 font-mono font-medium">{currentExamObj.examDate}</td>
                        <td className="p-2 font-medium">Forenoon (पूर्वाह्न)</td>
                        <td className="p-2 font-bold text-stone-900">Paper - I (General Studies)</td>
                        <td className="p-2 font-mono">09:30 AM to 11:30 AM</td>
                      </tr>
                      <tr className="bg-stone-50">
                        <td className="p-2 font-mono font-medium">{currentExamObj.examDate}</td>
                        <td className="p-2 font-medium">Afternoon (अपराह्न)</td>
                        <td className="p-2 font-bold text-stone-900">Paper - II (CSAT)</td>
                        <td className="p-2 font-mono">02:30 PM to 04:30 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Barcode & Security Marker */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-300 text-[10px] text-stone-500 font-mono">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>AUTHENTICATED BY UPSC EXAMINATION CONTROLLER · DIGITAL SIGNATURE VERIFIED</span>
                  </div>
                  <div>SEC-KEY: 9812-UPSC-2026-DLH-OK</div>
                </div>

                {/* Instructions Excerpt */}
                <div className="bg-amber-50/70 p-3 border border-amber-200 text-[10px] text-amber-950 space-y-1">
                  <span className="font-bold uppercase tracking-wider block">
                    परीक्षार्थी के लिए महत्वपूर्ण निर्देश (Important Instructions):
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Bring printout of this e-Admit Card along with original Photo ID card (e.g. Aadhaar Card, Driving Licence, Voter ID, Passport).</li>
                    <li>Entry into the examination venue closes 30 minutes before commencement of each session (09:00 AM and 02:00 PM).</li>
                    <li>Use of BLACK BALL POINT PEN only for marking answers on OMR sheet.</li>
                    <li>Mobile phones, smartwatches, calculators, and bluetooth devices are strictly prohibited inside examination hall.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
