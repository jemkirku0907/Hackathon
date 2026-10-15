import React from 'react';
import { Audio, Sequence, Loop, staticFile } from 'remotion';
import { Scene1IntroFilm } from './scenes/v2/Scene1IntroFilm';
import { Scene2ProblemFilm } from './scenes/v2/Scene2ProblemFilm';
import { Scene3SolutionFilm } from './scenes/v2/Scene3SolutionFilm';
import { Scene4CitationFilm } from './scenes/v2/Scene4CitationFilm';
import { Scene5ToolsFilm } from './scenes/v2/Scene5ToolsFilm';
import { Scene6AccessControlFilm } from './scenes/v2/Scene6AccessControlFilm';
import { Scene7OutroFilm } from './scenes/v2/Scene7OutroFilm';

export const PromoVideoV2Landscape: React.FC = () => {
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
      {/* Background Music Bed (Subtle Uplifting Modern Ambient Loop) */}
      <Loop durationInFrames={660}>
        <Audio src={staticFile('audio/v2/music_bed.mp3')} volume={0.16} />
      </Loop>

      {/* 1. Cinematic Animated Logo Reveal (0 - 150 frames / ~5.0s) */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1IntroFilm />
        <Audio src={staticFile('audio/master/m_scene1_intro.mp3')} volume={1.0} />
        <Sequence from={40} durationInFrames={80}>
          <Audio src={staticFile('audio/v2/sfx_impact.mp3')} volume={0.85} />
        </Sequence>
      </Sequence>

      {/* 2. The Problem: Students Asking on Facebook (150 - 360 frames / ~7.0s) */}
      <Sequence from={150} durationInFrames={210}>
        <Scene2ProblemFilm />
        <Audio src={staticFile('audio/master/m_scene2_problem.mp3')} volume={1.0} />
        <Sequence from={15} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.5} />
        </Sequence>
        <Sequence from={68} durationInFrames={60}>
          <Audio src={staticFile('audio/v2/sfx_impact_soft.mp3')} volume={0.6} />
        </Sequence>
      </Sequence>

      {/* 3. Introduce the Solution: Meet TAGA-asK AI (360 - 510 frames / ~5.0s) */}
      <Sequence from={360} durationInFrames={150}>
        <Scene3SolutionFilm />
        <Audio src={staticFile('audio/master/m_scene3_solution.mp3')} volume={1.0} />
        <Sequence from={12} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_rise.mp3')} volume={0.5} />
        </Sequence>
      </Sequence>

      {/* 4. Hero Demo: Grounded CIT Query & Verified Citation (510 - 930 frames / ~14.0s) */}
      <Sequence from={510} durationInFrames={420}>
        <Scene4CitationFilm />
        <Audio src={staticFile('audio/master/m_scene4_demo.mp3')} volume={1.0} />
        <Sequence from={68} durationInFrames={35}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.65} />
        </Sequence>
        <Sequence from={230} durationInFrames={60}>
          <Audio src={staticFile('audio/v2/sfx_rise.mp3')} volume={0.55} />
        </Sequence>
      </Sequence>

      {/* 5. Demonstrate Real Features: Multimodal & Campus Tools (930 - 1230 frames / ~10.0s) */}
      <Sequence from={930} durationInFrames={300}>
        <Scene5ToolsFilm />
        <Audio src={staticFile('audio/master/m_scene5_features.mp3')} volume={1.0} />
        <Sequence from={20} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.5} />
        </Sequence>
        <Sequence from={160} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.6} />
        </Sequence>
      </Sequence>

      {/* 6. Security & Responsible Rate Limiting (1230 - 1470 frames / ~8.0s) */}
      <Sequence from={1230} durationInFrames={240}>
        <Scene6AccessControlFilm />
        <Audio src={staticFile('audio/master/m_scene6_security.mp3')} volume={1.0} />
        <Sequence from={25} durationInFrames={50}>
          <Audio src={staticFile('audio/v2/sfx_shield.mp3')} volume={0.7} />
        </Sequence>
        <Sequence from={70} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_deny.mp3')} volume={0.65} />
        </Sequence>
      </Sequence>

      {/* 7. Closing Outro: Big Logo Return, URL CTA & Fade to Black (1470 - 1710 frames / ~8.0s) */}
      <Sequence from={1470} durationInFrames={240}>
        <Scene7OutroFilm />
        <Audio src={staticFile('audio/master/m_scene7_outro.mp3')} volume={1.0} />
        <Sequence from={15} durationInFrames={80}>
          <Audio src={staticFile('audio/v2/sfx_impact_soft.mp3')} volume={0.8} />
        </Sequence>
        <Sequence from={154} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.5} />
        </Sequence>
      </Sequence>
    </div>
  );
};
