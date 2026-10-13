import React from 'react';
import { interpolate, spring, staticFile, Img, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../components/BackgroundGlow';
import { SubtitleOverlay } from '../components/SubtitleOverlay';
import { BRAND_COLORS } from '../types';

export const Scene3Attachments: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.9 },
  });

  // Action progression
  // Frame 0-60: Composer appears
  // Frame 60-120: Paperclip clicks and attachment chip springs into view
  const chipSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Question typing simulation
  const fullQuestion = 'Can you explain the scholarship token fee discount in this attached document?';
  const textChars = Math.min(
    fullQuestion.length,
    Math.floor(interpolate(frame, [80, 180], [0, fullQuestion.length], { extrapolateRight: 'clamp' }))
  );
  const typedText = fullQuestion.slice(0, textChars);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor={BRAND_COLORS.yellow} secondaryColor={BRAND_COLORS.blue} />

      {/* Top Feature Tag */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(209, 202, 37, 0.2)',
          border: `2px solid ${BRAND_COLORS.yellow}`,
          color: BRAND_COLORS.yellow,
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 26px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span>📎</span> MULTIMODAL ATTACHMENTS
      </div>

      {/* Composer Container */}
      <div
        style={{
          width: 960,
          backgroundColor: '#0F172A',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 32,
          padding: 36,
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8)',
          transform: `scale(${entrance})`,
          marginTop: -60,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Header label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Img
              src={staticFile('taga-bird.png')}
              style={{ width: 36, height: 36, objectFit: 'contain' }}
            />
            <span style={{ color: '#F8FAFC', fontSize: 20, fontWeight: 700 }}>
              Ask TAGA-asK AI with Documents & Images
            </span>
          </div>
          <span style={{ color: '#64748B', fontSize: 16 }}>Supports PNG, JPG, PDF (&lt;10MB)</span>
        </div>

        {/* Attachment Chip (Springs up when user selects file) */}
        {frame > 45 && (
          <div
            style={{
              transform: `scale(${chipSpring})`,
              transformOrigin: 'left center',
              backgroundColor: 'rgba(63, 86, 202, 0.25)',
              border: `2px solid ${BRAND_COLORS.blue}`,
              borderRadius: 20,
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: BRAND_COLORS.blue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: '#FFFFFF',
                }}
              >
                📄
              </div>
              <div>
                <p style={{ margin: 0, color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}>
                  UMak_Scholarship_Form_2026.pdf
                </p>
                <p style={{ margin: '4px 0 0', color: '#94A3B8', fontSize: 16 }}>
                  142.8 KB • Grounded Document
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                fontSize: 18,
              }}
            >
              ✕
            </div>
          </div>
        )}

        {/* Textarea Area */}
        <div
          style={{
            backgroundColor: '#090E1A',
            border: `2px solid ${frame > 80 ? BRAND_COLORS.blue : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 24,
            padding: '24px 28px',
            minHeight: 140,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              margin: 0,
              color: typedText ? '#FFFFFF' : '#64748B',
              fontSize: 24,
              lineHeight: 1.4,
              fontFamily: 'inherit',
            }}
          >
            {typedText || 'Ask a question about this attached file...'}
            {frame > 80 && frame < 200 && (
              <span style={{ color: BRAND_COLORS.yellow, fontWeight: 900 }}>|</span>
            )}
          </p>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingTop: 16,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Paperclip button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: frame > 40 ? 'rgba(63, 86, 202, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${frame > 40 ? BRAND_COLORS.blue : 'transparent'}`,
                  color: frame > 40 ? BRAND_COLORS.yellow : '#CBD5E1',
                  padding: '10px 20px',
                  borderRadius: 14,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                <span>📎</span> Attach
              </div>
              <span style={{ color: '#64748B', fontSize: 16 }}>
                {typedText.length}/500 chars
              </span>
            </div>

            {/* Send Button */}
            <div
              style={{
                backgroundColor: BRAND_COLORS.blue,
                color: '#FFFFFF',
                padding: '12px 32px',
                borderRadius: 16,
                fontWeight: 800,
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: `0 0 25px ${BRAND_COLORS.blue}80`,
              }}
            >
              <span>Send</span> ➔
            </div>
          </div>
        </div>
      </div>

      <SubtitleOverlay
        badge="Multimodal AI"
        text="Have a syllabus, schedule, or announcement? Just attach your images or documents, and ask directly with your own files."
        accentColor={BRAND_COLORS.yellow}
      />
    </div>
  );
};
