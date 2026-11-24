import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { VenomButton } from './VenomButton';
import {
  BREATHING_VERTICES,
  SHARD_POLYGONS,
  clampOffset,
  hasWebGL,
  insetPolygon,
  plateLayout,
  roundedShape,
  stepSpring,
} from '../lib/heroShards';

const IMG_HERO_RED = '/assets/hero-red-bg.png';
const SUBJECT_X = 0.70;

export default function GlassShardHero() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const copyRef = useRef(null);
  const [webgl, setWebgl] = useState(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /* Three.js 3D Cracked Glass Plate & Shards */
  useEffect(() => {
    if (!webgl) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    const reflectionColor = new THREE.Color('#d85868');
    const highlightColor = new THREE.Color('#f28d9a');

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    stage.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';

    /* Scene, Environment, Camera */
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmrem.fromScene(roomEnv, 0.04);
    roomEnv.dispose();
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.22;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const plate = new THREE.Group();
    scene.add(plate);

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));
    const key = new THREE.DirectionalLight(0xffeee8, 0.7);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(highlightColor, 0.45);
    rim.position.set(5, -3, 2);
    scene.add(rim);
    const cursorLight = new THREE.PointLight(reflectionColor, 0, 6, 1.6);
    cursorLight.position.set(0, 0, 1.5);
    scene.add(cursorLight);

    /* Portrait / Red Atmospheric Texture */
    let textureReady = false;
    const portrait = new THREE.TextureLoader().load(IMG_HERO_RED, () => {
      textureReady = true;
    });
    portrait.colorSpace = THREE.SRGBColorSpace;
    portrait.anisotropy = 8;

    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x14141b,
      roughness: 0.36,
      metalness: 0,
      specularIntensity: 0.35,
      specularColor: highlightColor,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      iridescence: 0.55,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [100, 400],
      emissive: 0xffffff,
      emissiveMap: portrait,
      emissiveIntensity: 0.92,
      envMapIntensity: 0.28,
    });

    /* Tint the iridescent fresnel red like the template */
    const tintIridescence = (shader) => {
      shader.uniforms.redReflection = { value: reflectionColor };
      shader.fragmentShader = 'uniform vec3 redReflection;\n' + shader.fragmentShader;
      const chunk = THREE.ShaderChunk.lights_fragment_begin.replace(
        'material.iridescenceFresnel = mix(',
        `iridescenceFresnelDielectric = redReflection * dot(iridescenceFresnelDielectric, vec3(0.333333));
         iridescenceFresnelMetallic = redReflection * dot(iridescenceFresnelMetallic, vec3(0.333333));
         material.iridescenceFresnel = mix(`
      );
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', chunk);
    };

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: reflectionColor,
      transparent: true,
      opacity: 0.38,
    });

    const shards = [];
    let plateW = 1;
    let plateH = 1;
    let isMobile = false;

    const buildShards = () => {
      const previous = shards.slice();
      while (plate.children.length) {
        const c = plate.children[0];
        plate.remove(c);
        if (c.geometry) c.geometry.dispose();
        if (c.material) {
          if (Array.isArray(c.material)) c.material.forEach((m) => m.dispose());
          else c.material.dispose();
        }
        if (c.children) {
          c.children.forEach((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
              else child.material.dispose();
            }
          });
        }
      }
      shards.length = 0;

      const t = reduceMotion ? 0 : performance.now() / 1000;
      const minSide = Math.min(plateW, plateH);

      SHARD_POLYGONS.forEach((poly, idx) => {
        const world = poly.map((p) => {
          let [px, py] = p;
          const b = BREATHING_VERTICES.findIndex(([bx, by]) => bx === p[0] && by === p[1]);
          if (b >= 0) {
            px += Math.sin(t * 0.5 + b * 2.1) * 0.006;
            py += Math.cos(t * 0.4 + b * 1.3) * 0.006;
          }
          if (isMobile) [px, py] = [py, px];
          return [(px - 0.5) * plateW, (0.5 - py) * plateH];
        });

        const shape = roundedShape(insetPolygon(world, minSide * 0.012), minSide * 0.035);
        const depth = minSide * 0.045;
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth,
          bevelEnabled: true,
          bevelThickness: depth * 0.35,
          bevelSize: depth * 0.3,
          bevelSegments: 3,
          curveSegments: 8,
        });
        geo.translate(0, 0, -depth);

        /* Map texture across plate */
        const pos = geo.attributes.position;
        const uv = geo.attributes.uv;
        const imgAspect = 16 / 9;
        const plateAspect = plateW / plateH;
        let sx = 1;
        let sy = 1;
        if (plateAspect > imgAspect) sy = imgAspect / plateAspect;
        else sx = plateAspect / imgAspect;

        const shift = sx < 1 ? Math.min(0.5, Math.max(0, (SUBJECT_X - 0.5) / (1 - sx))) : 0;
        for (let i = 0; i < pos.count; i++) {
          const u = (pos.getX(i) / plateW + 0.5) * sx + (1 - sx) / 2 + shift * (1 - sx);
          const v = (pos.getY(i) / plateH + 0.5) * sy + (1 - sy) / 2;
          uv.setXY(i, Math.min(1, Math.max(0, u)), v);
        }
        uv.needsUpdate = true;

        const mat = baseMaterial.clone();
        mat.onBeforeCompile = tintIridescence;
        mat.customProgramCacheKey = () => 'muted-red-iridescence';

        const mesh = new THREE.Mesh(geo, mat);
        const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMaterial);
        mesh.add(edge);

        const centroid = world.reduce(
          (acc, p) => [acc[0] + p[0] / world.length, acc[1] + p[1] / world.length],
          [0, 0]
        );
        const center = new THREE.Vector2(centroid[0], centroid[1]);
        const dir = new THREE.Vector3(centroid[0] / plateW, centroid[1] / plateH, 0.4 + (idx % 3) * 0.25).normalize();
        const spin = new THREE.Vector3(
          (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 1.6,
          (Math.random() - 0.5) * 0.8
        );

        mesh.userData.idx = idx;
        plate.add(mesh);
        shards.push({
          mesh,
          edge,
          mat,
          center,
          dir,
          spin: previous[idx]?.spin ?? spin,
          lift: previous[idx]?.lift ?? 0,
          phase: idx * 1.37,
          x: previous[idx]?.x ?? { position: 0, velocity: 0 },
          y: previous[idx]?.y ?? { position: 0, velocity: 0 },
          targetX: previous[idx]?.targetX ?? 0,
          targetY: previous[idx]?.targetY ?? 0,
        });
      });
    };

    /* Resize */
    let layout = plateLayout(1, 1);
    const resize = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      layout = plateLayout(w, h);

      const worldPerPx = (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / h;
      plateW = layout.width * worldPerPx;
      plateH = layout.height * worldPerPx;
      plate.position.set(0, -((layout.top - (h - layout.top - layout.height)) / 2) * worldPerPx, 0);
      isMobile = layout.mobile;
      camera.updateProjectionMatrix();
      buildShards();

      const copy = copyRef.current;
      if (!copy) return;
      if (layout.mobile) {
        const top = layout.top + layout.height + Math.min(h * 0.02, 16);
        Object.assign(copy.style, {
          left: `${layout.left}px`,
          top: `${top}px`,
          width: `${layout.width}px`,
          height: `${Math.max(h - top - h * 0.03, 180)}px`,
        });
      } else {
        Object.assign(copy.style, {
          left: `${layout.left}px`,
          top: `${layout.top}px`,
          width: `${layout.width}px`,
          height: `${layout.height}px`,
        });
      }
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    /* Pointer Interactions */
    const ndc = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const dragPlane = new THREE.Plane();
    const grabLocal = new THREE.Vector3();
    const hitPoint = new THREE.Vector3();
    let dragIndex = -1;
    let dragPointerId = null;
    let dragZ = 0;
    const dragStart = new THREE.Vector2();
    let hovering = false;

    const shardMeshes = () => shards.map((s) => s.mesh);

    const onPointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      hovering = true;

      if (dragIndex >= 0 && e.pointerId === dragPointerId) {
        raycaster.setFromCamera(ndc, camera);
        if (raycaster.ray.intersectPlane(dragPlane, hitPoint)) {
          const local = plate.worldToLocal(hitPoint.clone());
          const s = shards[dragIndex];
          s.targetX = clampOffset(dragStart.x + local.x - grabLocal.x, plateW);
          s.targetY = clampOffset(dragStart.y + local.y - grabLocal.y, plateH);
        }
      }
    };

    const onPointerLeave = () => {
      hovering = false;
    };

    const release = () => {
      if (dragIndex < 0) return;
      const s = shards[dragIndex];
      s.targetX = 0;
      s.targetY = 0;
      dragIndex = -1;
      section.classList.remove('shard-dragging');
      stage.style.cursor = '';
      if (dragPointerId !== null && section.hasPointerCapture(dragPointerId)) {
        section.releasePointerCapture(dragPointerId);
      }
      dragPointerId = null;
    };

    const onPointerDown = (e) => {
      if (dragIndex >= 0) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('a, button, input, textarea, nav')) return;
      if (section.getBoundingClientRect().top < -section.clientHeight * 0.04) return;

      onPointerMove(e);
      scene.updateMatrixWorld(true);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(shardMeshes(), false)[0];
      if (!hit) return;

      dragIndex = hit.object.userData.idx;
      dragPointerId = e.pointerId;
      const s = shards[dragIndex];
      dragZ = s.mesh.position.z;
      dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), hit.point);
      grabLocal.copy(plate.worldToLocal(hit.point.clone()));
      dragStart.set(s.x.position, s.y.position);
      section.setPointerCapture(e.pointerId);
      section.classList.add('shard-dragging');
      stage.style.cursor = 'grabbing';
      e.preventDefault();
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);
    section.addEventListener('pointerdown', onPointerDown);
    section.addEventListener('pointerup', release);
    section.addEventListener('pointercancel', release);
    section.addEventListener('lostpointercapture', release);
    window.addEventListener('blur', release);

    /* Render loop */
    const tilt = { x: 0, y: 0 };
    let hoverIndex = -1;
    let scrollSmooth = 0;
    let raf = 0;
    let lastTime = performance.now();
    let idleClock = 0;
    let visible = true;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) release();
    });
    io.observe(section);

    const frame = (nowMs) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        lastTime = nowMs;
        return;
      }
      const dt = Math.min((nowMs - lastTime) / 1000, 0.05);
      lastTime = nowMs;
      const time = nowMs / 1000;
      const damp = (k) => 1 - Math.exp(-k * dt);

      /* Tilt plate */
      const dragging = dragIndex >= 0;
      const wantX = dragging ? tilt.x : hovering && !reduceMotion ? -ndc.y * THREE.MathUtils.degToRad(5.5) : 0;
      const wantY = dragging ? tilt.y : hovering && !reduceMotion ? ndc.x * THREE.MathUtils.degToRad(7) : 0;
      tilt.x += (wantX - tilt.x) * damp(5);
      tilt.y += (wantY - tilt.y) * damp(5);

      /* Scroll progress */
      const rect = section.getBoundingClientRect();
      const scrollTarget = THREE.MathUtils.clamp(-rect.top / (rect.height * 0.8), 0, 1);
      scrollSmooth += (scrollTarget - scrollSmooth) * damp(8);
      const sp = scrollSmooth * scrollSmooth * (3 - 2 * scrollSmooth);

      plate.rotation.set(tilt.x, tilt.y, 0);
      plate.updateMatrixWorld(true);

      /* Hover */
      hoverIndex = -1;
      if (hovering && !coarse && sp < 0.05) {
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObjects(shardMeshes(), false)[0];
        if (hit) {
          hoverIndex = hit.object.userData.idx;
          cursorLight.position.set(hit.point.x, hit.point.y, hit.point.z + 1.2);
        }
      }
      cursorLight.intensity += ((hoverIndex >= 0 || dragIndex >= 0 ? 1.4 : 0) - cursorLight.intensity) * damp(6);
      stage.setAttribute('data-shard-hover', hoverIndex >= 0 || dragIndex >= 0 ? '1' : '0');

      idleClock += dt;
      const displaced = shards.some((s) => s.x.position !== 0 || s.y.position !== 0);

      const fly = sp * Math.max(plateW, plateH) * 0.9;
      shards.forEach((s, i) => {
        const moved = dragIndex === i || s.x.position !== 0 || s.y.position !== 0;
        s.lift += ((!moved && hoverIndex === i ? 1 : 0) - s.lift) * damp(7);
        stepSpring(s.x, s.targetX, dt);
        stepSpring(s.y, s.targetY, dt);

        const bob = reduceMotion || moved ? 0 : Math.sin(time * 0.8 + s.phase) * 0.03;
        s.mesh.position.set(
          s.dir.x * fly + s.x.position,
          s.dir.y * fly + s.y.position,
          (dragIndex === i ? dragZ : bob + s.lift * 0.35) + s.dir.z * fly * 0.6
        );
        s.mesh.rotation.set(
          s.spin.x * sp * 1.5,
          s.spin.y * sp * 1.5,
          s.spin.z * sp * 0.8
        );
      });

      const copy = copyRef.current;
      if (copy) {
        copy.style.transform = `perspective(1400px) rotateX(${(-tilt.x * 180) / Math.PI}deg) rotateY(${
          (tilt.y * 180) / Math.PI
        }deg) translate3d(${-sp * 140}px, ${-sp * 60}px, ${sp * 80}px)`;
        copy.style.opacity = String(1 - sp * 1.2);
      }

      renderer.render(scene, camera);
      if (textureReady) stage.dataset.sceneReady = '1';
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      release();
      section.removeEventListener('pointerdown', onPointerDown);
      section.removeEventListener('pointerup', release);
      section.removeEventListener('pointercancel', release);
      section.removeEventListener('lostpointercapture', release);
      window.removeEventListener('blur', release);
      shards.forEach((s) => {
        s.mesh.geometry.dispose();
        s.edge.geometry.dispose();
        s.mat.dispose();
      });
      baseMaterial.dispose();
      edgeMaterial.dispose();
      portrait.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [webgl]);

  const useFallback = webgl === false;

  return (
    <div id="home" className="w-full flex flex-col overflow-hidden relative">
      <div id="hero" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
      <section
        ref={sectionRef}
        className="relative w-full h-[100svh] min-h-[640px] overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* No-WebGL fallback */}
        {useFallback && (
          <div
            className="absolute rounded-[28px] overflow-hidden border border-white/10 shadow-glass"
            style={
              mobile
                ? { left: 'clamp(16px, 5%, 22px)', right: 'clamp(16px, 5%, 22px)', top: 'max(8.5%, 84px)', height: '50%' }
                : { left: '5.5%', right: '5.5%', top: 'max(8.5%, 96px)', bottom: '8.5%' }
            }
          >
            <img
              src={IMG_HERO_RED}
              alt="Atul Kumar Portrait Glass"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-[#050507]/30 to-transparent" />
          </div>
        )}

        {/* Outer Glass Plate Boundary / Frame (Matches Template Screenshot) */}
        <div
          className="absolute rounded-[28px] md:rounded-[32px] pointer-events-none border border-white/10 shadow-[0_20px_80px_-20px_rgba(235,90,110,0.38),inset_0_1px_0_rgba(255,255,255,0.18)] bg-black/15 z-[1]"
          style={
            mobile
              ? { left: 'clamp(16px, 5%, 22px)', right: 'clamp(16px, 5%, 22px)', top: 'max(8.5%, 84px)', height: 'clamp(210px, 38vh, 280px)' }
              : { left: '5.5%', right: '5.5%', top: 'max(8.5%, 96px)', bottom: '8.5%' }
          }
        />

        {/* 3D Glass Shards WebGL Canvas Mount */}
        <div ref={stageRef} className="absolute inset-0 touch-pan-y z-[2]" aria-hidden="true" />

        {/* Overlaid Copy (Matches User Screenshot: media_1795089488235_4152dad2.png) */}
        <div
          ref={copyRef}
          className="absolute flex items-center max-md:items-end will-change-transform pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto z-10"
          style={
            useFallback
              ? mobile
                ? { left: '4%', right: '4%', top: 'calc(max(8.5%, 84px) + clamp(210px, 38vh, 280px) + 12px)', bottom: '3%' }
                : { left: '5.5%', right: '5.5%', top: 'max(8.5%, 96px)', bottom: '8.5%' }
              : { transformOrigin: '50% 50%' }
          }
        >
          <div className="pl-[5%] pr-4 max-w-[min(34rem,46%)] max-md:max-w-full max-md:pl-3 max-md:pr-3 max-md:pb-4 max-md:w-full max-md:rounded-3xl max-md:bg-gradient-to-t max-md:from-[#050507]/90 max-md:via-[#050507]/55 max-md:to-transparent max-md:pt-4">
            <div className="flex flex-col gap-2 sm:gap-3.5">
              <span className="text-[#FF2A3B] font-mono font-bold uppercase text-[11px] sm:text-xs md:text-sm tracking-[0.25em]">
                OS ENGINEER + INDEPENDENT DEVELOPER
              </span>
              <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] uppercase drop-shadow-2xl font-['Syne']">
                ATUL<br className="hidden sm:inline" /> KUMAR
              </h1>
              <div className="flex items-center gap-2 sm:gap-3 text-white font-extrabold text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-wider mt-0.5">
                <span className="text-[#FF3850]">SYSTEMS ARCHITECT</span>
                <span className="text-[#FF2A3B] font-bold">/</span>
                <span>BACKEND ENGINEER</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base font-normal tracking-wide mt-1 max-w-md">
                Building high-performance kernels, cryptographic vaults, and real-time distributed platforms.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-6">
                <VenomButton href="#projects" variant="primary">
                  EXPLORE MY WORK
                </VenomButton>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-b from-white/[0.12] to-white/[0.04] backdrop-blur-xl border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_25px_-10px_rgba(0,0,0,0.8),0_0_20px_-5px_rgba(255,30,56,0.3)] hover:border-red-500/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_32px_-8px_rgba(255,30,56,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-['Syne',sans-serif]"
                >
                  <span>GET IN TOUCH</span>
                  <span className="text-[#FF2A3B] transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
