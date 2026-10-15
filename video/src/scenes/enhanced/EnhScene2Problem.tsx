import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundGlow } from '../../components/BackgroundGlow';
import { SubtitleOverlay } from '../../components/SubtitleOverlay';
import { FloatingParticles, BrandMotionRings } from '../../components/FloatingElements';
import { BRAND_COLORS } from '../../types';

export const EnhScene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card 1 enters sliding from the left with smooth spring & slight tilt
  const post1Spring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.9 },
  });
  const post1X = interpolate(post1Spring, [0, 1], [-280, 0]);
  const post1Rotate = interpolate(post1Spring, [0, 1], [-6, -1]);

  // Card 2 gently rises from below with slight delay
  const post2Spring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 13, mass: 0.9 },
  });
  const post2Y = interpolate(post2Spring, [0, 1], [220, 0]);
  const post2Rotate = interpolate(post2Spring, [0, 1], [6, 1.5]);

  // Continuous subtle floating drift and parallax
  const driftY = interpolate(frame, [0, 265], [0, -30], { extrapolateRight: 'clamp' });
  const floatCard1 = Math.sin(frame * 0.05) * 6;
  const floatCard2 = Math.cos(frame * 0.04) * 7;

  // Floating question marks drifting across space
  const qMark1Y = Math.sin(frame * 0.04) * 16;
  const qMark2Y = Math.cos(frame * 0.05) * 20;

  // Camera transition zoom towards the end to transition into Chatbot
  const cameraZoom = interpolate(frame, [220, 265], [1, 1.12], { extrapolateRight: 'clamp' });
  const cameraFade = interpolate(frame, [245, 265], [1, 0.85], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: '1080px',
        height: '1920px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <BackgroundGlow primaryColor="#334155" secondaryColor={BRAND_COLORS.red} />
      <FloatingParticles count={20} color="#F87171" seed={2} />
      <BrandMotionRings size={850} color={BRAND_COLORS.red} accentColor={BRAND_COLORS.yellow} />

      {/* Floating drifting question mark / comment icons */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 320,
          fontSize: 48,
          opacity: 0.6,
          transform: `translateY(${qMark1Y}px) rotate(-15deg)`,
          filter: 'drop-shadow(0 0 15px rgba(236,32,43,0.5))',
        }}
      >
        ❓
      </div>
      <div
        style={{
          position: 'absolute',
          right: 70,
          top: 480,
          fontSize: 54,
          opacity: 0.5,
          transform: `translateY(${qMark2Y}px) rotate(18deg)`,
          filter: 'drop-shadow(0 0 15px rgba(209,202,37,0.5))',
        }}
      >
        💬
      </div>
      <div
        style={{
          position: 'absolute',
          left: 90,
          bottom: 400,
          fontSize: 42,
          opacity: 0.45,
          transform: `translateY(${-qMark1Y}px) rotate(12deg)`,
        }}
      >
        ⏳
      </div>

      {/* Top Problem Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          backgroundColor: 'rgba(236, 32, 43, 0.25)',
          border: `2px solid ${BRAND_COLORS.red}`,
          color: '#FCA5A5',
          fontSize: 22,
          fontWeight: 800,
          padding: '8px 28px',
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 20,
          boxShadow: '0 0 25px rgba(236, 32, 43, 0.4)',
        }}
      >
        <span>⚠️</span> THE STUDENT DILEMMA
      </div>

      {/* Layered Composition with Depth & Parallax */}
      <div
        style={{
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          transform: `scale(${cameraZoom}) translateY(${driftY}px)`,
          opacity: cameraFade,
          marginTop: -30,
          zIndex: 10,
        }}
      >
        {/* Real Facebook Post 1: Slides from Left */}
        <div
          style={{
            position: 'relative',
            width: 890,
            transform: `translateX(${post1X}px) translateY(${floatCard1}px) rotate(${post1Rotate}deg)`,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px rgba(236, 32, 43, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: '#242526',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_cit_post.png')}
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />

          {/* Glowing Unanswered Callout Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 20,
              backgroundColor: 'rgba(236, 32, 43, 0.92)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 14,
              padding: '6px 14px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 0 20px rgba(236, 32, 43, 0.8)',
            }}
          >
            <span>💬</span> 0 COMMENTS • WAITING FOR REPLIES
          </div>
        </div>

        {/* Real Facebook Post 2: Rises from Below */}
        <div
          style={{
            position: 'relative',
            width: 890,
            transform: `translateY(${post2Y + floatCard2}px) rotate(${post2Rotate}deg)`,
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 35px rgba(209, 202, 37, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backgroundColor: '#242526',
          }}
        >
          <Img
            src={staticFile('screenshots/fb_keli_post.png')}
            style={{ width: '100%', display: 'block', objectFit: 'contain' }}
          />

          {/* Unanswered Status */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 20,
              backgroundColor: 'rgba(209, 202, 37, 0.92)',
              color: '#0F172A',
              fontWeight: 900,
              fontSize: 14,
              padding: '6px 14px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 0 20px rgba(209, 202, 37, 0.7)',
            }}
          >
            <span>❓</span> UNRESOLVED QUESTION
          </div>
        </div>

        {/* Bold Headline Callout */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 44,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.9)',
            }}
          >
            May tanong ka. Pero minsan, <span style={{ color: BRAND_COLORS.yellow }}>walang sumasagot.</span>
          </h2>
          <p
            style={{
              margin: '8px 0 0',
              fontSize: 22,
              fontWeight: 600,
              color: '#CBD5E1',
            }}
          >
            Hours of waiting in Facebook groups and threads with zero replies.
          </p>
        </div>
      </div>

      <SubtitleOverlay
        badge="The Student Problem"
        text="Ever asked a question in a student group, only to wait hours with zero replies? May tanong ka, pero minsan, walang sumasagot."
        accentColor={BRAND_COLORS.red}
      />
    </div>
  );
};
