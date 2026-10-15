import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { BentoCard } from '../../components/v3/BentoCard';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene2ProblemV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered card spring entrances
  const card1Spring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const card2Spring = spring({ frame: frame - 18, fps, config: SPRINGS.snappy });
  const card3Spring = spring({ frame: frame - 30, fps, config: SPRINGS.snappy });

  // Camera impact shake on "Pero sino ang sasagot?" (local frames 42 - 75)
  const shake =
    frame >= 40 && frame <= 75
      ? Math.sin((frame - 40) * 1.6) * 5 * (1 - (frame - 40) / 35)
      : 0;

  // Floating continuous drift in 3D
  const rotX = Math.sin(frame * 0.04) * 3;
  const rotY = Math.cos(frame * 0.035) * 5;
  const floatZ = Math.sin(frame * 0.05) * 12;

  // Urgent red alert pulse for "0 replies"
  const alertPulse = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [0.75, 1.0]
  );

  return (
    <WhipPanWrapper durationInFrames={186} direction="left">
      <CinematicEnvironment
        primaryGlow={BRAND_COLORS.red}
        secondaryGlow={BRAND_COLORS.blue}
        cameraMove="pushIn"
        durationInFrames={186}
      >
        {/* Section Headline */}
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 35,
            transform: `translateY(${shake}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: 0,
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              textAlign: 'center',
            }}
          >
            May tanong ka, pero sino ang sasagot?
          </h2>
        </div>

        {/* 3D Bento Stack of Real Facebook Questions */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            marginTop: 70,
            perspective: 1200,
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${floatZ}px) translateY(${shake}px)`,
            zIndex: 25,
          }}
        >
          {/* Card 1 (Left - Background Tilt) */}
          <div
            style={{
              transform: `translateY(${interpolate(card1Spring, [0, 1], [100, 0])}px) scale(${interpolate(card1Spring, [0, 1], [0.85, 0.95])}) rotate(-4deg)`,
              opacity: card1Spring,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
            }}
          >
            <BentoCard
              width={420}
              height={270}
              glowColor="rgba(236, 32, 43, 0.2)"
            >
              {/* Facebook Post Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    backgroundColor: '#1877F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  f
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700 }}>
                    UMak Student Freedom Wall
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>5 hours ago · 🌐 Public</div>
                </div>
              </div>

              <div style={{ color: '#F1F5F9', fontSize: 17, lineHeight: 1.5, fontWeight: 500 }}>
                &ldquo;Available po ba ang registrar bukas ng hapon para sa clearance?&rdquo;
              </div>

              {/* Engagement Bar */}
              <div
                style={{
                  marginTop: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: 12,
                }}
              >
                <span style={{ color: '#94A3B8', fontSize: 13 }}>👍 3 Likes</span>
                <span style={{ color: '#EF4444', fontSize: 13, fontWeight: 800 }}>
                  0 Replies · Unanswered
                </span>
              </div>
            </BentoCard>
          </div>

          {/* Card 2 (Center Hero - Main CIT question) */}
          <div
            style={{
              transform: `translateY(${interpolate(card2Spring, [0, 1], [120, 0])}px) scale(${card2Spring})`,
              opacity: card2Spring,
              zIndex: 10,
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.95))',
            }}
          >
            <BentoCard
              width={560}
              height={320}
              glowColor="rgba(236, 32, 43, 0.45)"
              style={{
                border: `1.5px solid ${BRAND_COLORS.red}80`,
              }}
            >
              {/* Facebook Post Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(236, 32, 43, 0.25)',
                    border: `1.5px solid ${BRAND_COLORS.red}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  ?
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 800 }}>
                    UMak CCIS Community
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>3 hours ago · 🌐 Public</div>
                </div>
              </div>

              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: 22,
                  lineHeight: 1.45,
                  fontWeight: 700,
                  letterSpacing: '-0.2px',
                }}
              >
                &ldquo;Saan po located ang CIT office sa Admin Bldg? May kailangan po ipasa today!&rdquo;
              </div>

              {/* Red Urgent Pill */}
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: 'rgba(236, 32, 43, 0.22)',
                  border: `1.5px solid ${BRAND_COLORS.red}`,
                  borderRadius: 14,
                  padding: '10px 18px',
                  opacity: alertPulse,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: BRAND_COLORS.red,
                    boxShadow: `0 0 12px ${BRAND_COLORS.red}`,
                  }}
                />
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Waiting hours with ZERO replies
                </span>
              </div>
            </BentoCard>
          </div>

          {/* Card 3 (Right - Background Tilt) */}
          <div
            style={{
              transform: `translateY(${interpolate(card3Spring, [0, 1], [140, 0])}px) scale(${interpolate(card3Spring, [0, 1], [0.85, 0.95])}) rotate(4deg)`,
              opacity: card3Spring,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
            }}
          >
            <BentoCard
              width={420}
              height={270}
              glowColor="rgba(236, 32, 43, 0.2)"
            >
              {/* Facebook Post Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    backgroundColor: '#1877F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  f
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700 }}>
                    UMak Freshmen Community
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>6 hours ago · 🌐 Public</div>
                </div>
              </div>

              <div style={{ color: '#F1F5F9', fontSize: 17, lineHeight: 1.5, fontWeight: 500 }}>
                &ldquo;Paano po mag-apply ng Dean&apos;s List token fee exemption this sem?&rdquo;
              </div>

              {/* Engagement Bar */}
              <div
                style={{
                  marginTop: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: 12,
                }}
              >
                <span style={{ color: '#94A3B8', fontSize: 13 }}>👍 5 Likes</span>
                <span style={{ color: '#EF4444', fontSize: 13, fontWeight: 800 }}>
                  0 Replies · Ignored
                </span>
              </div>
            </BentoCard>
          </div>
        </div>

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene2" />
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
