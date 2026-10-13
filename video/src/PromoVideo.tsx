import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Intro } from './scenes/Scene2Intro';
import { Scene3Attachments } from './scenes/Scene3Attachments';
import { Scene4VerifiedSources } from './scenes/Scene4VerifiedSources';
import { Scene5CampusMap } from './scenes/Scene5CampusMap';
import { Scene6Features } from './scenes/Scene6Features';
import { Scene7Closing } from './scenes/Scene7Closing';

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
      {/* SCENE 1: Opening Hook (0 - 8s / 240 frames) */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
        <Audio src={staticFile('audio/scene1.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 2: Introducing Chatbot (8 - 16s / 240 frames) */}
      <Sequence from={240} durationInFrames={240}>
        <Scene2Intro />
        <Audio src={staticFile('audio/scene2.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 3: Multimodal File & Image Upload (16 - 24s / 240 frames) */}
      <Sequence from={480} durationInFrames={240}>
        <Scene3Attachments />
        <Audio src={staticFile('audio/scene3.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 4: Grounded Citations (24 - 33.3s / 280 frames) */}
      <Sequence from={720} durationInFrames={280}>
        <Scene4VerifiedSources />
        <Audio src={staticFile('audio/scene4.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 5: Interactive Campus Map Pin Visualizer (33.3 - 42s / 260 frames) */}
      <Sequence from={1000} durationInFrames={260}>
        <Scene5CampusMap />
        <Audio src={staticFile('audio/scene5.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 6: More Campus Features (42 - 51.3s / 280 frames) */}
      <Sequence from={1260} durationInFrames={280}>
        <Scene6Features />
        <Audio src={staticFile('audio/scene6.mp3')} volume={1.0} />
      </Sequence>

      {/* SCENE 7: Branded Closing (51.3 - 60s / 260 frames) */}
      <Sequence from={1540} durationInFrames={260}>
        <Scene7Closing />
        <Audio src={staticFile('audio/scene7.mp3')} volume={1.0} />
      </Sequence>
    </div>
  );
};
