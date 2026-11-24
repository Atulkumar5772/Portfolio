# Atul Kumar — High-Performance 3D Systems & Engineering Portfolio

<div align="center">

[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.169.0-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![WebGL2 Shaders](https://img.shields.io/badge/GLSL-Custom_Shaders-990000?style=for-the-badge&logo=opengl&logoColor=white)](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))
[![GSAP 3](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br>

**A cinematic, GPU-accelerated interactive web application engineered to demonstrate systems programming, kernel daemons, zero-knowledge cryptographic vaults, and real-time distributed digital twins.**

[🌐 Explore Architecture](#-architectural-deep-dive) • [⚡ Core Engines](#-gpu-engines--graphics-pipeline) • [📁 Directory Map](#-codebase-architecture) • [🛠️ Setup Guide](#-local-development--build)

</div>

---

## 🌟 Overview & Vision

This portfolio is not a standard template or static resume site; it is a custom-engineered, multi-threaded 3D graphics experience built from scratch over 25 days of dedicated technical iteration. It combines **WebGL2 ray marching, custom GLSL fragment shaders, Verlet numerical integration physics, and GSAP scroll-bound camera projection pipelines** with deep low-level backend engineering showcases.

The design language fuses **aerospace HUD telemetry, dark cyber aesthetics (`#07070a`), ruby-red glass specular reflections, and responsive physics-driven interactions**.

---

## ⚡ GPU Engines & Graphics Pipeline

```
                                [ Client Viewport ]
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
   [ Starfield WebGL ]          [ Glass Shard 3D ]         [ Project Roller 3D ]
   • Custom GLSL Vertex/Frag    • ACES Tone-Mapping        • 3D Spline Path Traversal
   • Forward Z-Axis Travel      • PMREM RoomEnvironment    • SDF Rounded Box Shader
   • Screen-Space Shockwaves    • Procedural Spring Mesh   • Procedural 1280x720 Texture
   • Depth Parallax Attenuation • Breaked-Glass Topology   • Raycast Mouse Interaction
```

### 1. Three.js Project Card Roller & Custom GLSL Shaders (`ProjectsSection.jsx`)
* **3D Spline Flight Path:** Projects navigate along a 9-waypoint curved spline rail spanning `Z = -60` to `Z = 3.2`. Cards fly into view, orient toward the camera, and settle into an adaptive 16:9 grid.
* **SDF Border Masking:** Uses a custom GLSL Signed Distance Field (`rbox`) function within the fragment shader to compute mathematically perfect rounded corners without increasing geometry vertex counts.
* **Liquid Reflection Sheen:** Real-time specular highlights and an exponential glass reflection sweep react dynamically to pointer coordinates and card flip states (`uHover`).
* **Procedural Canvas Texturing:** A dynamic 1280×720 offscreen Canvas generates ambient ruby-red linear gradients (`#9e1422` to `#4e0710`) with tactical grid lines overlaid seamlessly before texture upload.

### 2. 3D Glass Shard Hero Engine (`GlassShardHero.jsx`)
* **Environmental Tone Mapping:** Implements `ACESFilmicToneMapping` with a pre-filtered radiance environment map (`PMREMGenerator` + `RoomEnvironment`) for photorealistic reflections on floating glass shards.
* **Procedural Spring Damping:** Features custom spring-damper step physics (`stepSpring`) to handle cursor-induced momentum and gentle natural restoration.
* **Adaptive Mesh Resolution:** Detects touch/coarse pointers to throttle device pixel ratios (`DPR 1.5` vs `2.0`), preserving 60 FPS across both desktop workstations and mobile hardware.

### 3. Starfield & Shockwave Particle Field (`ParticleField.jsx`)
* **Deep-Space Forward Warp:** GPU-driven points computing real-time coordinate wraps in GLSL (`mod(z + uDepth, uDepth + 6.0) - uDepth`).
* **Interactive Screen-Space Shockwaves:** Stores a rolling buffer of 4 simultaneous user click vectors (`uClick[4]`), creating radial shockwaves that physically repel nearby particles with exponential distance falloff.
* **Depth-Based Parallax:** Particles closer to the camera near-plane exhibit amplified reaction to cursor vectors while background particles remain stable.

### 4. Venom Button Tendril Engine (`venomEngine.ts`)
* **Verlet Particle Tendrils:** 14-point discrete Verlet integration chains simulating organic viscoelastic tendrils that stretch, anchor, and whip toward the pointer upon proximity.
* **Ray-Marched Fluid Slab:** WebGL2 shader evaluating implicit distance surfaces with real-time ripple propagation (`MAXR = 6`) and silk bridge stress tearing.

### 5. Spark Lightning Cursor (`SparkCursor.jsx`)
* **Recursive Branch Generation:** Generates lightning branch trees with random angular jitter, dynamic decay, and velocity-coupled particle trails.
* **Resource Pooling:** Pre-allocates fixed-size arrays (`180 sparks`, `28 branches`) to ensure zero runtime garbage collection pauses during high-speed cursor gestures.

### 6. Liquid Fill Preloader (`LiquidPreloader.jsx`)
* **Mathematical Wave Synthesis:** Dual sine waves overlaid with variable phase offsets simulating a rising viscous fluid level from 0% to 100%.
* **ScrollTrigger Cache Warming:** Automatically coordinates with `ScrollTrigger.refresh()` upon exit transition to prevent layout shifts and scroll jumps.

---

## 🛠️ Tech Stack & Ecosystem

| Layer | Technologies | Purpose & Architecture |
|---|---|---|
| **Core Framework** | React 18.3, Vite 6.1 | Component modularity, fast HMR, optimized tree-shaking |
| **3D Rendering** | Three.js 0.169, WebGL2 | Custom shaders, lighting environments, perspective camera math |
| **Animation Engine** | GSAP 3.12, ScrollTrigger | Scroll-tied 3D timeline scrubbing, pin controls, spring easing |
| **Styling & UI** | Tailwind CSS 3.4, PostCSS | Glassmorphic backdrops, ambient glows, fluid responsive typography |
| **Icons & Assets** | Lucide React, Custom SVGs | Clean vector icon system, minimal SVG runtime overhead |
| **Languages** | JavaScript (ES6+), GLSL, TypeScript | Component logic, GPU shaders, physics simulation engines |

---

## 📁 Codebase Architecture

```
E:\Portfolio/
├── index.html                   # HTML5 Entrypoint & viewport configuration
├── vite.config.js               # Vite build settings & React plugin setup
├── tailwind.config.js           # Custom typography, colors, animations
├── package.json                 # Dependency graph & script declarations
│
├── public/                      # Static assets served directly
│   ├── assets/
│   │   ├── hero-red-bg.png      # High-resolution hero background plate
│   │   └── thumbnails/          # 1280x720 Project preview cards (1-1 to 5-3)
│   ├── media/                   # Portraits & profile imagery (WebP / PNG)
│   └── Atul_Kumar_Resume.pdf    # Direct downloadable resume document
│
└── src/
    ├── App.jsx                  # Master root component & layout orchestration
    ├── main.jsx                 # React DOM mount point
    ├── index.css                # Global styles, scrollbar styling, ambient orbs
    │
    ├── components/              # User interface & visual engine modules
    │   ├── AboutSection.jsx     # Education history, CGPA/SGPA cards, SIH honors
    │   ├── ContactFooter.jsx    # Terminal contact hub, social links, direct email
    │   ├── ExperienceSection.jsx# Red Hat (R-CAT) & White Box internship cards
    │   ├── GlassShardHero.jsx   # 3D cracked glass interactive hero scene
    │   ├── HangingPhoto.jsx     # Physics-bound pendulum photo frame
    │   ├── LiquidPreloader.jsx  # Sine-wave liquid level percentage loader
    │   ├── Navbar.jsx           # Glassmorphism navigation bar with resume trigger
    │   ├── ParticleField.jsx    # WebGL starfield with click shockwaves
    │   ├── ProjectModal.jsx     # Full-screen deep-dive modal for project specs
    │   ├── ProjectsSection.jsx  # 3D project spline roller with GLSL shaders
    │   ├── ResumeModal.jsx      # Embedded PDF resume reader & modal overlay
    │   ├── SkillsSection.jsx    # Technical competence categorization matrix
    │   ├── SparkCursor.jsx      # Canvas lightning & electric spark cursor
    │   └── VenomButton.jsx      # React wrapper for WebGL2 fluid tendril button
    │
    ├── data/
    │   └── portfolioData.js     # Single source of truth for all projects, bio, skills
    │
    ├── lib/
    │   ├── heroShards.js        # Polygon shard coordinates, spring math, breathing nodes
    │   └── venomEngine.ts       # WebGL2 ray-marched tendril physics engine
    │
    └── utils/
        └── particleSampler.js   # Vertex distribution and spatial sampling utilities
```

---

## 🚀 Featured Engineering Systems

Each project showcased within this portfolio reflects deep architectural and low-level competencies:

1. **Phoenix-Linux:** Autonomous Linux Kernel inotify File Integrity Monitoring & Sub-Millisecond Self-Healing Daemon in Modern C++17. Features `<sys/inotify.h>` hooks, non-blocking `poll()`, OpenSSL EVP SHA-256 streaming verification, anti-loop suppress locks, and `< 1.2 ms` rollback latency.
2. **ZeroTrace-Vault:** Zero-Knowledge Ephemeral Secret Sharing Vault built with browser-native WebCrypto AES-GCM-256, RFC 3986 URL hash anchor key isolation, atomic burn-on-read database destruction, and anti-crawler defense.
3. **Flash-Seat:** High-Concurrency Zero-Overselling Inventory Engine & SQL Transaction Visualizer solving extreme ticket race conditions with MySQL InnoDB `SELECT ... FOR UPDATE SKIP LOCKED` and zero deadlocks under 500 concurrent bot workers.
4. **Garuda Aero GCS:** Autonomous UAV Ground Control Station and Real-Time Digital Twin simulation platform featuring dynamic waypoint navigation, dual-layer DGCA airspace geofencing, and multithreaded telemetry tickers in Java 17 & Spring Boot 3.3.
5. **DeliveryFence:** Geospatial COD Anti-Fraud Platform tackling e-commerce return losses with 150m PostGIS geofencing, 180s doorstep dwell-time validation, Shannon Information Entropy scoring, and carrier IVR telemetry.

---

## 💻 Local Development & Build

### Prerequisites
* **Node.js:** v18.0.0 or higher (v20+ recommended)
* **npm:** v9.0.0 or higher

### 1. Installation
Clone the repository and install all required runtime and development dependencies:

```bash
git clone https://github.com/Atulkumar5772/Portfolio.git
cd Portfolio
npm install
```

### 2. Run Local Development Server
Start the local Vite development environment with instant Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### 3. Production Build & Optimization
Compile and bundle the production assets into the `dist/` directory with minified JavaScript, optimized CSS, and tree-shaken WebGL modules:

```bash
npm run build
```

To test the compiled production build locally before deployment:

```bash
npm run preview
```

---

## ⚡ Performance Optimizations

* **Offscreen Canvas Rendering:** Heavy procedural texture synthesis executes once on an offscreen canvas and uploads directly to GPU memory, eliminating per-frame 2D redraws.
* **Shader Uniform Caching:** Animation loops modify primitive uniform references (`uTime`, `uHover`) instead of recreating or rebinding WebGL materials.
* **Memory & Texture Cleanup:** Scene unmount listeners traverse Three.js object trees to explicitly invoke `.dispose()` on geometries, materials, and textures, preventing GPU memory leaks.
* **Coarse Pointer Adaptation:** Automatically detects mobile and battery-constrained displays to scale down particle counts and clamp frame pixel ratios.

---

## 👨‍💻 Engineer Profile

**Atul Kumar**  
*Systems, Linux Kernel & High-Concurrency Backend Engineer*  
*B.Tech in Computer Science & Engineering — Poornima Institute of Engineering and Technology (PIET), Jaipur (CGPA: 8.98 / 10.0)*  
*Former Linux Administration Intern at Red Hat (R-CAT)* • *National Finalist, Smart India Hackathon (SIH 2026)*

* 🌐 **GitHub:** [@Atulkumar5772](https://github.com/Atulkumar5772)
* 💼 **LinkedIn:** [Atul Kumar](https://linkedin.com/in/atul-kumar-454b34380)
* 🧩 **LeetCode:** [atulkumar181005](https://leetcode.com/u/atulkumar181005)
* 📧 **Email:** [atulkumar181005@gmail.com](mailto:atulkumar181005@gmail.com)

---

<div align="center">
  <sub>Engineered with passion, mathematical precision, and 25 days of relentless optimization. Open-source under the MIT License.</sub>
</div>
