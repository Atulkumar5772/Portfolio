import React, { useState } from 'react';
import {
  Terminal,
  BookOpen,
  CheckCircle2,
  Award,
  Cpu,
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
  RotateCw,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HangingPhoto } from './HangingPhoto';
import { VenomButton } from './VenomButton';

export default function AboutSection({ onOpenResume }) {
  const semesters = [
    { num: 4, sem: 'Sem 4', score: '9.00', color: 'text-indigo-400', border: 'border-indigo-500/40', badge: 'RECENT' },
    { num: 3, sem: 'Sem 3', score: '9.70', color: 'text-emerald-400', border: 'border-emerald-500/50', badge: '★ PEAK', highlight: true },
    { num: 2, sem: 'Sem 2', score: '8.83', color: 'text-sky-400', border: 'border-sky-500/40', badge: 'CORE' },
    { num: 1, sem: 'Sem 1', score: '8.39', color: 'text-indigo-400', border: 'border-indigo-500/40', badge: 'FOUNDATION' },
  ];

  const technologies = [
    'C++17', 'Rust', 'Linux Kernel', 'eBPF / inotify', 'Node.js',
    'PostgreSQL / PostGIS', 'MySQL InnoDB', 'Python', 'WebCrypto AES-256', 'Three.js / WebGL2'
  ];

  const areasOfFocus = [
    'Low-Level Systems & Daemons',
    'Applied Cryptography & Zero-Knowledge',
    'High-Concurrency Engines',
    'Geospatial Anti-Fraud Forensics'
  ];

  return (
    <section id="about" className="relative pt-16 pb-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      {/* Background Ambient Glows (subtle to prevent over-saturation) */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-red-600/5 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-60 right-10 w-[450px] h-[450px] rounded-full bg-rose-600/5 blur-[140px] pointer-events-none"></div>

      {/* Main About Row */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Heading, Bio, Technologies, Areas of Focus */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[#FF1E38] font-mono font-bold uppercase text-xs md:text-sm tracking-[0.2em] flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>// 01. CORE SYSTEMS ARCHITECTURE</span>
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight uppercase text-white font-['Syne']">
              ABOUT ME<span className="text-[#FF1E38]">.</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#FF1E38] rounded-full mt-1 shadow-lg shadow-red-500/50" />
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/20 shadow-2xl space-y-6">
            <div className="space-y-4 text-base md:text-lg text-slate-200 leading-relaxed font-sans">
              <p className="text-gray-100 font-medium">
                I am a Computer Science Engineering student and independent systems developer who engineers low-level, high-concurrency, and anti-fraud architectures.
              </p>
              <p className="text-sm md:text-base text-gray-300">
                Rather than standard template interfaces, my engineering focuses on core system primitives: Linux <code className="text-[#FF3850] font-mono">inotify</code> file integrity daemons, WebCrypto zero-knowledge secret vaults, deadlock-free row locking, and geospatial anti-fraud engines.
              </p>
            </div>

            {/* Technologies Pills */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#FF1E38]" />
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-200 bg-black/40 border border-white/10 rounded-full hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Areas of Focus */}
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF1E38]" />
                AREAS OF FOCUS
              </h3>
              <div className="flex flex-wrap gap-2">
                {areasOfFocus.map((f) => (
                  <span
                    key={f}
                    className="px-3.5 py-1.5 text-xs font-medium text-red-200 rounded-full border border-red-500/30 bg-[#a31515]/15"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <VenomButton variant="primary" onClick={onOpenResume} ariaLabel="View Full ATS Resume">
                VIEW FULL RESUME
              </VenomButton>
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-b from-white/[0.12] to-white/[0.04] backdrop-blur-xl border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_25px_-10px_rgba(0,0,0,0.8),0_0_20px_-5px_rgba(255,30,56,0.3)] hover:border-red-500/80 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_32px_-8px_rgba(255,30,56,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-['Syne',sans-serif]"
              >
                <span>EXPLORE PROJECTS</span>
                <span className="text-[#FF2A3B] transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Suspended Physics Photo Frame */}
        <div className="lg:col-span-5 flex justify-center relative lg:sticky lg:top-28">
          <div className="flex flex-col items-center pointer-events-auto">
            <HangingPhoto
              image="./media/profile.webp"
              name="ATUL KUMAR"
              caption="SYSTEMS & BACKEND ARCHITECT"
            />
          </div>
        </div>
      </div>

      {/* Academic Journey & Credentials Section (Modern Refined Obsidian Glass Bento) */}
      <div className="relative z-10 space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs px-1 border-t border-white/10 pt-10">
          <span className="font-bold tracking-wider uppercase text-red-400 flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-[#FF1E38]" />
            ACADEMIC JOURNEY & CREDENTIALS
          </span>
          <span className="text-[11px] text-gray-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            POORNIMA INSTITUTE OF ENG. & TECH. (PIET)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* B.Tech Degree Bento Card */}
          <div className="lg:col-span-7 glass rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-red-500/30 transition-all shadow-2xl flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-red-300 tracking-wider px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30">
                  03. UNDERGRADUATE DEGREE
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  CURRENT (2024–Present)
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-black text-white font-['Syne'] tracking-tight">
                B.Tech in Computer Science & Engineering
              </h4>
              <p className="text-sm text-gray-300 mt-1 font-sans">
                Poornima Institute of Engineering and Technology, Jaipur
              </p>
              <p className="text-xs text-red-300/80 font-mono mt-1">
                Specialization: Linux Kernel Subsystems, ACID Concurrency Control & Cryptography
              </p>
            </div>

            {/* Official Cumulative CGPA Block */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-red-950/30 via-black/40 to-black/60 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold block">
                  CUMULATIVE CGPA
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    8.98
                  </span>
                  <span className="text-sm font-mono text-red-300/70">/ 10.0</span>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  TOP 1% PERCENTILE
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Official Academic Baselines
                </span>
              </div>
            </div>

            {/* Semester-wise SGPA Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-1">
                <span>SEMESTER BREAKDOWN</span>
                <span className="text-red-400">ALL COMPLETED SEMESTERS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {semesters.map((s) => (
                  <div
                    key={s.num}
                    className={`p-3 rounded-xl bg-black/40 border transition-all ${
                      s.highlight
                        ? 'border-emerald-500/50 bg-emerald-950/15 shadow-lg shadow-emerald-950/40'
                        : 'border-white/10 hover:border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400">{s.sem}</span>
                      <span className={`text-[9px] font-mono font-bold ${s.highlight ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {s.badge}
                      </span>
                    </div>
                    <div className={`text-xl font-black font-mono mt-1 ${s.color}`}>
                      {s.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Senior Secondary & Secondary Education */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Class XII Card */}
            <div className="glass rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between flex-1 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/25">
                    02. SENIOR SECONDARY (CLASS XII)
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">2022–2023</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-sans pt-1">
                  RBSE — Science & Mathematics Stream
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  Physics, Chemistry, and Advanced Mathematics • Jaipur
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase">Class XII Board Score</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-sky-400">
                  77.80%
                </span>
              </div>
            </div>

            {/* Class X Card */}
            <div className="glass rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between flex-1 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25">
                    01. SECONDARY (CLASS X)
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">2020–2021</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-sans pt-1">
                  RBSE — General Secondary Education
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  Top Honors & Distinction in Mathematics & Physical Sciences
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase">Class X Board Score</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  95.00%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
