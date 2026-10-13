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
      {/* 1. Cinematic Intro (0 - 4s / 120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <LSScene1Hook />
        <Audio src={staticFile('audio/enhanced/enh_scene1_intro.mp3')} volume={1.0} />
      </Sequence>

      {/* 2. The Student Problem - Facebook Groups & 0 Comments (4 - 11s / 210 frames) */}
      <Sequence from={120} durationInFrames={210}>
        <LSScene2Problem />
        <Audio src={staticFile('audio/enhanced/enh_scene2_problem.mp3')} volume={1.0} />
      </Sequence>

      {/* 3. Real App Transition - CIT Query & Exact Citation (11 - 21s / 300 frames) */}
      <Sequence from={330} durationInFrames={300}>
        <LSScene4Citations />
        <Audio src={staticFile('audio/enhanced/enh_scene3_app_cit.mp3')} volume={1.0} />
      </Sequence>

      {/* 4. Multimodal Attachments (21 - 29s / 240 frames) */}
      <Sequence from={630} durationInFrames={240}>
        <LSScene3Attachments />
        <Audio src={staticFile('audio/enhanced/enh_scene4a_attach.mp3')} volume={1.0} />
      </Sequence>

      {/* 5. Campus Map Pin Visualizer (29 - 37s / 240 frames) */}
      <Sequence from={870} durationInFrames={240}>
        <LSScene5CampusMap />
        <Audio src={staticFile('audio/enhanced/enh_scene4b_map.mp3')} volume={1.0} />
      </Sequence>

      {/* 6. Academic Policies & Retention (37 - 45s / 240 frames) */}
      <Sequence from={1110} durationInFrames={240}>
        <LSScene6Features />
        <Audio src={staticFile('audio/enhanced/enh_scene4c_academic.mp3')} volume={1.0} />
      </Sequence>

      {/* 7. Why TAGA-asK AI? Summary & Quote (45 - 51s / 180 frames) */}
      <Sequence from={1350} durationInFrames={180}>
        <LSScene7WhyLocal />
        <Audio src={staticFile('audio/enhanced/enh_scene5_matters.mp3')} volume={1.0} />
      </Sequence>

      {/* 8. Branded Outro with "Every Tagak, just ask." (51 - 58s / 210 frames) */}
      <Sequence from={1530} durationInFrames={210}>
        <LSScene8Outro />
        <Audio src={staticFile('audio/enhanced/enh_scene6_outro.mp3')} volume={1.0} />
      </Sequence>
    </div>
  );
};
