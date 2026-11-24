import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { Terminal, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  FOV: 42,
  CAM_Z: 9,
  CARD_W: 3.4,
  SPACING: 0.13,
  RAIL_SPAN: 1.7,
  FLY_SPAN: 0.35,
  HOLD: 0.12,
  RAIL: [
    [0, 3, -60],
    [-10, 2, -34],
    [-12, 0.5, -14],
    [-7, -0.4, -1],
    [0, -0.8, 3.2],
    [7, -0.4, -1],
    [12, 0.6, -12],
    [9, 1.6, -26],
    [2, 2.2, -34],
  ],
  RAIL_MOBILE: [
    [0, 3, -50],
    [-4, 1.5, -26],
    [-3.5, 0, -8],
    [0, -0.6, 2.5],
    [3.5, 0, -8],
    [4, 1.5, -24],
    [1, 2.4, -32],
  ],
};

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function getTotalSpan(count) {
  return CONFIG.RAIL_SPAN + CONFIG.FLY_SPAN + (count - 1) * CONFIG.SPACING + CONFIG.HOLD;
}

function getCardProgress(scrollNorm, index, total) {
  const r = clamp01(scrollNorm) * getTotalSpan(total) - index * CONFIG.SPACING;
  return {
    rail: clamp01(r / CONFIG.RAIL_SPAN),
    fly: clamp01((r - CONFIG.RAIL_SPAN) / CONFIG.FLY_SPAN),
    opacity: r <= 0 ? 0 : Math.min(1, r / 0.12),
  };
}

function computeGridCells(count, width, height, fov, camZ) {
  const vFovRad = (fov / 2) * (Math.PI / 180);
  const viewH = 2 * camZ * Math.tan(vFovRad);
  const aspect = width / height;
  const viewW = viewH * aspect;
  const cols = aspect < 0.8 ? 2 : 3;
  const rows = Math.ceil(count / cols);
  const topFrac = Math.min(0.42, Math.max(0.27, 250 / Math.max(height, 1)));
  const topReserved = viewH * topFrac;
  const availH = viewH - topReserved - viewH * 0.02;
  const gap = Math.min(viewW, viewH) * 0.016;
  const cardAspect = 16 / 9;
  let cellW = Math.min((viewW * 0.97 - gap * (cols - 1)) / cols, ((availH - gap * (rows - 1)) / rows) * cardAspect);
  cellW = Math.max(cellW, 0.5);
  const cellH = cellW / cardAspect;
  const totalGridW = cols * cellW + (cols - 1) * gap;
  const totalGridH = rows * cellH + (rows - 1) * gap;
  const startY = viewH / 2 - topReserved - (availH - totalGridH) / 2;

  const cells = Array.from({ length: count }, (_, idx) => {
    const c = idx % cols;
    const r = Math.floor(idx / cols);
    return {
      x: -totalGridW / 2 + cellW / 2 + c * (cellW + gap),
      y: startY - cellH / 2 - r * (cellH + gap),
      side: cols > 1 && c === 0 ? -1 : cols > 1 && c === cols - 1 ? 1 : 0,
      vert: r === 0 ? 1 : r === rows - 1 ? -1 : 0,
    };
  });

  return { cells, cellW, cellH, cols, rows };
}

const ASPECT_16_9 = 16 / 9;

