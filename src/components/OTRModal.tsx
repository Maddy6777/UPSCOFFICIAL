import React, { useState } from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { UserCheck, Shield, CheckCircle2, AlertTriangle, Printer, Copy, Check } from 'lucide-react';

interface OTRModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const OTRModal: React.FC<OTRModalProps> = ({ isOpen, onClose, lang }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [copied, setCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: 'Maddy Rawal',
    gender: 'Male',
    dob: '1999-08-15',
    fatherName: 'Rajendra Rawal',
    motherName: 'Sunita Rawal',
    minorityStatus: 'No',
    mobile: '9876543210',
    email: 'maddy.rawal@example.com',
    class10Roll: '1098234',
    securityQuestion1: 'What is your birthplace?',
    securityAnswer1: 'New Delhi',
    securityQuestion2: 'What is your mother tongue?',
    securityAnswer2: 'Hindi',
  });

  const [generatedOtrId, setGeneratedOtrId] = useState('OTR-2026-894120');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = `OTR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOtrId(randomId);
    setStep('success');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOtrId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-3xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={32} />
            </div>
            <div>
              <h2 className="font-serif-heading text-base sm:text-lg font-bold">
                {lang === 'hi' ? 'एकमुश्त पंजीकरण (OTR) पोर्टल' : 'One Time Registration (OTR) Portal'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'संघ लोक सेवा आयोग · ऑनलाइन आवेदन प्रणाली' : 'Union Public Service Commission · Online Application System'}
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
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs text-stone-800">
              {/* Instructions Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {lang === 'hi' ? 'महत्वपूर्ण निर्देश:' : 'Important Instructions:'}
                  </span>
                  <p className="mt-0.5 text-[11px] leading-relaxed">
                    {lang === 'hi'
                      ? 'OTR पंजीकरण जीवन में केवल एक बार किया जाता है। नाम, जन्मतिथि और पिता का नाम कक्षा 10वीं के प्रमाणपत्र के अनुसार ही दर्ज करें।'
                      : 'OTR registration is done only once. Please enter Name, DOB, and Parents details strictly as recorded in your Class 10th Matriculation certificate.'}
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'उम्मीदवार का नाम (10वीं के अनुसार)*' : "Candidate's Full Name (As per 10th)*"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'लिंग / Gender*' : 'Gender*'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  >
                    <option value="Male">Male / पुरुष</option>
                    <option value="Female">Female / महिला</option>
                    <option value="Transgender">Transgender / ट्रांसजेंडर</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'जन्म तिथि (DD/MM/YYYY)*' : 'Date of Birth (DOB)*'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'कक्षा 10वीं का रोल नंबर*' : 'Class 10th Board Roll No.*'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.class10Roll}
                    onChange={(e) => setFormData({ ...formData, class10Roll: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'पिता का नाम*' : "Father's Name*"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'माता का नाम*' : "Mother's Name*"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'वैध मोबाइल नंबर (OTP सत्यापन हेतु)*' : 'Mobile Number (For OTP Verification)*'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">
                    {lang === 'hi' ? 'ईमेल पता*' : 'Email Address*'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Security Questions */}
              <div className="pt-3 border-t border-stone-200">
                <span className="font-bold text-stone-900 block mb-2">
                  {lang === 'hi' ? 'सुरक्षा प्रश्न (पासवर्ड रीसेट हेतु)' : 'Security Questions (For Account Recovery)'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      {lang === 'hi' ? 'सुरक्षा प्रश्न 1' : 'Security Question 1'}
                    </label>
                    <select
                      value={formData.securityQuestion1}
                      onChange={(e) => setFormData({ ...formData, securityQuestion1: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs bg-white mb-1.5"
                    >
                      <option>What is your birthplace?</option>
                      <option>What was your first school name?</option>
                      <option>What is your favourite subject?</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Answer 1"
                      value={formData.securityAnswer1}
                      onChange={(e) => setFormData({ ...formData, securityAnswer1: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      {lang === 'hi' ? 'सुरक्षा प्रश्न 2' : 'Security Question 2'}
                    </label>
                    <select
                      value={formData.securityQuestion2}
                      onChange={(e) => setFormData({ ...formData, securityQuestion2: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs bg-white mb-1.5"
                    >
                      <option>What is your mother tongue?</option>
                      <option>What is your childhood nickname?</option>
                      <option>What is your favourite freedom fighter?</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Answer 2"
                      value={formData.securityAnswer2}
                      onChange={(e) => setFormData({ ...formData, securityAnswer2: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  {lang === 'hi' ? '* सभी विवरण अनिवार्य हैं' : '* All fields are mandatory'}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-700 hover:bg-stone-100 font-medium transition-colors"
                  >
                    {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'ओटीआर पंजीकृत करें' : 'Register OTR'}</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Registration Success Slip */
            <div className="space-y-6 text-stone-800">
              <div className="text-center p-6 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
                <div className="inline-flex p-2 bg-emerald-100 text-emerald-700 rounded-full">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-emerald-950">
                  {lang === 'hi' ? 'एकमुश्त पंजीकरण सफलतापूर्वक संपन्न!' : 'OTR Registration Successful!'}
                </h3>
                <p className="text-xs text-emerald-800">
                  {lang === 'hi'
                    ? 'आपकी यूपीएससी ओ.टी.आर. आईडी जनरेट कर दी गई है। इसे भविष्य के सभी आवेदनों के लिए सुरक्षित रखें।'
                    : 'Your UPSC One Time Registration (OTR) ID has been successfully generated.'}
                </p>

                {/* Generated OTR ID Box */}
                <div className="mt-3 inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-md border-2 border-emerald-600 shadow-xs">
                  <span className="font-mono text-base sm:text-lg font-bold text-stone-900 tracking-wider">
                    {generatedOtrId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-stone-500 hover:text-emerald-700 p-1"
                    title="Copy OTR ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Summary Slip */}
              <div className="border border-stone-300 rounded-md p-4 bg-stone-50 text-xs space-y-2">
                <div className="font-bold border-b border-stone-300 pb-2 text-stone-900 flex justify-between">
                  <span>{lang === 'hi' ? 'पंजीकरण सारांश पर्ची' : 'Registration Acknowledgment Slip'}</span>
                  <span className="font-mono text-stone-500">UPSC-OTR-2026</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-stone-500 block">{lang === 'hi' ? 'उम्मीदवार का नाम:' : "Candidate's Name:"}</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{lang === 'hi' ? 'जन्म तिथि:' : 'Date of Birth:'}</span>
                    <span className="font-semibold font-mono">{formData.dob}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{lang === 'hi' ? 'पिता का नाम:' : "Father's Name:"}</span>
                    <span className="font-semibold">{formData.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{lang === 'hi' ? '10वीं रोल नंबर:' : '10th Roll No:'}</span>
                    <span className="font-semibold font-mono">{formData.class10Roll}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{lang === 'hi' ? 'ईमेल:' : 'Email:'}</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">{lang === 'hi' ? 'मोबाइल:' : 'Mobile:'}</span>
                    <span className="font-semibold font-mono">{formData.mobile}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep('form')}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 underline"
                >
                  {lang === 'hi' ? 'नया पंजीकरण करें' : 'Register Another'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 border border-stone-300 rounded text-stone-800 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'पर्ची प्रिंट करें' : 'Print Slip'}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-[#1b2a4a] text-white rounded text-xs font-bold hover:bg-stone-800"
                  >
                    {lang === 'hi' ? 'समाप्त करें एवं बंद करें' : 'Done & Close'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
