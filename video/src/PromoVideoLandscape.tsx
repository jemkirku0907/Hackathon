import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { LSScene1Hook } from './scenes/landscape/LSScene1Hook';
import { LSScene2Problem } from './scenes/landscape/LSScene2Problem';
import { LSScene4Citations } from './scenes/landscape/LSScene4Citations';
import { LSScene3Attachments } from './scenes/landscape/LSScene3Attachments';
import { LSScene5CampusMap } from './scenes/landscape/LSScene5CampusMap';
import { LSScene6Features } from './scenes/landscape/LSScene6Features';
import { LSScene7WhyLocal } from './scenes/landscape/LSScene7WhyLocal';
import { LSScene8Outro } from './scenes/landscape/LSScene8Outro';

export const PromoVideoLandscape: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#090E1A',
        overflow: 'hidden',
      }}
    >
      {/* 1. Cinematic Intro (0 - 235 frames / ~7.8s) */}
      <Sequence from={0} durationInFrames={235}>
        <LSScene1Hook />
        <Audio src={staticFile('audio/enhanced/enh_scene1_intro.mp3')} volume={1.0} />
      </Sequence>

      {/* 2. The Student Problem - Facebook Feed with Keli Post & 0 Comments (235 - 500 frames / ~8.8s) */}
      <Sequence from={235} durationInFrames={265}>
        <LSScene2Problem />
        <Audio src={staticFile('audio/enhanced/enh_scene2_problem.mp3')} volume={1.0} />
      </Sequence>

      {/* 3. Real App Transition - CIT Query & Exact Citation (500 - 890 frames / ~13.0s) */}
      <Sequence from={500} durationInFrames={390}>
        <LSScene4Citations />
        <Audio src={staticFile('audio/enhanced/enh_scene3_app_cit.mp3')} volume={1.0} />
      </Sequence>

      {/* 4. Multimodal Attachments (890 - 1125 frames / ~7.8s) */}
      <Sequence from={890} durationInFrames={235}>
        <LSScene3Attachments />
        <Audio src={staticFile('audio/enhanced/enh_scene4a_attach.mp3')} volume={1.0} />
      </Sequence>

      {/* 5. Campus Map Pin Visualizer (1125 - 1350 frames / ~7.5s) */}
      <Sequence from={1125} durationInFrames={225}>
        <LSScene5CampusMap />
        <Audio src={staticFile('audio/enhanced/enh_scene4b_map.mp3')} volume={1.0} />
      </Sequence>

      {/* 6. Academic Policies & Retention (1350 - 1635 frames / ~9.5s) */}
      <Sequence from={1350} durationInFrames={285}>
        <LSScene6Features />
        <Audio src={staticFile('audio/enhanced/enh_scene4c_academic.mp3')} volume={1.0} />
      </Sequence>

      {/* 7. Why TAGA-asK AI? Summary & Quote (1635 - 1820 frames / ~6.1s) */}
      <Sequence from={1635} durationInFrames={185}>
        <LSScene7WhyLocal />
        <Audio src={staticFile('audio/enhanced/enh_scene5_matters.mp3')} volume={1.0} />
      </Sequence>

      {/* 8. Branded Outro with "Every Tagak, just ask." (1820 - 2120 frames / ~10.0s) */}
      <Sequence from={1820} durationInFrames={300}>
        <LSScene8Outro />
        <Audio src={staticFile('audio/enhanced/enh_scene6_outro.mp3')} volume={1.0} />
      </Sequence>
    </div>
  );
};
