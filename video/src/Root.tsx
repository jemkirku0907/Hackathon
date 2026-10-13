import React from 'react';
import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';
import { PromoVideoLandscape } from './PromoVideoLandscape';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Landscape 16:9 Showcase (Matching Reference Video snapsort layout) */}
      <Composition
        id="PromoVideoLandscape"
        component={PromoVideoLandscape}
        durationInFrames={1740}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Vertical 9:16 Showcase (Reels / TikTok / Mobile) */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={1740}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