const VERT_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG_SHADER = `
  uniform sampler2D map;
  uniform sampler2D mapPhoto;
  uniform vec2 uvScale;
  uniform vec2 uvOffset;
  uniform float uOpacity;
  uniform float uHover;
  uniform float uReady;
  uniform float uPhotoReady;
  varying vec2 vUv;

  float rbox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 uv = vUv;
    if (!gl_FrontFacing) uv.x = 1.0 - uv.x;
    vec2 p = (uv - 0.5) * vec2(${ASPECT_16_9.toFixed(4)}, 1.0);
    float d = rbox(p, vec2(${(ASPECT_16_9 / 2).toFixed(4)}, 0.5), 0.07);
    float mask = 1.0 - smoothstep(-0.003, 0.003, d);
    if (mask < 0.01) discard;

    vec3 texRed = texture2D(map, uv).rgb;
    vec3 texPhoto = texture2D(mapPhoto, uv).rgb;

    // Smooth, organic flip transition from the iconic Red template card to the actual project photo
    float flipT = smoothstep(0.0, 1.0, uHover);
    vec3 baseTex = mix(texRed, texPhoto, flipT * uPhotoReady);
    vec3 col = mix(vec3(0.55, 0.08, 0.14), baseTex, uReady);
    col *= 0.92 + 0.18 * uHover;

    // Soft light-red glass specular reflections
    col += vec3(1.0, 0.70, 0.78) * 0.14 * smoothstep(0.40, 1.0, uv.y) * (1.0 - uv.x * 0.5);
    col += vec3(1.0, 0.45, 0.55) * 0.25 * uHover * smoothstep(0.55, 0.0, uv.y);

    // Liquid glass reflection sweep on hover flip
    float sheen = exp(-pow((uv.x + uv.y - 1.2 * uHover - 0.2) * 3.5, 2.0)) * 0.30 * uHover;
    col += vec3(1.0, 0.85, 0.90) * sheen;

    // Liquid light-red glass rim
    float rim = smoothstep(-0.024, -0.004, d);
    vec3 rimCol = mix(vec3(0.95, 0.45, 0.55), vec3(1.0, 0.65, 0.75), uHover);
    col = mix(col, rimCol, rim * (0.50 + 0.35 * uHover));
    gl_FragColor = vec4(col, mask * uOpacity);
  }
`;

function createRedCardTexture(proj, index) {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  // Rich warm ruby-red glass gradient (matches template iconic red cards)
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#9e1422');
  grad.addColorStop(0.35, '#c81e30');
  grad.addColorStop(0.7, '#8b101c');
  grad.addColorStop(1, '#4e0710');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle cyber grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 80; x < canvas.width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 60; y < canvas.height; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Diagonal glass reflection highlight
  const glassGrad = ctx.createLinearGradient(0, 0, canvas.width * 0.85, canvas.height * 0.85);
  glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
  glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
  glassGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width * 0.9, 0);
  ctx.lineTo(0, canvas.height * 0.9);
  ctx.closePath();
  ctx.fill();

  // Crisp outer border rim (clean rounded glass plate boundary)
  ctx.strokeStyle = 'rgba(255, 160, 180, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  const isWip = proj.status === 'IN_PROGRESS';

  // CENTER-ONLY CONTENT: Big, Bold, Clean & Perfectly Contained (No edge clipping)
  ctx.textAlign = 'center';

  // 1. Category Pill (Centered above title)
  const catText = proj.category.toUpperCase();
  ctx.font = 'bold 26px monospace';
  const catTextWidth = ctx.measureText(catText).width;
  const catWidth = Math.max(260, catTextWidth + 60);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
  ctx.fillRect(canvas.width / 2 - catWidth / 2, 180, catWidth, 48);
  ctx.strokeStyle = 'rgba(255, 140, 160, 0.65)';
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width / 2 - catWidth / 2, 180, catWidth, 48);

  ctx.fillStyle = '#FFC2CF';
  ctx.fillText(catText, canvas.width / 2, 213);

  // 2. Bold Project Title (Dynamically auto-scaled to NEVER overflow edges)
  const titleText = proj.title.toUpperCase();
  const maxTitleWidth = canvas.width - 180; // Generous 90px margin on left & right
  let titleFontSize = 78;
  ctx.font = `900 ${titleFontSize}px "Syne", sans-serif`;
  while (ctx.measureText(titleText).width > maxTitleWidth && titleFontSize > 42) {
    titleFontSize -= 2;
    ctx.font = `900 ${titleFontSize}px "Syne", sans-serif`;
  }
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 6;
  ctx.fillText(titleText, canvas.width / 2, 335);
  ctx.shadowBlur = 0;

  // 3. Clear, Highly Legible 1-Line Description (Dynamically auto-scaled)
  const descText = proj.oneLiner || proj.tagline || proj.description || '';
  const maxDescWidth = canvas.width - 180;
  let descFontSize = 30;
  ctx.font = `600 ${descFontSize}px "Inter", system-ui, sans-serif`;
  while (ctx.measureText(descText).width > maxDescWidth && descFontSize > 22) {
    descFontSize -= 1;
    ctx.font = `600 ${descFontSize}px "Inter", system-ui, sans-serif`;
  }
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;
  ctx.fillText(descText, canvas.width / 2, 435);
  ctx.shadowBlur = 0;

  // 4. Prominent Badge for In-Progress Builds (Flash-Seat & DeliveryFence)
  if (isWip) {
    const wipText = '⚡ ACTIVE BUILD • IN PROGRESS';
    ctx.font = 'bold 24px monospace';
    const wipWidth = ctx.measureText(wipText).width + 56;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.28)';
    ctx.fillRect(canvas.width / 2 - wipWidth / 2, 515, wipWidth, 48);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvas.width / 2 - wipWidth / 2, 515, wipWidth, 48);

    ctx.fillStyle = '#FDE68A';
    ctx.fillText(wipText, canvas.width / 2, 547);
  }

  // Reset text alignment for safety
  ctx.textAlign = 'left';

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

