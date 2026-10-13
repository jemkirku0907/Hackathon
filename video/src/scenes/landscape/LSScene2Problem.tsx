import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { RefStyleCaption } from '../../components/RefStyleCaption';
import { BRAND_COLORS } from '../../types';

export const LSScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowScale = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9 },
  });

  const card2Spring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 13, mass: 0.8 },
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, #1E293B 0%, #090E1A 90%)',
        }}
      />

      {/* Floating Desktop Window */}
      <div
        style={{
          width: 1540,
          height: 860,
          backgroundColor: '#090E1A',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transform: `scale(${windowScale})`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* macOS Window Bar */}
        <div
          style={{
            height: 48,
            backgroundColor: '#111827',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#EC202B' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#D1CA25' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E' }} />
          <span style={{ marginLeft: 20, color: '#94A3B8', fontSize: 14, fontFamily: 'monospace' }}>
            facebook.com • UMak Student Community Group
          </span>
        </div>

        {/* Content Area with TWO REAL FACEBOOK SCREENSHOTS (100% Authentic) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            padding: '40px 50px',
          }}
        >
          {/* Real Post 1: Anonymous participant asking about CIT location */}
          <div
            style={{
              flex: 1,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
              border: '2px solid rgba(255, 255, 255, 0.18)',
              backgroundColor: '#242526',
            }}
          >
            <Img
              src={staticFile('screenshots/fb_cit_post.png')}
              style={{
                width: '100%',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Real Post 2: Keli asking about Makati student benefits */}
          <div
            style={{
              flex: 1,
              transform: `scale(${card2Spring})`,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85)',
              border: '2px solid rgba(255, 255, 255, 0.18)',
              backgroundColor: '#242526',
            }}
          >
            <Img
              src={staticFile('screenshots/fb_keli_post.png')}
              style={{
                width: '100%',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption Card */}
      <RefStyleCaption
        title="May tanong ka. Pero minsan, walang sumasagot."
        subtitle="Real student posts in Facebook groups asking for CIT location & scholarships with zero replies."
      />
    </div>
  );
};
