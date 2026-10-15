import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BookOpen, CheckCircle2, Compass, MapPin, Moon, Send, Sparkles } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene4CitationDemoV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance of App Window (Spring)
  const windowSpring = spring({ frame: frame - 4, fps, config: SPRINGS.snappy });

  // 2. User Question Typing Animation (frames 12 -> 70)
  // Voiceover says "Ask where the CIT is in the Admin Building." (local frames 12 -> 94)
  const fullUserQuery = 'where is cit';
  const typeProgress = interpolate(frame, [12, 65], [0, fullUserQuery.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const typedUserText = fullUserQuery.slice(0, Math.floor(typeProgress));
  const showUserCaret = frame < 75 && Math.floor(frame / 6) % 2 === 0;

  // 3. User message sent at frame >= 68
  const userSent = frame >= 68;
  const userBubbleSpring = spring({ frame: frame - 68, fps, config: SPRINGS.snappy });

  // 4. AI Assistant Response Stream (frames 85 -> 185)
  // Voiceover says "TAGA-asK AI answers: Second Floor, South Wing." (local frames 114 -> 233)
  const aiBubbleSpring = spring({ frame: frame - 82, fps, config: SPRINGS.smooth });
  const aiTokens = [
    'The', 'Center', 'for', 'Information', 'Technology', '(CIT)',
    'is', 'on', 'the', 'Second', 'Floor,', 'South', 'Wing,', 'Admin', 'Building.'
  ];
  const streamedCount = Math.floor(
    interpolate(frame, [95, 185], [0, aiTokens.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // 5. Location Widget Appearance (frame >= 170)
  const widgetSpring = spring({ frame: frame - 170, fps, config: SPRINGS.snappy });

  // 6. Citation Chip Pop & Pulse (frame >= 200)
  // Voiceover says "And it shows where that answer came from: Source zero three, page one." (local frames 253 -> 401)
  const citationChipSpring = spring({ frame: frame - 200, fps, config: SPRINGS.bouncy });
  const citationPulse = interpolate(
    Math.sin(frame * 0.18),
    [-1, 1],
    [0.96, 1.04]
  );

  return (
    <WhipPanWrapper durationInFrames={410} direction="left">
      <CinematicEnvironment
        primaryGlow={BRAND_COLORS.blue}
        secondaryGlow={BRAND_COLORS.yellow}
        cameraMove="pushIn"
        durationInFrames={410}
      >
        {/* Section Headline */}
        <div
          style={{
            position: 'absolute',
            top: 55,
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
              fontSize: 44,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: 0,
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              textAlign: 'center',
            }}
          >
            Zero Hallucinations. Strictly Verified.
          </h2>
        </div>

        {/* Real Authentic Application Window (Clean Light UI matching user's screenshot 1:1) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            zIndex: 25,
            transform: `scale(${windowSpring})`,
            opacity: windowSpring,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 1360,
              height: 680,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              boxShadow:
                '0 30px 80px rgba(0, 0, 0, 0.75), 0 0 50px rgba(42, 57, 144, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            {/* 1. Real Header Bar matching app */}
            <div
              style={{
                height: 56,
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 28px',
                flexShrink: 0,
              }}
            >
              {/* Left: UMak Seal + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Img
                    src={staticFile('umak-seal.png')}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <div style={{ color: '#0F172A', fontSize: 16, fontWeight: 800, lineHeight: 1.2 }}>
                    UMak Knowledge Base
                  </div>
                  <div style={{ color: '#64748B', fontSize: 11, fontWeight: 500 }}>
                    Exclusively referencing Source01 to Source04
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#334155',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: 10,
                  }}
                >
                  <Sparkles size={14} color="#D1CA25" />
                  <span>Intro &amp; Overview</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: '#EEF2FC',
                    border: '1px solid rgba(63, 86, 202, 0.3)',
                    color: '#2A3990',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '6px 14px',
                    borderRadius: 10,
                  }}
                >
                  <Compass size={14} color="#2A3990" />
                  <span>Campus Map</span>
                </div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748B',
                  }}
                >
                  <Moon size={15} />
                </div>
              </div>
            </div>

            {/* 2. Main Chat Viewport (Spacious Light Mode Single-Column Layout matching screenshot) */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#F8FAFC',
                padding: '24px 44px',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* User Message (Top Right) */}
              {userSent && (
                <div
                  style={{
                    alignSelf: 'flex-end',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 5,
                    transform: `scale(${userBubbleSpring})`,
                    opacity: userBubbleSpring,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#64748B', fontSize: 11.5, fontWeight: 600 }}>
                      You · 03:36 PM
                    </span>
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        backgroundColor: '#E2E8F0',
                        color: '#475569',
                        fontSize: 10.5,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      You
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: '#2A3990',
                      color: '#FFFFFF',
                      borderRadius: '18px 4px 18px 18px',
                      padding: '10px 22px',
                      fontSize: 16,
                      fontWeight: 600,
                      boxShadow: '0 4px 14px rgba(42, 57, 144, 0.22)',
                    }}
                  >
                    {fullUserQuery}
                  </div>
                </div>
              )}

              {/* AI Assistant Response (Aligned Left with Heron Mascot) */}
              {frame >= 82 && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    width: '100%',
                    maxWidth: 880,
                    transform: `scale(${aiBubbleSpring})`,
                    opacity: aiBubbleSpring,
                  }}
                >
                  {/* Heron Mascot Avatar Badge */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #F4EB2A',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08), 0 0 14px rgba(244, 235, 42, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Img
                      src={staticFile('heron-mascot.png')}
                      style={{ width: 30, height: 30, objectFit: 'contain' }}
                    />
                  </div>

                  {/* AI Response Card Container */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {/* Header Label */}
                    <span style={{ color: '#64748B', fontSize: 12, fontWeight: 700 }}>
                      TAGA-asK AI · 03:36 PM
                    </span>

                    {/* Clean White Card */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 16,
                        border: '1.5px solid #E2E8F0',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        padding: '18px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                      }}
                    >
                      {/* Strictly Grounded & Verified Badge */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          backgroundColor: '#EAFBF1',
                          border: '1px solid #A3E7BD',
                          borderRadius: 7,
                          padding: '3px 10px',
                          color: '#15803D',
                          fontSize: 12,
                          fontWeight: 700,
                          width: 'fit-content',
                        }}
                      >
                        <CheckCircle2 size={14} color="#16A34A" />
                        <span>Strictly Grounded &amp; Verified</span>
                      </div>

                      {/* Streamed Answer Text */}
                      <div
                        style={{
                          color: '#1E293B',
                          fontSize: 16.5,
                          lineHeight: 1.55,
                          fontWeight: 500,
                        }}
                      >
                        {aiTokens.slice(0, streamedCount).map((token, idx) => {
                          const isKeyLocation = idx >= 9; // "Second Floor, South Wing, Admin Building."
                          return (
                            <span
                              key={idx}
                              style={{
                                marginRight: 4,
                                fontWeight: isKeyLocation ? 800 : 500,
                                color:
                                  isKeyLocation && frame >= 180
                                    ? '#2A3990'
                                    : '#1E293B',
                                backgroundColor:
                                  isKeyLocation && frame >= 180
                                    ? 'rgba(244, 235, 42, 0.4)'
                                    : 'transparent',
                                borderRadius: 4,
                                padding: isKeyLocation && frame >= 180 ? '2px 5px' : '0',
                                transition: 'all 0.2s ease',
                                display: 'inline',
                              }}
                            >
                              {token}
                            </span>
                          );
                        })}
                      </div>

                      {/* Location Visualizer Card (Light Mode matching screenshot) */}
                      {frame >= 170 && (
                        <div
                          style={{
                            transform: `scale(${widgetSpring})`,
                            opacity: widgetSpring,
                            backgroundColor: '#EEF4FF',
                            border: '1.5px solid rgba(42, 57, 144, 0.2)',
                            borderRadius: 12,
                            padding: '12px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 16,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                backgroundColor: 'rgba(42, 57, 144, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <MapPin size={18} color="#2A3990" />
                            </div>
                            <div>
                              <div
                                style={{
                                  color: '#0F172A',
                                  fontSize: 14.5,
                                  fontWeight: 800,
                                }}
                              >
                                Center for Information Technology (CIT)
                              </div>
                              <div style={{ color: '#64748B', fontSize: 12 }}>
                                Admin Building · Second Floor (South Wing)
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: '#2A3990',
                              color: '#FFFFFF',
                              padding: '8px 16px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              flexShrink: 0,
                              boxShadow: '0 4px 12px rgba(42, 57, 144, 0.25)',
                            }}
                          >
                            <Compass size={14} color="#F4EB2A" />
                            <span>📍 View on Campus Map</span>
                          </div>
                        </div>
                      )}

                      {/* Official Citations Section */}
                      {frame >= 200 && (
                        <div
                          style={{
                            transform: `scale(${citationChipSpring})`,
                            opacity: citationChipSpring,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                            paddingTop: 10,
                            borderTop: '1px solid #F1F5F9',
                          }}
                        >
                          <span
                            style={{
                              color: '#64748B',
                              fontSize: 11,
                              fontWeight: 800,
                              letterSpacing: '0.8px',
                              textTransform: 'uppercase',
                            }}
                          >
                            Official Citations (Click to inspect exact quote):
                          </span>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              backgroundColor: frame >= 210 ? 'rgba(244, 235, 42, 0.15)' : '#EEF2FC',
                              border: `1.5px solid ${frame >= 210 ? BRAND_COLORS.yellow : '#3F56CA'}`,
                              borderRadius: 8,
                              padding: '7px 16px',
                              width: 'fit-content',
                              boxShadow:
                                frame >= 210
                                  ? `0 0 18px ${BRAND_COLORS.yellowGlow}`
                                  : '0 2px 6px rgba(0,0,0,0.04)',
                              transform: `scale(${citationPulse})`,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <BookOpen size={15} color="#21ADE3" />
                            <span
                              style={{
                                color: '#2A3990',
                                fontSize: 13,
                                fontWeight: 800,
                              }}
                            >
                              Source03.pdf · Page 1
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Prompt Bar matching real app UI */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid #E2E8F0',
                padding: '12px 28px 14px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                flexShrink: 0,
              }}
            >
              {/* Simulated Input Field Container with Live Typing */}
              <div
                style={{
                  border: '1.5px solid #CBD5E1',
                  borderRadius: 14,
                  backgroundColor: '#FFFFFF',
                  padding: '10px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minHeight: 22 }}>
                  {!userSent ? (
                    <>
                      <span style={{ color: '#0F172A', fontSize: 15, fontWeight: 600 }}>
                        {typedUserText}
                      </span>
                      {showUserCaret && (
                        <span style={{ color: '#2A3990', fontWeight: 900 }}>|</span>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#94A3B8', fontSize: 13.5 }}>
                      Ask about UMak scholarships, admission requirements, campus locations, or offices...
                    </span>
                  )}
                </div>

                {/* Action buttons row matching real app screenshot */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12, fontWeight: 600 }}>
                      <span>📎 Attach</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748B', fontSize: 12, fontWeight: 600 }}>
                      <span>🧭 Campus Map</span>
                    </div>
                    <span style={{ color: '#94A3B8', fontSize: 11 }}>0/500 chars</span>
                  </div>

                  <div
                    style={{
                      backgroundColor: userSent ? '#E2E8F0' : '#2A3990',
                      color: userSent ? '#94A3B8' : '#FFFFFF',
                      padding: '6px 16px',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      boxShadow: userSent ? 'none' : '0 2px 8px rgba(42, 57, 144, 0.25)',
                    }}
                  >
                    <span>Send</span>
                    <Send size={12} />
                  </div>
                </div>
              </div>

              {/* Bottom footer text */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ color: '#94A3B8', fontSize: 11 }}>
                  TAGA-asK AI adheres strictly to Source01-Source04. Hallucinations are actively prevented server-side.
                </span>
                <span style={{ color: '#CBD5E1', fontSize: 11 }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2A3990' }} />
                  <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600 }}>
                    Developed by DoErrorIn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene4" />
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
