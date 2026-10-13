import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../components/BackgroundGlow';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { BRAND_COLORS } from '../types';

export const Scene4VerifiedSources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  // Camera zoom into citation pill during frames 140 - 280
  const citationZoom = interpolate(frame, [140, 220], [1, 1.25], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [140, 220], [0, -100], { extrapolateRight: 'clamp' });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.cyan} secondaryColor={BRAND_COLORS.blue} />

      {/* Top Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(33, 173, 227, 0.25)',
          border: `2px solid ${BRAND_COLORS.cyan}`,
          color: BRAND_COLORS.cyan,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span>📖</span> SOURCE VERIFIED RAG
      </div>

      {/* Dialogue Showcase */}
      <div
        style={{
          width: 960,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          transform: `scale(${entrance * citationZoom}) translateY(${translateY}px)`,
          marginTop: -60,
        }}
      >
        {/* User Message Bubble */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div
            style={{
              backgroundColor: BRAND_COLORS.blue,
              color: '#FFFFFF',
              borderRadius: '28px 28px 4px 28px',
              padding: '24px 32px',
              fontSize: 26,
              fontWeight: 600,
              maxWidth: 760,
              boxShadow: '0 10px 40px rgba(63, 86, 202, 0.4)',
            }}
          >
            Where is the Center for Information Technology (CIT) located?
          </div>
        </div>

        {/* Assistant Response Bubble */}
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Avatar */}
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              backgroundColor: '#1E293B',
              border: `2px solid ${BRAND_COLORS.blue}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('taga-bird.png')}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#111827',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px 28px 28px 28px',
              padding: '30px 36px',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Verification Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1.5px solid #22C55E',
                color: '#4ADE80',
                padding: '6px 16px',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              <span>✓</span> Strictly Grounded &amp; Verified
            </div>

            {/* Answer text */}
            <p
              style={{
                margin: 0,
                color: '#F8FAFC',
                fontSize: 28,
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              The <strong>Center for Information Technology (CIT)</strong> is located in the{' '}
              <strong style={{ color: BRAND_COLORS.yellow }}>Admin Building</strong>, on the{' '}
              <strong style={{ color: BRAND_COLORS.cyan }}>Second Floor</strong>,{' '}
              <strong>South Wing</strong>.
            </p>

            {/* Citation Box (With Pulse emphasis) */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <span
                style={{
                  color: '#94A3B8',
                  fontSize: 16,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Official PDF Citation:
              </span>

              <div
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: frame > 140 ? 'rgba(33, 173, 227, 0.3)' : 'rgba(33, 173, 227, 0.15)',
                  border: `2px solid ${BRAND_COLORS.cyan}`,
                  borderRadius: 16,
                  padding: '12px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: frame > 140 ? `0 0 30px ${BRAND_COLORS.cyan}80` : 'none',
                }}
              >
                <span style={{ fontSize: 24 }}>📄</span>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: '-0.3px',
                  }}
                >
                  Source03.pdf • Page 1
                </span>
                <span
                  style={{
                    backgroundColor: BRAND_COLORS.cyan,
                    color: '#090E1A',
                    fontSize: 14,
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 6,
                    marginLeft: 6,
                  }}
                >
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubtitleOverlay
        badge="Zero Hallucinations"
        text="Need to know where the CIT office is located? Every answer is strictly grounded in official university documents, complete with verifiable page citations."
        accentColor={BRAND_COLORS.cyan}
      />
    </div>
  );
};
