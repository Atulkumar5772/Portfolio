import React, { useEffect, useState, useRef } from 'react';

export default function LiquidPreloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() > 0.4 ? 1 : 2;
      current += increment;

      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);

        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }, 650);
        }, 500);
      } else {
        setPercent(current);
      }
    }, 32);

    return () => clearInterval(interval);
  }, []);

  // Liquid vertical offset: 200px coordinate system
  const waveY = 200 - (percent / 100) * 200;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07050A] transition-all duration-700 select-none ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Crimson Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/15 blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none"></div>

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-70 animate-ping"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-red-400 opacity-80 animate-pulse"></div>
        <div className="absolute top-1/5 right-1/3 w-1.5 h-1.5 rounded-full bg-rose-300 opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/5 w-1 h-1 rounded-full bg-white opacity-50"></div>
      </div>

      {/* Main Liquid Capsule Container */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Glowing Orb Outer Shell */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* Radial Outer Glow Ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              percent === 100
                ? 'shadow-[0_0_70px_rgba(255,30,56,0.85),0_0_35px_rgba(216,30,47,0.7)] scale-105'
                : 'shadow-[0_0_40px_rgba(255,30,56,0.35),0_0_20px_rgba(216,30,47,0.2)]'
            }`}
          ></div>

          {/* SVG Wave Engine */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full overflow-hidden rounded-full border-2 border-red-500/40 shadow-2xl bg-[#12070D]/90"
          >
            <defs>
              {/* Circular Boundary Clip */}
              <clipPath id="orb-circle-clip">
                <circle cx="100" cy="100" r="98" />
              </clipPath>

              {/* Front Wave Gradient: Crimson to Deep Ruby Red */}
              <linearGradient id="liquid-front-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF2A3B" />
                <stop offset="50%" stopColor="#D81E2F" />
                <stop offset="100%" stopColor="#8B0014" />
              </linearGradient>

              {/* Back Wave Gradient: Translucent Dark Ruby */}
              <linearGradient id="liquid-back-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B0014" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4A000A" stopOpacity="0.65" />
              </linearGradient>

              {/* Liquid Surface Glow Filter */}
              <filter id="liquid-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Glass Shine Gradient */}
              <linearGradient id="glass-shine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Clipped Liquid Interior */}
            <g clipPath="url(#orb-circle-clip)">
              {/* Back Fluid Wave Layer */}
              <g
                style={{
                  transform: `translateY(${waveY}px)`,
                  transition: 'transform 0.08s linear',
                }}
              >
                <path
                  d="M 0 0 Q 35 -14, 70 0 T 140 0 T 210 0 T 280 0 T 350 0 T 420 0 V 260 H 0 Z"
                  fill="url(#liquid-back-grad)"
                  className="animate-liquid-back"
                />
              </g>

              {/* Front Fluid Wave Layer (Crimson Red Gradient) */}
              <g
                style={{
                  transform: `translateY(${waveY}px)`,
                  transition: 'transform 0.08s linear',
                }}
              >
                <path
                  d="M 0 0 Q 30 -16, 60 0 T 120 0 T 180 0 T 240 0 T 300 0 T 360 0 T 420 0 V 260 H 0 Z"
                  fill="url(#liquid-front-grad)"
                  filter="url(#liquid-glow)"
                  className="animate-liquid-front opacity-95"
                />

                {/* Animated Rising Fluid Bubbles */}
                <circle cx="50" cy="40" r="3" fill="#FFFFFF" opacity="0.6" className="animate-bubble-1" />
                <circle cx="100" cy="70" r="2.5" fill="#FFFFFF" opacity="0.7" className="animate-bubble-2" />
                <circle cx="150" cy="50" r="3.5" fill="#FFFFFF" opacity="0.5" className="animate-bubble-3" />
                <circle cx="80" cy="110" r="2" fill="#FFFFFF" opacity="0.6" className="animate-bubble-2" />
                <circle cx="130" cy="130" r="2.5" fill="#FFFFFF" opacity="0.6" className="animate-bubble-1" />
              </g>

              {/* Inner Capsule Glass Specular Highlight */}
              <ellipse
                cx="100"
                cy="32"
                rx="65"
                ry="18"
                fill="url(#glass-shine)"
                opacity="0.35"
                className="pointer-events-none"
              />
            </g>

            {/* Glowing Orb Border Rim */}
            <circle
              cx="100"
              cy="100"
              r="98"
              fill="none"
              stroke="rgba(255, 30, 56, 0.45)"
              strokeWidth="2.5"
            />
          </svg>

          {/* Central Percentage Counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <div className="flex items-baseline drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white font-['Syne']">
                {percent}
              </span>
              <span className="text-2xl sm:text-3xl text-red-400 font-extrabold ml-1 font-mono">
                %
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-red-200 uppercase mt-1 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {percent < 100 ? 'SYSTEM INITIALIZING' : 'SYS_ONLINE // 100%'}
            </span>
          </div>

          {/* Expansion Shockwave Ring on 100% Complete */}
          {percent === 100 && (
            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping pointer-events-none"></div>
          )}
        </div>

        {/* Dynamic Telemetry Status Badge */}
        <div className="mt-6 flex flex-col items-center gap-2 font-mono text-xs text-center">
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/35 text-red-200 shadow-xl shadow-red-950/60">
            <span className="w-2 h-2 rounded-full bg-[#FF1E38] animate-pulse shadow-md shadow-[#FF1E38]"></span>
            <span className="tracking-wider text-xs font-semibold">
              {percent < 25
                ? 'INITIALIZING POSIX KERNEL DAEMONS...'
                : percent < 50
                ? 'LOADING ZERO-KNOWLEDGE CRYPTO VAULT...'
                : percent < 75
                ? 'MAPPING CONCURRENCY ENGINE & LOCKS...'
                : percent < 100
                ? 'CALIBRATING GEOFENCE FORENSICS...'
                : 'SYS_ONLINE // ACCESS GRANTED'}
            </span>
          </div>
        </div>

        {/* User-Requested Tagline Banner (Reference: media_1795169295495_5ea7ffbc.png) */}
        <div className="mt-8 text-center tracking-widest uppercase select-none px-4">
          <div className="text-base sm:text-lg md:text-xl font-bold tracking-[0.22em] text-white/90 font-['Syne']">
            THE{' '}
            <span className="text-[#FF1E38] font-black drop-shadow-[0_0_16px_rgba(255,30,56,0.95)]">
              DEVELOPER
            </span>{' '}
            WHO TURNS{' '}
            <span className="text-[#FF1E38] font-black drop-shadow-[0_0_16px_rgba(255,30,56,0.95)]">
              IDEAS
            </span>
          </div>
          <div className="text-base sm:text-lg md:text-xl font-bold tracking-[0.22em] text-white/90 font-['Syne'] mt-1">
            INTO{' '}
            <span className="text-[#FF1E38] font-black drop-shadow-[0_0_16px_rgba(255,30,56,0.95)]">
              SOFTWARE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
