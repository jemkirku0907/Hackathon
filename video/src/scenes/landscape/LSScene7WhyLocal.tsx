import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene7WhyLocal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: BRAND_COLORS.yellow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, #F5EC38 0%, #D1CA25 80%)',
        }}
      />

      {/* Why TAGA-asK AI Card (Directly mirroring the reference video's 'Why local?' card) */}
      <div
        style={{
          width: 1200,
          backgroundColor: '#0F172A',
          border: `2px solid ${BRAND_COLORS.blue}`,
          borderRadius: 28,
          padding: '48px 56px',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55)',
          transform: `scale(${entrance})`,
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
            }}
          >
            Why <span style={{ color: BRAND_COLORS.yellow }}>TAGA-asK AI?</span>
          </h2>
          <span
            style={{
              backgroundColor: 'rgba(63, 86, 202, 0.3)',
              border: `1.5px solid ${BRAND_COLORS.blue}`,
              color: BRAND_COLORS.cyan,
              fontSize: 16,
              fontWeight: 800,
              padding: '6px 18px',
              borderRadius: 999,
            }}
          >
            OFFICIAL CAPABILITIES
          </span>
        </div>

        {/* 4 Feature Items (2x2 Grid) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          {/* Item 1 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
            }}
          >
            <span style={{ fontSize: 32 }}>📖</span>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>
                Strictly Grounded RAG
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 4 }}>
                Zero hallucinations. Answers cited from Source01–Source04.
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
            }}
          >
            <span style={{ fontSize: 32 }}>📎</span>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>
                Multimodal Attachments
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 4 }}>
                Attach images and PDF files for instant AI analysis.
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
            }}
          >
            <span style={{ fontSize: 32 }}>📍</span>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>
                Interactive Campus Map
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 4 }}>
                Live building, floor, and room pin visualizer.
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
            }}
          >
            <span style={{ fontSize: 32 }}>🛡️</span>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>
                UMak Secure &amp; Protected
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginTop: 4 }}>
                Institutional student sign-in with server rate limiting.
              </div>
            </div>
          </div>
        </div>
      </div>

      <RefStyleCaption
        title="Why TAGA-asK AI?"
        subtitle="Zero hallucinations • Official citations • Campus map pins • UMak secure."
      />
    </div>
  );
};
