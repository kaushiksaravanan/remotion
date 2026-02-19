/**
 * SendblueAd — "More Conversations, More Conversions"
 * 30-second motion graphics ad for Sendblue (iMessage solutions partner).
 * 1920x1080 @ 30fps = 900 frames total.
 *
 * Scene map:
 *   Scene 1 — The Leak          (0–150f   / 0–5s)
 *   Scene 2 — Green vs Blue     (150–330f / 5–11s)
 *   Scene 3 — The Conversation  (330–540f / 11–18s)
 *   Scene 4 — The Numbers       (540–720f / 18–24s)
 *   Scene 5 — CTA               (720–900f / 24–30s)
 */

import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';

// Font loaded at module top-level — ensures it's ready before first render
import './fonts';

import {Scene1TheLeak} from './scenes/Scene1TheLeak';
import {Scene2GreenVsBlue} from './scenes/Scene2GreenVsBlue';
import {Scene3TheConversation} from './scenes/Scene3TheConversation';
import {Scene4TheNumbers} from './scenes/Scene4TheNumbers';
import {Scene5CTA} from './scenes/Scene5CTA';
import {COLORS, SCENE_TIMING} from './constants';

export type SendblueAdProps = Record<string, never>;

export const SendblueAd: React.FC<SendblueAdProps> = () => {
	const {fps} = useVideoConfig();

	const PREMOUNT = Math.round(0.5 * fps);

	return (
		<AbsoluteFill style={{background: COLORS.bgDeep}}>
			{/* Scene 1 — The Leak */}
			<Sequence
				from={SCENE_TIMING.s1Start}
				durationInFrames={SCENE_TIMING.s1Dur}
				premountFor={PREMOUNT}
			>
				<Scene1TheLeak />
			</Sequence>

			{/* Scene 2 — Green vs Blue */}
			<Sequence
				from={SCENE_TIMING.s2Start}
				durationInFrames={SCENE_TIMING.s2Dur}
				premountFor={PREMOUNT}
			>
				<Scene2GreenVsBlue />
			</Sequence>

			{/* Scene 3 — The Conversation */}
			<Sequence
				from={SCENE_TIMING.s3Start}
				durationInFrames={SCENE_TIMING.s3Dur}
				premountFor={PREMOUNT}
			>
				<Scene3TheConversation />
			</Sequence>

			{/* Scene 4 — The Numbers */}
			<Sequence
				from={SCENE_TIMING.s4Start}
				durationInFrames={SCENE_TIMING.s4Dur}
				premountFor={PREMOUNT}
			>
				<Scene4TheNumbers />
			</Sequence>

			{/* Scene 5 — CTA */}
			<Sequence
				from={SCENE_TIMING.s5Start}
				durationInFrames={SCENE_TIMING.s5Dur}
				premountFor={PREMOUNT}
			>
				<Scene5CTA />
			</Sequence>
		</AbsoluteFill>
	);
};
