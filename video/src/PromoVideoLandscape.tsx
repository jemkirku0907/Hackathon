import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { LSScene1Hook } from './scenes/landscape/LSScene1Hook';
import { LSScene2Sources } from './scenes/landscape/LSScene2Sources';
import { LSScene3Attachments } from './scenes/landscape/LSScene3Attachments';
import { LSScene4Citations } from './scenes/landscape/LSScene4Citations';
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
      {/* 1. Hook & Grounding (0 - 6s / 180 frames) */}
      <Sequence from={0} durationInFrames={180}>
        <LSScene1Hook />
        <Audio src={staticFile('audio/landscape/ls_scene1.mp3')} volume={1.0} />
      </Sequence>

      {/* 2. Four Official Documents (6 - 13s / 210 frames) */}
      <Sequence from={180} durationInFrames={210}>
        <LSScene2Sources />
        <Audio src={staticFile('audio/landscape/ls_scene2.mp3')} volume={1.0} />
      </Sequence>

      {/* 3. File & Image Attachments (13 - 21s / 240 frames) */}
      <Sequence from={390} durationInFrames={240}>
        <LSScene3Attachments />
        <Audio src={staticFile('audio/landscape/ls_scene3.mp3')} volume={1.0} />
      </Sequence>

      {/* 4. CIT Question & Citations (21 - 31s / 300 frames) */}
      <Sequence from={630} durationInFrames={300}>
        <LSScene4Citations />
        <Audio src={staticFile('audio/landscape/ls_scene4.mp3')} volume={1.0} />
      </Sequence>

      {/* 5. Campus Map Pin Visualizer (31 - 39s / 240 frames) */}
      <Sequence from={930} durationInFrames={240}>
        <LSScene5CampusMap />
        <Audio src={staticFile('audio/landscape/ls_scene5.mp3')} volume={1.0} />
      </Sequence>

      {/* 6. Scholarships & Retention (39 - 47s / 240 frames) */}
      <Sequence from={1170} durationInFrames={240}>
        <LSScene6Features />
        <Audio src={staticFile('audio/landscape/ls_scene6.mp3')} volume={1.0} />
      </Sequence>

      {/* 7. Why TAGA-asK AI? Summary Card (47 - 54s / 210 frames) */}
      <Sequence from={1410} durationInFrames={210}>
        <LSScene7WhyLocal />
        <Audio src={staticFile('audio/landscape/ls_scene7.mp3')} volume={1.0} />
      </Sequence>

      {/* 8. Branded Outro (54 - 60s / 180 frames) */}
      <Sequence from={1620} durationInFrames={180}>
        <LSScene8Outro />
        <Audio src={staticFile('audio/landscape/ls_scene8.mp3')} volume={1.0} />
      </Sequence>
    </div>
  );
};
