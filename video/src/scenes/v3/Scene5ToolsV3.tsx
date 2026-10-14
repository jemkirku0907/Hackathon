import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { BentoCard } from '../../components/v3/BentoCard';
import { HudOverlay } from '../../components/v3/HudOverlay';
import { KineticKaraoke } from '../../components/v3/KineticKaraoke';
import { WhipPanWrapper } from '../../components/v3/WhipPanWrapper';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene5ToolsV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Attachments (frames 0 -> 110)
  const attachSpring = spring({ frame: frame - 6, fps, config: SPRINGS.snappy });

  // Part 2: Real Campus Map Visualizer (frames 105 -> 239)
  const mapSpring = spring({ frame: frame - 105, fps, config: SPRINGS.snappy });
  const isMapPhase = frame >= 105;

  // Radar wave pulsing over the Admin Building on the real map
  const radarWave = interpolate(
    ((frame - 105) * 0.07) % 1,
    [0, 1],
    [10, 100]
  );
  const radarOpacity = interpolate(
    ((frame - 105) * 0.07) % 1,
    [0, 0.5, 1],
    [0.9, 0.4, 0]
  );

  // Focus glow pulse on South Wing CIT line
  const citLineGlow = interpolate(
    Math.sin((frame - 110) * 0.15),
    [-1, 1],
    [0.7, 1.0]
  );

  return (
    <WhipPanWrapper durationInFrames={239} direction="left">
      <CinematicEnvironment
        primaryGlow={BRAND_COLORS.cyan}
        secondaryGlow={BRAND_COLORS.yellow}
        cameraMove="pushIn"
        durationInFrames={239}
      >
        <HudOverlay
          label="05 // MULTIMODAL & CAMPUS MAP"
          sublabel="ATTACHMENTS + REAL UMAK CAMPUS MAP UI"
          globalFrameOffset={956}
        />

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
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(33, 173, 227, 0.16)',
              border: `1px solid ${BRAND_COLORS.cyan}80`,
              borderRadius: 999,
              padding: '6px 22px',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: isMapPhase ? BRAND_COLORS.yellow : BRAND_COLORS.cyan,
                boxShadow: `0 0 10px ${isMapPhase ? BRAND_COLORS.yellow : BRAND_COLORS.cyan}`,
              }}
            />
            <span
              style={{
                color: isMapPhase ? BRAND_COLORS.yellow : BRAND_COLORS.cyan,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {isMapPhase ? 'Interactive Campus Map' : 'Multimodal File Attachment'}
            </span>
          </div>
          <h2
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              margin: 0,
              textShadow: '0 4px 25px rgba(0,0,0,0.9)',
            }}
          >
            {isMapPhase
              ? 'Real-Time Campus Map & Floor Visualizer'
              : 'Attach Any Image or PDF Document'}
          </h2>
        </div>

        {/* Dynamic Stage: Shows Attachment in Part 1, Expands Real Map UI in Part 2 */}
        {!isMapPhase ? (
          /* PART 1: Multimodal File Attachment & Extraction */
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
              marginTop: 75,
              zIndex: 25,
              transform: `scale(${attachSpring})`,
              opacity: attachSpring,
            }}
          >
            <BentoCard
              width={780}
              height={440}
              badge="Multimodal Document Parser"
              badgeColor={BRAND_COLORS.cyan}
              glowColor="rgba(33, 173, 227, 0.35)"
              style={{ padding: 32 }}
            >
              <div style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
                Attach an Image or a PDF and Ask About It
              </div>
              <div style={{ color: '#94A3B8', fontSize: 16, marginBottom: 24 }}>
                Instant multimodal extraction for schedules, grade evaluations, and official memos
              </div>

              {/* Upload Dropzone UI matching the real app attach button */}
              <div
                style={{
                  border: '2px dashed rgba(33, 173, 227, 0.55)',
                  backgroundColor: 'rgba(33, 173, 227, 0.08)',
                  borderRadius: 18,
                  padding: '24px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    backgroundColor: 'rgba(33, 173, 227, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                  }}
                >
                  📎
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>
                    Dean_List_Grade_Evaluation.pdf
                  </div>
                  <div style={{ color: BRAND_COLORS.cyan, fontSize: 14, marginTop: 4 }}>
                    Analyzed in 1.2s · 4 Pages Extracted · Grounded in Source02
                  </div>
                </div>
              </div>

              {/* Extracted Insights Pill List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 600 }}>
                    Dean&apos;s List GWA Requirement: 1.45 or better
                  </span>
                  <span style={{ color: BRAND_COLORS.green, fontSize: 14, fontWeight: 800 }}>
                    ✓ QUALIFIED
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 600 }}>
                    Token Fee Waiver Status
                  </span>
                  <span style={{ color: BRAND_COLORS.yellow, fontSize: 14, fontWeight: 800 }}>
                    100% EXEMPTED
                  </span>
                </div>
              </div>
            </BentoCard>
          </div>
        ) : (
          /* PART 2: REAL UMAK CAMPUS MAP & LOCATION VISUALIZER MODAL */
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 65,
              zIndex: 25,
              transform: `scale(${mapSpring})`,
              opacity: mapSpring,
            }}
          >
            {/* The Real Modal Container */}
            <div
              style={{
                position: 'relative',
                width: 1040,
                height: 520,
                backgroundColor: '#070D1F',
                borderRadius: 22,
                border: `2px solid ${BRAND_COLORS.yellow}80`,
                boxShadow: `0 30px 80px rgba(0, 0, 0, 0.95), 0 0 40px ${BRAND_COLORS.yellow}40`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Real UI Screenshot */}
              <Img
                src={staticFile('screenshots/real_umak_campus_map_ui.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Pulsing Radar Ring over the Admin Building Pin */}
              <div
                style={{
                  position: 'absolute',
                  top: '46%',
                  left: '24%',
                  width: radarWave,
                  height: radarWave,
                  borderRadius: '50%',
                  border: `2.5px solid ${BRAND_COLORS.yellow}`,
                  transform: 'translate(-50%, -50%)',
                  opacity: radarOpacity,
                  pointerEvents: 'none',
                  boxShadow: `0 0 15px ${BRAND_COLORS.yellow}`,
                }}
              />

              {/* Highlight Box over "Center for Information Technology (CIT)" under South Wing */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '6.2%',
                  right: '3.5%',
                  width: 335,
                  height: 32,
                  borderRadius: 8,
                  border: `2px solid ${BRAND_COLORS.yellow}`,
                  backgroundColor: 'rgba(255, 214, 10, 0.22)',
                  boxShadow: `0 0 20px ${BRAND_COLORS.yellowGlow}`,
                  opacity: citLineGlow,
                  pointerEvents: 'none',
                }}
              />

              {/* Floating Verified Pin Annotation */}
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 24,
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  border: `1.5px solid ${BRAND_COLORS.yellow}`,
                  borderRadius: 10,
                  padding: '8px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
                  zIndex: 40,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: BRAND_COLORS.yellow,
                    boxShadow: `0 0 8px ${BRAND_COLORS.yellow}`,
                  }}
                />
                <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 800 }}>
                  📍 Verified Match: Admin Bldg · 2nd Floor (South Wing)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Karaoke Caption */}
        <KineticKaraoke sceneId="scene5" />
      </CinematicEnvironment>
    </WhipPanWrapper>
  );
};
