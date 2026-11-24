import React, { useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import LiquidPreloader from './components/LiquidPreloader';
import { SparkCursor } from './components/SparkCursor';
import GlassShardHero from './components/GlassShardHero';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactFooter from './components/ContactFooter';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  return (
    <div className="relative isolate min-h-screen text-gray-100 flex flex-col font-sans selection:bg-[#a31515] selection:text-white bg-[#07070a]">
      {/* 3D WebGL Red Starfield with forward scroll travel and click shockwaves */}
      <ParticleField />

      {/* Ambient colour behind the glass: red glow orbs (Exact template) */}
      <div className="ambient" aria-hidden="true">
        <i className="o1" />
        <i className="o3" />
      </div>

      {/* Interactive Spark Lightning Cursor (Mouse electric sparks & branches) */}
      <SparkCursor />

      {/* Liquid Fill Cyber Preloader with Waves & Percentage (0% to 100%) */}
      {loading && <LiquidPreloader onComplete={handlePreloaderComplete} />}

      {/* Top Navbar */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* 3D Glass Shard Hero Section with Interactive Physics & Cracking Shards (No remount flicker) */}
      <GlassShardHero />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full block">
        <AboutSection onOpenResume={() => setResumeModalOpen(true)} />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
      </main>

      {/* Contact & Footer */}
      <ContactFooter />

      {/* Interactive Official Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}