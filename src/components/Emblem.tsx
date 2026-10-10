import React from 'react';

interface EmblemProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
}

export const Emblem: React.FC<EmblemProps> = ({ className = 'h-16 w-auto', size = 64 }) => {
  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size * 1.25}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="State Emblem of India - Satyameva Jayate"
    >
      {/* State Emblem of India stylized vector representation */}
      <g fill="currentColor">
        {/* Central Lion Head & Mane */}
        <path d="M60 12 C52 12, 47 18, 47 25 C47 29, 49 33, 51 36 C45 38, 42 44, 43 51 C44 57, 49 61, 54 62 C53 66, 56 70, 60 70 C64 70, 67 66, 66 62 C71 61, 76 57, 77 51 C78 44, 75 38, 69 36 C71 33, 73 29, 73 25 C73 18, 68 12, 60 12 Z" opacity="0.95" />
        {/* Left Lion Profile */}
        <path d="M42 22 C37 20, 31 23, 29 28 C26 34, 27 41, 31 46 C28 50, 28 56, 32 60 C35 64, 40 64, 44 61 C43 54, 43 46, 46 40 C43 36, 42 28, 42 22 Z" opacity="0.85" />
        {/* Right Lion Profile */}
        <path d="M78 22 C83 20, 89 23, 91 28 C94 34, 93 41, 89 46 C92 50, 92 56, 88 60 C85 64, 80 64, 76 61 C77 54, 77 46, 74 40 C77 36, 78 28, 78 22 Z" opacity="0.85" />
        {/* Details & Eyes/Muzzle */}
        <circle cx="56" cy="30" r="2" fill="#fff" />
        <circle cx="64" cy="30" r="2" fill="#fff" />
        <path d="M57 37 Q60 41 63 37" stroke="#fff" strokeWidth="1.5" fill="none" />
        
        {/* Abacus / Base Platform */}
        <rect x="24" y="73" width="72" height="6" rx="2" />
        <rect x="28" y="79" width="64" height="20" rx="1" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Central Dharma Chakra on Abacus */}
        <circle cx="60" cy="89" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="89" r="1.5" fill="currentColor" />
        {/* 24 spokes representation */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="60"
            y1="89"
            x2={60 + 6 * Math.cos((deg * Math.PI) / 180)}
            y2={89 + 6 * Math.sin((deg * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        ))}

        {/* Bull on Right and Horse on Left stylized indicators */}
        <path d="M37 92 C34 92, 33 87, 36 86 C39 85, 42 88, 41 92 Z" />
        <path d="M83 92 C86 92, 87 87, 84 86 C81 85, 78 88, 79 92 Z" />

        {/* Lower Lotus Base Plinth */}
        <path d="M22 100 Q60 106 98 100 L95 106 Q60 112 25 106 Z" />
        <rect x="30" y="107" width="60" height="4" rx="1" />

        {/* Devnagari Motto: सत्यमेव जयते (Satyameva Jayate) */}
        <text
          x="60"
          y="126"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fontFamily="'Noto Sans Devanagari', serif"
          letterSpacing="1"
          fill="currentColor"
        >
          सत्यमेव जयते
        </text>
        <text
          x="60"
          y="138"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
          opacity="0.8"
          fill="currentColor"
        >
          TRUTH ALONE TRIUMPHS
        </text>
      </g>
    </svg>
  );
};

export const TricolorBar: React.FC<{ className?: string }> = ({ className = 'h-1 w-full' }) => {
  return (
    <div className={`grid grid-cols-3 ${className}`} aria-hidden="true">
      <div className="bg-[#FF9933] h-full" />
      <div className="bg-[#FFFFFF] h-full" />
      <div className="bg-[#138808] h-full" />
    </div>
  );
};

export const AshokaChakra: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = 'text-[#000080]' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" strokeWidth="1" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2={12 + 8.5 * Math.cos((deg * Math.PI) / 180)}
          y2={12 + 8.5 * Math.sin((deg * Math.PI) / 180)}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
};
