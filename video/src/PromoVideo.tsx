import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { EnhScene1Intro } from './scenes/enhanced/EnhScene1Intro';
import { EnhScene2Problem } from './scenes/enhanced/EnhScene2Problem';
import { EnhScene3AppCIT } from './scenes/enhanced/EnhScene3AppCIT';
import { EnhScene4aAttach } from './scenes/enhanced/EnhScene4aAttach';
import { EnhScene4bMap } from './scenes/enhanced/EnhScene4bMap';
import { EnhScene4cAcademic } from './scenes/enhanced/EnhScene4cAcademic';
import { EnhScene5WhyMatters } from './scenes/enhanced/EnhScene5WhyMatters';
import { EnhScene6Outro } from './scenes/enhanced/EnhScene6Outro';

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
      {/* SCENE 1: Cinematic Logo Intro (0 - 4s / 120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <EnhScene1Intro />
        <Audio src={staticFile('audio/enhanced/enh_scene1_intro.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 2: The Student Problem - Facebook Groups & 0 Comments (4 - 11s / 210 frames) */}
      <Sequence from={120} durationInFrames={210}>
        <EnhScene2Problem />
        <Audio src={staticFile('audio/enhanced/enh_scene2_problem.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 3: Transition into Real App - CIT Query & Exact Citation (11 - 21s / 300 frames) */}
      <Sequence from={330} durationInFrames={300}>
        <EnhScene3AppCIT />
        <Audio src={staticFile('audio/enhanced/enh_scene3_app_cit.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 4A: Feature Showcase - Multimodal Attachments (21 - 29s / 240 frames) */}
      <Sequence from={630} durationInFrames={240}>
        <EnhScene4aAttach />
        <Audio src={staticFile('audio/enhanced/enh_scene4a_attach.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 4B: Feature Showcase - Campus Map Visualizer (29 - 37s / 240 frames) */}
      <Sequence from={870} durationInFrames={240}>
        <EnhScene4bMap />
        <Audio src={staticFile('audio/enhanced/enh_scene4b_map.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 4C: Feature Showcase - Academic Policies & UMak Security (37 - 45s / 240 frames) */}
      <Sequence from={1110} durationInFrames={240}>
        <EnhScene4cAcademic />
        <Audio src={staticFile('audio/enhanced/enh_scene4c_academic.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 5: Why It Matters - Comparison & Every Tagak, Just Ask (45 - 51s / 180 frames) */}
      <Sequence from={1350} durationInFrames={180}>
        <EnhScene5WhyMatters />
        <Audio src={staticFile('audio/enhanced/enh_scene5_matters.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 6: Cinematic Outro & Tagline (51 - 58s / 210 frames) */}
      <Sequence from={1530} durationInFrames={210}>
        <EnhScene6Outro />
        <Audio src={staticFile('audio/enhanced/enh_scene6_outro.mp3')} volume={1.0} />
      </Sequence>
    </div>
  );
};
