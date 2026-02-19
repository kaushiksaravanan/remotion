import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, SPRINGS} from '../constants';
import {interFont, textStyles} from '../fonts';

export const Scene1TheLeak: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// ── Label above counter ────────────────────────────────────────────────────
	// "leads enter your funnel" fades in at frames 0-15 (0-0.5s)
	const topLabelOpacity = interpolate(
		frame,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Counter: 100 → 50 over frames 5-60 (0.17s–2s) ────────────────────────
	const counterValue = Math.round(
		interpolate(
			frame,
			[Math.round(0.17 * fps), 2 * fps],
			[100, 50],
			{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
		),
	);

	// Counter fades in at start alongside the count
	const counterOpacity = interpolate(
		frame,
		[Math.round(0.17 * fps), Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Progress bar ──────────────────────────────────────────────────────────
	// Fades in at frames 10-65 (0.33s–2.17s), drains from 100% to 50%
	const barOpacity = interpolate(
		frame,
		[Math.round(0.33 * fps), Math.round(0.67 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Fill width: 100% → 50%, mirrors the counter drain
	const barFillPercent = interpolate(
		frame,
		[Math.round(0.17 * fps), 2 * fps],
		[100, 50],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// Bar fill color: sendblue → red as it drains
	const barFillColor = interpolateColors(
		frame,
		[Math.round(0.17 * fps), 2 * fps],
		[COLORS.sendblue, COLORS.red],
	);

	// ── Bottom label morph: "leads enter your funnel" → "actually show up" ───
	// First label fades out at frames 55-70 (1.83s–2.33s)
	const topLabelFadeOut = interpolate(
		frame,
		[Math.round(1.83 * fps), Math.round(2.33 * fps)],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// "actually show up" label fades in at frames 55-70 (1.83s–2.33s)
	const secondLabelOpacity = interpolate(
		frame,
		[Math.round(1.83 * fps), Math.round(2.33 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Headline ──────────────────────────────────────────────────────────────
	// "Your funnel talks AT leads." fades up at frames 80-110 (2.67s–3.67s)
	const headlineSpring = spring({
		frame: frame - Math.round(2.67 * fps),
		fps,
		config: SPRINGS.gentle,
	});
	const headlineY = interpolate(headlineSpring, [0, 1], [48, 0]);
	const headlineOpacity = interpolate(
		frame,
		[Math.round(2.67 * fps), Math.round(3.67 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Scene fade out ────────────────────────────────────────────────────────
	// Fade out over the last 15 frames (frames 135-150 = 4.5s–5s)
	const fadeOut = interpolate(frame, [Math.round(4.5 * fps), 5 * fps], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			{/* Light background with very subtle radial gradient */}
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse at 50% 40%, ${COLORS.bgNavy} 0%, ${COLORS.bgLight} 70%)`,
				}}
			/>

			{/* Center content column */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 0,
				}}
			>
				{/* Top label group — fades in, then morphs */}
				<div
					style={{
						height: 32,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: 32,
						position: 'relative',
					}}
				>
					{/* "leads enter your funnel" */}
					<span
						style={{
							position: 'absolute',
							fontFamily: interFont,
							fontSize: 13,
							fontWeight: 500,
							color: COLORS.muted,
							letterSpacing: '0.12em',
							textTransform: 'uppercase',
							opacity: topLabelOpacity * topLabelFadeOut,
							whiteSpace: 'nowrap',
						}}
					>
						leads enter your funnel
					</span>

					{/* "actually show up" */}
					<span
						style={{
							position: 'absolute',
							fontFamily: interFont,
							fontSize: 13,
							fontWeight: 600,
							color: COLORS.red,
							letterSpacing: '0.12em',
							textTransform: 'uppercase',
							opacity: secondLabelOpacity,
							whiteSpace: 'nowrap',
						}}
					>
						actually show up
					</span>
				</div>

				{/* Big counter number */}
				<div
					style={{
						fontFamily: interFont,
						fontSize: 200,
						fontWeight: 900,
						letterSpacing: '-0.05em',
						lineHeight: 1,
						color: COLORS.textPrimary,
						opacity: counterOpacity,
						fontVariantNumeric: 'tabular-nums',
					}}
				>
					{counterValue}
				</div>

				{/* Progress bar */}
				<div
					style={{
						marginTop: 40,
						width: 500,
						opacity: barOpacity,
					}}
				>
					{/* Track */}
					<div
						style={{
							width: 500,
							height: 8,
							borderRadius: 999,
							background: '#E5E7EB',
							overflow: 'hidden',
						}}
					>
						{/* Fill */}
						<div
							style={{
								width: `${barFillPercent}%`,
								height: '100%',
								borderRadius: 999,
								background: barFillColor,
							}}
						/>
					</div>
				</div>

				{/* Spacer before headline */}
				<div style={{height: 80}} />

				{/* Headline: "Your funnel talks AT leads." */}
				<div
					style={{
						opacity: headlineOpacity,
						transform: `translateY(${headlineY}px)`,
						textAlign: 'center',
					}}
				>
					<span
						style={{
							...textStyles.heading,
							fontSize: 48,
							color: COLORS.textPrimary,
						}}
					>
						Your funnel talks{' '}
					</span>
					<span
						style={{
							...textStyles.heading,
							fontSize: 48,
							color: COLORS.red,
							fontStyle: 'italic',
						}}
					>
						AT
					</span>
					<span
						style={{
							...textStyles.heading,
							fontSize: 48,
							color: COLORS.textPrimary,
						}}
					>
						{' '}leads.
					</span>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
