import React from 'react';
import { Audio, Sequence, Loop, staticFile } from 'remotion';
import { MasterScene1Intro } from './scenes/master/MasterScene1Intro';
import { MasterScene2Problem } from './scenes/master/MasterScene2Problem';
import { MasterScene3Solution } from './scenes/master/MasterScene3Solution';
import { MasterScene4DemoCIT } from './scenes/master/MasterScene4DemoCIT';
import { MasterScene5Features } from './scenes/master/MasterScene5Features';
import { MasterScene6Security } from './scenes/master/MasterScene6Security';
import { MasterScene7Outro } from './scenes/master/MasterScene7Outro';

export const PromoVideo: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: '#090E1A',
        overflow: 'hidden',
      }}
    >
      {/* Background Music Bed (Subtle Uplifting Tech Ambient Loop) */}
      <Loop durationInFrames={660}>
        <Audio src={staticFile('audio/v2/music_bed.mp3')} volume={0.16} />
      </Loop>

      {/* 1. Cinematic Animated Logo Reveal (0 - 150 frames / ~5.0s) */}
      <Sequence from={0} durationInFrames={150}>
        <MasterScene1Intro />
        <Audio src={staticFile('audio/master/m_scene1_intro.mp3')} volume={1.0} />
        {/* Synchronized Cinematic Impact Boom */}
        <Sequence from={38} durationInFrames={80}>
          <Audio src={staticFile('audio/v2/sfx_impact.mp3')} volume={0.85} />
        </Sequence>
      </Sequence>

      {/* 2. The Problem: Students Asking on Facebook (150 - 360 frames / ~7.0s) */}
      <Sequence from={150} durationInFrames={210}>
        <MasterScene2Problem />
        <Audio src={staticFile('audio/master/m_scene2_problem.mp3')} volume={1.0} />
      </Sequence>

      {/* 3. Introduce the Solution: Meet TAGA-asK AI (360 - 510 frames / ~5.0s) */}
      <Sequence from={360} durationInFrames={150}>
        <MasterScene3Solution />
        <Audio src={staticFile('audio/master/m_scene3_solution.mp3')} volume={1.0} />
      </Sequence>

      {/* 4. Successful Chatbot Demonstration: CIT Query & Citation (510 - 930 frames / ~14.0s) */}
      <Sequence from={510} durationInFrames={420}>
        <MasterScene4DemoCIT />
        <Audio src={staticFile('audio/master/m_scene4_demo.mp3')} volume={1.0} />
        {/* Send Click Pop */}
        <Sequence from={65} durationInFrames={30}>
          <Audio src={staticFile('audio/v2/sfx_pop.mp3')} volume={0.6} />
        </Sequence>
        {/* Citation Emerge Riser */}
        <Sequence from={195} durationInFrames={60}>
          <Audio src={staticFile('audio/v2/sfx_rise.mp3')} volume={0.5} />
        </Sequence>
      </Sequence>

      {/* 5. Demonstrate Real Features: Multimodal & Campus Tools (930 - 1230 frames / ~10.0s) */}
      <Sequence from={930} durationInFrames={300}>
        <MasterScene5Features />
        <Audio src={staticFile('audio/master/m_scene5_features.mp3')} volume={1.0} />
        <Sequence from={50} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_whoosh.mp3')} volume={0.5} />
        </Sequence>
      </Sequence>

      {/* 6. Security & Responsible Rate Limiting (1230 - 1470 frames / ~8.0s) */}
      <Sequence from={1230} durationInFrames={240}>
        <MasterScene6Security />
        <Audio src={staticFile('audio/master/m_scene6_security.mp3')} volume={1.0} />
        {/* Protective Shield Activation */}
        <Sequence from={35} durationInFrames={50}>
          <Audio src={staticFile('audio/v2/sfx_shield.mp3')} volume={0.7} />
        </Sequence>
        {/* Rate Limit Deny Tone */}
        <Sequence from={105} durationInFrames={40}>
          <Audio src={staticFile('audio/v2/sfx_deny.mp3')} volume={0.65} />
        </Sequence>
      </Sequence>

      {/* 7. Closing: Matching Cinematic Logo Outro (1470 - 1710 frames / ~8.0s) */}
      <Sequence from={1470} durationInFrames={240}>
        <MasterScene7Outro />
        <Audio src={staticFile('audio/master/m_scene7_outro.mp3')} volume={1.0} />
        {/* Soft Logo Outro Impact Boom */}
        <Sequence from={35} durationInFrames={80}>
          <Audio src={staticFile('audio/v2/sfx_impact_soft.mp3')} volume={0.8} />
        </Sequence>
      </Sequence>
    </div>
  );
};
