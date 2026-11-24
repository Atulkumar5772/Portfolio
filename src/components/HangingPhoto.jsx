import React, { useRef, useEffect } from 'react';

const Fb = 26;
const Ib = 70;
const Lb = 0.38;
const Rb = 9e-4;

const clamp = (val, max) => Math.max(-max, Math.min(max, val));

export const HangingPhoto = ({
  image = '/media/profile.webp',
  name = 'ATUL KUMAR',
  caption = 'SYSTEMS & BACKEND ARCHITECT',
}) => {
  const rigRef = useRef(null);
  const swingRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const rig = rigRef.current;
    const swing = swingRef.current;
    if (!rig || !swing) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    let angle = 0;
    let angularVel = 0;
    let roll = 0;
    let targetAngle = 0;
    let isDragging = false;
    let activePointerId = -1;
    let prevPointerX = 0;
    let lastTime = performance.now();
    let isIntersecting = true;
    let animId = 0;

    const getPivot = () => {
      const rect = rig.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + 8 };
    };

    const handlePointerMove = (e) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.008);
      const vx = (e.clientX - prevPointerX) / dt;
      prevPointerX = e.clientX;
      lastTime = now;

      if (isDragging && e.pointerId === activePointerId) {
        const pivot = getPivot();
        targetAngle = clamp(Math.atan2(-(e.clientX - pivot.x), Math.max(e.clientY - pivot.y, 60)), Lb);
        return;
      }

      if (prefersReducedMotion || isCoarse || !isIntersecting) return;
      const rect = rig.getBoundingClientRect();
      const dist =
        Math.abs(e.clientX - (rect.left + rect.width / 2)) +
        Math.max(0, Math.abs(e.clientY - (rect.top + rect.height / 2)) - rect.height / 2);
      const influence = Math.max(0, 1 - dist / 900);
      angularVel += clamp(-vx * Rb * influence, 0.25);
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      activePointerId = e.pointerId;
      swing.setPointerCapture?.(e.pointerId);
      swing.style.cursor = 'grabbing';
      prevPointerX = e.clientX;
    };

    const handlePointerUp = (e) => {
      if (e.pointerId === activePointerId) {
        isDragging = false;
        activePointerId = -1;
        targetAngle = 0;
        swing.style.cursor = '';
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: '200px' }
    );
    observer.observe(rig);

    let prevFrameTime = performance.now();
    const tick = (now) => {
      animId = requestAnimationFrame(tick);
      const dt = Math.min((now - prevFrameTime) / 1000, 0.05);
      prevFrameTime = now;
      if (!isIntersecting && !isDragging) return;

      const stiffness = isDragging ? Ib : Fb;
      const target = isDragging ? targetAngle : 0;
      angularVel += -stiffness * (angle - target) * dt;
      angularVel *= Math.exp(-3.2 * dt);
      angle += angularVel * dt;
      if (Math.abs(angle) > Lb) {
        angle = Math.sign(angle) * Lb;
        angularVel *= -0.3;
      }
      roll += (angularVel * 0.6 - roll) * (1 - Math.exp(-6 * dt));
      const deg = (angle * 180) / Math.PI;
      swing.style.transform = `rotateZ(${deg}deg) rotateY(${clamp(roll, 0.4) * 30}deg)`;
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(${-deg * 2.2}px) rotateZ(${deg * 0.8}deg)`;
      }
    };

    animId = requestAnimationFrame(tick);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    swing.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      swing.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div ref={rigRef} className="hang-rig" data-no-ripple="true">
      {/* Wall Pin Nail */}
      <span className="hang-nail" aria-hidden="true" />
      {/* Dynamic Swaying Shadow */}
      <div ref={shadowRef} className="hang-shadow" aria-hidden="true" />
      {/* Hanging Swinging Frame */}
      <div ref={swingRef} className="hang-swing">
        <svg className="hang-strings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="0" x2="12" y2="100" />
          <line x1="50" y1="0" x2="88" y2="100" />
        </svg>
        <div className="hang-frame glow-frame">
          <span className="hang-ring hang-ring-l" aria-hidden="true" />
          <span className="hang-ring hang-ring-r" aria-hidden="true" />
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/50 ring-1 ring-white/15">
            <img
              src={image}
              alt={name}
              draggable={false}
              className="w-full h-full object-cover object-top transition-all duration-700 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
            <div className="hang-glare" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-white text-base md:text-xl font-black uppercase tracking-wider block font-['Syne']">
                {name}
              </span>
              <span className="text-[#FF3850] text-xs md:text-sm uppercase font-bold tracking-widest font-mono">
                {caption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
