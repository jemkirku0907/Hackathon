import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../components/BackgroundGlow';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { BRAND_COLORS } from '../types';

export const Scene6Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 sequential feature cards
  const card1Spring = spring({ frame: frame - 10, fps, config: { damping: 13, mass: 0.8 } });
  const card2Spring = spring({ frame: frame - 40, fps, config: { damping: 13, mass: 0.8 } });
  const card3Spring = spring({ frame: frame - 70, fps, config: { damping: 13, mass: 0.8 } });

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
      <BackgroundGlow primaryColor={BRAND_COLORS.yellow} secondaryColor={BRAND_COLORS.cyan} />

      {/* Top Badge */}
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
        <span>🎓</span> FULL CAMPUS KNOWLEDGE
      </div>

      {/* 3 Interactive Feature Cards */}
      <div
        style={{
          width: 960,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          marginTop: -60,
        }}
      >
        {/* Card 1: Scholarships */}
        <div
          style={{
            transform: `scale(${card1Spring})`,
            backgroundColor: '#111827',
            border: `2px solid ${BRAND_COLORS.blue}`,
            borderRadius: 24,
            padding: '24px 32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                backgroundColor: 'rgba(63, 86, 202, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              🏅
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
                Scholarships &amp; Token Fee Exemption
              </h4>
              <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: 18 }}>
                Dean&apos;s List GWA 1.00–1.75 token fee exemption criteria
              </p>
            </div>
          </div>
          <span
            style={{
              backgroundColor: 'rgba(63, 86, 202, 0.3)',
              color: BRAND_COLORS.cyan,
              padding: '6px 16px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Source01
          </span>
        </div>

        {/* Card 2: College & Course Requirements */}
        <div
          style={{
            transform: `scale(${card2Spring})`,
            backgroundColor: '#111827',
            border: `2px solid ${BRAND_COLORS.cyan}`,
            borderRadius: 24,
            padding: '24px 32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                backgroundColor: 'rgba(33, 173, 227, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              💻
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
                CCIS &amp; Academic Admissions
              </h4>
              <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: 18 }}>
                BS Computer Science 85% retention grade rules
              </p>
            </div>
          </div>
          <span
            style={{
              backgroundColor: 'rgba(33, 173, 227, 0.3)',
              color: BRAND_COLORS.yellow,
              padding: '6px 16px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Source02
          </span>
        </div>

        {/* Card 3: University President & Offices */}
        <div
          style={{
            transform: `scale(${card3Spring})`,
            backgroundColor: '#111827',
            border: `2px solid ${BRAND_COLORS.yellow}`,
            borderRadius: 24,
            padding: '24px 32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                backgroundColor: 'rgba(209, 202, 37, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
              }}
            >
              🏛️
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
                Administration &amp; University President
              </h4>
              <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: 18 }}>
                Prof. Elyxzur C. Ramos (Prof. X) &amp; Academic Offices
              </p>
            </div>
          </div>
          <span
            style={{
              backgroundColor: 'rgba(209, 202, 37, 0.3)',
              color: '#FFFFFF',
              padding: '6px 16px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Source04
          </span>
        </div>
      </div>

      <SubtitleOverlay
        badge="UMak Knowledge Base"
        text="Explore Dean's List scholarship token fee exemptions, CCIS admission retention policies, and university administration details in seconds."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