function createPhotoTexture(image) {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0c070d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (direction) => {
    if (!selectedProject) return;
    const idx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (idx === -1) return;
    const nextIdx = (idx + direction + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIdx]);
  };

  /* Three.js 3D Curved Rail Animation (Template exact implementation) */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFallbackMode(true);
      return;
    }
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    const canvasWrap = canvasWrapRef.current;
    if (!container || !canvasWrap || !pinWrap) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFallbackMode(true);
      return;
    }

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setClearColor(0, 0);
    canvasWrap.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CONFIG.FOV, 1, 0.1, 200);
    camera.position.set(0, 0, CONFIG.CAM_Z);

    const railPoints = (isMobile ? CONFIG.RAIL_MOBILE : CONFIG.RAIL).map(([x, y, z]) => new THREE.Vector3(x, y, z));
    const spline = new THREE.CatmullRomCurve3(railPoints, false, 'centripetal');

    const samplePts = [];
    const sampleTangs = [];
    for (let i = 0; i <= 400; i++) {
      samplePts.push(spline.getPointAt(i / 400));
      sampleTangs.push(spline.getTangentAt(i / 400));
    }

    const sampleSpline = (tNorm, outPos, outTang) => {
      const scaled = Math.max(0, Math.min(1, tNorm)) * 400;
      const idx = Math.min(Math.floor(scaled), 399);
      const frac = scaled - idx;
      outPos.lerpVectors(samplePts[idx], samplePts[idx + 1], frac);
      outTang.lerpVectors(sampleTangs[idx], sampleTangs[idx + 1], frac).normalize();
    };

    const cardGeom = new THREE.PlaneGeometry(ASPECT_16_9, 1, 24, 14);
    const texLoader = new THREE.TextureLoader();
    const fallbackTex = new THREE.DataTexture(new Uint8Array([10, 8, 10, 255]), 1, 1);
    fallbackTex.needsUpdate = true;

    const fitUv = (mat, w, h) => {
      const r = w / h;
      if (r > ASPECT_16_9) {
        const s = ASPECT_16_9 / r;
        mat.uniforms.uvScale.value.set(s, 1);
        mat.uniforms.uvOffset.value.set((1 - s) / 2, 0);
      } else {
        const s = r / ASPECT_16_9;
        mat.uniforms.uvScale.value.set(1, s);
        mat.uniforms.uvOffset.value.set(0, (1 - s) / 2);
      }
    };

    const cards = PROJECTS.map((proj, idx) => {
      const redTex = createRedCardTexture(proj, idx);

      const mat = new THREE.ShaderMaterial({
        vertexShader: VERT_SHADER,
        fragmentShader: FRAG_SHADER,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        uniforms: {
          map: { value: redTex },
          mapPhoto: { value: fallbackTex },
          uvScale: { value: new THREE.Vector2(1, 1) },
          uvOffset: { value: new THREE.Vector2(0, 0) },
          uOpacity: { value: 0 },
          uHover: { value: 0 },
          uReady: { value: 1 },
          uPhotoReady: { value: 0 },
        },
      });

      const mesh = new THREE.Mesh(cardGeom, mat);
      mesh.userData.index = idx;
      scene.add(mesh);

      const state = {
        project: proj,
        mesh,
        mat,
        redTex,
        photoTex: null,
        hover: 0,
      };

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const photoTex = createPhotoTexture(img);
        state.photoTex = photoTex;
        mat.uniforms.mapPhoto.value = photoTex;
        mat.uniforms.uPhotoReady.value = 1;
      };
      img.src = proj.poster;

      return state;
    });

    // Ensure typography in canvas textures uses real Syne font once downloaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        cards.forEach((state, idx) => {
          const updatedTex = createRedCardTexture(state.project, idx);
          if (state.mat?.uniforms?.map?.value) {
            state.mat.uniforms.map.value.dispose();
            state.mat.uniforms.map.value = updatedTex;
            state.redTex = updatedTex;
          }
        });
      });
    }

    let viewW = 1;
    let viewH = 1;
    let gridInfo = null;

    const onResize = () => {
      viewW = canvasWrap.clientWidth;
      viewH = canvasWrap.clientHeight;
      renderer.setSize(viewW, viewH, false);
      camera.aspect = viewW / viewH;
      camera.updateProjectionMatrix();
      gridInfo = computeGridCells(cards.length, viewW, viewH, CONFIG.FOV, CONFIG.CAM_Z);
    };

    onResize();
    window.addEventListener('resize', onResize);

    let scrollTarget = 0;
    let scrollCurrent = 0;
    let isSectionIntersecting = true;
    let hoverIndex = -1;
    let downX = 0;
    let downY = 0;
    let isMouseInside = false;
    let lastClientX = null;
    let lastClientY = null;

    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2(999, 999);

    const updatePointerCoords = (clientX, clientY) => {
      lastClientX = clientX;
      lastClientY = clientY;
      const rect = canvasWrap.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        isMouseInside = true;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mouseNdc.set((x / rect.width) * 2 - 1, -(y / rect.height) * 2 + 1);
      } else {
        isMouseInside = false;
        mouseNdc.set(999, 999);
        hoverIndex = -1;
      }
    };

    const onPointerMove = (e) => {
      updatePointerCoords(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      isMouseInside = false;
      mouseNdc.set(999, 999);
      hoverIndex = -1;
    };

    const onPointerDown = (e) => {
      downX = e.clientX;
      downY = e.clientY;
      onPointerMove(e);
    };

    // GSAP ScrollTrigger rock-solid pinning across all browsers and devices
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinWrap,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: true,
      onUpdate: (self) => {
        scrollTarget = self.progress;
      },
    });

    const onScroll = () => {
      if (st && typeof st.progress === 'number' && st.progress >= 0) {
        scrollTarget = st.progress;
      } else {
        const rect = container.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        scrollTarget = scrollRange > 0 ? Math.max(0, Math.min(1, -rect.top / scrollRange)) : 0;
      }
      if (lastClientX !== null && lastClientY !== null) {
        updatePointerCoords(lastClientX, lastClientY);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Observe container with generous rootMargin so render loop stays active whenever section is visible
    const io = new IntersectionObserver(
      ([entry]) => {
        isSectionIntersecting = entry.isIntersecting;
      },
      { rootMargin: '600px' }
    );
    io.observe(container);

    const checkRaycast = () => {
      if (!isMouseInside) {
        hoverIndex = -1;
        return;
      }

      raycaster.setFromCamera(mouseNdc, camera);
      // Raycast across ANY card visible on screen at ANY time (on rail, flying, or settled in grid)
      const candidates = cards
        .filter((c) => c.mat.uniforms.uOpacity.value > 0.08)
        .map((c) => c.mesh);

      const hits = raycaster.intersectObjects(candidates, false);
      if (hits.length > 0) {
        // hits[0] is always the closest card to camera
        hoverIndex = hits[0].object.userData.index;
      } else {
        hoverIndex = -1;
      }
    };

    const onPointerUp = (e) => {
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8) return;
      onPointerMove(e);
      checkRaycast();
      if (hoverIndex >= 0) {
        handleSelectProject(cards[hoverIndex].project);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    canvasWrap.addEventListener('pointerleave', onPointerLeave);
    canvasWrap.addEventListener('pointerdown', onPointerDown);
    canvasWrap.addEventListener('pointerup', onPointerUp);

    const ptPos = new THREE.Vector3();
    const ptTang = new THREE.Vector3();
    const flatTang = new THREE.Vector3();
    const normVec = new THREE.Vector3();
    const upVec = new THREE.Vector3(0, 1, 0);
    const rotMat = new THREE.Matrix4();
    const baseQuat = new THREE.Quaternion();
    const identityQuat = new THREE.Quaternion();
    const bankQuat = new THREE.Quaternion();
    const hoverQuat = new THREE.Quaternion();
    const gridPos = new THREE.Vector3();
    const ctrlPos = new THREE.Vector3();
    const railEndPos = new THREE.Vector3();
    const tempVec = new THREE.Vector3();

    let lastTime = performance.now();
    let animId = 0;
    let cycleTime = 0;

    const renderLoop = (timeNow) => {
      animId = requestAnimationFrame(renderLoop);
      const dt = Math.min((timeNow - lastTime) / 1000, 0.05);
      lastTime = timeNow;

      if (!isSectionIntersecting || document.hidden) return;

      scrollCurrent += (scrollTarget - scrollCurrent) * (1 - Math.exp(-12 * dt));
      if (Math.abs(scrollTarget - scrollCurrent) < 1e-4) scrollCurrent = scrollTarget;
      cycleTime += dt;

      if (!gridInfo) return;

      cards.forEach((c, idx) => {
        const prog = getCardProgress(scrollCurrent, idx, cards.length);
        sampleSpline(prog.rail, ptPos, ptTang);

        flatTang.set(ptTang.x, 0, ptTang.z);
        if (flatTang.lengthSq() < 1e-4) flatTang.set(1, 0, 0);
        flatTang.normalize();
        normVec.crossVectors(flatTang, upVec).normalize();
        if (normVec.z < 0) normVec.negate();

        rotMat.makeBasis(tempVec.crossVectors(upVec, normVec).normalize(), upVec, normVec);
        baseQuat.setFromRotationMatrix(rotMat);

        const cardScale = CONFIG.CARD_W / ASPECT_16_9;
        const cell = gridInfo.cells[idx];

        if (prog.fly <= 0) {
          c.mesh.position.copy(ptPos);
          c.mesh.quaternion.copy(baseQuat);
          c.mesh.scale.setScalar(cardScale);
        } else {
          sampleSpline(1, railEndPos, ptTang);
          gridPos.set(cell.x, cell.y, 0);
          ctrlPos.set(cell.x + cell.side * gridInfo.cellW * 0.9, cell.y + cell.vert * gridInfo.cellH * 1.6, 1.2);

          const tEased = easeInOutCubic(prog.fly);
          const invT = 1 - tEased;

          c.mesh.position.set(
            invT * invT * railEndPos.x + 2 * invT * tEased * ctrlPos.x + tEased * tEased * gridPos.x,
            invT * invT * railEndPos.y + 2 * invT * tEased * ctrlPos.y + tEased * tEased * gridPos.y,
            invT * invT * railEndPos.z + 2 * invT * tEased * ctrlPos.z + tEased * tEased * gridPos.z
          );

          identityQuat.identity();
          c.mesh.quaternion.copy(baseQuat).slerp(identityQuat, tEased);
          bankQuat.setFromAxisAngle(tempVec.set(0, 0, 1), Math.sin(Math.PI * tEased) * 0.18 * (cell.side || cell.vert || 1));
          c.mesh.quaternion.multiply(bankQuat);
          c.mesh.scale.setScalar(THREE.MathUtils.lerp(cardScale, gridInfo.cellH, tEased));
        }

        c.mesh.renderOrder = Math.round(c.mesh.position.z * 100);

        // Fluid, rock-solid hover lerp (Zero jitter, Zero glitch at ANY time/state)
        const isTarget = (idx === hoverIndex);
        c.hover += ((isTarget ? 1 : 0) - c.hover) * (1 - Math.exp(-12 * dt));
        c.mat.uniforms.uHover.value = c.hover;

        // Gentle center-scale on hover (expands hit area, keeps raycaster 100% stable)
        c.mesh.scale.multiplyScalar(1 + c.hover * 0.04);

        c.mat.uniforms.uOpacity.value = prog.opacity;
        c.mesh.visible = prog.opacity > 0.001;
      });

      scene.updateMatrixWorld(true);
      checkRaycast();
      canvasWrap.style.cursor = hoverIndex >= 0 ? 'pointer' : '';
      canvasWrap.setAttribute('data-card-hover', hoverIndex >= 0 ? '1' : '0');

      renderer.render(scene, camera);
      canvasWrap.setAttribute('data-scene-ready', '1');
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      st.kill();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      canvasWrap.removeEventListener('pointerleave', onPointerLeave);
      canvasWrap.removeEventListener('pointerdown', onPointerDown);
      canvasWrap.removeEventListener('pointerup', onPointerUp);

      cards.forEach((c) => {
        c.mat.dispose();
        c.mesh.geometry.dispose();
        c.redTex?.dispose();
        c.photoTex?.dispose();
      });
      fallbackTex.dispose();
      cardGeom.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const headerContent = (
    <div className="flex flex-col items-center text-center">
      <span className="text-[#a31515] font-bold uppercase text-xs md:text-sm tracking-[0.25em] mb-2 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-[#FF1E38]" />
        <span>Featured Works</span>
      </span>
      <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase text-white font-['Syne']">
        PROJECTS<span className="text-[#FF1E38]">.</span>
      </h2>
      <div className="w-20 h-1.5 bg-[#a31515] mt-3 rounded-full shadow-lg shadow-red-500/50" />
    </div>
  );

  return (
    <>
      {fallbackMode ? (
        <section id="projects" ref={containerRef} className="relative w-full text-gray-100 py-28 px-4 md:px-10 border-t border-white/5">
          {headerContent}
          <div className="max-w-7xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj)}
                className="glass-panel rounded-2xl text-left border border-white/10 hover:border-red-500/40 transition-all hover:scale-[1.02] overflow-hidden group"
              >
                <div className="aspect-video w-full bg-black/60 overflow-hidden">
                  <img
                    src={proj.poster}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3850] font-bold">
                    {proj.category}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1 font-['Syne']">{proj.title}</h3>
                  <p className="text-slate-300 text-xs mt-2 line-clamp-2">{proj.tagline || proj.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section
          id="projects"
          ref={containerRef}
          className="relative w-full text-gray-100 border-t border-white/5"
          style={{ height: '420vh' }}
        >
          <div
            ref={pinWrapRef}
            className="sticky top-0 h-screen w-full overflow-hidden"
          >
            <div className="absolute inset-x-0 top-20 md:top-24 z-20 px-4 pointer-events-none">
              {headerContent}
            </div>
            <div ref={canvasWrapRef} className="absolute inset-0 z-10" aria-label="Featured projects 3D rail" role="region" />

            {/* Accessible Keyboard Navigation & Screen Reader Support for 3D Rail */}
            <div className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-28 focus-within:left-6 focus-within:z-50 focus-within:flex focus-within:flex-wrap focus-within:gap-2 focus-within:p-4 focus-within:bg-black/95 focus-within:border focus-within:border-red-500/60 focus-within:rounded-2xl focus-within:shadow-2xl">
              <span className="text-xs font-mono text-gray-300 w-full mb-1">Keyboard Navigation (Select Project):</span>
              {PROJECTS.map((proj) => (
                <button
                  key={`kbd-${proj.id}`}
                  type="button"
                  onClick={() => handleSelectProject(proj)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-600 text-white text-xs font-bold transition-all focus:ring-2 focus:ring-red-400 focus:outline-none"
                >
                  View {proj.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Detail Modal on Card Click */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  );
}
