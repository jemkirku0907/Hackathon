import React from 'react';
import { Audio, Loop, Sequence, staticFile } from 'remotion';
import { Scene1IntroV3 } from './scenes/v3/Scene1IntroV3';
import { Scene2ProblemV3 } from './scenes/v3/Scene2ProblemV3';
import { Scene3SolutionV3 } from './scenes/v3/Scene3SolutionV3';
import { Scene4CitationDemoV3 } from './scenes/v3/Scene4CitationDemoV3';
import { Scene5ToolsV3 } from './scenes/v3/Scene5ToolsV3';
import { Scene6SecurityV3 } from './scenes/v3/Scene6SecurityV3';
import { Scene7OutroV3 } from './scenes/v3/Scene7OutroV3';
import { VOICEOVER_DATA } from './voiceover-timings';

export const PromoVideoV3Landscape: React.FC = () => {
  const scenes = VOICEOVER_DATA.scenes;

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#070B14',
        overflow: 'hidden',
      }}
    >
      {/* 1. SINGLE CONTINUOUS MASTER VOICEOVER TRACK AT ROOT */}
      {/* Plays uninterrupted across all scenes, driven by exact word alignments */}
      <Audio src={staticFile('voiceover.mp3')} volume={1.0} />

      {/* 2. Background Modern Ambient Music Bed Loop */}
      <Loop durationInFrames={660}>
        <Audio src={staticFile('audio/v2/music_bed.mp3')} volume={0.14} />
      </Loop>

      {/* 3. SCENE 1: Brand Intro & 7-Beat Logo Reveal (0 -> 128 frames) */}
      <Sequence from={scenes[0].startFrame} durationInFrames={scenes[0].durationInFrames}>
        <Scene1IntroV3 />
        <Sequence from={42} durationInFrames={60}>
          <Audio src={staticFile('audio/v2/sfx_impact.mp3')} volume={0.8} />
        </Sequence>
      </Sequence>

      {/* 4. SCENE 2: The Problem - Facebook Groups with Zero Replies (128 -> 314 frames) */}
      <Sequence from={scenes[1].startFrame} durationInFrames={scenes[1].durationInFrames}>
        <Scene2ProblemV3 />
        <Sequence from={4} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.45} />
        </Sequence>
        <Sequence from={50} durationInFrames={50}>
          <Audio src={staticFile('audio/v2/sfx_impact_soft.mp3')} volume={0.5} />
        </Sequence>
      </Sequence>

      {/* 5. SCENE 3: The Solution - Meet TAGA-asK AI & 4 PDF Sources (314 -> 546 frames) */}
      <Sequence from={scenes[2].startFrame} durationInFrames={scenes[2].durationInFrames}>
        <Scene3SolutionV3 />
        <Sequence from={4} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.45} />
        </Sequence>
        <Sequence from={18} durationInFrames={50}>
          <Audio src={staticFile('audio/v2/sfx_rise.mp3')} volume={0.5} />
        </Sequence>
      </Sequence>

      {/* 6. SCENE 4: Hero Demo - CIT South Wing 2F & Exact Source 03 Citation (546 -> 956 frames) */}
      <Sequence from={scenes[3].startFrame} durationInFrames={scenes[3].durationInFrames}>
        <Scene4CitationDemoV3 />
        <Sequence from={4} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.45} />
        </Sequence>
        <Sequence from={68} durationInFrames={35}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.6} />
        </Sequence>
        <Sequence from={220} durationInFrames={50}>
          <Audio src={staticFile('audio/v2/sfx_rise.mp3')} volume={0.55} />
        </Sequence>
      </Sequence>

      {/* 7. SCENE 5: Multimodal Uploads & Interactive Campus Map (956 -> 1195 frames) */}
      <Sequence from={scenes[4].startFrame} durationInFrames={scenes[4].durationInFrames}>
        <Scene5ToolsV3 />
        <Sequence from={4} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.45} />
        </Sequence>
        <Sequence from={45} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.6} />
        </Sequence>
      </Sequence>

      {/* 8. SCENE 6: Rate Limiting Throttling & UMak SSO Only (1195 -> 1455 frames) */}
      <Sequence from={scenes[5].startFrame} durationInFrames={scenes[5].durationInFrames}>
        <Scene6SecurityV3 />
        <Sequence from={4} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.45} />
        </Sequence>
        <Sequence from={20} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_shield.mp3')} volume={0.7} />
        </Sequence>
        <Sequence from={60} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_deny.mp3')} volume={0.65} />
        </Sequence>
      </Sequence>

      {/* 9. SCENE 7: Outro - Big Brand Return, Serif Tagline & Live CTA (1455 -> 1710 frames) */}
      <Sequence from={scenes[6].startFrame} durationInFrames={scenes[6].durationInFrames}>
        <Scene7OutroV3 />
        <Sequence from={4} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.45} />
        </Sequence>
        <Sequence from={15} durationInFrames={60}>
          <Audio src={staticFile('audio/v2/sfx_impact_soft.mp3')} volume={0.75} />
        </Sequence>
        <Sequence from={150} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.65} />
        </Sequence>
      </Sequence>
    </div>
  );
};
