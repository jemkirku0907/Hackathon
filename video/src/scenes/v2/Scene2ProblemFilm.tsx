import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Clock, Eye, MessageCircle, HelpCircle } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene2ProblemFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progressive Kinetic Headlines
  const h1Spring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const h2Spring = spring({ frame: frame - 68, fps, config: SPRINGS.bouncy });

  // Camera Shake on frame 70 ("Pero sino ang sasagot?" hit)
  const shakeFrame = frame - 70;
  let shakeX = 0;
  let shakeY = 0;
  if (shakeFrame >= 0 && shakeFrame < 18) {
    const decay = 1 - shakeFrame / 18;
    shakeX = Math.sin(shakeFrame * 1.8) * 8 * decay;
    shakeY = Math.cos(shakeFrame * 2.2) * 6 * decay;
  }

  // Yellow Marker Highlight Sweep for "sino ang sasagot?"
  const markerWidth = interpolate(frame, [72, 95], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Post Cards 3D Entrance & Parallax
  const card1Spring = spring({ frame: frame - 16, fps, config: SPRINGS.smooth });
  const card2Spring = spring({ frame: frame - 38, fps, config: SPRINGS.smooth });

  const card1X = interpolate(card1Spring, [0, 1], [-180, 0]);
  const card2X = interpolate(card2Spring, [0, 1], [180, 0]);

  // Floating Parallax Movement
  const float1 = Math.sin(frame * 0.04) * 6;
  const float2 = Math.cos(frame * 0.035) * 6;

  // Red Pulse for "0 replies"
  const redPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [0.85, 1.15]);

  // Cursor reading trajectory over Card 1
  const cursorX = interpolate(frame, [30, 90, 150], [120, 480, 620], {
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [30, 90, 150], [80, 110, 140], {
    extrapolateRight: 'clamp',
  });

  return (
    <CinematicEnvironment
      primaryGlow="#1E293B"
      secondaryGlow={BRAND_COLORS.red}
      cameraMove="subtleTilt"
      durationInFrames={210}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        {/* Kinetic Headlines */}
        <div
          style={{
            position: 'absolute',
            top: 70,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 40,
          }}
        >
          <div
            style={{
              transform: `scale(${h1Spring})`,
              fontSize: 64,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              textShadow: '0 8px 30px rgba(0,0,0,0.9)',
            }}
          >
            May tanong ka?
          </div>

          {frame >= 68 && (
            <div
              style={{
                position: 'relative',
                transform: `scale(${h2Spring})`,
                fontSize: 66,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-1.5px',
                marginTop: 6,
                textShadow: '0 8px 35px rgba(0,0,0,0.95)',
                display: 'inline-block',
              }}
            >
              {/* Yellow Marker Sweep Highlight */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 2,
                  left: 0,
                  width: `${markerWidth}%`,
                  height: 24,
                  backgroundColor: BRAND_COLORS.yellow,
                  opacity: 0.85,
                  borderRadius: 6,
                  zIndex: 0,
                  boxShadow: `0 0 25px ${BRAND_COLORS.yellow}`,
                }}
              />
              <span style={{ position: 'relative', zIndex: 1, color: '#FFFFFF', padding: '0 8px' }}>
                Pero <span style={{ color: frame >= 85 ? '#0B0F19' : BRAND_COLORS.yellow, fontWeight: 900 }}>sino</span> ang sasagot?
              </span>
            </div>
          )}
        </div>

        {/* 3D Depth Stage for Facebook-Style Student Cards */}
        <div
          style={{
            perspective: 1200,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            marginTop: 70,
            position: 'relative',
          }}
        >
          {/* Ghost Card 1 (Background Noise / Backlog) */}
          <div
            style={{
              position: 'absolute',
              left: -30,
              top: -25,
              width: 680,
              height: 260,
              borderRadius: 20,
              backgroundColor: 'rgba(36, 37, 38, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transform: 'rotate(-4deg) scale(0.92)',
              filter: 'blur(3px)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Ghost Card 2 (Background Noise / Backlog) */}
          <div
            style={{
              position: 'absolute',
              right: -30,
              top: -20,
              width: 680,
              height: 260,
              borderRadius: 20,
              backgroundColor: 'rgba(36, 37, 38, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transform: 'rotate(4deg) scale(0.92)',
              filter: 'blur(3px)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Recreated Authentic Student Post Card 1: CIT Office */}
          <div
            style={{
              width: 720,
              transform: `translateX(${card1X}px) translateY(${float1}px) rotateY(4deg)`,
              backgroundColor: '#1E232F',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 20,
              padding: '24px 28px',
              boxShadow:
                '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(236, 32, 43, 0.15)',
              zIndex: 25,
              position: 'relative',
            }}
          >
            {/* Header: Anonymous UMak Student */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#3F56CA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                H
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                  Anonymous UMak Student
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>2 hours ago</span>
                  <span>•</span>
                  <span>UMak Freedom Wall</span>
                </div>
              </div>
              {/* Ticking Clock Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', fontSize: 13 }}>
                <Clock size={16} />
                <span>Waiting</span>
              </div>
            </div>

            {/* Question Body */}
            <div
              style={{
                color: '#F1F5F9',
                fontSize: 21,
                lineHeight: 1.45,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              "Guys saan ba talaga yung CIT office? Kanina pa ko paikot-ikot sa Admin bldg walang sumasagot :("
            </div>

            {/* Status Footer: Seen count & 0 Replies Alert */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 14 }}>
                <Eye size={17} />
                <span>Seen by 142 students</span>
              </div>

              {/* Pulsing 0 replies badge */}
              <div
                style={{
                  transform: `scale(${redPulse})`,
                  backgroundColor: 'rgba(236, 32, 43, 0.22)',
                  border: `1.5px solid ${BRAND_COLORS.red}`,
                  borderRadius: 999,
                  padding: '6px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: `0 0 15px ${BRAND_COLORS.red}50`,
                }}
              >
                <MessageCircle size={16} color={BRAND_COLORS.red} />
                <span style={{ color: '#FFA4A8', fontSize: 14, fontWeight: 800 }}>
                  0 replies
                </span>
              </div>
            </div>

            {/* Floating Reading Cursor */}
            <div
              style={{
                position: 'absolute',
                top: cursorY,
                left: cursorX,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.8))',
                zIndex: 40,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Recreated Authentic Student Post Card 2: Scholarship / Exemption */}
          <div
            style={{
              width: 720,
              transform: `translateX(${card2X}px) translateY(${float2}px) rotateY(-4deg)`,
              backgroundColor: '#1E232F',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
              borderRadius: 20,
              padding: '24px 28px',
              boxShadow:
                '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(236, 32, 43, 0.15)',
              zIndex: 25,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#D1CA25',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#090E1A',
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                U
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                  UMak Freshie 2026
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>4 hours ago</span>
                  <span>•</span>
                  <span>UMak Inquiries</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', fontSize: 13 }}>
                <HelpCircle size={16} />
                <span>Unresolved</span>
              </div>
            </div>

            {/* Question Body */}
            <div
              style={{
                color: '#F1F5F9',
                fontSize: 21,
                lineHeight: 1.45,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              "Kelan deadline ng token fee exemption? Open pa ba scholarship office sa Admin bldg this week?"
            </div>

            {/* Status Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: 14 }}>
                <Eye size={17} />
                <span>Seen by 89 students</span>
              </div>

              {/* Pulsing 0 replies */}
              <div
                style={{
                  transform: `scale(${redPulse})`,
                  backgroundColor: 'rgba(236, 32, 43, 0.22)',
                  border: `1.5px solid ${BRAND_COLORS.red}`,
                  borderRadius: 999,
                  padding: '6px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: `0 0 15px ${BRAND_COLORS.red}50`,
                }}
              >
                <MessageCircle size={16} color={BRAND_COLORS.red} />
                <span style={{ color: '#FFA4A8', fontSize: 14, fontWeight: 800 }}>
                  0 replies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <KaraokeCaption sceneKey="scene2" />
    </CinematicEnvironment>
  );
};
