import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { FloatingParticles } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const EnhScene5WhyMatters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.9 },
  });

  const leftCardSpring = spring({ frame: frame - 10, fps, config: { damping: 12, mass: 0.8 } });
  const rightCardSpring = spring({ frame: frame - 30, fps, config: { damping: 12, mass: 0.8 } });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.yellow} />
      <FloatingParticles count={22} color={BRAND_COLORS.cyan} seed={9} />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(209, 202, 37, 0.25)',
          border: `2px solid ${BRAND_COLORS.yellow}`,
          color: BRAND_COLORS.yellow,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span>✨</span> WHY IT MATTERS
      </div>

      {/* Comparison Grid */}
      <div
        style={{
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          transform: `scale(${entrance})`,
          marginTop: -60,
        }}
      >
        <div style={{ display: 'flex', gap: 24, width: '100%' }}>
          {/* Left Card: The Old Way (Facebook Waiting) */}
          <div
            style={{
              flex: 1,
              transform: `scale(${leftCardSpring})`,
              backgroundColor: '#1E293B',
              borderRadius: 28,
              border: '2px solid rgba(236, 32, 43, 0.4)',
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
              minHeight: 460,
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(236, 32, 43, 0.2)',
                  border: '1.5px solid #EF4444',
                  color: '#FCA5A5',
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 800,
                  marginBottom: 18,
                }}
              >
                <span>✕</span> TRADITIONAL FORUMS
              </div>

              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, lineHeight: 1.4 }}>
                &ldquo;Saan po located yung CIT office sa Admin Building?&rdquo;
              </div>

              <div style={{ marginTop: 20, color: '#94A3B8', fontSize: 17 }}>
                Posted in student groups:
              </div>
              <ul style={{ margin: '10px 0 0', paddingLeft: 22, color: '#CBD5E1', fontSize: 17, lineHeight: 1.6 }}>
                <li>⏳ Hours waiting for replies</li>
                <li>❌ Unverified rumors &amp; guesses</li>
                <li>⚠️ Risk of missing deadlines</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(236, 32, 43, 0.15)',
                borderRadius: 16,
                padding: '12px 18px',
                textAlign: 'center',
                color: '#EF4444',
                fontWeight: 800,
                fontSize: 17,
              }}
            >
              💬 0 Comments • Still Waiting
            </div>
          </div>

          {/* Right Card: The TAGA-asK AI Way */}
          <div
            style={{
              flex: 1,
              transform: `scale(${rightCardSpring})`,
              backgroundColor: '#0F172A',
              borderRadius: 28,
              border: `2.5px solid ${BRAND_COLORS.cyan}`,
              padding: '28px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: `0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px ${BRAND_COLORS.cyan}40`,
              minHeight: 460,
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  border: '1.5px solid #22C55E',
                  color: '#4ADE80',
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 800,
                  marginBottom: 18,
                }}
              >
                <span>✓</span> TAGA-asK AI
              </div>

              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, lineHeight: 1.4 }}>
                Admin Building, 2nd Floor, South Wing.
              </div>

              <div style={{ marginTop: 20, color: '#94A3B8', fontSize: 17 }}>
                Powered by official RAG:
              </div>
              <ul style={{ margin: '10px 0 0', paddingLeft: 22, color: '#CBD5E1', fontSize: 17, lineHeight: 1.6 }}>
                <li>⚡ Instant response in &lt;1 second</li>
                <li>📄 Grounded in Source03.pdf • Page 1</li>
                <li>📍 Interactive map pin visualizer</li>
              </ul>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(33, 173, 227, 0.2)',
                borderRadius: 16,
                padding: '12px 18px',
                textAlign: 'center',
                color: BRAND_COLORS.cyan,
                fontWeight: 800,
                fontSize: 17,
              }}
            >
              🎯 100% Verified &amp; Grounded
            </div>
          </div>
        </div>

        {/* Big Impact Callout & Official Quote */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              margin: 0,
              fontSize: 46,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.9)',
            }}
          >
            Less waiting. <span style={{ color: BRAND_COLORS.yellow }}>Easier access to information.</span>
          </h2>
          <p
            style={{
              margin: '14px 0 0',
              fontSize: 28,
              fontWeight: 800,
              color: BRAND_COLORS.cyan,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            &ldquo;Every Tagak, just ask!&rdquo;
          </p>
        </div>
      </div>

      <SubtitleOverlay
        badge="Instant Intelligence"
        text="Less waiting, easier access to information. No more scrolling through unanswered forum posts."
        accentColor={BRAND_COLORS.cyan}
      />
    </div>
  );
};
