import React from 'react';

interface PlayerAvatarProps {
  name: string;
  number: number;
  teamColor: string;
  accentColor?: string;
  size?: number;
  className?: string;
}

/**
 * Generates a deterministic color from a name string for skin/hair variation.
 */
const hashColor = (str: string, hueShift: number = 0): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = (Math.abs(hash) % 40) + 20 + hueShift; // warm skin-tone range
  return `hsl(${hue}, 55%, 62%)`;
};

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ 
  name, 
  number, 
  teamColor, 
  accentColor,
  size = 40,
  className = '' 
}) => {
  const skinColor = hashColor(name);
  const hairColor = hashColor(name, 180);
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={{ borderRadius: '50%', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`jersey-${name.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={teamColor} />
          <stop offset="100%" stopColor={accentColor || teamColor} />
        </linearGradient>
        <radialGradient id={`skin-${name.replace(/\s/g, '')}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={skinColor} />
          <stop offset="100%" stopColor={`hsl(25, 50%, 45%)`} />
        </radialGradient>
      </defs>
      
      {/* Background */}
      <rect width="100" height="100" rx="50" fill={`url(#jersey-${name.replace(/\s/g, '')})`} />
      
      {/* Jersey collar */}
      <path d="M 30 70 Q 50 60 70 70 L 75 100 L 25 100 Z" fill={teamColor} opacity="0.8" />
      
      {/* Head */}
      <circle cx="50" cy="42" r="22" fill={skinColor} />
      
      {/* Hair */}
      <ellipse cx="50" cy="30" rx="20" ry="12" fill={hairColor} />
      
      {/* Number on jersey */}
      <text 
        x="50" y="92" 
        textAnchor="middle" 
        fill="white" 
        fontSize="14" 
        fontWeight="bold" 
        fontFamily="'Outfit', sans-serif"
      >
        #{number}
      </text>
      
      {/* Initials overlay - subtle */}
      <text 
        x="50" y="48" 
        textAnchor="middle" 
        fill="rgba(255,255,255,0.15)" 
        fontSize="16" 
        fontWeight="900" 
        fontFamily="'Outfit', sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
};

export default PlayerAvatar;
