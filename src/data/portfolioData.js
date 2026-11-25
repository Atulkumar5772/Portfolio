export const PERSONAL_INFO = {
  name: "Atul Kumar",
  title: "Systems, Kernel & High-Concurrency Backend Engineer",
  tagline: "Engineering sub-millisecond kernel daemons, zero-knowledge cryptographic vaults, and ACID-compliant concurrency engines.",
  location: "Jaipur, Rajasthan, India",
  phone: "+91 94601 75484",
  email: "atulkumar181005@gmail.com",
  github: "https://github.com/Atulkumar5772",
  linkedin: "https://linkedin.com/in/atul-kumar-454b34380",
  leetcode: "https://leetcode.com/u/atulkumar181005",
  college: "Poornima Institute of Engineering and Technology",
  degree: "B.Tech in Computer Science and Engineering",
  cgpa: "8.98 / 10.0",
  graduationYear: "2024 – Present",
  sihRank: "Smart India Hackathon (SIH 2026) — Hardware & Software Editions",
};

export const EDUCATION_JOURNEY = [
  {
    stage: "01. SECONDARY (CLASS X)",
    board: "RBSE (State Board)",
    score: "95.00%",
    scoreLabel: "Class X Board",
    period: "2020 – 2021",
    location: "Jaipur, Rajasthan",
    summary: "Secured 95.00% with top honors in Mathematics and Physical Sciences.",
    accentColor: "#10B981", // Emerald
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    stage: "02. SENIOR SECONDARY (CLASS XII)",
    board: "RBSE (Science & Mathematics Stream)",
    score: "77.80%",
    scoreLabel: "Class XII Board",
    period: "2022 – 2023",
    location: "Jaipur, Rajasthan",
    summary: "Majored in Physics, Chemistry, and Advanced Mathematics.",
    accentColor: "#38BDF8", // Cyan Ice
    badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    stage: "03. UNDERGRADUATE (B.TECH IN CSE)",
    institution: "Poornima Institute of Engineering and Technology",
    score: "8.98 / 10.0",
    scoreLabel: "Cumulative CGPA",
    period: "2024 – Present",
    status: "CURRENT ENROLLMENT",
    location: "Jaipur, Rajasthan",
    summary: "Specializing in Linux Kernel Systems, Distributed Relational DB Internals, and Computer Networks.",
    sgpaList: [
      { sem: "Sem 4", score: "9.00" },
      { sem: "Sem 3", score: "9.70" },
      { sem: "Sem 2", score: "8.83" },
      { sem: "Sem 1", score: "8.39" },
    ],
    accentColor: "#6366F1", // Electric Indigo
    badgeClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  },
];

