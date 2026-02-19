// ─── src/SendblueAd/scenes/Scene5CTA.tsx ─────────────────────────────────────
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, SPRINGS} from '../constants';
import {SendblueLogo} from '../SendblueLogo';
import {interFont} from '../fonts';

export const Scene5CTA: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Logo entrance — elastic spring
	const logoDelay = Math.round(0.3 * fps);
	const logoSpring = spring({
		frame: frame - logoDelay,
		fps,
		config: SPRINGS.elastic,
	});
	const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
	const logoOpacity = interpolate(
		frame - logoDelay,
		[0, 0.4 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Tagline fades up
	const taglineDelay = Math.round(1.2 * fps);
	const taglineOpacity = interpolate(
		frame - taglineDelay,
		[0, 0.5 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const taglineY = interpolate(
		frame - taglineDelay,
		[0, 0.5 * fps],
		[20, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Divider line draws from center outward
	const dividerDelay = Math.round(2 * fps);
	const dividerProgress = interpolate(
		frame - dividerDelay,
		[0, 0.5 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// CTA URL
	const ctaDelay = Math.round(2.5 * fps);
	const ctaOpacity = interpolate(
		frame - ctaDelay,
		[0, 0.5 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const ctaY = interpolate(
		frame - ctaDelay,
		[0, 0.5 * fps],
		[15, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Y Combinator badge
	const ycDelay = Math.round(3.5 * fps);
	const ycOpacity = interpolate(
		frame - ycDelay,
		[0, 0.5 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill>
			{/* Clean white background */}
			<AbsoluteFill style={{background: COLORS.bgLight}} />

			{/* Main content — centered column */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 0,
				}}
			>
				{/* Sendblue logo — big centered */}
				<div
					style={{
						opacity: logoOpacity,
						transform: `scale(${logoScale})`,
					}}
				>
					<SendblueLogo scale={4} />
				</div>

				{/* Tagline */}
				<div
					style={{
						opacity: taglineOpacity,
						transform: `translateY(${taglineY}px)`,
						marginTop: 40,
					}}
				>
					<div
						style={{
							fontFamily: interFont,
							fontSize: 32,
							fontWeight: 500,
							color: COLORS.offWhite,
							letterSpacing: '-0.01em',
							textAlign: 'center',
						}}
					>
						More conversations, more conversions.
					</div>
				</div>

				{/* Divider — subtle gray, draws from center out */}
				<div
					style={{
						marginTop: 36,
						width: 200 * dividerProgress,
						height: 1,
						background: `linear-gradient(90deg, transparent, ${COLORS.muted}66, transparent)`,
					}}
				/>

				{/* CTA URL */}
				<div
					style={{
						opacity: ctaOpacity,
						transform: `translateY(${ctaY}px)`,
						marginTop: 36,
					}}
				>
					<div
						style={{
							fontFamily: interFont,
							fontSize: 28,
							fontWeight: 700,
							color: COLORS.sendblue,
							letterSpacing: '0.02em',
						}}
					>
						sendblue.com
					</div>
				</div>

				{/* Y Combinator badge */}
				<div
					style={{
						opacity: ycOpacity,
						marginTop: 40,
						display: 'flex',
						alignItems: 'center',
						gap: 10,
					}}
				>
					{/* YC shield */}
					<svg width={24} height={24} viewBox="0 0 24 24" fill="none">
						<rect width={24} height={24} rx={4} fill="#FF6600" />
						<text
							x={12}
							y={17}
							textAnchor="middle"
							fill="white"
							fontSize={14}
							fontWeight={700}
							fontFamily={interFont}
						>
							Y
						</text>
					</svg>
					<span
						style={{
							fontFamily: interFont,
							fontSize: 15,
							fontWeight: 500,
							color: COLORS.muted,
							letterSpacing: '0.04em',
						}}
					>
						Backed by Y Combinator
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
