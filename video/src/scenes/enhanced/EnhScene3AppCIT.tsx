import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { FloatingParticles, FloatingDocCard, BrandMotionRings, LightSweep } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const EnhScene3AppCIT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Window entrance with 3D scale and depth
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Smooth camera zoom and pan towards the verified citation
  const zoom = interpolate(frame, [0, 160, 390], [1, 1.18, 1.28], { extrapolateRight: 'clamp' });
  const panY = interpolate(frame, [0, 160, 390], [0, -35, -55], { extrapolateRight: 'clamp' });

  // Floating question card that smoothly settles into chat
  const questionSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  // Floating citation badge emergence
  const citationPop = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '1080px',
        height: '1920px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.cyan} />
      <FloatingParticles count={22} color={BRAND_COLORS.cyan} seed={3} />
      <BrandMotionRings size={900} color={BRAND_COLORS.blue} accentColor={BRAND_COLORS.cyan} />

      {/* Floating Document Cards Surrounding the App (Reinforces Document Grounding) */}
      <FloatingDocCard
        title="Building Directory & Map"
        sourceCode="Source03.pdf"
        pages="Page 1 of 6"
        x={860}
        y={300}
        rotation={4}
        delay={25}
        scale={0.95}
      />

      <FloatingDocCard
        title="Admin & Academic Offices"
        sourceCode="Source04.pdf"
        pages="14 pages"
        x={230}
        y={1430}
        rotation={-4}
        delay={45}
        scale={0.92}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(33, 173, 227, 0.25)',
          border: `2px solid ${BRAND_COLORS.cyan}`,
          color: BRAND_COLORS.cyan,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 28px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 20,
          boxShadow: '0 0 25px rgba(33, 173, 227, 0.4)',
        }}
      >
        <span>⚡</span> REAL-TIME VERIFIED RAG
      </div>

      {/* Floating Question Pill Morphing into Chat Query */}
      {frame < 90 && (
        <div
          style={{
            position: 'absolute',
            top: 235,
            zIndex: 30,
            transform: `scale(${questionSpring}) translateY(${Math.sin(frame * 0.08) * 6}px)`,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: `2px solid ${BRAND_COLORS.yellow}`,
            borderRadius: 20,
            padding: '14px 26px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            maxWidth: 820,
          }}
        >
          <span style={{ fontSize: 24 }}>💬</span>
          <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}>
            &ldquo;Where is the CIT office located in the Admin Building?&rdquo;
          </span>
        </div>
      )}

      {/* Window Mockup with Real Dark Mode App Screenshot */}
      <div
        style={{
          position: 'relative',
          width: 980,
          borderRadius: 26,
          overflow: 'hidden',
          backgroundColor: '#090E1A',
          border: '2px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 35px 110px rgba(0, 0, 0, 0.85), 0 0 60px rgba(63, 86, 202, 0.4)',
          transform: `scale(${entrance * zoom}) translateY(${panY}px)`,
          marginTop: -20,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
        }}
      >
        {/* Browser Top Bar */}
        <div
          style={{
            height: 48,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 20, color: '#94A3B8', fontSize: 15, fontFamily: 'monospace' }}>
            🔒 https://taga-askai.vercel.app/
          </span>
        </div>

        {/* Real Dark Mode Screenshot */}
        <div style={{ position: 'relative', width: '100%', height: 740, overflow: 'hidden' }}>
          <Img
            src={staticFile('screenshots/dark_cit_answer.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
            }}
          />

          {/* Light Sweep over verified answer citation */}
          <LightSweep startFrame={130} duration={35} color="rgba(209, 202, 37, 0.45)" />

          {/* Emergent Floating Citation Highlight Card */}
          {frame > 120 && (
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                right: 30,
                transform: `scale(${citationPop})`,
                backgroundColor: 'rgba(15, 23, 42, 0.96)',
                border: `2px solid ${BRAND_COLORS.yellow}`,
                borderRadius: 16,
                padding: '12px 20px',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(209, 202, 37, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 22 }}>📌</span>
              <div>
                <div style={{ color: BRAND_COLORS.yellow, fontSize: 15, fontWeight: 900 }}>
                  EXACT SOURCE CITATION
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>
                  Source03.pdf • Page 1 • 2nd Floor, South Wing
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SubtitleOverlay
        badge="Direct Answer & Verified Citation"
        text="Enter TAGA-asK AI. Ask where the CIT office is located, and get an instant answer: Second Floor, South Wing, Admin Building, with verified page citations."
        accentColor={BRAND_COLORS.cyan}
      />
    </div>
  );
};