export const PROJECTS = [
  {
    id: "phoenix-linux",
    title: "Phoenix-Linux",
    category: "Systems & Kernel",
    poster: "./assets/thumbnails/project-1-1.jpg",
    status: "VERIFIED_BUILD",
    statusLabel: "VERIFIED BUILD",
    oneLiner: "Autonomous Linux kernel C++ daemon self-healing tampered files in <1.2ms.",
    badge: "Linux Kernel • C++17 • Low-Latency Daemon",
    tagline: "Autonomous Kernel-Interfacing File Integrity Monitoring (FIM) & Sub-Millisecond Self-Healing Daemon",
    domain: "Operating Systems, Linux Kernel Subsystems, Defensive Security, Cryptography",
    description: "An autonomous system daemon interfacing directly with the Linux Kernel via <sys/inotify.h> and poll() to capture filesystem tampering with zero CPU overhead, verifying cryptographic baselines and atomically resurrecting compromised assets in <1.2ms.",
    metrics: [
      { label: "Rollback Latency", value: "< 1.2 ms" },
      { label: "Idle CPU", value: "0.0%" },
      { label: "RAM Footprint", value: "~1.6 MB" },
      { label: "Defense Rate", value: "100.0%" }
    ],
    tech: ["Modern C++ (C++17)", "Linux inotify API", "OpenSSL EVP (SHA-256)", "poll() Non-blocking Loop", "Systemd Daemon", "GNU Make"],
    highlights: [
      "Zero-Polling Kernel Watcher: Hooks into Linux VFS to capture events (IN_MODIFY, IN_DELETE, IN_ATTRIB) without spinning CPU cycles.",
      "Anti-Loop Mutex Suppression: Eliminates infinite kernel event loops during automated file restoration using thread-safe suppress locks.",
      "Atomic Self-Healing: Instantly overwrites unauthorized file edits and reverts chmod 777 privilege escalations in < 1.2ms.",
      "Chunked Streaming Hash: 4 KB buffer ingestion preventing memory spikes on multi-gigabyte server files."
    ],
    github: "https://github.com/Atulkumar5772/Phoenix-Linux"
  },
  {
    id: "zerotrace-vault",
    title: "ZeroTrace-Vault",
    category: "Applied Cryptography",
    poster: "./assets/thumbnails/project-2-1.jpg",
    status: "VERIFIED_BUILD",
    statusLabel: "VERIFIED BUILD",
    oneLiner: "Zero-knowledge secret vault isolating AES-256 keys with auto-burn on read.",
    badge: "Zero-Knowledge • Applied Cryptography • AppSec",
    tagline: "Zero-Knowledge Ephemeral Secret Orchestration Vault with RFC 3986 Anchor Isolation & Single-View Burn-on-Read",
    domain: "Application Security, Applied Cryptography, Zero-Knowledge Architecture, Ephemeral Storage",
    description: "Eliminates unencrypted credential sprawl across enterprise channels with mathematical zero server-side encryption key exposure, RFC 3986 URL fragment key isolation, and single-view atomic memory shredding.",
    metrics: [
      { label: "Server Knowledge", value: "0% (Pure ZK)" },
      { label: "Encryption", value: "AES-GCM-256" },
      { label: "Destruction", value: "Sub-ms Burn" },
      { label: "Security Audit", value: "36-Point PASS" }
    ],
    tech: ["WebCrypto API", "AES-GCM-256", "RFC 3986 URL Fragment", "Node.js", "Express", "Docker", "POSIX CLI"],
    highlights: [
      "RFC 3986 # URL Fragment Isolation: Encryption keys reside strictly in the browser URL hash and are never transmitted over the wire to the server.",
      "Atomic Burn-on-Read Engine: Single-step retrieval and deletion preventing race conditions; secondary read attempts return permanent 404 Purged.",
      "Anti-Crawler Defense (/meta): Intercepts Slackbot, Discord, and WhatsApp preview bots to prevent premature destruction of secrets.",
      "POSIX CLI Utility: Direct Linux terminal pipeline tool (cat ~/.ssh/id_rsa | zerotrace) for seamless DevOps operations."
    ],
    github: "https://github.com/Atulkumar5772/ZeroTrace-Vault"
  },
  {
    id: "flash-seat",
    title: "Flash-Seat",
    category: "Database & Concurrency",
    poster: "./assets/thumbnails/project-5-1.png",
    status: "IN_PROGRESS",
    statusLabel: "ACTIVE BUILD • IN PROGRESS",
    oneLiner: "High-concurrency reservation engine eliminating oversell with MySQL row locks.",
    badge: "Active Build (WIP) • MySQL InnoDB • Concurrency",
    tagline: "High-Concurrency Zero-Overselling Inventory Engine & Real-Time SQL Transaction Visualizer",
    domain: "Relational Database Engineering, MySQL InnoDB Internals, Pessimistic Row Locking, Concurrency Control",
    description: "High-concurrency ticket reservation engine solving extreme traffic race conditions (BookMyShow/IRCTC Tatkal scale) with proven 0.00% double-booking and deadlock elimination under 500 concurrent bot workers.",
    metrics: [
      { label: "Oversell Rate", value: "0.00%" },
      { label: "Deadlocks (Err 1213)", value: "0 Found" },
      { label: "Lock Contention", value: "< 1.2 ms" },
      { label: "Tested Traffic", value: "500 Bots" }
    ],
    tech: ["MySQL 8.0 InnoDB", "SELECT ... FOR UPDATE SKIP LOCKED", "Node.js", "Worker Threads", "Server-Sent Events (SSE)"],
    highlights: [
      "Pessimistic Row Locking: Uses SKIP LOCKED to completely eliminate thread deadlocks (Error 1213) and queue blocking under load.",
      "Live Stress Battle: Proves 0.00% oversell and 0 deadlocks under 500 bot attacks vs 38% duplicate bookings in naive SQL transactions.",
      "Ephemeral 3-Stage State Machine: AVAILABLE -> HELD (8-min TTL auto-revert countdown) -> BOOKED.",
      "Real-Time SQL Telemetry HUD: Live streams low-level InnoDB query execution metrics, row lock acquisitions, and commit latencies via SSE."
    ],
    github: "https://github.com/Atulkumar5772/Flash-Seat"
  },
  {
    id: "garuda-aero-gcs",
    title: "Garuda Aero GCS",
    category: "Aerospace Digital Twin",
    poster: "./assets/thumbnails/project-4-1.jpg",
    status: "VERIFIED_BUILD",
    statusLabel: "VERIFIED BUILD",
    oneLiner: "Autonomous UAV Ground Control Station with live DGCA geofence digital twin.",
    badge: "Aerospace Digital Twin • Java 17 • Spring Boot 3",
    tagline: "Autonomous Drone Mission Planning & Airspace Safety Platform (Digital Twin)",
    domain: "Aerospace Simulation, Multithreaded Telemetry, Geodesic Mathematics, DGCA Airspace Compliance",
    description: "Enterprise-grade UAV Ground Control Station and real-time Digital Twin simulation engine featuring dynamic waypoint navigation, dual-layer DGCA airspace geofencing, and rule-based fail-safe telemetry.",
    metrics: [
      { label: "Telemetry Latency", value: "< 500 ms" },
      { label: "Ticker Interval", value: "1000 ms" },
      { label: "Geofence Intercept", value: "100%" },
      { label: "Battery Variance", value: "< 2%" }
    ],
    tech: ["Java 17", "Spring Boot 3", "Spring Data JPA", "MySQL 8.0", "Leaflet.js", "Spherical Haversine", "LERP"],
    highlights: [
      "Dual-Layer DGCA Airspace Safety: Level 1 pre-flight airport red-zone interceptor; Level 2 in-flight autonomous RTH boundary breach override.",
      "Multithreaded Telemetry Ticker: Spring @Scheduled background worker computing real-time GPS coordinates, dynamic climb/descent, true heading, and synthetic 3D attitude (pitch/roll).",
      "Progressive Dock Charging: Simulates autonomous DJI Dock style recharging (+5%/sec) with airborne safety interlocks.",
      "Black-Box Audit Trails: Records second-by-second mission telemetry into MySQL for post-flight debriefing."
    ],
    github: "https://github.com/Atulkumar5772/Garuda-Aero-GCS"
  },
  {
    id: "delivery-fence",
    title: "DeliveryFence",
    category: "Geospatial Anti-Fraud",
    poster: "./assets/thumbnails/project-6-1.png",
    status: "IN_PROGRESS",
    statusLabel: "ACTIVE BUILD • IN PROGRESS",
    oneLiner: "Dual-stage COD anti-fraud engine preventing delivery losses via PostGIS.",
    badge: "Active Build (WIP) • PostGIS • Anti-Fraud",
    tagline: "Dual-Stage E-Commerce COD Anti-Fraud Engine & Geospatial Doorstep Forensics Platform",
    domain: "Geospatial Intelligence (PostGIS), Anti-Fraud Heuristics, Distributed Event Processing, Unit Economics",
    description: "Dual-stage defense platform tackling India's Cash-on-Delivery (COD) Return-to-Origin losses (₹150–₹250 per failed order). Stage 1 scores checkout addresses via Shannon Entropy and pincode RTO velocity to convert high-risk impulse orders into ₹49 UPI booking tokens; Stage 2 blocks courier rider ghosting with 150m PostGIS geofencing, GPS drift compensation, 180s dwell-time validation, and automated IVR flash-call pings.",
    metrics: [
      { label: "Geofence Fence", value: "150 m" },
      { label: "Dwell-Time Lock", value: "180 sec" },
      { label: "Risk Threshold", value: "Score > 75" },
      { label: "UPI Pre-Pay", value: "₹49 Token" }
    ],
    tech: ["Node.js / Express", "PostgreSQL + PostGIS", "R-Tree Spatial Index", "ST_DistanceSphere / ST_DWithin", "Shannon Entropy H(X)", "Haversine Formula", "Automated IVR Flash-Call"],
    highlights: [
      "Stage 1 — Pre-Dispatch Checkout Risk Engine: Runs Shannon Information Entropy H(X), regex plot/house identifier checks, and pincode/phone RTO velocity; routes Risk Score > 75 to a ₹49 refundable UPI booking token.",
      "Stage 2 — 150m PostGIS Geofence & GPS Drift Compensation: Evaluates rider proximity via ST_DistanceSphere & Haversine while subtracting urban-canyon accuracy radius (max(0, Distance - AccuracyRadius)).",
      "180-Second Dwell-Time Validation: Enforces a mandatory 3-minute doorstep dwell timer inside the delivery fence before permitting 'Customer Refused' failure flags.",
      "Automated IVR Flash-Call Telemetry: Cross-validates 'Phone Unreachable' rider claims via live carrier flash-call pings, auto-rejecting fake attempts on RINGING / ANSWERED status."
    ],
    github: "https://github.com/Atulkumar5772/DeliveryFence"
  },
  {
    id: "image-search-engine",
    title: "Image Search Engine",
    category: "Frontend & API Engine",
    poster: "./assets/thumbnails/project-3-1.jpg",
    status: "VERIFIED_BUILD",
    statusLabel: "VERIFIED BUILD",
    oneLiner: "Fast image discovery app with Unsplash API search & 1-click instant download.",
    badge: "Unsplash REST API • ES6+ • Client Blob IO",
    tagline: "Fast Asynchronous Media Discovery Engine with HD Modal Preview & 1-Click Blob Downloads",
    domain: "Asynchronous Media Retrieval, RESTful API Integration, Blob Streams, Client-side File IO",
    description: "A fast, responsive image discovery engine interfacing directly with the Unsplash Developers REST API. Implements real-time asynchronous search queries, an interactive high-resolution lightbox inspection tile, and dynamic client-side Blob generation for 1-click zero-latency asset downloads.",
    metrics: [
      { label: "Query Latency", value: "< 200 ms" },
      { label: "Asset Retrieval", value: "Direct Blob" },
      { label: "Architecture", value: "Vanilla ES6+" },
      { label: "Responsiveness", value: "100% Fluid" }
    ],
    tech: ["JavaScript (ES6+)", "RESTful Unsplash API", "HTML5 & CSS3 Glassmorphism", "Blob & Object URL API", "Git & GitHub Pages"],
    highlights: [
      "Real-Time Asynchronous Fetch Pipeline: Non-blocking parallel queries streaming Unsplash digital photography with seamless error boundaries.",
      "1-Click Client-Side Blob Download: Generates dynamic binary Blobs and Object URLs for direct local asset retrieval without server proxying.",
      "Interactive HD Lightbox Modal: High-resolution viewport inspection tile featuring photographer telemetry, attribution, and responsive controls.",
      "Decoupled Security Layer: Isolated credential management separating environment keys from public source control."
    ],
    liveUrl: "https://atulkumar5772.github.io/Image-Search-App/",
    github: "https://github.com/Atulkumar5772/Image-Search-App"
  }
];

