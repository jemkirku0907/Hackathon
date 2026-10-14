import React from 'react';
import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';
import { PromoVideoV2Landscape } from './PromoVideoV2Landscape';
import { PromoVideoV3Landscape } from './PromoVideoV3Landscape';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master V3 Cinematic Landscape 16:9 Film (1920x1080 @ 30 FPS, 57.0 seconds = 1710 frames) */}
      <Composition
        id="PromoVideoV3Landscape"
        component={PromoVideoV3Landscape}
        durationInFrames={1710}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Landscape 16:9 Primary Default (points to V3) */}
      <Composition
        id="PromoVideoLandscape"
        component={PromoVideoV3Landscape}
        durationInFrames={1710}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* V2 Landscape Preservation */}
      <Composition
        id="PromoVideoV2Landscape"
        component={PromoVideoV2Landscape}
        durationInFrames={1710}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Vertical 9:16 Showcase (Reels / TikTok / Mobile) */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={1710}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
