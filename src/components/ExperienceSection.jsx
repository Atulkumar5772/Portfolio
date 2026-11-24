import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Award, ShieldCheck, Calendar, MapPin, Trophy } from 'lucide-react';
import { EXPERIENCES, HONORS, CERTIFICATIONS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection({ theme = 'dark' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(
          '.matrix-item',
          { y: 25, opacity: 0, x: -10 },
          { y: 0, opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.4)' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title matching Template Design */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#a31515] font-bold uppercase text-sm md:text-base tracking-[0.2em] mb-2 font-['Syne',sans-serif]">
          Track Record &amp; Milestones
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white font-['Syne',sans-serif]">
          EXPERIENCE.
        </h2>
        <div className="w-20 h-1.5 bg-[#a31515] mt-3 rounded-full" />
      </div>

      <div className="relative w-full max-w-6xl z-10 space-y-16">
        <div className="red-halo" aria-hidden="true" />

        {/* 1. PROFESSIONAL WORK & INTERNSHIPS */}
        <div className="grid-blur relative space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#a31515]" />
            <h3 className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-gray-400 font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#FF1E38]" />
              Industry Work &amp; Systems Internships
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="matrix-item glass glass-grid-card group p-6 md:p-8 rounded-3xl relative overflow-hidden transition-all cursor-default"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-[#a31515] transition-colors font-['Syne',sans-serif]">
                      {exp.role}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs md:text-sm text-gray-400 font-mono mt-1">
                      <span className="font-bold text-gray-200">{exp.company}</span>
                      <span className="text-red-500">•</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="glass-chip text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 text-gray-300 rounded-full flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF1E38]" />
                      {exp.period}
                    </span>
                    <span className="glass-chip text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 text-red-400 border border-red-500/30 rounded-full">
                      {exp.badge}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-5 border-t border-white/5 pt-4">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E38] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 2. COMPETITIVE HACKATHONS & INNOVATION CHALLENGES (4 Hackathons 2x2 Grid) */}
        <div className="grid-blur relative space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#a31515]" />
            <h3 className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-gray-400 font-bold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Competitive Hackathons &amp; Technical Challenges
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {HONORS.map((item, idx) => (
              <div
                key={idx}
                className="matrix-item glass glass-grid-card group p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="glass-chip text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-lg md:text-xl font-black text-white group-hover:text-amber-400 transition-colors font-['Syne',sans-serif] mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm font-semibold text-gray-300 mt-1 font-mono">
                    {item.event}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="text-gray-300">{item.domain}</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. VERIFIED INDUSTRY CERTIFICATIONS */}
        <div className="grid-blur relative space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#a31515]" />
            <h3 className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-gray-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Industry Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="matrix-item glass glass-grid-card group p-5 rounded-2xl flex flex-col justify-between cursor-default transition-all"
              >
                <div>
                  <span className="glass-chip text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 text-emerald-400 border border-emerald-500/30 rounded-full inline-block mb-3">
                    {cert.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors font-['Syne',sans-serif] leading-snug">
                    {cert.name}
                  </h4>
                </div>
                <p className="text-[11px] text-gray-400 font-mono mt-3 line-clamp-2">
                  {cert.field}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
