import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createVenomEngine } from '../lib/venomEngine';

const textOf = (node) =>
  React.Children.toArray(node)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : ''))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Venom liquid button powered by WebGL2 raymarched organic fluid tendrils.
 * Tendrils reach outward toward cursor on hover.
 */
export const VenomButton = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  icon,
  ariaLabel,
  type = 'button',
}) => {
  const hitRef = useRef(null);
  const hostRef = useRef(null);
  const engineRef = useRef(null);
  const label = useMemo(() => textOf(children), [children]);
  const [size, setSize] = useState(null);
  const [mode, setMode] = useState('pending');

  useEffect(() => {
    const host = hostRef.current;
    const hit = hitRef.current;
    if (!host || !hit) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // On touch/mobile devices, use high-performance CSS Glassmorphism to eliminate WebGL context pressure
    if (isTouch) {
      setMode('fallback');
      return;
    }

    const engine = createVenomEngine(host, hit, {
      variant,
      reducedMotion: reduced,
      onLayout: (w, h) => setSize({ w: Math.round(w), h: Math.round(h) }),
      onFail: () => setMode('fallback'),
    });
    if (!engine) {
      setMode('fallback');
      return;
    }
    engineRef.current = engine;
    setMode('webgl');
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setVariant(variant);
  }, [variant, mode]);

  useEffect(() => {
    if (mode === 'webgl') engineRef.current?.setLabel(label || ariaLabel || '');
  }, [label, ariaLabel, mode]);

  const webgl = mode === 'webgl';
  const fallbackW = Math.max(180, label.length * 11 + 64);
  const style = webgl && size
    ? { width: size.w, height: size.h }
    : { minWidth: fallbackW, height: 60 };

  const shared = {
    ref: hitRef,
    'aria-label': ariaLabel,
    'data-cursor': 'venom',
    onClick,
    style,
    className: `relative inline-flex items-center justify-center rounded-full select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF1238] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] transition-all duration-300 ${
      webgl ? '' : (variant === 'secondary' ? 'glass glass-hover' : 'glass-red')
    } ${className}`,
  };

  const inner = (
    <>
      {/* zero-size anchor at the button's centre; engine puts WebGL canvas here */}
      <span ref={hostRef} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0" />
      {/* Real text for accessibility, SEO and fallback */}
      <span
        className={
          webgl
            ? 'pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap opacity-0'
            : 'relative z-10 flex items-center gap-2.5 px-8 text-xs font-bold uppercase tracking-wider text-white md:text-sm'
        }
      >
        {children}
        {!webgl && icon && <span className="text-[#FF1238]">{icon}</span>}
      </span>
    </>
  );

  return href ? (
    <a href={href} {...shared}>{inner}</a>
  ) : (
    <button type={type} {...shared}>{inner}</button>
  );
};
