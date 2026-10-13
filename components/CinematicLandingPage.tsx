'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  MapPin, 
  Paperclip, 
  Lock, 
  Volume2, 
  VolumeX,
  FastForward,
  GraduationCap
} from 'lucide-react';

interface CinematicLandingPageProps {
  onEnterChat: () => void;
}

export function CinematicLandingPage({ onEnterChat }: CinematicLandingPageProps) {
  // Animation stages: 
  // 0 = Dark ambient backdrop fade-in (0ms)
  // 1 = Silhouette & Mascot scale reveal (500ms)
  // 2 = Logo wordmark impact + boom (1300ms)
  // 3 = Tagline & Feature grid reveal (2000ms)
  const [animationStage, setAnimationStage] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rememberPreference, setRememberPreference] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize cinematic boom effect via Web Audio API without needing external mp3 files
  const playCinematicBoom = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Sub-bass oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    } catch {
      // Audio autoplay policy blocked; fail gracefully
    }
  };

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationStage(3);
      return;
    }

    const t1 = setTimeout(() => setAnimationStage(1), 300);
    const t2 = setTimeout(() => {
      setAnimationStage(2);
      playCinematicBoom();
    }, 1100);
    const t3 = setTimeout(() => setAnimationStage(3), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [soundEnabled]);

  const handleEnter = () => {
    if (rememberPreference) {
      try {
        localStorage.setItem('taga_ask_skip_intro', 'true');
      } catch {
        // ignore
      }
    }
    setIsExiting(true);
    setTimeout(() => {
      onEnterChat();
    }, 450);
  };

  const handleSkip = () => {
    setAnimationStage(3);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#070B14] text-white transition-opacity duration-500 selection:bg-[#3F56CA] selection:text-white ${
        isExiting ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Ambient Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full blur-[140px] opacity-35 transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, #3F56CA 0%, rgba(33, 173, 227, 0.4) 50%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #D1CA25 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute top-1/2 -right-20 w-[550px] h-[550px] rounded-full blur-[130px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #EC202B 0%, transparent 70%)'
          }}
        />
        {/* Subtle Tech Grid Texture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      {/* Top Bar with Controls */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* University Crest */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 p-0.5 border border-white/20 backdrop-blur-md">
            <Image
              src="/umak-seal.png"
              alt="University of Makati"
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              University of Makati
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Official Institutional Assistant
            </span>
          </div>
        </div>

        {/* Top Right Accessibility / Skip Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSoundEnabled(prev => !prev)}
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            title={soundEnabled ? "Sound enabled" : "Sound muted"}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D1CA25]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {animationStage < 3 && (
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Skip Intro</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero Section & Cinematic Logo Reveal */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 flex flex-col items-center justify-center text-center my-auto">
        
        {/* Animated TAGAK Mascot Reveal */}
        <div className="relative mb-6">
          {/* Glowing Aura Ring */}
          <div 
            className={`absolute -inset-4 rounded-3xl blur-2xl transition-all duration-1000 ${
              animationStage >= 1 
                ? 'opacity-80 bg-gradient-to-r from-[#3F56CA] via-[#21ADE3] to-[#D1CA25]' 
                : 'opacity-0'
            }`}
          />

          {/* Mascot Container */}
          <div 
            className={`relative w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-[#0B132B]/90 border-2 border-[#21ADE3]/60 p-4 shadow-2xl flex items-center justify-center transition-all duration-700 ease-out ${
              animationStage >= 1 
                ? 'scale-100 opacity-100 translate-y-0 rotate-0' 
                : 'scale-75 opacity-0 translate-y-6 rotate-[-6deg]'
            }`}
          >
            <Image
              src="/taga-bird.png"
              alt="TAGA-asK AI Heron Mascot"
              width={120}
              height={120}
              priority
              className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Animated Wordmark: TAGA-asK AI */}
        <div 
          className={`transition-all duration-700 ease-out ${
            animationStage >= 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3F56CA]/20 border border-[#3F56CA]/40 text-[#21ADE3] text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D1CA25]" />
            <span>Official Campus Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
            TAGA-asK <span className="text-[#D1CA25] drop-shadow-[0_0_25px_rgba(209,202,37,0.5)]">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight mb-2">
            Your UMak AI Companion.
          </p>

          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Grounded strictly in University of Makati official knowledge sources. Zero hallucinations, verifiable citations, and real-time campus guidance.
          </p>
        </div>

        {/* Content & Action Reveal (Stage 3) */}
        <div 
          className={`w-full mt-8 transition-all duration-700 ease-out ${
            animationStage >= 3 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              type="button"
              onClick={handleEnter}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3F56CA] to-[#2B3C8E] hover:from-[#4D66DC] hover:to-[#384CB8] text-white font-bold text-base shadow-[0_0_35px_rgba(63,86,202,0.5)] hover:shadow-[0_0_50px_rgba(63,86,202,0.7)] transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer group border border-white/20"
            >
              <span>Enter TAGA-asK AI</span>
              <ArrowRight className="w-5 h-5 text-[#D1CA25] group-hover:translate-x-1 transition-transform" />
            </button>

            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none hover:text-slate-300">
              <input
                type="checkbox"
                checked={rememberPreference}
                onChange={(e) => setRememberPreference(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-[#3F56CA] focus:ring-0"
              />
              <span>Remember choice &amp; skip intro next time</span>
            </label>
          </div>

          {/* Core Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs hover:border-[#3F56CA]/50 transition">
              <div className="w-8 h-8 rounded-xl bg-[#3F56CA]/20 flex items-center justify-center text-[#3F56CA] mb-2.5">
                <BookOpen className="w-4 h-4 text-[#21ADE3]" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">Grounded RAG</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strictly cites Source01–Source04 with verifiable page references.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs hover:border-[#D1CA25]/50 transition">
              <div className="w-8 h-8 rounded-xl bg-[#D1CA25]/20 flex items-center justify-center text-[#D1CA25] mb-2.5">
                <Paperclip className="w-4 h-4 text-[#D1CA25]" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">File Uploads</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Attach images and PDF documents for multimodal analysis.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs hover:border-[#21ADE3]/50 transition">
              <div className="w-8 h-8 rounded-xl bg-[#21ADE3]/20 flex items-center justify-center text-[#21ADE3] mb-2.5">
                <MapPin className="w-4 h-4 text-[#21ADE3]" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">Campus Map</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive pin visualizer for Admin, HPSB, and academic buildings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xs hover:border-[#EC202B]/50 transition">
              <div className="w-8 h-8 rounded-xl bg-[#EC202B]/20 flex items-center justify-center text-[#EC202B] mb-2.5">
                <ShieldCheck className="w-4 h-4 text-[#EC202B]" />
              </div>
              <h3 className="font-bold text-sm text-white mb-1">UMak Security</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Institutional Google login with server-side rate limit protection.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-900 border border-white/20">
            <Image
              src="/doerrorin-logo.png"
              alt="DoError!n"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          </div>
          <span>Developed with pride by <strong className="font-semibold text-slate-300">DoError!n</strong></span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span>Infotech 2026 Hackathon</span>
          <span>•</span>
          <a 
            href="https://taga-askai.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#21ADE3] hover:underline"
          >
            taga-askai.vercel.app
          </a>
        </div>
      </footer>
    </div>
  );
}
