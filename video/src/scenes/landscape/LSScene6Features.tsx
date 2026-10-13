import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene6Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const c1 = spring({ frame: frame - 5, fps, config: { damping: 13, mass: 0.8 } });
  const c2 = spring({ frame: frame - 25, fps, config: { damping: 13, mass: 0.8 } });
  const c3 = spring({ frame: frame - 45, fps, config: { damping: 13, mass: 0.8 } });

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

      {/* 3 Horizontal Feature Cards */}
      <div
        style={{
          width: 1380,
          display: 'flex',
          gap: 28,
        }}
      >
        {/* Card 1: Scholarships */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0F172A',
            border: `2px solid ${BRAND_COLORS.blue}`,
            borderRadius: 24,
            padding: 32,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
            transform: `scale(${c1})`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 380,
          }}
        >
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                backgroundColor: 'rgba(63, 86, 202, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                marginBottom: 20,
              }}
            >
              🏅
            </div>
            <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
              Scholarships &amp; Token Fee Exemption
            </h3>
            <p style={{ margin: '12px 0 0', color: '#94A3B8', fontSize: 16, lineHeight: 1.45 }}>
              Dean&apos;s Listers with GWA 1.00–1.75 qualify for full token fee exemption.
            </p>
          </div>
          <div style={{ color: BRAND_COLORS.cyan, fontSize: 16, fontWeight: 800 }}>
            Source01.pdf • 14 Pages
          </div>
        </div>

        {/* Card 2: CCIS */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0F172A',
            border: `2px solid ${BRAND_COLORS.cyan}`,
            borderRadius: 24,
            padding: 32,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
            transform: `scale(${c2})`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 380,
          }}
        >
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                backgroundColor: 'rgba(33, 173, 227, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                marginBottom: 20,
              }}
            >
              💻
            </div>
            <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
              CCIS Course Retention
            </h3>
            <p style={{ margin: '12px 0 0', color: '#94A3B8', fontSize: 16, lineHeight: 1.45 }}>
              BS Computer Science retention requires maintaining at least 85% GWA.
            </p>
          </div>
          <div style={{ color: BRAND_COLORS.yellow, fontSize: 16, fontWeight: 800 }}>
            Source02.pdf • Page 1
          </div>
        </div>

        {/* Card 3: Administration */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0F172A',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 24,
            padding: 32,
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
            transform: `scale(${c3})`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 380,
          }}
        >
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                marginBottom: 20,
              }}
            >
              🏛️
            </div>
            <h3 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
              University President
            </h3>
            <p style={{ margin: '12px 0 0', color: '#94A3B8', fontSize: 16, lineHeight: 1.45 }}>
              Led by Prof. Elyxzur C. Ramos (Prof. X) &amp; University Administrative Offices.
            </p>
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 800 }}>
            Source04.pdf • Page 1
          </div>
        </div>
      </div>

      <RefStyleCaption
        title="Everything in one place."
        subtitle="Token fee exemptions, CCIS retention, and administrative directories."
      />
    </div>
  );
};
