import React from 'react';
import { X, Download, ExternalLink, Printer, FileText, CheckCircle2, Award, Briefcase, GraduationCap, Mail, Phone, MapPin, Github, Linkedin, Code2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, TECHNICAL_SKILLS, HONORS, CERTIFICATIONS } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleOpenPdf = () => {
    window.open('./Atul_Kumar_Resume.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E0A14] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07050A] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-[#FF1E38] border border-red-500/25">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                ATUL_KUMAR_RESUME.PDF
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                ATS Score: 95+ Optimized • LaTeX Verified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Open PDF in new tab */}
            <button
              onClick={handleOpenPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 transition-all shadow-md shadow-red-600/30"
              title="Open Official PDF in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">OPEN OFFICIAL PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Direct Download */}
            <a
              href="./Atul_Kumar_Resume.pdf"
              download="Atul_Kumar_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Sheet Body (Formatted strictly like ATS-95+ LaTeX Resume) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-xs sm:text-sm leading-relaxed bg-[#050811]">
          {/* Header */}
          <div className="text-center pb-6 border-b border-white/10 space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-['Syne']">
              Atul Kumar
            </h1>
            <p className="text-xs sm:text-sm font-mono text-cyan-400">
              Systems & Backend Architect | Low-Latency Daemons & High-Concurrency Engines
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-400" /> Jaipur, India</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> +91 94601 75484</span>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 hover:underline">{PERSONAL_INFO.email}</a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-slate-400 pt-1">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 underline">LinkedIn</a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 underline">GitHub</a>
              <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noreferrer" className="hover:text-amber-400 underline">LeetCode</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase border-b border-white/10 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Computer Science undergraduate specializing in backend architecture, Linux systems programming, and autonomous software development. Demonstrated engineering background through production-grade implementations of an autonomous Drone Ground Control Station and a Linux kernel file integrity daemon. Awarded <strong className="text-white">Rank 9</strong> in national Smart India Hackathon (SIH 2026) alongside top-tier academic standing (<strong className="text-emerald-400">CGPA: 8.98 / 10.0</strong>). Focused on developing fault-tolerant backend services, kernel-level automation, and scalable software solutions.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase border-b border-white/10 pb-1">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
              <div>
                <h3 className="font-bold text-white text-sm">Poornima Institute of Engineering and Technology (PIET)</h3>
                <p className="text-slate-300 text-xs">B.Tech in Computer Science and Engineering <strong className="text-emerald-400">(CGPA: 8.98 / 10.0)</strong></p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">Semester SGPA: 4th: 9.00 | 3rd: 9.70 | 2nd: 8.83 | 1st: 8.39</p>
              </div>
              <div className="text-slate-400 text-xs font-mono sm:text-right shrink-0">
                Jaipur, Rajasthan<br />2024 – Present
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase border-b border-white/10 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
              <p><strong className="text-white font-mono">Languages:</strong> C, C++ (C++17), Java (17+), JavaScript (ES6+), SQL, Bash Scripting</p>
              <p><strong className="text-white font-mono">Backend & Frameworks:</strong> Spring Boot 3, Hibernate/JPA, RESTful APIs, Microservices Architecture, Node.js</p>
              <p><strong className="text-white font-mono">Systems & Security:</strong> Linux Administration, POSIX, Systemd, inotify API, OpenSSL (SHA-256), SUID/SGID, ACLs, WebCrypto</p>
              <p><strong className="text-white font-mono">Databases & Tools:</strong> MySQL 8.0 (InnoDB, SKIP LOCKED), PostgreSQL + PostGIS (R-Tree), Git, GitHub, VS Code, GDB, GNU Make, Docker, LVM</p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase border-b border-white/10 pb-1">
              WORK EXPERIENCE
            </h2>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                <div>
                  <h3 className="font-bold text-white text-sm">Linux Administration Intern — Red Hat (R-CAT)</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Aug 2026 – Sep 2026 | Jaipur, India</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs sm:text-sm">
                <li>Configured and hardened Linux security environments, implementing SUID/SGID permissions, POSIX ACLs, and restrictive sudoers privilege policies.</li>
                <li>Administered system storage utilizing Logical Volume Management (LVM) and swap allocation; handled software deployment via RPM, DNF, and Flatpak.</li>
                <li>Automated background routines and disaster recovery workflows with Systemd services and Cron; enforced strict SSH key-based authentication.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                <div>
                  <h3 className="font-bold text-white text-sm">Web Development Intern — White Box Media and Tech Solutions</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Jun 2025 – Aug 2025 | Jaipur, India</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs sm:text-sm">
                <li>Developed responsive, cross-browser web interfaces using HTML5, CSS3, and JavaScript, optimizing UI component hierarchies.</li>
                <li>Streamlined frontend debugging workflows, implemented client-side form validations, and conducted cross-device usability testing.</li>
              </ul>
            </div>
          </div>

          {/* Flagship Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase border-b border-white/10 pb-1">
              FLAGSHIP PROJECTS
            </h2>

            {PROJECTS.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                  <h3 className="font-bold text-white text-sm">
                    {proj.title}{' '}
                    {proj.status === 'IN_PROGRESS' && (
                      <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        IN PROGRESS
                      </span>
                    )}
                    <span className="font-normal text-xs text-slate-400">| {proj.tech.slice(0, 4).join(', ')}</span>
                  </h3>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#FF1E38] hover:underline">GitHub Repo</a>
                </div>
                <p className="text-slate-300 text-xs italic">{proj.tagline}</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                  {proj.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Honors & Hackathons */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#FF1E38] uppercase border-b border-white/10 pb-1">
              HONORS & HACKATHONS
            </h2>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
              {HONORS.map((item, idx) => (
                <li key={idx}>
                  <strong className="text-white">{item.title}:</strong> {item.event} — {item.description}
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase border-b border-white/10 pb-1">
              CERTIFICATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div>• <strong className="text-white">Oracle Certified:</strong> Agentic AI & Autonomous Agent Workflows</div>
              <div>• <strong className="text-white">Salesforce Agentblazer:</strong> Agentforce & CRM Automation</div>
              <div>• <strong className="text-white">NPTEL (IIT Madras):</strong> German-I Professional Language</div>
              <div>• <strong className="text-white">Deloitte Australia:</strong> Data Analytics Job Simulation</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#070A12] shrink-0 font-mono text-xs">
          <span className="text-slate-400">Jaipur, Rajasthan, India</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenPdf}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>OPEN OFFICIAL PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
