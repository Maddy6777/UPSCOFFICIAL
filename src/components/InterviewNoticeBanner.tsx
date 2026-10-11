import React from 'react';
import { AlertCircle } from 'lucide-react';

export const InterviewNoticeBanner: React.FC = () => {
  return (
    <div className="w-full bg-amber-50/90 border-y border-amber-200 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-start gap-3 bg-white p-3.5 sm:p-4 rounded-md border-l-4 border-l-red-700 border border-stone-200 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-stone-900">
            <span className="font-bold text-red-800 text-xs sm:text-sm tracking-wide block uppercase">
              𝐍𝐨𝐭𝐞-
            </span>
            <p className="font-bold text-xs sm:text-sm leading-relaxed text-stone-900">
              𝐓𝐡𝐞 𝐢𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐟𝐨𝐫𝐦 𝐦𝐮𝐬𝐭 𝐛𝐞 𝐟𝐢𝐥𝐥𝐞𝐝 𝐨𝐮𝐭 𝐢𝐧 𝐩𝐞𝐫𝐬𝐨𝐧 𝐚𝐭 𝐭𝐡𝐞 𝐨𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐜𝐞𝐧𝐭𝐫𝐞 𝐢𝐧 𝐃𝐞𝐥𝐡𝐢 𝐭𝐨𝐦𝐨𝐫𝐫𝐨𝐰, 𝐌𝐨𝐧𝐝𝐚𝐲. 𝐓𝐡𝐞 𝐟𝐨𝐫𝐦 𝐟𝐞𝐞 𝐢𝐬 ₹𝟏,𝟖𝟎𝟎, 𝐚𝐧𝐝 𝐚𝐥𝐥 𝐭𝐡𝐞 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝 𝐝𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐬 𝐦𝐮𝐬𝐭 𝐛𝐞 𝐬𝐮𝐛𝐦𝐢𝐭𝐭𝐞𝐝 𝐚𝐥𝐨𝐧𝐠 𝐰𝐢𝐭𝐡 𝐢𝐭.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
