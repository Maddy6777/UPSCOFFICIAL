import React from 'react';

interface AnnouncementTickerProps {
  onResultClick?: () => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ onResultClick }) => {
  const message = 'UPSC MAINS EXAMINATION,2026 RESULT WILL BE OUT AT 12.30 PM';

  // Array of repeated items for a continuous, seamless infinite loop
  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="w-full bg-white border-b border-slate-200 overflow-hidden py-1.5 shadow-xs">
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-ticker-seamless flex items-center shrink-0">
          {items.map((idx) => (
            <div
              key={idx}
              onClick={onResultClick}
              className="inline-flex items-center mx-5 cursor-pointer group shrink-0"
              title="Click to view declared results"
            >
              {/* Blue highlighted strip behind the text */}
              <span className="bg-[#1b449c] hover:bg-[#16367c] transition-colors text-white font-bold uppercase text-xs sm:text-sm px-4 py-1.5 rounded-sm shadow-xs tracking-wider inline-block font-sans whitespace-nowrap">
                {message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
