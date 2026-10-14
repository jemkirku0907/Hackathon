import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { BentoCard } from '../../components/v3/BentoCard';
import { HudOverlay } from '../../components/v3/HudOverlay';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene3SolutionV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central Solution Banner Spring
  const titleSpring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });

  // 4 Source Cards Staggered Springs
  const s1Spring = spring({ frame: frame - 18, fps, config: SPRINGS.snappy });
  const s2Spring = spring({ frame: frame - 28, fps, config: SPRINGS.snappy });
  const s3Spring = spring({ frame: frame - 38, fps, config: SPRINGS.snappy });
  const s4Spring = spring({ frame: frame - 48, fps, config: SPRINGS.snappy });

  const floatY = Math.sin(frame * 0.045) * 6;

  const sources = [
    {
      id: 'SOURCE 01',
      title: 'Student Handbook & Policies',
      desc: 'CCIS 85% retention rules, grading, university academic policies',
      springVal: s1Spring,
      color: BRAND_COLORS.blue,
      pages: '84 Pages',
    },
    {
      id: 'SOURCE 02',
      title: 'Scholarships & Admissions',
      desc: "Dean's List token fee exemption, financial aid & qualifications",
      springVal: s2Spring,
      color: BRAND_COLORS.cyan,
      pages: '42 Pages',
    },
    {
      id: 'SOURCE 03',
      title: 'Building & Office Directory',
      desc: 'Admin Building South Wing 2F, CIT office, University Registrar',
      springVal: s3Spring,
      color: BRAND_COLORS.yellow,
      pages: '36 Pages',
    },
    {
      id: 'SOURCE 04',
      title: 'Campus Map & Facilities',
      desc: 'Building blueprints, floor maps, wings, labs & facility access',
      springVal: s4Spring,
      color: BRAND_COLORS.green,
      pages: '28 Pages',
    },
  ];

  return (
    <WhipPanWrapper durationInFrames={232} direction="left">
      <CinematicEnvironment
        primaryGlow={BRAND_COLORS.blue}
        secondaryGlow={BRAND_COLORS.cyan}
        cameraMove="pushIn"
        durationInFrames={232}
      >
        <HudOverlay
          label="03 // THE SOLUTION"
          sublabel="GROUNDED RAG KNOWLEDGE BASE"
          globalFrameOffset={314}
        />

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
            transform: `scale(${titleSpring})`,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(33, 173, 227, 0.16)',
              border: `1px solid ${BRAND_COLORS.cyan}`,
              borderRadius: 999,
              padding: '6px 22px',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: BRAND_COLORS.cyan,
                boxShadow: `0 0 10px ${BRAND_COLORS.cyan}`,
              }}
            />
            <span
              style={{
                color: BRAND_COLORS.cyan,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Strictly Grounded RAG
            </span>
          </div>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              margin: 0,
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
            }}
          >
            Meet <span style={{ color: BRAND_COLORS.yellow }}>TAGA-asK AI</span>
          </h2>
          <p
            style={{
              color: '#94A3B8',
              fontSize: 20,
              marginTop: 6,
              letterSpacing: '0.5px',
            }}
          >
            Answers grounded directly in 4 official University of Makati documents
          </p>
        </div>

        {/* 4 Official Source Cards Grid */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 380px)',
            gap: 24,
            justifyContent: 'center',
            marginTop: 90,
            transform: `translateY(${floatY}px)`,
            zIndex: 25,
          }}
        >
          {sources.map((src, idx) => (
            <div
              key={idx}
              style={{
                transform: `translateY(${interpolate(src.springVal, [0, 1], [80, 0])}px) scale(${src.springVal})`,
                opacity: src.springVal,
              }}
            >
              <BentoCard
                width={380}
                height={290}
                badge={src.id}
                badgeColor={src.color}
                glowColor={`${src.color}35`}
                style={{
                  border: `1px solid ${src.color}50`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: src.color,
                      fontWeight: 800,
                      letterSpacing: '1px',
                    }}
                  >
                    PDF DOCUMENT
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {src.pages}
                  </span>
                </div>

                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 22,
                    fontWeight: 800,
                    lineHeight: 1.35,
                    marginBottom: 12,
                  }}
                >
                  {src.title}
                </div>

                <div
                  style={{
                    color: '#94A3B8',
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {src.desc}
                </div>

                <div
                  style={{
                    marginTop: 22,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: 14,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: BRAND_COLORS.green,
                    }}
                  />
                  <span
                    style={{
                      color: '#CBD5E1',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    100% Verified UMak Data
                  </span>
                </div>
              </BentoCard>
            </div>
          ))}
        </div>

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene3" />
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
