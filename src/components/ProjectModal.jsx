import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose, onNavigate }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto flex justify-center items-start pt-20 sm:pt-24 pb-8 px-3 sm:px-6 animate-fade-in">
      {/* Dark blur backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="glass glass-panel relative z-10 flex w-full max-w-4xl max-h-[calc(100vh-6.5rem)] flex-col overflow-hidden rounded-3xl border border-red-500/40 bg-[#140810]/98 shadow-2xl shadow-red-950/80 my-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#d81e2f] rounded-full border border-red-400/30">
              {project.category}
            </span>
            <h3 className="truncate text-base sm:text-lg font-black text-white font-['Syne']">
              {project.title}
            </h3>
            {project.status === 'IN_PROGRESS' ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold tracking-wide">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                ACTIVE BUILD • IN PROGRESS
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                VERIFIED BUILD
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Previous project"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 hover:text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Next project"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 hover:text-white transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-white/5 hover:bg-red-600/70 border border-white/10 text-gray-200 hover:text-white transition-all ml-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Project Title & Tagline Banner (Cleanly above image, no overlap) */}
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#FF3850] uppercase tracking-wider block">
              {project.domain || project.category}
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white font-['Syne'] leading-snug">
              {project.tagline || project.subtitle}
            </h4>
          </div>

          {project.status === 'IN_PROGRESS' && (
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
              <span><strong>ACTIVE BUILD / IN PROGRESS:</strong> This architecture is actively under development & local benchmarking.</span>
            </div>
          )}

          {/* Dedicated Media Showcase Container (No text overlay - 100% clean image visibility) */}
          <div className="relative w-full rounded-2xl bg-black/60 border border-white/10 p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-2xl">
            <img
              key={project.id}
              src={project.poster || './assets/thumbnails/project-1-1.jpg'}
              alt={`${project.title} Architecture Preview`}
              className="max-h-[360px] sm:max-h-[440px] w-auto max-w-full object-contain rounded-xl shadow-lg transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Live Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-black/50 border border-red-500/25 text-center">
                  <span className="block text-xl font-black text-[#FF3850]">{m.value}</span>
                  <span className="text-[10px] text-slate-300 font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Overview & Architecture
            </h5>
            <p className="text-sm sm:text-base leading-relaxed text-gray-200">
              {project.description}
            </p>
          </div>

          {/* Core Engineering Highlights */}
          {project.highlights && (
            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Core Engineering Highlights
              </h5>
              <div className="space-y-2">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF1E38] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Tag Pills */}
          {project.tech && (
            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Engineered With
              </h5>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-mono text-gray-200 bg-white/5 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-3.5">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono font-bold text-white bg-red-600/80 hover:bg-red-600 border border-red-500/50 transition-all shadow-md"
              >
                <span>LIVE DEMO</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            <a
              href={project.github || 'https://github.com/Atulkumar5772'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all shadow-md"
            >
              <Github className="h-4 w-4" />
              <span>VIEW REPO</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all shadow-md ml-auto"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
