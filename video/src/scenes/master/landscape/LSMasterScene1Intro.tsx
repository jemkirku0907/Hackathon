import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { BackgroundGlow } from '../../../components/BackgroundGlow';
import { MasterWordmark } from '../../../components/MasterWordmark';
import { MasterSubtitleOverlay } from '../../../components/MasterSubtitleOverlay';
import { BRAND_COLORS } from '../../../types';

export const LSMasterScene1Intro: React.FC = () => {
  const frame = useCurrentFrame();

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

      {/* University Header Pill */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          padding: '10px 28px',
          borderRadius: 999,
          opacity: Math.min(1, frame / 18),
          zIndex: 20,
        }}
      >
        <Img src={staticFile('umak-seal.png')} style={{ width: 34, height: 34, objectFit: 'contain' }} />
        <span style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          University of Makati
        </span>
      </div>

      {/* Master Wordmark */}
      <div style={{ marginTop: -20, zIndex: 10 }}>
        <MasterWordmark scale={1.2} showTagline={true} isLandscape={true} />
      </div>

      <MasterSubtitleOverlay
        badge="UMak AI Companion"
        text="Introducing TAGA-asK AI, your UMak AI companion."
        accentColor={BRAND_COLORS.yellow}
        isLandscape={true}
      />
    </div>
  );
};
