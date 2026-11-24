import React, { useEffect, useRef, useState } from 'react';

const SPARK_POOL = 180;
const BRANCH_POOL = 28;
const TRAIL_MAX = 14;
const COLOR_WHITE = '255,255,255';
const COLOR_RED = '255,32,32';
const COLOR_DEEP = '160,0,18';

function generateBranch(originX, originY, angle, length, pts) {
  pts.length = 0;
  const segments = 4 + Math.floor(Math.random() * 4);
  let curX = originX;
  let curY = originY;
  pts.push(curX, curY);

  for (let i = 1; i <= segments; i++) {
    const a = angle + (Math.random() - 0.5) * 1.1;
    const segLen = length / segments;
    curX += Math.cos(a) * segLen;
    curY += Math.sin(a) * segLen;
    pts.push(curX, curY);
  }
}

export const SparkCursor = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const coreRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hasPointerMoved, setHasPointerMoved] = useState(false);

  // Ref to track hover state synchronously inside the render loop
  const isHoveringRef = useRef(false);

  // Hide system default cursor and activate custom cyber pointer ONLY on desktop with mouse
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('custom-cursor');
    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sparks = Array.from({ length: SPARK_POOL }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      max: 1,
      size: 1,
      hot: false,
    }));

    const branches = Array.from({ length: BRANCH_POOL }, () => ({
      pts: [],
      life: 0,
      max: 1,
      width: 1,
      bright: false,
    }));

    const trail = [];
    let sparkIdx = 0;
    let branchIdx = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let prevX = -9999;
    let prevY = -9999;
    let speedNorm = 0;
    let auraPower = 0;
    let animId = 0;
    let active = false;
    let lastTime = performance.now();
    let dpr = 1;

    // Pronounced 3D Flight Banking & Pitch Physics
    let currentBank = 0;
    let targetBank = 0;
    let currentPitch = 0;
    let targetPitch = 0;

    // Continuous Gyroscopic Reactor Core Rotation Angle
    let coreAngle = 0;

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    onResize();

    const spawnSpark = (x, y, vx, vy, speed) => {
      const s = sparks[sparkIdx];
      sparkIdx = (sparkIdx + 1) % SPARK_POOL;
      const angle = Math.atan2(vy, vx) + Math.PI + (Math.random() - 0.5) * 2.6;
      const force = 0.05 + Math.random() * 0.25 * (0.5 + speed);
      s.x = x;
      s.y = y;
      s.vx = Math.cos(angle) * force + vx * 0.02;
      s.vy = Math.sin(angle) * force + vy * 0.02;
      s.max = s.life = 250 + Math.random() * 400;
      s.size = 0.6 + Math.random() * 1.6;
      s.hot = Math.random() < 0.15;
    };

    const spawnBranch = (x, y, speed, bright) => {
      const b = branches[branchIdx];
      branchIdx = (branchIdx + 1) % BRANCH_POOL;
      generateBranch(
        x,
        y,
        Math.random() * Math.PI * 2,
        (10 + Math.random() * 28) * (bright ? 1.8 : 1) * (0.6 + speed * 0.6),
        b.pts
      );
      b.max = b.life = bright ? 160 : 70 + Math.random() * 80;
      b.width = bright ? 1.6 : 0.6 + Math.random() * 0.8;
      b.bright = bright;
    };

    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasPointerMoved) setHasPointerMoved(true);

      // Robust interactive hover detection across DOM, 3D cards, and Hero shards
      const target = e.target;
      let isClickable = false;
      if (target) {
        if (
          target.closest('button, a, [role="button"], input, textarea, select, .cursor-pointer, .glass-hover, .interactive, [data-card-hover="1"], [data-shard-hover="1"]')
        ) {
          isClickable = true;
        }
      }

      isHoveringRef.current = isClickable;
      setIsHovering(isClickable);

      if (prevX < -999) {
        prevX = mouseX;
        prevY = mouseY;
      }
      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const dist = Math.hypot(dx, dy);

      // Pronounced, highly visible 3D airplane banking:
      // Mouse moving RIGHT (dx > 0) -> Banks RIGHT (clockwise roll up to ±28°)
      // Mouse moving LEFT (dx < 0) -> Banks LEFT (counter-clockwise roll)
      targetBank = Math.max(-28, Math.min(28, dx * 1.35));

      // Pitch angle on vertical movement (climb/dive)
      targetPitch = Math.max(-18, Math.min(18, -dy * 0.75));

      speedNorm = Math.min(1.5, speedNorm * 0.6 + dist / 40);
      const now = performance.now();
      trail.push({ x: mouseX, y: mouseY, t: now });
      if (trail.length > TRAIL_MAX) trail.shift();

      const count = Math.min(8, Math.floor(dist / 6) + (Math.random() < 0.4 ? 1 : 0));
      for (let i = 0; i < count; i++) {
        const t = Math.random();
        spawnSpark(prevX + dx * t, prevY + dy * t, dx, dy, speedNorm);
      }

      if (Math.random() < 0.15 + speedNorm * 0.4) {
        spawnBranch(mouseX, mouseY, speedNorm, false);
      }
      if (dist > 45 && Math.random() < 0.25) {
        spawnBranch(mouseX, mouseY, speedNorm, true);
      }

      auraPower = Math.min(1, auraPower + dist / 120);
      prevX = mouseX;
      prevY = mouseY;

      if (!active) {
        active = true;
        lastTime = now;
        animId = requestAnimationFrame(loop);
      }
    };

    const loop = (now) => {
      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'lighter';

      let alive = false;

      // Smooth flight banking damping back to 0° upright
      targetBank *= Math.pow(0.80, dt / 16);
      currentBank += (targetBank - currentBank) * (1 - Math.exp(-12 * (dt / 1000)));

      targetPitch *= Math.pow(0.82, dt / 16);
      currentPitch += (targetPitch - currentPitch) * (1 - Math.exp(-12 * (dt / 1000)));

      // Keep animation alive until banking smoothly finishes to 0°
      if (Math.abs(currentBank) > 0.05 || Math.abs(targetBank) > 0.05) {
        alive = true;
      } else {
        currentBank = 0;
      }

      // High-intensity 3D perspective flight transform:
      // perspective(360px) makes 3D roll and pitch deeply volumetric and obvious
      if (cursorRef.current && mouseX > -999) {
        const rollY = currentBank * 0.95;
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) perspective(360px) rotateZ(${currentBank.toFixed(2)}deg) rotateY(${rollY.toFixed(2)}deg) rotateX(${currentPitch.toFixed(2)}deg)`;
      }

      // Continuous Gyroscopic Core Spin driven smoothly in JS (Untouched as requested)
      if (isHoveringRef.current) {
        alive = true;
        coreAngle = (coreAngle + dt * 0.26) % 360; // Smooth ~1.38s continuous spin
        if (coreRef.current) {
          coreRef.current.style.transform = `rotate(${coreAngle.toFixed(1)}deg)`;
        }
      } else if (coreAngle !== 0) {
        alive = true;
        // Ease core back to 0° at rest
        coreAngle += (0 - coreAngle) * (1 - Math.exp(-10 * (dt / 1000)));
        if (Math.abs(coreAngle) < 0.5) coreAngle = 0;
        if (coreRef.current) {
          coreRef.current.style.transform = `rotate(${coreAngle.toFixed(1)}deg)`;
        }
      }

      auraPower *= Math.pow(0.992, dt);
      if (auraPower > 0.02) {
        alive = true;
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 70);
        grad.addColorStop(0, `rgba(255,0,30,${0.14 * auraPower})`);
        grad.addColorStop(1, 'rgba(255,0,30,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(mouseX - 70, mouseY - 70, 140, 140);
      }

      while (trail.length && now - trail[0].t > 220) {
        trail.shift();
      }

      if (trail.length > 1) {
        alive = true;
        ctx.lineCap = 'round';
        for (let i = 1; i < trail.length; i++) {
          const ratio = 1 - (now - trail[i].t) / 220;
          ctx.strokeStyle = `rgba(${COLOR_DEEP},${ratio * 0.6})`;
          ctx.lineWidth = 3 * ratio;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();

          ctx.strokeStyle = `rgba(${COLOR_RED},${ratio * 0.5})`;
          ctx.lineWidth = 0.8 * ratio;
          ctx.stroke();
        }
      }

      for (const b of branches) {
        if (b.life <= 0) continue;
        b.life -= dt;
        alive = true;
        const ratio = Math.max(0, b.life / b.max) * (Math.random() < 0.25 ? 0.4 : 1);
        ctx.beginPath();
        ctx.moveTo(b.pts[0], b.pts[1]);
        for (let j = 2; j < b.pts.length; j += 2) {
          ctx.lineTo(b.pts[j], b.pts[j + 1]);
        }
        ctx.shadowBlur = b.bright ? 14 : 8;
        ctx.shadowColor = 'rgba(255,0,30,0.35)';
        ctx.strokeStyle = `rgba(${COLOR_RED},${ratio * 0.85})`;
        ctx.lineWidth = b.width * 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(${COLOR_WHITE},${ratio * (b.bright ? 0.8 : 0.45)})`;
        ctx.lineWidth = b.width * 0.5;
        ctx.stroke();
      }

      for (const s of sparks) {
        if (s.life <= 0) continue;
        s.life -= dt;
        alive = true;
        const ratio = Math.max(0, s.life / s.max);
        const oldX = s.x;
        const oldY = s.y;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.985;
        s.vy *= 0.985;
        ctx.strokeStyle = `rgba(${s.hot ? COLOR_WHITE : COLOR_RED},${ratio * 0.9})`;
        ctx.lineWidth = s.size * ratio;
        ctx.beginPath();
        ctx.moveTo(oldX - s.vx * 18, oldY - s.vy * 18);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      speedNorm *= Math.pow(0.95, dt / 16);

      if (alive) {
        animId = requestAnimationFrame(loop);
      } else {
        active = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      {/* Background Electric Lightning & Sparks Canvas */}
      <canvas ref={canvasRef} className="spark-cursor" aria-hidden="true" />

      {/* Delta Fighter Jet Custom Cursor Element */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          opacity: hasPointerMoved ? 1 : 0,
          transition: 'opacity 0.25s ease',
          transformStyle: 'preserve-3d',
        }}
        aria-hidden="true"
      >
        <div
          className={`relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-200 ${
            isHovering ? 'scale-120' : 'scale-100'
          }`}
          style={{ width: '38px', height: '38px', transformStyle: 'preserve-3d' }}
        >
          {/* Volumetric Under-Wing Flight Shadow (Ground altitude cast that shifts in 3D) */}
          <div
            className="absolute rounded-full pointer-events-none blur-[4px] bg-red-950/70"
            style={{
              width: '28px',
              height: '28px',
              transform: 'translate3d(0, 8px, -12px)',
            }}
          />

          {/* Faceted 3D Stealth Delta Airframe */}
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            className={`transition-all duration-300 ${
              isHovering
                ? 'drop-shadow-[0_0_16px_rgba(255,30,60,1)]'
                : 'drop-shadow-[0_0_10px_rgba(255,30,60,0.9)]'
            }`}
          >
            <defs>
              {/* Left Wing Gradient (Shadowed faceted side) */}
              <linearGradient id="deltaWingLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a0c1b" />
                <stop offset="100%" stopColor="#1e0409" />
              </linearGradient>
              {/* Right Wing Gradient (Specular highlight faceted side) */}
              <linearGradient id="deltaWingRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d41e35" />
                <stop offset="100%" stopColor="#440710" />
              </linearGradient>
            </defs>

            {/* Left Faceted Wing */}
            <polygon
              points="19,3 19,27 4,31"
              fill="url(#deltaWingLeft)"
              stroke="#FF2845"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Right Faceted Wing */}
            <polygon
              points="19,3 34,31 19,27"
              fill="url(#deltaWingRight)"
              stroke="#FF3855"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* Raised Dorsal Keel Line (Central aerodynamic 3D ridge) */}
            <line
              x1="19"
              y1="3"
              x2="19"
              y2="27"
              stroke="#FFA5B5"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            {/* Outer Vertex Nodes (Anchor point for razor-sharp clicking) */}
            <circle cx="19" cy="3" r="2.2" fill="#FFFFFF" />
            <circle cx="34" cy="31" r="1.8" fill="#FF3050" />
            <circle cx="4" cy="31" r="1.8" fill="#FF3050" />
          </svg>

          {/* Inner Gyroscopic Reactor Core - Centered inside Delta, driven smoothly via JS (Untouched) */}
          <div
            ref={coreRef}
            className="absolute flex items-center justify-center pointer-events-none will-change-transform"
            style={{
              width: '18px',
              height: '18px',
              top: '12.5px',
              left: '10px',
              transformOrigin: '9px 9px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {/* Inverted Delta Core */}
              <polygon
                points="9,15 15,4 3,4"
                fill={isHovering ? 'rgba(255, 30, 60, 0.35)' : 'none'}
                stroke={isHovering ? '#FF6580' : '#FFA0B0'}
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              {/* Core Energy Nodes */}
              <circle cx="9" cy="15" r="1.3" fill={isHovering ? '#FFFFFF' : '#FF7088'} />
              <circle cx="15" cy="4" r="1.3" fill={isHovering ? '#FFFFFF' : '#FF7088'} />
              <circle cx="3" cy="4" r="1.3" fill={isHovering ? '#FFFFFF' : '#FF7088'} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
