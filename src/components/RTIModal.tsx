import React from 'react';
import { Language } from '../types/upsc';
import { Emblem, TricolorBar } from './Emblem';
import { ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

interface RTIModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const RTIModal: React.FC<RTIModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-stone-300 w-full max-w-3xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#1b2a4a] text-white p-4 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="text-amber-300">
              <Emblem size={30} />
            </div>
            <div>
              <h2 className="font-serif-heading text-base font-bold">
                {lang === 'hi'
                  ? 'सूचना का अधिकार (RTI) - स्वतः संज्ञान प्रकटीकरण'
                  : 'Right to Information (RTI) - Proactive Disclosure'}
              </h2>
              <span className="text-[11px] text-slate-300">
                {lang === 'hi' ? 'सूचना का अधिकार अधिनियम, 2005 की धारा 4(1)(ख)' : 'Under Section 4(1)(b) of the RTI Act, 2005'}
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
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto text-stone-800 text-xs space-y-4">
          <div className="p-3 bg-stone-100 rounded border border-stone-200">
            <p className="leading-relaxed">
              {lang === 'hi'
                ? 'संघ लोक सेवा आयोग, नागरिकों के सूचना के अधिकार का सम्मान करता है तथा पारदर्शिता एवं शुचिता के उच्चतम मानकों का पालन करता है।'
                : 'The Union Public Service Commission is committed to the principles of transparency and accountability under the Right to Information Act, 2005.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 border-b border-stone-200 pb-1.5 text-xs">
              {lang === 'hi' ? 'केंद्रीय जन सूचना अधिकारी एवं प्रथम अपीलीय प्राधिकारी' : 'CPIOs & First Appellate Authority'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-stone-200 p-3 rounded bg-stone-50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">First Appellate Authority</span>
                <div className="font-bold text-stone-900">Joint Secretary (Examination)</div>
                <div className="text-stone-600">Union Public Service Commission, Dholpur House, Shahjahan Road, New Delhi</div>
                <div className="text-[11px] font-mono text-stone-700">Phone: 011-23385271</div>
              </div>

              <div className="border border-stone-200 p-3 rounded bg-stone-50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">Nodal CPIO</span>
                <div className="font-bold text-stone-900">Deputy Secretary (RTI Cell)</div>
                <div className="text-stone-600">RTI Cell, Room No. 20, Dholpur House, New Delhi - 110069</div>
                <div className="text-[11px] font-mono text-stone-700">Phone: 011-23098543</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-stone-900 text-xs">
              {lang === 'hi' ? 'ऑनलाइन आरटीआई आवेदन दाखिल करना' : 'Filing RTI Online'}
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Citizens can file online RTI applications and first appeals at the central portal:
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
              <span className="font-mono font-bold text-stone-900">https://rtionline.gov.in</span>
              <span className="text-[11px] text-amber-800 font-semibold">Government of India Portal</span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1b2a4a] text-white rounded text-xs font-bold hover:bg-stone-800"
            >
              {lang === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
