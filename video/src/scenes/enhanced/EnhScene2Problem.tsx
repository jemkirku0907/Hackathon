import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const mainSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Floating animations for background question pills (inspired by user uploaded image 2)
  const floatPill1 = Math.sin(frame / 14) * 8;
  const floatPill2 = Math.cos(frame / 16) * 10;
  const floatPill3 = Math.sin((frame + 30) / 15) * 9;

  // Staggered reveals
  const post1Scale = spring({ frame: frame - 10, fps, config: { damping: 13, mass: 0.8 } });
  const pill1Scale = spring({ frame: frame - 35, fps, config: { damping: 12, mass: 0.8 } });
  const pill2Scale = spring({ frame: frame - 60, fps, config: { damping: 12, mass: 0.8 } });
  const pill3Scale = spring({ frame: frame - 85, fps, config: { damping: 12, mass: 0.8 } });

  // Subtle slow pan / drift
  const driftY = interpolate(frame, [0, 210], [0, -40], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor="#475569" secondaryColor={BRAND_COLORS.red} />

      {/* Top Problem Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(236, 32, 43, 0.25)',
          border: `2px solid ${BRAND_COLORS.red}`,
          color: '#FCA5A5',
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 20,
        }}
      >
        <span>⚠️</span> THE STUDENT DILEMMA
      </div>

      {/* Container with Floating Problem Cards (Inspired by Reference Style & User Uploads) */}
      <div
        style={{
          position: 'relative',
          width: 980,
          height: 1040,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${mainSpring}) translateY(${driftY}px)`,
          marginTop: -60,
        }}
      >
        {/* Floating Question Pill 1 (Top Left) */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            transform: `scale(${pill1Scale}) translateY(${floatPill1}px)`,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid rgba(236, 32, 43, 0.4)',
            borderRadius: 20,
            padding: '14px 22px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 10,
            maxWidth: 420,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>
              • Anonymous Heron
            </span>
            <span style={{ fontSize: 12, color: '#64748B' }}>5h ago</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
            &ldquo;Saan po located yung CIT office sa Admin Building? Malapit na exam namin...&rdquo;
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#DC2626', fontWeight: 800 }}>
            <span>💬</span> 0 comments • Unanswered
          </div>
        </div>

        {/* Floating Question Pill 2 (Top Right) */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 20,
            transform: `scale(${pill2Scale}) translateY(${floatPill2}px)`,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid rgba(236, 32, 43, 0.4)',
            borderRadius: 20,
            padding: '14px 22px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 10,
            maxWidth: 400,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>
              • CCIS Sophomore
            </span>
            <span style={{ fontSize: 12, color: '#64748B' }}>1d ago</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
            &ldquo;May nakakaalam po ba kung ano yung retention rules sa Computer Science?&rdquo;
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#DC2626', fontWeight: 800 }}>
            <span>💬</span> 0 comments • Waiting...
          </div>
        </div>

        {/* Main Center Facebook Post Card (Actual User Upload Image 1 / Replica UI) */}
        <div
          style={{
            width: 780,
            transform: `scale(${post1Scale})`,
            backgroundColor: '#1E293B',
            borderRadius: 28,
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(236, 32, 43, 0.2)',
            zIndex: 15,
            marginTop: 80,
          }}
        >
          {/* Post Header */}
          <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: '#FDE047',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              🐥
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>Keli</span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: 13, padding: '2px 8px', borderRadius: 6 }}>
                  UMak Student Community
                </span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 4 }}>
                1d • 👥 Public Group
              </div>
            </div>
            <span style={{ color: '#94A3B8', fontSize: 28 }}>•••</span>
          </div>

          {/* Post Content */}
          <div style={{ padding: '0 28px 24px', color: '#F1F5F9', fontSize: 22, lineHeight: 1.5, fontWeight: 500 }}>
            &ldquo;sa mga makati residents here, madami po bang benefits ang mga student? I&apos;m planning to transfer my address to makati sana para if may educational assistance and scholarship for makati res...&rdquo;
          </div>

          {/* Post Footer with 0 Comments */}
          <div
            style={{
              padding: '18px 28px',
              backgroundColor: '#0F172A',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 18 }}>
                <span>👍</span> 1
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(236, 32, 43, 0.2)',
                  border: '1.5px solid #EF4444',
                  color: '#FCA5A5',
                  padding: '4px 14px',
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                <span>💬</span> 0 comments
              </div>
            </div>
            <div style={{ color: '#EF4444', fontSize: 16, fontWeight: 800 }}>
              ⏳ Still waiting for answers...
            </div>
          </div>
        </div>

        {/* Floating Question Pill 3 (Bottom Left) */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            transform: `scale(${pill3Scale}) translateY(${floatPill3}px)`,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid rgba(236, 32, 43, 0.4)',
            borderRadius: 20,
            padding: '14px 22px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
            zIndex: 10,
            maxWidth: 440,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>
              • Freshmen Group
            </span>
            <span style={{ fontSize: 12, color: '#64748B' }}>Yesterday</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
            &ldquo;Saan po ba kukunin yung Certificate of Registration (COR)?&rdquo;
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#DC2626', fontWeight: 800 }}>
            <span>💬</span> 0 comments • No response
          </div>
        </div>

        {/* Big Bold Headline Callout (Direct User Requirement) */}
        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
            zIndex: 20,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 42,
              fontWeight: 900,
              color: '#FFFFFF',
              textShadow: '0 6px 30px rgba(0, 0, 0, 0.9)',
              letterSpacing: '-1px',
            }}
          >
            May tanong ka. Pero minsan, <span style={{ color: BRAND_COLORS.yellow }}>walang sumasagot.</span>
          </h2>
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 22,
              fontWeight: 600,
              color: '#CBD5E1',
            }}
          >
            Hours of waiting in Facebook groups and threads with zero replies.
          </p>
        </div>
      </div>

      <SubtitleOverlay
        badge="The Student Problem"
        text="Ever asked a question in a student group, only to wait hours with zero replies? May tanong ka, pero minsan, walang sumasagot."
        accentColor={BRAND_COLORS.red}
      />
    </div>
  );
};
