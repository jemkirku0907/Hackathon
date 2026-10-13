import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Staggered reveals of floating cards
  const postScale = spring({ frame: frame - 10, fps, config: { damping: 13, mass: 0.8 } });
  const pill1Scale = spring({ frame: frame - 30, fps, config: { damping: 12, mass: 0.8 } });
  const pill2Scale = spring({ frame: frame - 55, fps, config: { damping: 12, mass: 0.8 } });

  const floatPill1 = Math.sin(frame / 14) * 8;
  const floatPill2 = Math.cos(frame / 16) * 10;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Vignette with subtle red alert tone */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, #1E293B 0%, #090E1A 90%)',
        }}
      />

      {/* Floating Desktop Window */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transform: `scale(${windowScale})`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Window Bar */}
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
          <span style={{ marginLeft: 20, color: '#94A3B8', fontSize: 14, fontFamily: 'monospace' }}>
            facebook.com • UMak Student Community Group
          </span>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: 40,
          }}
        >
          {/* Main Unanswered Post (Keli's Post replica from user uploaded image) */}
          <div
            style={{
              width: 760,
              transform: `scale(${postScale})`,
              backgroundColor: '#1E293B',
              borderRadius: 24,
              border: '2px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            {/* Post Header */}
            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: '#FDE047',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                }}
              >
                🐥
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 800 }}>Keli</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>1d • 👥 UMak Student Community</div>
              </div>
              <span style={{ color: '#94A3B8', fontSize: 24 }}>•••</span>
            </div>

            {/* Post Text */}
            <div style={{ padding: '0 24px 20px', color: '#F1F5F9', fontSize: 20, lineHeight: 1.5, fontWeight: 500 }}>
              &ldquo;sa mga makati residents here, madami po bang benefits ang mga student? I&apos;m planning to transfer my address to makati sana para if may educational assistance and scholarship for makati res...&rdquo;
            </div>

            {/* Post Footer with 0 comments */}
            <div
              style={{
                padding: '16px 24px',
                backgroundColor: '#0F172A',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ color: '#94A3B8', fontSize: 16 }}>👍 1</span>
                <span
                  style={{
                    backgroundColor: 'rgba(236, 32, 43, 0.2)',
                    border: '1.5px solid #EF4444',
                    color: '#FCA5A5',
                    padding: '4px 12px',
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  💬 0 comments
                </span>
              </div>
              <div style={{ color: '#EF4444', fontSize: 15, fontWeight: 800 }}>
                ⏳ Waiting hours for answers...
              </div>
            </div>
          </div>

          {/* Floating Card 1 (Right) */}
          <div
            style={{
              position: 'absolute',
              right: 60,
              top: 100,
              width: 340,
              transform: `scale(${pill1Scale}) translateY(${floatPill1}px)`,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 20,
              padding: '18px 22px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(236, 32, 43, 0.4)',
              zIndex: 15,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#DC2626', marginBottom: 4 }}>
              • ANONYMOUS STUDENT
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
              &ldquo;Saan po located yung CIT office sa Admin Building? Malapit na exam...&rdquo;
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: '#DC2626', fontWeight: 800 }}>
              💬 0 comments • No replies
            </div>
          </div>

          {/* Floating Card 2 (Left) */}
          <div
            style={{
              position: 'absolute',
              left: 60,
              bottom: 80,
              width: 340,
              transform: `scale(${pill2Scale}) translateY(${floatPill2}px)`,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 20,
              padding: '18px 22px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(236, 32, 43, 0.4)',
              zIndex: 15,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#DC2626', marginBottom: 4 }}>
              • CCIS FRESHMAN
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
              &ldquo;May nakakaalam po ba kung paano mag-check ng retention rules?&rdquo;
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: '#DC2626', fontWeight: 800 }}>
              💬 0 comments • Still waiting
            </div>
          </div>
        </div>
      </div>

      {/* Caption Card */}
      <RefStyleCaption
        title="May tanong ka. Pero minsan, walang sumasagot."
        subtitle="Hours of waiting in Facebook groups and group chats with zero replies."
      />
    </div>
  );
};
