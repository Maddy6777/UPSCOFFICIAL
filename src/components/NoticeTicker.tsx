import React, { useState } from 'react';
import { ExamNotification, Language } from '../types/upsc';
import { Bell, Pause, Play, ChevronRight, ExternalLink } from 'lucide-react';

interface NoticeTickerProps {
  notifications: ExamNotification[];
  lang: Language;
  onSelectNotification: (notif: ExamNotification) => void;
  onViewAll: () => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({
  notifications,
  lang,
  onSelectNotification,
  onViewAll,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="w-full bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center gap-3">
        {/* Label Badge */}
        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-1.5 bg-[#8b1e0f] text-white text-xs font-bold px-3 py-1.5 rounded-l shadow-xs tracking-wide">
            <Bell className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'नवीनतम समाचार' : "What's New"}</span>
          </div>

          {/* Pause / Play control */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-stone-800 text-amber-300 hover:text-white px-2 py-1.5 rounded-r text-xs transition-colors"
            title={isPlaying ? 'Pause marquee' : 'Resume marquee'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Rolling Marquee Container */}
        <div className="flex-1 overflow-hidden relative h-6 w-full">
          <div
            className={`flex items-center gap-8 whitespace-nowrap text-xs text-stone-800 font-medium ${
              isPlaying ? 'animate-marquee' : ''
            }`}
            style={{
              animationPlayState: isPlaying ? 'running' : 'paused',
              display: 'inline-flex',
            }}
          >
            {notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => onSelectNotification(n)}
                className="inline-flex items-center gap-2 hover:text-amber-800 transition-colors group cursor-pointer"
              >
                {n.isNew && (
                  <span className="bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-xs uppercase tracking-wider">
                    {lang === 'hi' ? 'नया' : 'NEW'}
                  </span>
                )}
                {n.titleEn.includes('UPSC MAINS EXAMINATION,2026 RESULT') ? (
                  <span className="bg-[#1b449c] text-white font-bold uppercase text-xs px-2.5 py-0.5 rounded-xs tracking-wider shadow-xs">
                    {lang === 'hi' ? n.titleHi : n.titleEn}
                  </span>
                ) : (
                  <span className="group-hover:underline underline-offset-2">
                    {lang === 'hi' ? n.titleHi : n.titleEn}
                  </span>
                )}
                <span className="text-stone-400 font-mono text-[11px]">({n.date})</span>
                <span className="text-stone-300">|</span>
              </button>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <button
          onClick={onViewAll}
          className="shrink-0 flex items-center text-xs font-semibold text-[#1b2a4a] hover:text-amber-700 underline underline-offset-2 transition-colors ml-auto"
        >
          <span>{lang === 'hi' ? 'सभी देखें' : 'View All'}</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
