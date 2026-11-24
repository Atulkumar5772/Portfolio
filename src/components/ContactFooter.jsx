import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MessageCircle, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { VenomButton } from './VenomButton';
import { PERSONAL_INFO } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const CURRENT_YEAR = new Date().getFullYear();

// Strict validation helper for Email & WhatsApp Number
function evaluateContact(val) {
  const trimmed = val.trim();
  if (!trimmed) return { type: 'empty', valid: false, message: '' };

  if (trimmed.includes('@')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValid = emailRegex.test(trimmed);
    return {
      type: 'email',
      valid: isValid,
      message: isValid
        ? 'Valid Email (Will open Gmail Web Compose)'
        : 'Incomplete email (e.g. name@domain.com)',
    };
  }

  const digits = trimmed.replace(/\D/g, '');
  if (digits.length > 0) {
    const isValid = digits.length >= 10 && digits.length <= 15;
    let msg = '';
    if (digits.length < 10) {
      msg = `WhatsApp number must have at least 10 digits (${digits.length}/10 entered)`;
    } else if (digits.length > 15) {
      msg = 'Phone number too long (max 15 digits)';
    } else {
      msg = `Valid WhatsApp Number (${digits.length} digits - Will open WhatsApp Chat)`;
    }
    return {
      type: 'phone',
      valid: isValid,
      digits,
      message: msg,
    };
  }

  return {
    type: 'invalid',
    valid: false,
    message: 'Please enter a valid email or 10-digit WhatsApp number',
  };
}

