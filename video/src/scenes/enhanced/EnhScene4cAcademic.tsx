import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const EnhScene4cAcademic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3 feature cards + student session bar
  const card1Spring = spring({ frame: frame - 10, fps, config: { damping: 13, mass: 0.8 } });
  const card2Spring = spring({ frame: frame - 35, fps, config: { damping: 13, mass: 0.8 } });
  const card3Spring = spring({ frame: frame - 60, fps, config: { damping: 13, mass: 0.8 } });
  const sessionSpring = spring({ frame: frame - 85, fps, config: { damping: 12, mass: 0.8 } });

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
        <span>🎓</span> FEATURE 3: ACADEMIC POLICIES &amp; SECURITY
      </div>

      {/* Main Container */}
      <div
        style={{
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
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
            padding: '22px 30px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                backgroundColor: 'rgba(63, 86, 202, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
              }}
            >
              🏅
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: 23, fontWeight: 800 }}>
                Scholarships &amp; Token Fee Exemption
              </h4>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: 17 }}>
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
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Source01.pdf
          </span>
        </div>

        {/* Card 2: College & Course Requirements */}
        <div
          style={{
            transform: `scale(${card2Spring})`,
            backgroundColor: '#111827',
            border: `2px solid ${BRAND_COLORS.cyan}`,
            borderRadius: 24,
            padding: '22px 30px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                backgroundColor: 'rgba(33, 173, 227, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
              }}
            >
              💻
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: 23, fontWeight: 800 }}>
                CCIS &amp; Academic Admissions
              </h4>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: 17 }}>
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
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Source02.pdf
          </span>
        </div>

        {/* Card 3: University President */}
        <div
          style={{
            transform: `scale(${card3Spring})`,
            backgroundColor: '#111827',
            border: `2px solid ${BRAND_COLORS.yellow}`,
            borderRadius: 24,
            padding: '22px 30px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                backgroundColor: 'rgba(209, 202, 37, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
              }}
            >
              🏛️
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: 23, fontWeight: 800 }}>
                Administration &amp; University President
              </h4>
              <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: 17 }}>
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
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Source04.pdf
          </span>
        </div>

        {/* UMak Verified Student Session Bar (Real UI from user uploaded image 3) */}
        <div
          style={{
            transform: `scale(${sessionSpring})`,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 22,
            padding: '16px 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.7)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              J
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 19, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                Jemkirk Utana
                <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ADE80', fontSize: 12, padding: '2px 8px', borderRadius: 6, fontWeight: 800 }}>
                  VERIFIED UMAK SESSION
                </span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 15, fontFamily: 'monospace' }}>
                Student ID: A12549566 • Rate Limit Protected
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#CBD5E1',
              padding: '8px 18px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>🔒</span> Server-Side Security
          </div>
        </div>
      </div>

      <SubtitleOverlay
        badge="Institutional Intelligence"
        text="Check Dean's List token fee exemptions, CCIS retention policies, and university contacts — completely grounded in official documents."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
