import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../../components/BackgroundGlow';
import { MasterSubtitleOverlay } from '../../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../../types';

export const LSMasterScene5Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14, mass: 0.9 } });
  const card1Spring = spring({ frame: frame - 15, fps, config: { damping: 13, mass: 0.8 } });
  const card2Spring = spring({ frame: frame - 40, fps, config: { damping: 13, mass: 0.8 } });

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
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

      <div
        style={{
          position: 'absolute',
          top: 60,
          backgroundColor: 'rgba(209, 202, 37, 0.15)',
          border: `1.5px solid ${BRAND_COLORS.yellow}`,
          color: BRAND_COLORS.yellow,
          fontSize: 16,
          fontWeight: 800,
          padding: '6px 22px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 30,
        }}
      >
        <span>Verified System Capabilities</span>
      </div>

      <div
        style={{
          width: 1400,
          transform: `scale(${entrance})`,
          display: 'flex',
          gap: 32,
          zIndex: 20,
          marginTop: 60,
        }}
      >
        {/* Upload Card */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card1Spring})`,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#FFF', fontSize: 20, fontWeight: 800 }}>Multimodal File Attachments</div>
              <div style={{ color: BRAND_COLORS.cyan, fontSize: 14, marginTop: 2 }}>Query schedules, announcements &amp; syllabi directly</div>
            </div>
            <span style={{ backgroundColor: 'rgba(33, 173, 227, 0.15)', border: `1px solid ${BRAND_COLORS.cyan}`, color: BRAND_COLORS.cyan, fontSize: 13, fontWeight: 800, padding: '4px 10px', borderRadius: 6 }}>
              PDF • PNG • JPG
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: '#FFF', fontSize: 16, fontWeight: 700 }}>Class_Schedule_FirstSemester.pdf</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>2.4 MB • Analyzed in context of UMak documents</div>
            </div>
            <span style={{ color: '#22C55E', fontSize: 15, fontWeight: 800 }}>Attached</span>
          </div>
        </div>

        {/* Map Card */}
        <div
          style={{
            flex: 1,
            transform: `scale(${card2Spring})`,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#FFF', fontSize: 20, fontWeight: 800 }}>Interactive Campus Map Visualizer</div>
              <div style={{ color: BRAND_COLORS.yellow, fontSize: 14, marginTop: 2 }}>Pinpoints verified building, floor, and wing</div>
            </div>
            <span style={{ backgroundColor: 'rgba(209, 202, 37, 0.15)', border: `1px solid ${BRAND_COLORS.yellow}`, color: BRAND_COLORS.yellow, fontSize: 13, fontWeight: 800, padding: '4px 10px', borderRadius: 6 }}>
              Room Locator
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: BRAND_COLORS.cyan, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>Admin Building • Level 2</div>
              <div style={{ color: '#FFF', fontSize: 16, fontWeight: 700 }}>CIT Office (South Wing)</div>
            </div>
            <span style={{ color: BRAND_COLORS.yellow, fontSize: 14, fontWeight: 800 }}>View on Map</span>
          </div>
        </div>
      </div>

      <MasterSubtitleOverlay
        badge="Tools & Grounding"
        text="Attach an image or a PDF and ask about it. Or open the campus map to find the right building, floor, and wing."
        accentColor={BRAND_COLORS.yellow}
        isLandscape={true}
      />
    </div>
  );
};