export const TECHNICAL_SKILLS = [
  {
    category: "Languages",
    skills: ["C", "C++ (C++17)", "Java (17+)", "JavaScript (ES6+)", "SQL", "Bash Scripting"]
  },
  {
    category: "Systems & Security",
    skills: ["Linux Administration (RHEL/Fedora)", "POSIX APIs", "systemd", "inotify Subsystem", "OpenSSL EVP", "SUID/SGID & ACLs", "WebCrypto AES-GCM"]
  },
  {
    category: "Backend & Concurrency",
    skills: ["Spring Boot 3", "Hibernate/JPA", "RESTful APIs", "Microservices Architecture", "Node.js / Express", "Pessimistic Locking (SKIP LOCKED)"]
  },
  {
    category: "Databases & Storage",
    skills: ["MySQL 8.0 (InnoDB Internals)", "PostgreSQL + PostGIS (R-Tree)", "MVCC", "LVM & Swap Management", "Ephemeral Memory Stores"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Git & GitHub", "Docker", "GNU Make", "GDB Debugger", "VS Code", "Maven", "RPM / DNF"]
  }
];

export const EXPERIENCES = [
  {
    role: "Linux Administration Intern",
    company: "Red Hat (R-CAT)",
    badge: "ENTERPRISE SYSTEMS",
    location: "Jaipur, India",
    period: "Aug 2026 – Sep 2026",
    accentColor: "#EF4444",
    points: [
      "Hardened production Linux security environments: configured SUID/SGID permissions, POSIX ACLs, and restrictive sudoers privilege policies.",
      "Administered system storage utilizing Logical Volume Management (LVM) and swap allocation; handled software deployment via RPM, DNF, and Flatpak.",
      "Automated background disaster recovery workflows with native systemd services and Cron; enforced strict SSH key-based authentication."
    ]
  },
  {
    role: "Web Development Intern",
    company: "White Box Media and Tech Solutions",
    badge: "FULL-STACK INTERFACE",
    location: "Jaipur, India",
    period: "Jun 2025 – Aug 2025",
    accentColor: "#38BDF8",
    points: [
      "Engineered responsive, cross-browser web interfaces with optimized component hierarchies and rendering speed using modern JavaScript.",
      "Streamlined frontend debugging workflows, implemented client-side form validations, and conducted cross-device usability testing."
    ]
  }
];

export const HONORS = [
  {
    title: "Smart India Hackathon (SIH 2026) — Hardware",
    badge: "NATIONAL HACKATHON",
    event: "Ministry of Education & AICTE",
    domain: "IoT Telemetry & Embedded Sensor Architecture",
    description: "Engineered 'BD3' (Autonomous Breath Drug Detection Device) under Problem Statement 26230 with real-time sensor telemetry and cloud orchestration."
  },
  {
    title: "Smart India Hackathon (SIH 2026) — Software",
    badge: "NATIONAL HACKATHON",
    event: "Ministry of Education & AICTE",
    domain: "Automated Enterprise Standards Engine",
    description: "Co-engineered 'ManakAI' (Automated BIS Standards Compliance Verification Engine) for high-throughput rule processing and automated validation."
  },
  {
    title: "HackIndia Spark-12 Hackathon",
    badge: "TEAM SWASTIK",
    event: "HackIndia 2026 • PIET North India Region",
    domain: "Web3, Decentralized Tech & Innovation",
    description: "Competed as Team Swastik in India's premier regional hackathon, developing an impactful innovation prototype presented to national jury panels."
  },
  {
    title: "InsightX Machine Learning Challenge",
    badge: "RMSE 181.54 • LEADERBOARD",
    event: "ACM Student Chapter, LNMIIT Jaipur (Jan 2026)",
    domain: "Predictive ML & Real-World Problem Solving",
    description: "Achieved a competitive 181.54 Best RMSE benchmark with Team Swastik on the real-world predictive ML leaderboard hosted by ACM LNMIIT."
  }
];

export const CERTIFICATIONS = [
  { name: "Oracle Certified Foundations Associate", field: "Agentic AI & Autonomous Agent Workflows", badge: "ORACLE" },
  { name: "Salesforce Agentblazer Champion", field: "Agentforce, Prompt Builder & CRM Automation", badge: "SALESFORCE" },
  { name: "NPTEL (IIT Madras)", field: "German-I Professional Language & Communication", badge: "IIT MADRAS" },
  { name: "Deloitte Australia (Forage)", field: "Data Analytics Job Simulation & Dashboarding", badge: "DELOITTE" }
];
