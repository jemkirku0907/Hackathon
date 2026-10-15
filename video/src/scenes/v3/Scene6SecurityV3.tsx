import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { BentoCard } from '../../components/v3/BentoCard';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene6SecurityV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const leftCardSpring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const rightCardSpring = spring({ frame: frame - 20, fps, config: SPRINGS.snappy });

  // Rate limit meter needle rotation
  const meterValue = interpolate(frame, [15, 65, 110], [4, 15, 15], {
    extrapolateRight: 'clamp',
  });

  // 429 Toast pop (frames 60 -> 120)
  const toastSpring = spring({ frame: frame - 60, fps, config: SPRINGS.bouncy });

  // Google SSO email transition (frames 130 -> 240)
  // Rejection of @gmail.com at frame 145, switch to @umak.edu.ph at frame 175
  const gmailShake =
    frame >= 140 && frame < 170
      ? Math.sin((frame - 140) * 1.5) * 8
      : 0;

  const showUmakSuccess = frame >= 175;
  const successSpring = spring({ frame: frame - 175, fps, config: SPRINGS.bouncy });

  return (
    <WhipPanWrapper durationInFrames={260} direction="left">
      <CinematicEnvironment
        primaryGlow={BRAND_COLORS.blue}
        secondaryGlow={BRAND_COLORS.green}
        cameraMove="pushIn"
        durationInFrames={260}
      >
        {/* Section Headline */}
        <div
          style={{
            position: 'absolute',
            top: 85,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 35,
          }}
        >
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: 0,
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              textAlign: 'center',
            }}
          >
            Built-In Protection &amp; UMak Institutional Access
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            marginTop: 70,
            zIndex: 25,
          }}
        >
          {/* Card 1: Rate Limiting & Anti-Bot Protection */}
          <div
            style={{
              transform: `translateY(${interpolate(leftCardSpring, [0, 1], [60, 0])}px) scale(${leftCardSpring})`,
              opacity: leftCardSpring,
            }}
          >
            <BentoCard
              width={640}
              height={430}
              glowColor="rgba(63, 86, 202, 0.4)"
              style={{ padding: 28 }}
            >
              <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
                Request Throttling
              </div>
              <div style={{ color: '#94A3B8', fontSize: 15, marginBottom: 20 }}>
                Reduces excessive requests and prevents automated bot spam
              </div>

              {/* Rate Gauge Meter Box */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 12, 28, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 18,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 700 }}>
                    Requests Limit Ceiling
                  </span>
                  <span style={{ color: BRAND_COLORS.yellow, fontSize: 16, fontWeight: 800 }}>
                    {Math.round(meterValue)} / 15 req/min
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    width: '100%',
                    height: 12,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(meterValue / 15) * 100}%`,
                      height: '100%',
                      background:
                        meterValue >= 15
                          ? `linear-gradient(90deg, ${BRAND_COLORS.yellow}, ${BRAND_COLORS.red})`
                          : `linear-gradient(90deg, ${BRAND_COLORS.cyan}, ${BRAND_COLORS.blue})`,
                      boxShadow: '0 0 14px rgba(255, 214, 10, 0.6)',
                    }}
                  />
                </div>
              </div>

              {/* HTTP 429 Toast Feedback Card */}
              {frame >= 55 && (
                <div
                  style={{
                    transform: `scale(${toastSpring})`,
                    opacity: toastSpring,
                    backgroundColor: 'rgba(236, 32, 43, 0.18)',
                    border: `1.5px solid ${BRAND_COLORS.red}`,
                    borderRadius: 14,
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <span style={{ fontSize: 24 }}>🛡️</span>
                  <div>
                    <div
                      style={{
                        color: BRAND_COLORS.red,
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}
                    >
                      HTTP 429: Too Many Requests
                    </div>
                    <div style={{ color: '#F1F5F9', fontSize: 14, marginTop: 2 }}>
                      Rate limit reached. Please wait a moment before sending more queries.
                    </div>
                  </div>
                </div>
              )}
            </BentoCard>
          </div>

          {/* Card 2: Institutional Email Only Gate */}
          <div
            style={{
              transform: `translateY(${interpolate(rightCardSpring, [0, 1], [60, 0])}px) scale(${rightCardSpring})`,
              opacity: rightCardSpring,
            }}
          >
            <BentoCard
              width={640}
              height={430}
              glowColor="rgba(34, 197, 94, 0.35)"
              style={{ padding: 28 }}
            >
              <div style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
                UMak Email Sign-In Only
              </div>
              <div style={{ color: '#94A3B8', fontSize: 15, marginBottom: 20 }}>
                Sign-in is limited exclusively to official UMak email accounts
              </div>

              {/* Simulated Google SSO Login Box */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 12, 28, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 16,
                  padding: 22,
                }}
              >
                {/* 1. Rejected Personal Email */}
                <div
                  style={{
                    transform: `translateX(${gmailShake}px)`,
                    backgroundColor:
                      frame < 170 ? 'rgba(236, 32, 43, 0.15)' : 'rgba(255,255,255,0.04)',
                    border:
                      frame < 170
                        ? `1px solid ${BRAND_COLORS.red}80`
                        : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>❌</span>
                    <span style={{ color: '#CBD5E1', fontSize: 16 }}>
                      personal.user@gmail.com
                    </span>
                  </div>
                  <span
                    style={{
                      color: BRAND_COLORS.red,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '1px',
                    }}
                  >
                    BLOCKED
                  </span>
                </div>

                {/* 2. Accepted UMak Institutional Email */}
                {showUmakSuccess && (
                  <div
                    style={{
                      transform: `scale(${successSpring})`,
                      opacity: successSpring,
                      backgroundColor: 'rgba(34, 197, 94, 0.18)',
                      border: `1.5px solid ${BRAND_COLORS.green}`,
                      borderRadius: 12,
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 18 }}>✅</span>
                      <div>
                        <div
                          style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                        >
                          student.umak@umak.edu.ph
                        </div>
                        <div style={{ color: BRAND_COLORS.green, fontSize: 12, marginTop: 2 }}>
                          UMak Student Account Verified
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        backgroundColor: BRAND_COLORS.green,
                        color: '#070B14',
                        fontSize: 12,
                        fontWeight: 900,
                        padding: '4px 12px',
                        borderRadius: 6,
                        letterSpacing: '1px',
                      }}
                    >
                      AUTHORIZED
                    </span>
                  </div>
                )}
              </div>
            </BentoCard>
          </div>
        </div>

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene6" />
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
