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
      {/* 1. Cinematic Intro (0 - 235 frames / ~7.8s) */}
      <Sequence from={0} durationInFrames={235}>
        <EnhScene1Intro />
        <Audio src={staticFile('audio/enhanced/enh_scene1_intro.mp3')} volume={1.0} />
      </Sequence>

      {/* 2. The Student Problem - Facebook Feed with Keli Post & 0 Comments (235 - 500 frames / ~8.8s) */}
      <Sequence from={235} durationInFrames={265}>
        <EnhScene2Problem />
        <Audio src={staticFile('audio/enhanced/enh_scene2_problem.mp3')} volume={1.0} />
      </Sequence>

      {/* 3. Transition into Real App - CIT Query & Exact Citation (500 - 890 frames / ~13.0s) */}
      <Sequence from={500} durationInFrames={390}>
        <EnhScene3AppCIT />
        <Audio src={staticFile('audio/enhanced/enh_scene3_app_cit.mp3')} volume={1.0} />
      </Sequence>

      {/* 4A. Multimodal Attachments (890 - 1125 frames / ~7.8s) */}
      <Sequence from={890} durationInFrames={235}>
        <EnhScene4aAttach />
        <Audio src={staticFile('audio/enhanced/enh_scene4a_attach.mp3')} volume={1.0} />
      </Sequence>

      {/* 4B. Campus Map Visualizer (1125 - 1350 frames / ~7.5s) */}
      <Sequence from={1125} durationInFrames={225}>
        <EnhScene4bMap />
        <Audio src={staticFile('audio/enhanced/enh_scene4b_map.mp3')} volume={1.0} />
      </Sequence>

      {/* 4C. Academic Policies & Security (1350 - 1635 frames / ~9.5s) */}
      <Sequence from={1350} durationInFrames={285}>
        <EnhScene4cAcademic />
        <Audio src={staticFile('audio/enhanced/enh_scene4c_academic.mp3')} volume={1.0} />
      </Sequence>

      {/* 5. Why It Matters - Comparison & Every Tagak, Just Ask (1635 - 1820 frames / ~6.1s) */}
      <Sequence from={1635} durationInFrames={185}>
        <EnhScene5WhyMatters />
        <Audio src={staticFile('audio/enhanced/enh_scene5_matters.mp3')} volume={1.0} />
      </Sequence>

      {/* 6. Cinematic Outro & "Every Tagak, just ask." (1820 - 2120 frames / ~10.0s) */}
      <Sequence from={1820} durationInFrames={300}>
        <EnhScene6Outro />
        <Audio src={staticFile('audio/enhanced/enh_scene6_outro.mp3')} volume={1.0} />
      </Sequence>
    </div>
  );
};
