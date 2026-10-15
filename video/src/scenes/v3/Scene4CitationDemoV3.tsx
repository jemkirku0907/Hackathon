import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FileText, MapPin, ShieldCheck } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { BentoCard } from '../../components/v3/BentoCard';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene4CitationDemoV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance of Chat Window (Spring)
  const windowSpring = spring({ frame: frame - 4, fps, config: SPRINGS.snappy });

  // 2. User Question Typing Animation (frames 12 -> 70)
  // Voiceover says "Ask where the CIT is in the Admin Building." (local frames 12 -> 94)
  const fullUserQuery = 'Where is the CIT in the Admin Building?';
  const typeProgress = interpolate(frame, [12, 70], [0, fullUserQuery.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const typedUserText = fullUserQuery.slice(0, Math.floor(typeProgress));
  const showUserCaret = frame < 85 && Math.floor(frame / 6) % 2 === 0;

  // 3. AI Assistant Response Stream (frames 85 -> 185)
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

  // 4. Location Widget Appearance (frame >= 170)
  const widgetSpring = spring({ frame: frame - 170, fps, config: SPRINGS.snappy });

  // 5. Citation Chip Pop & Pulse (frame >= 200)
  // Voiceover says "And it shows where that answer came from: Source zero three, page one." (local frames 253 -> 401)
  const citationChipSpring = spring({ frame: frame - 200, fps, config: SPRINGS.bouncy });
  const citationPulse = interpolate(
    Math.sin(frame * 0.18),
    [-1, 1],
    [0.8, 1.0]
  );

  // 6. Right-Column PDF Document Inspector Card Pop (frame >= 210)
  const pdfSpring = spring({ frame: frame - 210, fps, config: SPRINGS.snappy });
  const pdfTranslateX = interpolate(pdfSpring, [0, 1], [60, 0]);

  // 7. Golden Connecting SVG Bezier Line (frames 215 -> 255)
  const lineProgress = interpolate(frame, [215, 255], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 8. Yellow Highlighter Sweep across the PDF text line (frames 260 -> 320)
  const highlightWidth = interpolate(frame, [260, 320], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
            top: 75,
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
            Zero Hallucinations. Strictly Verified.
          </h2>
        </div>

        {/* 2-Column Split Hero Stage: Animated Live Chat UI (Left) + Document Citation Proof (Right) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            marginTop: 65,
            zIndex: 25,
          }}
        >
          {/* LEFT: Live Animated TAGA-asK AI Application Window */}
          <div
            style={{
              transform: `scale(${windowSpring})`,
              opacity: windowSpring,
            }}
          >
            <div
              style={{
                width: 860,
                height: 500,
                backgroundColor: '#0F172A',
                borderRadius: 22,
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                boxShadow:
                  '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(63, 86, 202, 0.35)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Browser Mockup Chrome Header */}
              <div
                style={{
                  height: 42,
                  backgroundColor: '#1E293B',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: 14,
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: 7 }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10B981' }} />
                </div>

                {/* URL bar */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    borderRadius: 8,
                    padding: '4px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: '#94A3B8',
                  }}
                >
                  <span style={{ color: '#10B981' }}>🔒</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>https://taga-askai.vercel.app</span>
                </div>
              </div>

              {/* Chat Viewport Area */}
              <div
                style={{
                  flex: 1,
                  padding: '22px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  backgroundColor: '#0B1120',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* 1. USER MESSAGE (Typing Animation) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 4,
                  }}
                >
                  <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600 }}>
                    You · 01:06 AM
                  </div>
                  <div
                    style={{
                      backgroundColor: BRAND_COLORS.blue,
                      color: '#FFFFFF',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '11px 20px',
                      fontSize: 17,
                      fontWeight: 600,
                      maxWidth: '85%',
                      boxShadow: '0 4px 15px rgba(63, 86, 202, 0.35)',
                    }}
                  >
                    <span>{typedUserText}</span>
                    {showUserCaret && (
                      <span style={{ color: BRAND_COLORS.yellow, fontWeight: 900 }}>|</span>
                    )}
                  </div>
                </div>

                {/* 2. AI ASSISTANT STREAMING ANSWER (frame >= 82) */}
                {frame >= 82 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      transform: `scale(${aiBubbleSpring})`,
                      opacity: aiBubbleSpring,
                      width: '100%',
                    }}
                  >
                    {/* Official Heron Avatar */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: '#1E293B',
                        border: `1.5px solid ${BRAND_COLORS.yellow}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 0 15px ${BRAND_COLORS.yellow}40`,
                        overflow: 'hidden',
                      }}
                    >
                      <Img
                        src={staticFile('heron-mascot.png')}
                        style={{ width: 34, height: 34, objectFit: 'contain' }}
                      />
                    </div>

                    {/* AI Message Card */}
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: '#1E293B',
                        borderRadius: '4px 18px 18px 18px',
                        padding: '18px 22px',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                      }}
                    >
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 800 }}>
                          TAGA-asK AI
                        </span>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            border: '1px solid #22C55E80',
                            borderRadius: 6,
                            padding: '2px 8px',
                            color: '#86EFAC',
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          <ShieldCheck size={13} color="#22C55E" />
                          <span>Grounded in Sources</span>
                        </div>
                      </div>

                      {/* Streamed Answer Text */}
                      <div
                        style={{
                          color: '#F8FAFC',
                          fontSize: 16,
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
                                marginRight: 5,
                                fontWeight: isKeyLocation ? 800 : 500,
                                color:
                                  isKeyLocation && frame >= 180
                                    ? BRAND_COLORS.yellow
                                    : '#F8FAFC',
                                textShadow:
                                  isKeyLocation && frame >= 180
                                    ? `0 0 12px ${BRAND_COLORS.yellow}80`
                                    : 'none',
                              }}
                            >
                              {token}
                            </span>
                          );
                        })}
                      </div>

                      {/* 3. Location Visualizer Widget (frame >= 170) */}
                      {frame >= 170 && (
                        <div
                          style={{
                            transform: `scale(${widgetSpring})`,
                            opacity: widgetSpring,
                            backgroundColor: 'rgba(15, 23, 42, 0.75)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: 12,
                            padding: '10px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                backgroundColor: 'rgba(33, 173, 227, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <MapPin size={16} color={BRAND_COLORS.cyan} />
                            </div>
                            <div>
                              <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>
                                Center for Information Technology (CIT)
                              </div>
                              <div style={{ color: '#94A3B8', fontSize: 11 }}>
                                Admin Building · Second Floor (South Wing)
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: BRAND_COLORS.blue,
                              color: '#FFFFFF',
                              padding: '6px 14px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              flexShrink: 0,
                              boxShadow: '0 2px 10px rgba(63, 86, 202, 0.4)',
                            }}
                          >
                            <span>📍</span>
                            <span>View on Campus Map</span>
                          </div>
                        </div>
                      )}

                      {/* 4. Official Citations Section with Glowing Chip (frame >= 200) */}
                      {frame >= 200 && (
                        <div
                          style={{
                            transform: `scale(${citationChipSpring})`,
                            opacity: citationChipSpring,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            marginTop: 2,
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              backgroundColor: 'rgba(255, 214, 10, 0.14)',
                              border: `1.5px solid ${BRAND_COLORS.yellow}`,
                              borderRadius: 8,
                              padding: '6px 16px',
                              width: 'fit-content',
                              boxShadow: `0 0 18px ${BRAND_COLORS.yellowGlow}`,
                              opacity: citationPulse,
                            }}
                          >
                            <FileText size={15} color={BRAND_COLORS.yellow} />
                            <span
                              style={{
                                color: BRAND_COLORS.yellow,
                                fontSize: 13,
                                fontWeight: 800,
                              }}
                            >
                              Source03.pdf, Page 1
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SVG Animated Connector Curve (frame >= 215) */}
          {frame >= 215 && (
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 35,
                pointerEvents: 'none',
              }}
            >
              <path
                d="M 275 295 C 470 295, 680 235, 892 235"
                fill="none"
                stroke={BRAND_COLORS.yellow}
                strokeWidth="2.5"
                strokeDasharray="700"
                strokeDashoffset={700 * (1 - lineProgress)}
                filter="drop-shadow(0 0 10px rgba(244, 235, 42, 0.85))"
              />
              <circle cx="275" cy="295" r="4.5" fill={BRAND_COLORS.yellow} />
              <circle cx="892" cy="235" r="4.5" fill={BRAND_COLORS.yellow} />
            </svg>
          )}

          {/* RIGHT: High-Res Verified PDF Document Inspector */}
          <div
            style={{
              transform: `translateX(${pdfTranslateX}px) scale(${pdfSpring})`,
              opacity: pdfSpring,
            }}
          >
            <BentoCard
              width={520}
              height={500}
              glowColor="rgba(255, 214, 10, 0.35)"
              style={{
                border: `1.5px solid ${BRAND_COLORS.yellow}70`,
                padding: 24,
              }}
            >
              {/* Document Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                  paddingBottom: 12,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>📄</span>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 800 }}>
                      Source03_Building_Directory.pdf
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: 12 }}>
                      University of Makati Official Document
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: 'rgba(255, 214, 10, 0.2)',
                    color: BRAND_COLORS.yellow,
                    fontWeight: 800,
                    fontSize: 13,
                    padding: '4px 12px',
                    borderRadius: 6,
                  }}
                >
                  Page 1
                </span>
              </div>

              {/* Document Text Body with Animated Highlighter */}
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: 12,
                  padding: 18,
                  fontSize: 15,
                  color: '#94A3B8',
                  lineHeight: 1.8,
                }}
              >
                <div>Office of the President — Admin Bldg, 3rd Floor</div>
                <div>University Registrar — Admin Bldg, 1st Floor</div>

                {/* Highlighted Row */}
                <div
                  style={{
                    position: 'relative',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    margin: '6px 0',
                    display: 'inline-block',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: `${highlightWidth}%`,
                      backgroundColor: 'rgba(255, 214, 10, 0.38)',
                      borderBottom: `2.5px solid ${BRAND_COLORS.yellow}`,
                      borderRadius: 4,
                      zIndex: -1,
                    }}
                  />
                  &gt; CIT Office — Admin Bldg, 2nd Floor, South Wing
                </div>

                <div>Accounting &amp; Finance — Admin Bldg, 1st Floor</div>
                <div>CCIS Faculty Lounge — Admin Bldg, 4th Floor</div>
              </div>

              <div
                style={{
                  marginTop: 22,
                  display: 'flex',
                  alignItems: 'center',
                  color: BRAND_COLORS.green,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <span>✓ Verified UMak Source Match</span>
              </div>
            </BentoCard>
          </div>
        </div>

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene4" />
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
