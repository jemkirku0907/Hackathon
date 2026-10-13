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
    frame: frame - 25,
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

        {/* Content Area with 2 Facebook Posts Side-by-Side */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            padding: '40px 60px',
          }}
        >
          {/* Post 1: Real User Uploaded Screenshot (Keli Post) */}
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
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

          {/* Post 2: Matching Native Dark Mode FB Post (CIT Location Question) */}
          <div
            style={{
              flex: 1,
              transform: `scale(${card2Spring})`,
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: '#242526',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 330,
            }}
          >
            <div>
              {/* Header */}
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#3A3B3C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}
                >
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#E4E6EB', fontSize: 20, fontWeight: 700 }}>
                    Anonymous UMak Student
                  </div>
                  <div style={{ color: '#B0B3B8', fontSize: 14 }}>5h • 👥 UMak Student Community</div>
                </div>
                <span style={{ color: '#B0B3B8', fontSize: 24 }}>•••</span>
              </div>

              {/* Text */}
              <div style={{ padding: '0 24px 20px', color: '#E4E6EB', fontSize: 21, lineHeight: 1.45 }}>
                Hello po! Saan po located yung Center for Information Technology sa Admin Building? Malapit na po exam namin...
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #3E4042',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#1E1F20',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ color: '#B0B3B8', fontSize: 16 }}>👍 1</span>
                <span
                  style={{
                    backgroundColor: 'rgba(236, 32, 43, 0.2)',
                    border: '1.5px solid #EF4444',
                    color: '#FCA5A5',
                    padding: '4px 12px',
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  💬 0 comments
                </span>
              </div>
              <div style={{ color: '#EF4444', fontSize: 15, fontWeight: 800 }}>
                ⏳ No answers yet...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption Card */}
      <RefStyleCaption
        title="May tanong ka. Pero minsan, walang sumasagot."
        subtitle="Hours of waiting in Facebook groups and group chats with zero replies."
      />
    </div>
  );
};
