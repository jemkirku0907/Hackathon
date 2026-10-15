import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const MasterScene5Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 13, mass: 0.8 } });
  const card2Spring = spring({ frame: frame - 45, fps, config: { damping: 13, mass: 0.8 } });

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
        backgroundColor: '#0B0F19',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.blue} secondaryColor={BRAND_COLORS.yellow} />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          backgroundColor: 'rgba(209, 202, 37, 0.15)',
          border: `1.5px solid ${BRAND_COLORS.yellow}`,
          color: BRAND_COLORS.yellow,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 28px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 30,
        }}
      >
        <span>Verified System Capabilities</span>
      </div>

      {/* Clean Feature Showcase Container */}
      <div
        style={{
          width: 960,
          transform: `scale(${entrance})`,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          zIndex: 20,
          marginTop: -30,
        }}
      >
        {/* Feature 1: Multimodal File Attachments */}
        <div
          style={{
            transform: `scale(${card1Spring})`,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 22,
            padding: '28px 32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
                Multimodal File &amp; Image Attachments
              </div>
              <div style={{ color: BRAND_COLORS.cyan, fontSize: 16, fontWeight: 600, marginTop: 4 }}>
                Directly attach and query PDFs, schedules, or announcements
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(33, 173, 227, 0.15)',
                border: `1px solid ${BRAND_COLORS.cyan}`,
                color: BRAND_COLORS.cyan,
                fontSize: 14,
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: 8,
              }}
            >
              PDF • PNG • JPG
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                Class_Schedule_FirstSemester.pdf
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>
                2.4 MB • Analyzed in context of official UMak policies
              </div>
            </div>
            <span style={{ color: '#22C55E', fontSize: 16, fontWeight: 800 }}>Attached</span>
          </div>
        </div>

        {/* Feature 2: Interactive Campus Map & Location Assistance */}
        <div
          style={{
            transform: `scale(${card2Spring})`,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 22,
            padding: '28px 32px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
                Interactive Campus Map Visualizer
              </div>
              <div style={{ color: BRAND_COLORS.yellow, fontSize: 16, fontWeight: 600, marginTop: 4 }}>
                Pinpoints verified building, floor, and wing locations
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(209, 202, 37, 0.15)',
                border: `1px solid ${BRAND_COLORS.yellow}`,
                color: BRAND_COLORS.yellow,
                fontSize: 14,
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: 8,
              }}
            >
              Floor &amp; Wing Locator
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: BRAND_COLORS.cyan, fontSize: 13, fontWeight: 800, textTransform: 'uppercase' }}>
                Admin Building • Second Floor
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                Center for Information Technology (CIT) • South Wing
              </div>
            </div>
            <span style={{ color: BRAND_COLORS.yellow, fontSize: 15, fontWeight: 800 }}>View on Map</span>
          </div>
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="Tools & Grounding"
        text="Attach an image or a PDF and ask about it. Or open the campus map to find the right building, floor, and wing."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
