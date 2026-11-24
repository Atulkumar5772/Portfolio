<div align="center">

# ⚡ ATUL KUMAR — 3D IMMERSIVE PORTFOLIO ⚡

<br/>

<a href="https://atulkumar5772.github.io/Portfolio/" target="_blank">
  <img src="https://img.shields.io/badge/⚡_ENTER_THE_CYBERSPACE-LAUNCH_LIVE_3D_EXPERIENCE_▶-FF0055?style=for-the-badge&logo=three.js&logoColor=white&labelColor=090a0f" height="52" alt="Launch 3D Portfolio" />
</a>
<br/><br/>

<br/><br/>

[![Status](https://img.shields.io/badge/STATUS-LIVE-brightgreen?style=for-the-badge&logo=githubpages&logoColor=white)](https://atulkumar5772.github.io/Portfolio/)
[![Three.js](https://img.shields.io/badge/Three.js-0.169-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![WebGL2 Shaders](https://img.shields.io/badge/GLSL-Custom_Shaders-E0234E?style=for-the-badge&logo=opengl&logoColor=white)](https://khronos.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br/>

> **"A custom-engineered, GPU-accelerated 3D web experience built from scratch. Blending aerospace HUD telemetry, procedural glass physics, WebGL2 raymarching, and cinematic GSAP camera flight into a single 60 FPS web application."**

---

</div>

<br/>

## ✨ CORE 3D ENGINES & HIGHLIGHTS

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>💎 3D Cracked Glass Shard Engine</h3>
      <ul>
        <li><b>Procedural Geometry:</b> Voronoi-inspired cracked glass plate dynamically modeled in Three.js.</li>
        <li><b>Realistic Optics:</b> PMREM environment reflections with custom transmission and roughness mapping.</li>
        <li><b>Physics Springs:</b> Multi-axis dampening springs that react naturally to mouse velocity.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🛸 Curved 3D Spline Flight Rail</h3>
      <ul>
        <li><b>Bezier Camera Flight:</b> Continuous camera navigation along a 3D spline from depth Z = -60 to 3.2.</li>
        <li><b>GLSL SDF Shaders:</b> Custom fragment shaders calculating signed distance field rounded box corners.</li>
        <li><b>Dynamic Canvas Textures:</b> Real-time procedural rendering with glass specular sweeps.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Tesla Lightning Cursor</h3>
      <ul>
        <li><b>Procedural Arcing:</b> Dynamic electrical arc branching with randomized discharge steps.</li>
        <li><b>Zero-Garbage Memory:</b> Pre-allocated particle & spark pools for butter-smooth 60 FPS.</li>
        <li><b>Fluid Velocity Damping:</b> Tail trails that react dynamically to cursor speed and direction.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🦠 WebGL2 Ray-Marched Tendrils</h3>
      <ul>
        <li><b>Custom GLSL Engine:</b> Over 1,200 lines of raw WebGL2 raymarching and fluid tendril physics.</li>
        <li><b>Verlet Integration:</b> Numerical particle simulation for organic movement and mouse tracking.</li>
        <li><b>Volumetric Shading:</b> GPU-computed specular highlights and subsurface scattering.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🌌 Interactive Parallax Starfield</h3>
      <ul>
        <li><b>Depth Parallax:</b> Multi-layered starfield reacting with forward travel speed.</li>
        <li><b>Shockwave Physics:</b> Screen-space radial shockwaves triggered on user clicks.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🌊 Fluid Sine Wave Preloader</h3>
      <ul>
        <li><b>Dual Wave Filling:</b> Procedural dual sine waves that track real asset loading progress.</li>
        <li><b>Seamless Transition:</b> Zero-flash reveal into the 3D WebGL scene upon asset hydration.</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

---

## 🛠️ ARCHITECTURE & TECH STACK

<div align="center">

<img src="https://skillicons.dev/icons?i=react,threejs,tailwind,vite,js,ts,html,css,git,github" />

<br/><br/>

| Layer | Technology | Key Responsibility |
|---|---|---|
| **Core 3D Engine** | Three.js (`r169`) | Scene graph, camera projections, procedural meshes, PBR lighting |
| **GPU Shaders** | Raw GLSL / WebGL2 | SDF rounded-boxes, raymarching tendrils, specular sweeps |
| **Motion & Scroll** | GSAP 3.12 + ScrollTrigger | Scrubbed spline timelines, smooth camera flight interpolation |
| **UI Framework** | React 18.3 | Component architecture, state management, modal controllers |
| **Styling & HUD** | Tailwind CSS 3.4 | Aerospace cyber HUD layout, glassmorphic cards, typography |
| **Build & Bundler** | Vite 6.1 | Sub-second HMR, optimized chunk splitting, GLSL asset loaders |

</div>

<br/>

---

## 📂 REPOSITORY ARCHITECTURE

```bash
Portfolio/
├── public/
│   ├── assets/              # Core UI vectors, background art & assets
│   ├── media/               # High-res portraits & optimized WebP assets
│   └── Atul_Kumar_Resume.pdf# Embedded resume asset
├── src/
│   ├── components/
│   │   ├── GlassShardHero.jsx   # 💎 3D cracked glass physics & PMREM optics
│   │   ├── ProjectsSection.jsx  # 🛸 3D Bezier spline flight & custom shaders
│   │   ├── SparkCursor.jsx      # ⚡ Procedural Tesla electrical spark cursor
│   │   ├── VenomButton.jsx      # 🦠 WebGL2 ray-marched fluid tendril engine
│   │   ├── ParticleField.jsx    # 🌌 Parallax starfield & click shockwaves
│   │   ├── LiquidPreloader.jsx  # 🌊 Dual sine wave fluid preloader
│   │   ├── ExperienceSection.jsx # 🏢 Timeline & milestone cards
│   │   ├── SkillsSection.jsx    # 🛠️ Interactive skill matrix
│   │   └── ProjectModal.jsx     # 🪟 Animated project detail modals
│   ├── App.jsx                  # Root composition & GSAP master timeline
│   └── main.jsx                 # Application entry point
├── tailwind.config.js           # Aerospace HUD theme tokens & animations
└── vite.config.js               # Vite build & asset pipeline
```

<br/>

---

## ⚡ QUICK START (RUN LOCALLY)

Clone and launch this 3D portfolio locally in just 3 commands:

```bash
# 1. Clone the repository
git clone https://github.com/Atulkumar5772/Portfolio.git

# 2. Navigate into project & install dependencies
cd Portfolio
npm install

# 3. Launch local high-speed dev server
npm run dev
```

<br/>

---

<div align="center">

### 🤝 CONNECT & COLLABORATE

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Atul_Kumar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atulkumar5772/)
[![GitHub](https://img.shields.io/badge/GitHub-Atulkumar5772-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Atulkumar5772)
[![Email](https://img.shields.io/badge/Email-Contact_Me-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:atulkumar5772@gmail.com)

<br/>

<sub>Engineered with precision, creativity, and passion by **Atul Kumar**.</sub>

</div>


