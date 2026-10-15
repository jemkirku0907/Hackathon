import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CheckCircle2, FileText, Sparkles, Building2 } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene4CitationFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic Camera Choreography:
  // Phase 1 (0-110): Zoomed on user typing
  // Phase 2 (110-230): Panning to streaming AI answer
  // Phase 3 (230-420): Pulling back to frame both columns and PDF preview card
  const cameraY = interpolate(frame, [0, 80, 200, 320], [25, 5, -20, -25], {
    extrapolateRight: 'clamp',
  });
  const cameraScale = interpolate(frame, [0, 100, 240, 420], [1.06, 1.03, 1.0, 1.02], {
    extrapolateRight: 'clamp',
  });

  // User Message Typing Animation
  const userBubbleSpring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });
  const fullUserQuery = 'Saan po ang CIT office sa Admin Building?';
  const userTypeProgress = interpolate(frame, [12, 60], [0, fullUserQuery.length], {
    extrapolateRight: 'clamp',
  });
  const typedUserQuery = fullUserQuery.slice(0, Math.floor(userTypeProgress));
  const showUserCaret = frame < 75 && Math.floor(frame / 6) % 2 === 0;

  // AI Response Stream Animation
  const aiBubbleSpring = spring({ frame: frame - 68, fps, config: SPRINGS.smooth });
  const aiTokens = [
    'Ang', 'CIT', '(Center', 'for', 'Information', 'Technology)', 'office',
    'ay', 'matatagpuan', 'sa', 'Second', 'Floor,', 'South', 'Wing,', 'Admin', 'Building.'
  ];
  const streamedCount = Math.floor(
    interpolate(frame, [78, 160], [0, aiTokens.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Yellow Marker Highlight on "Second Floor, South Wing, Admin Building"
  const markerSpring = spring({ frame: frame - 175, fps, config: SPRINGS.smooth });
  const markerWidth = interpolate(markerSpring, [0, 1], [0, 100]);

  // Animated Curved SVG Connector Line (frames 215 -> 265)
  const lineProgress = spring({ frame: frame - 215, fps, config: SPRINGS.smooth });
  const lineDashoffset = interpolate(lineProgress, [0, 1], [300, 0]);

  // Floating Citation Chip & Mini PDF Preview Card (frames 235 -> 420)
  const citationSpring = spring({ frame: frame - 235, fps, config: SPRINGS.bouncy });
  const previewSpring = spring({ frame: frame - 255, fps, config: SPRINGS.snappy });

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.blue}
      secondaryGlow={BRAND_COLORS.yellow}
      cameraMove="none"
      durationInFrames={420}
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
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
          transformOrigin: 'center center',
        }}
      >
        {/* Top Floating Badge */}
        <div
          style={{
            position: 'absolute',
            top: 45,
            backgroundColor: 'rgba(34, 197, 94, 0.16)',
            border: `1.5px solid ${BRAND_COLORS.green}`,
            color: '#86EFAC',
            fontSize: 16,
            fontWeight: 800,
            padding: '6px 24px',
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            zIndex: 40,
            boxShadow: `0 0 20px ${BRAND_COLORS.green}40`,
          }}
        >
          <CheckCircle2 size={18} color={BRAND_COLORS.green} />
          <span>Strictly Grounded &amp; Verified RAG</span>
        </div>

        {/* Hero Interactive Chat Interface Window (Side-by-Side 2-Column Split: Zero Overlap!) */}
        <div
          style={{
            width: 1540,
            backgroundColor: '#090E1A',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 24,
            padding: '28px 36px',
            boxShadow:
              '0 35px 100px rgba(0, 0, 0, 0.9), 0 0 60px rgba(63, 86, 202, 0.3)',
            display: 'flex',
            gap: 36,
            alignItems: 'center',
            zIndex: 30,
            marginTop: 40,
            position: 'relative',
          }}
        >
          {/* ========================================================
              LEFT COLUMN: USER QUESTION & ASSISTANT RESPONSE (960px)
             ======================================================== */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 960,
            }}
          >
            {/* USER MESSAGE ROW */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                opacity: userBubbleSpring,
                transform: `scale(${userBubbleSpring})`,
              }}
            >
              <div
                style={{
                  maxWidth: 750,
                  backgroundColor: BRAND_COLORS.blue,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px 20px 4px 20px',
                  padding: '14px 22px',
                  boxShadow: '0 10px 30px rgba(63, 86, 202, 0.4)',
                }}
              >
                <div style={{ color: '#E0E7FF', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                  UMak Student
                </div>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 24,
                    fontWeight: 600,
                    lineHeight: 1.35,
                  }}
                >
                  {typedUserQuery}
                  {showUserCaret && (
                    <span style={{ color: BRAND_COLORS.yellow, fontWeight: 800 }}>|</span>
                  )}
                </div>
              </div>
            </div>

            {/* AI ASSISTANT RESPONSE ROW */}
            {frame >= 68 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  opacity: aiBubbleSpring,
                  transform: `scale(${aiBubbleSpring})`,
                }}
              >
                {/* Heron Avatar */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: '#1E293B',
                    border: `2px solid ${BRAND_COLORS.yellow}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${BRAND_COLORS.yellow}40`,
                  }}
                >
                  <Img
                    src={staticFile('heron-mascot.png')}
                    style={{ width: 40, height: 40, objectFit: 'contain' }}
                  />
                </div>

                {/* Response Message Body */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: '#0F172A',
                    border: '1.5px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '4px 22px 22px 22px',
                    padding: '20px 26px',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.75)',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 800 }}>
                      TAGA-asK AI
                    </span>
                    <span
                      style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        border: '1px solid #22C55E',
                        color: '#86EFAC',
                        fontSize: 12,
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      Grounded RAG
                    </span>
                  </div>

                  {/* Token-by-Token Streaming Answer Text */}
                  <div
                    style={{
                      color: '#F8FAFC',
                      fontSize: 25,
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {aiTokens.slice(0, streamedCount).map((token, idx) => {
                      const isKeyPhrase = idx >= 10;
                      return (
                        <span
                          key={idx}
                          style={{
                            marginRight: 7,
                            position: 'relative',
                            display: 'inline-block',
                            fontWeight: isKeyPhrase ? 800 : 500,
                            color: isKeyPhrase && frame >= 180 ? BRAND_COLORS.yellow : '#F8FAFC',
                            textShadow:
                              isKeyPhrase && frame >= 180
                                ? `0 0 20px ${BRAND_COLORS.yellow}80`
                                : 'none',
                          }}
                        >
                          {token}
                        </span>
                      );
                    })}
                  </div>

                  {/* Marker underline indicator under key location phrase */}
                  {frame >= 175 && (
                    <div
                      style={{
                        marginTop: 10,
                        height: 4,
                        width: `${markerWidth}%`,
                        maxWidth: 380,
                        backgroundColor: BRAND_COLORS.yellow,
                        borderRadius: 2,
                        boxShadow: `0 0 15px ${BRAND_COLORS.yellow}`,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ========================================================
              RIGHT COLUMN: DEDICATED CITATION & PDF PREVIEW (480px)
             ======================================================== */}
          <div
            style={{
              width: 480,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              zIndex: 35,
              position: 'relative',
            }}
          >
            {/* SVG Connector Curve bridging Left Column to Right Column */}
            {frame >= 215 && (
              <svg
                style={{
                  position: 'absolute',
                  top: 40,
                  left: -40,
                  width: 50,
                  height: 60,
                  pointerEvents: 'none',
                  zIndex: 40,
                  overflow: 'visible',
                }}
              >
                <path
                  d="M -30 40 C -10 40, -10 15, 10 15"
                  fill="none"
                  stroke={BRAND_COLORS.yellow}
                  strokeWidth="3.5"
                  strokeDasharray="300"
                  strokeDashoffset={lineDashoffset}
                  strokeLinecap="round"
                  filter={`drop-shadow(0 0 10px ${BRAND_COLORS.yellow})`}
                />
              </svg>
            )}

            {/* Citation Chip */}
            {frame >= 230 && (
              <div
                style={{
                  transform: `scale(${citationSpring})`,
                  backgroundColor: 'rgba(15, 23, 42, 0.98)',
                  border: `2px solid ${BRAND_COLORS.yellow}`,
                  borderRadius: 18,
                  padding: '14px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  boxShadow: `0 15px 40px rgba(0, 0, 0, 0.9), 0 0 30px ${BRAND_COLORS.yellow}40`,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255, 214, 10, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FileText size={24} color={BRAND_COLORS.yellow} />
                </div>
                <div>
                  <div
                    style={{
                      color: BRAND_COLORS.yellow,
                      fontSize: 12,
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Exact Source Citation
                  </div>
                  <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 800 }}>
                    Source03.pdf • Page 1
                  </div>
                </div>
              </div>
            )}

            {/* Mini PDF Page Preview Card */}
            {frame >= 250 && (
              <div
                style={{
                  transform: `scale(${previewSpring})`,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 18,
                  padding: '18px 24px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  color: '#0F172A',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1.5px solid #E2E8F0',
                    paddingBottom: 8,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Building2 size={16} color="#3F56CA" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#3F56CA' }}>
                      Source03.pdf — Page 1
                    </span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>
                    Admin Building
                  </span>
                </div>

                <div style={{ fontSize: 13, color: '#475569', marginBottom: 6 }}>
                  Level 2 • Floor Plan Directory:
                </div>

                {/* Highlighted exact citation sentence */}
                <div
                  style={{
                    backgroundColor: '#FEF08A',
                    borderLeft: '3.5px solid #CA8A04',
                    padding: '8px 12px',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#713F12',
                    lineHeight: 1.4,
                  }}
                >
                  "South Wing: Center for Information Technology (CIT) &amp; Learning Hub"
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <KaraokeCaption sceneKey="scene4" />
    </CinematicEnvironment>
  );
};
