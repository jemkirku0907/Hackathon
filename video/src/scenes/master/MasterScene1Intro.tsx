import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { MasterWordmark } from '../../components/MasterWordmark';
import { MasterSubtitleOverlay } from '../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../types';

export const MasterScene1Intro: React.FC = () => {
  const frame = useCurrentFrame();

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

      {/* University of Makati Header Pill */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          padding: '12px 30px',
          borderRadius: 999,
          opacity: Math.min(1, frame / 18),
          zIndex: 20,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Img
          src={staticFile('umak-seal.png')}
          style={{ width: 40, height: 40, objectFit: 'contain' }}
        />
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          University of Makati
        </span>
      </div>

      {/* Authentic Official Logo Centerpiece */}
      <div style={{ marginTop: -40, zIndex: 10 }}>
        <MasterWordmark scale={1.05} showTagline={true} />
      </div>

      <MasterSubtitleOverlay
        badge="UMak AI Companion"
        text="Introducing TAGA-asK AI, your UMak AI companion."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