export default function ContactFooter({ theme = 'dark' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [touchedContact, setTouchedContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactEval = useMemo(() => evaluateContact(formData.contact), [formData.contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouchedContact(true);

    if (!contactEval.valid) {
      setSubmitError(contactEval.message || 'Please provide a valid email or 10-digit phone number.');
      return;
    }
    setSubmitError('');

    const contactInput = formData.contact.trim();
    const name = formData.name.trim();
    const message = formData.message.trim();

    if (contactEval.type === 'email') {
      // Direct Gmail Web Compose (opens directly in browser tab, zero desktop outbox app)
      const subject = encodeURIComponent(`Engineering Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Atul,\n\nName: ${name}\nEmail: ${contactInput}\n\nMessage:\n${message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else if (contactEval.type === 'phone') {
      // Direct WhatsApp Chat with Atul (opens WhatsApp app/web directly)
      const text = encodeURIComponent(
        `Hi Atul, I visited your engineering portfolio.\n\n*Name:* ${name}\n*Contact:* ${contactInput}\n\n*Message:*\n${message}`
      );
      const whatsappUrl = `https://wa.me/919460175484?text=${text}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', message: '' });
      setTouchedContact(false);
    }, 4500);
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative w-full text-gray-100 py-28 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
      >
        {/* Section Title */}
        <div ref={titleRef} className="flex flex-col items-center text-center mb-14 z-10">
          <span className="text-[#FF2A3B] font-bold uppercase text-xs sm:text-sm tracking-[0.25em] mb-2 font-mono">
            GET IN TOUCH
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white font-['Syne',sans-serif]">
            CONTACT.
          </h2>
          <div className="w-20 h-1.5 bg-[#FF1E38] mt-3 rounded-full" />
          <p className="text-gray-400 text-xs sm:text-sm md:text-base font-normal tracking-wide mt-4 max-w-lg">
            Have a project, systems role, or engineering challenge in mind? Drop your details below.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="relative w-full max-w-3xl z-10">
          <div className="red-halo" style={{ inset: '-16% -10%' }} aria-hidden="true" />

          <div
            ref={cardRef}
            className="glass glass-panel-card w-full p-8 md:p-14 rounded-3xl relative z-10 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2 font-['Syne',sans-serif]">
                  Message Dispatched!
                </h3>
                <p className="text-sm sm:text-base text-gray-300 font-medium max-w-md">
                  {contactEval.type === 'email'
                    ? "Gmail compose window has been opened with your inquiry pre-filled."
                    : "WhatsApp chat has been opened with your inquiry pre-filled."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Field 1: Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name-input" className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 font-mono">
                    Your Name
                  </label>
                  <input
                    id="name-input"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Atul Kumar"
                    className="w-full px-5 py-4 glass-input rounded-2xl text-base md:text-lg font-medium text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Field 2: Email or WhatsApp Number */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contact-input" className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 font-mono">
                      Your Email or WhatsApp Number
                    </label>

                    {/* Live Validation Indicator Pill */}
                    {formData.contact.trim().length > 0 && (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider">
                        {contactEval.valid ? (
                          contactEval.type === 'email' ? (
                            <span className="text-red-400 flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" /> Via Gmail
                            </span>
                          ) : (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <MessageCircle className="w-3.5 h-3.5" /> Via WhatsApp
                            </span>
                          )
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Check format
                          </span>
                        )}
                      </span>
                    )}
                  </div>

                  <input
                    id="contact-input"
                    required
                    type="text"
                    value={formData.contact}
                    onBlur={() => setTouchedContact(true)}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, contact: e.target.value }));
                      if (submitError) setSubmitError('');
                    }}
                    placeholder="atulkumar181005@gmail.com OR +91 9460175484"
                    className={`w-full px-5 py-4 glass-input rounded-2xl text-base md:text-lg font-medium text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all ${
                      touchedContact && formData.contact.trim() && !contactEval.valid
                        ? 'border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                        : contactEval.valid
                        ? 'border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : ''
                    }`}
                  />

                  {/* Contextual / Error messaging */}
                  {touchedContact && formData.contact.trim() && !contactEval.valid ? (
                    <span className="text-[11px] text-red-400 font-mono flex items-center gap-1 animate-fadeIn">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {contactEval.message}
                    </span>
                  ) : contactEval.valid ? (
                    <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      {contactEval.message}
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-400 font-mono">
                      Type your email to open directly in Gmail Web, or a 10-digit phone number for instant WhatsApp chat.
                    </span>
                  )}

                  {submitError && (
                    <span className="text-xs text-red-400 font-mono font-bold mt-1">
                      ⚠️ {submitError}
                    </span>
                  )}
                </div>

                {/* Field 3: Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message-input" className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 font-mono">
                    Message &amp; Project Scope
                  </label>
                  <textarea
                    id="message-input"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your team, tech stack, or engineering project..."
                    className="w-full px-5 py-4 glass-input rounded-2xl text-base md:text-lg font-medium text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Action: Centered Blood Red Venom Button */}
                <div className="flex flex-col items-center justify-center pt-3 gap-4">
                  <VenomButton
                    variant="red"
                    type="submit"
                    ariaLabel="Connect with Atul Kumar"
                  >
                    CONNECT
                  </VenomButton>

                  {/* Direct 1-Click Copy Email Pill */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5 w-full">
                    <span className="text-xs text-gray-400 font-mono">Or direct:</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="glass-chip px-3.5 py-1.5 rounded-full text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-1.5 hover:border-red-500/40 cursor-pointer"
                      title="Copy Atul's Email Address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                      <span className={copied ? "text-emerald-400 font-bold" : ""}>
                        {copied ? "Copied to Clipboard!" : PERSONAL_INFO.email}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Global Template-Grade Footer Bar */}
      <footer className="glass-bar w-full text-white py-14 px-6 md:px-16 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <a href="#home" className="text-2xl font-black tracking-tight uppercase flex items-center font-['Syne',sans-serif]">
              <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">A</span>
              <span>TUL.</span>
            </a>
            <p className="text-[11px] text-gray-400 font-mono tracking-widest uppercase">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Social Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all hover:scale-105"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all hover:scale-105"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all hover:scale-105"
            >
              LeetCode
            </a>
          </div>

          {/* Navigation Links & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-400 uppercase tracking-widest font-bold">
              <a href="#about" className="hover:text-red-500 transition-colors">About</a>
              <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
              <a href="#experience" className="hover:text-red-500 transition-colors">Experience</a>
              <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
            </div>
            <div className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
              &copy; {CURRENT_YEAR} Atul Kumar. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}