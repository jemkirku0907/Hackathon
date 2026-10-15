import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { BentoCard } from '../../components/v3/BentoCard';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene3SolutionV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central Solution Headline Spring
  const titleSpring = spring({ frame: frame - 4, fps, config: SPRINGS.snappy });

  // Singularity bloom expanding at the start (frames 0 -> 24)
  const singularityScale = interpolate(frame, [0, 20], [0.1, 1.8], { extrapolateRight: 'clamp' });
  const singularityOpacity = interpolate(frame, [0, 10, 25], [0, 0.9, 0], { extrapolateRight: 'clamp' });

  // 4 Source Cards Staggered Springs (fan out)
  const s1Spring = spring({ frame: frame - 16, fps, config: SPRINGS.bouncy });
  const s2Spring = spring({ frame: frame - 24, fps, config: SPRINGS.bouncy });
  const s3Spring = spring({ frame: frame - 32, fps, config: SPRINGS.bouncy });
  const s4Spring = spring({ frame: frame - 40, fps, config: SPRINGS.bouncy });

  const floatY = Math.sin(frame * 0.045) * 6;

  const sources = [
    {
      id: 'Source01',
      title: 'Student Handbook & Academic Policies',
      desc: 'CCIS retention rules, grading criteria, university student regulations',
      springVal: s1Spring,
      color: BRAND_COLORS.blue,
      pages: '84 Pages',
      icon: '📘',
    },
    {
      id: 'Source02',
      title: 'Scholarships & Admissions Directory',
      desc: "Dean's List token fee exemption, financial aid & academic honors",
      springVal: s2Spring,
      color: BRAND_COLORS.cyan,
      pages: '42 Pages',
      icon: '📑',
    },
    {
      id: 'Source03',
      title: 'Building & Office Directory',
      desc: 'Admin Building South Wing 2F, CIT office, Registrar & Departments',
      springVal: s3Spring,
      color: BRAND_COLORS.yellow,
      pages: '36 Pages',
      icon: '🏢',
    },
    {
      id: 'Source04',
      title: 'Campus Map & Facilities Guide',
      desc: 'Building blueprints, floor layouts, wings, laboratories & navigation',
      springVal: s4Spring,
      color: BRAND_COLORS.green,
      pages: '28 Pages',
      icon: '🗺️',
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
        {/* Glowing Singularity Bloom */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${BRAND_COLORS.yellow} 0%, ${BRAND_COLORS.cyan} 50%, transparent 75%)`,
            transform: `translate(-50%, -50%) scale(${singularityScale})`,
            opacity: singularityOpacity,
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: 15,
          }}
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
          <h2
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: 0,
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              textAlign: 'center',
            }}
          >
            Meet <span style={{ color: BRAND_COLORS.yellow }}>TAGA-asK AI</span>
          </h2>
          <p
            style={{
              color: BRAND_COLORS.cyan,
              fontSize: 22,
              fontWeight: 700,
              marginTop: 10,
              letterSpacing: '0.2px',
              textShadow: `0 0 15px ${BRAND_COLORS.cyanGlow}`,
            }}
          >
            Answers grounded directly in official University of Makati sources
          </p>
        </div>

        {/* 4 Official Source Cards Grid (Fan Out) */}
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
                transform: `translateY(${interpolate(src.springVal, [0, 1], [90, 0])}px) scale(${src.springVal})`,
                opacity: src.springVal,
              }}
            >
              <BentoCard
                width={380}
                height={290}
                glowColor={`${src.color}35`}
                style={{
                  border: `1.5px solid ${src.color}60`,
                }}
              >
                {/* Document Type & Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 22 }}>{src.icon}</span>
                    <span
                      style={{
                        fontSize: 14,
                        color: src.color,
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {src.id}.pdf
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: '#94A3B8',
                      fontWeight: 600,
                    }}
                  >
                    {src.pages}
                  </span>
                </div>

                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 21,
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
                    marginTop: 24,
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
                      boxShadow: `0 0 8px ${BRAND_COLORS.green}`,
                    }}
                  />
                  <span
                    style={{
                      color: '#E2E8F0',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Official University Document
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
