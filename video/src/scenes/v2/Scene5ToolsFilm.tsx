import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FileText, CheckCircle2, MapPin, Compass, Building2, UploadCloud } from 'lucide-react';
import { CinematicEnvironment } from '../../components/CinematicEnvironment';
import { KaraokeCaption } from '../../components/KaraokeCaption';
import { BRAND_COLORS, SPRINGS } from '../../theme';

export const Scene5ToolsFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Attachment Feature (frames 0 - 150)
  // Part 2: Campus Map Feature (frames 150 - 300)
  // Transition between them at frame 145 - 165
  const slideSwap = spring({ frame: frame - 145, fps, config: SPRINGS.smooth });
  const card1Offset = interpolate(slideSwap, [0, 1], [0, -1800]);
  const card2Offset = interpolate(slideSwap, [0, 1], [1800, 0]);

  // --- CARD 1 (ATTACHMENT) ANIMATIONS ---
  const dragSpring = spring({ frame: frame - 15, fps, config: SPRINGS.bouncy });
  const dragY = interpolate(dragSpring, [0, 1], [-120, 0]);
  const dragRot = interpolate(dragSpring, [0, 1], [-8, 0]);

  // Upload Progress Ring (frames 30 -> 70)
  const uploadProgress = interpolate(frame, [30, 75], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringDash = interpolate(uploadProgress, [0, 100], [283, 0]);

  // AI Response bubble in Card 1
  const replySpring = spring({ frame: frame - 80, fps, config: SPRINGS.snappy });

  // --- CARD 2 (CAMPUS MAP) ANIMATIONS ---
  const mapFrame = frame - 150;
  const pinSpring = spring({ frame: mapFrame - 15, fps, config: { damping: 11, mass: 0.6 } });
  const pinY = interpolate(pinSpring, [0, 1], [-180, 0]);

  // Sonar radar pulse
  const radarScale = interpolate(mapFrame % 45, [0, 45], [0.8, 3.2]);
  const radarOpacity = interpolate(mapFrame % 45, [0, 10, 45], [0, 0.8, 0]);

  const tagSpring = spring({ frame: mapFrame - 35, fps, config: SPRINGS.bouncy });

  return (
    <CinematicEnvironment
      primaryGlow={BRAND_COLORS.cyan}
      secondaryGlow={BRAND_COLORS.yellow}
      cameraMove="panRight"
      durationInFrames={300}
    >
      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          backgroundColor: 'rgba(255, 214, 10, 0.15)',
          border: `1.5px solid ${BRAND_COLORS.yellow}`,
          color: BRAND_COLORS.yellow,
          fontSize: 16,
          fontWeight: 800,
          padding: '6px 24px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 40,
        }}
      >
        <Compass size={18} color={BRAND_COLORS.yellow} />
        <span>Multimodal Grounding &amp; Campus Tools</span>
      </div>

      <div
        style={{
          position: 'relative',
          width: 1360,
          height: 540,
          marginTop: 50,
          zIndex: 30,
        }}
      >
        {/* ========================================================
            CARD 1: MULTIMODAL FILE ATTACHMENTS (0 - 150 frames)
           ======================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${card1Offset}px)`,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 24,
            padding: '36px 48px',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 900 }}>
                Multimodal Document Attachments
              </div>
              <div style={{ color: BRAND_COLORS.cyan, fontSize: 18, marginTop: 4 }}>
                Drop PDFs, syllabi, or schedules directly into the conversation
              </div>
            </div>
            <span
              style={{
                backgroundColor: 'rgba(33, 173, 227, 0.2)',
                border: `1px solid ${BRAND_COLORS.cyan}`,
                color: BRAND_COLORS.cyan,
                fontSize: 14,
                fontWeight: 800,
                padding: '6px 16px',
                borderRadius: 8,
              }}
            >
              PDF • PNG • JPG
            </span>
          </div>

          {/* Interactive Drag & Drop Box with Circular Progress Ring */}
          <div
            style={{
              transform: `translateY(${dragY}px) rotate(${dragRot}deg)`,
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              border: `2px dashed ${uploadProgress >= 100 ? BRAND_COLORS.green : BRAND_COLORS.cyan}`,
              borderRadius: 18,
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  backgroundColor: 'rgba(33, 173, 227, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={32} color={BRAND_COLORS.cyan} />
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800 }}>
                  Class_Schedule_FirstSemester.pdf
                </div>
                <div style={{ color: '#94A3B8', fontSize: 15 }}>
                  2.4 MB • Processing with official UMak documents
                </div>
              </div>
            </div>

            {/* Circular Progress Ring or Checkmark */}
            <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {uploadProgress < 100 ? (
                <svg width="64" height="64" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={BRAND_COLORS.cyan}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset={ringDash}
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    border: `2px solid ${BRAND_COLORS.green}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2 size={30} color={BRAND_COLORS.green} />
                </div>
              )}
            </div>
          </div>

          {/* AI Reply Bubble */}
          <div
            style={{
              opacity: replySpring,
              transform: `scale(${replySpring})`,
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: BRAND_COLORS.green }} />
            <div style={{ color: '#E2E8F0', fontSize: 18, fontWeight: 600 }}>
              <span style={{ color: BRAND_COLORS.yellow, fontWeight: 800 }}>Schedule Verified: </span>
              All enrolled classes verified against College of Computing &amp; Information Sciences (Source02.pdf).
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 2: INTERACTIVE CAMPUS MAP (150 - 300 frames)
           ======================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${card2Offset}px)`,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(255, 255, 255, 0.16)',
            borderRadius: 24,
            padding: '32px 48px',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 900 }}>
                Interactive Campus Map Visualizer
              </div>
              <div style={{ color: BRAND_COLORS.yellow, fontSize: 18, marginTop: 4 }}>
                Instant room locator for buildings, levels, and wings
              </div>
            </div>
            <span
              style={{
                backgroundColor: 'rgba(255, 214, 10, 0.18)',
                border: `1px solid ${BRAND_COLORS.yellow}`,
                color: BRAND_COLORS.yellow,
                fontSize: 14,
                fontWeight: 800,
                padding: '6px 16px',
                borderRadius: 8,
              }}
            >
              Source03.pdf Integration
            </span>
          </div>

          {/* Stylized Architectural Campus Map Blueprint */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 310,
              backgroundColor: '#070C18',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            {/* Grid blueprint lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(33, 173, 227, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(33, 173, 227, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Campus Buildings Mock Blocks */}
            {/* HPSB Building */}
            <div
              style={{
                position: 'absolute',
                top: 50,
                right: 120,
                width: 220,
                height: 120,
                borderRadius: 12,
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              HPSB Building (12F)
            </div>

            {/* Grand Track Oval */}
            <div
              style={{
                position: 'absolute',
                bottom: 25,
                left: 100,
                width: 240,
                height: 110,
                borderRadius: 60,
                border: '2px dashed rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              UMak Athletic Oval
            </div>

            {/* Targeted Admin Building Block (Center stage) */}
            <div
              style={{
                position: 'absolute',
                top: 70,
                left: 440,
                width: 380,
                height: 170,
                borderRadius: 14,
                backgroundColor: 'rgba(63, 86, 202, 0.35)',
                border: `2px solid ${BRAND_COLORS.blue}`,
                boxShadow: `0 0 40px ${BRAND_COLORS.blue}50`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Building2 size={32} color="#FFFFFF" />
              <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900 }}>
                ADMIN BUILDING
              </div>
              <div style={{ color: '#93C5FD', fontSize: 13, fontWeight: 700 }}>
                Central Administration &amp; IT Hub
              </div>
            </div>

            {/* 3D MAP PIN DROPPING ONTO ADMIN BUILDING SOUTH WING */}
            {mapFrame >= 10 && (
              <div
                style={{
                  position: 'absolute',
                  top: 75,
                  left: 650,
                  transform: `translateY(${pinY}px)`,
                  zIndex: 35,
                }}
              >
                {/* Sonar Radar Rings */}
                <div
                  style={{
                    position: 'absolute',
                    top: 28,
                    left: 2,
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: `2.5px solid ${BRAND_COLORS.yellow}`,
                    transform: `scale(${radarScale})`,
                    opacity: radarOpacity,
                    pointerEvents: 'none',
                  }}
                />

                <MapPin size={48} color={BRAND_COLORS.yellow} fill={BRAND_COLORS.yellow} />

                {/* Floating Callout Label Tag Offset to the Right */}
                {mapFrame >= 30 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: 56,
                      transform: `scale(${tagSpring})`,
                      backgroundColor: 'rgba(15, 23, 42, 0.98)',
                      border: `1.5px solid ${BRAND_COLORS.yellow}`,
                      borderRadius: 14,
                      padding: '10px 18px',
                      whiteSpace: 'nowrap',
                      boxShadow: `0 10px 30px rgba(0,0,0,0.9), 0 0 25px ${BRAND_COLORS.yellow}50`,
                    }}
                  >
                    <div style={{ color: BRAND_COLORS.yellow, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Level 2 • South Wing
                    </div>
                    <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 800, marginTop: 2 }}>
                      CIT Office (Center for Information Tech)
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <KaraokeCaption sceneKey="scene5" />
    </CinematicEnvironment>
  );
};
