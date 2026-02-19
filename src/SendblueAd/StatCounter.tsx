import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, SPRINGS} from './constants';
import {interFont} from './fonts';

export const StatCounter: React.FC<{
	value: number;
	suffix?: string;
	prefix?: string;
	label: string;
	comparison?: string;
	delay?: number;
	color?: string;
}> = ({
	value,
	suffix = '%',
	prefix = '',
	label,
	comparison,
	delay = 0,
	color = COLORS.sendblue,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const localFrame = frame - delay;
	if (localFrame < 0) return null;

	// Card entrance
	const enterSpring = spring({
		frame: localFrame,
		fps,
		config: SPRINGS.organic,
	});
	const cardY = interpolate(enterSpring, [0, 1], [80, 0]);
	const cardOpacity = interpolate(localFrame, [0, 0.4 * fps], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Counter animation
	const countProgress = interpolate(
		localFrame,
		[0.2 * fps, 1.2 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const displayValue = Math.round(value * countProgress);

	// Strikethrough for comparison
	const strikeProgress = interpolate(
		localFrame,
		[1.4 * fps, 1.8 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<div
			style={{
				opacity: cardOpacity,
				transform: `translateY(${cardY}px)`,
				width: 420,
				padding: '36px 32px',
				borderRadius: 20,
				background: 'rgba(255,255,255,0.04)',
				border: '1px solid rgba(255,255,255,0.08)',
				boxShadow: `0 0 40px ${color}12, 0 8px 32px rgba(0,0,0,0.4)`,
				textAlign: 'center' as const,
			}}
		>
			{/* Top accent line */}
			<div
				style={{
					position: 'absolute' as const,
					top: 0,
					left: 24,
					right: 24,
					height: 2,
					borderRadius: 1,
					background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
				}}
			/>

			{/* Big number */}
			<div
				style={{
					fontFamily: interFont,
					fontSize: 72,
					fontWeight: 900,
					color,
					letterSpacing: '-0.04em',
					lineHeight: 1,
					marginBottom: 8,
				}}
			>
				{prefix}
				{displayValue}
				{suffix}
			</div>

			{/* Label */}
			<div
				style={{
					fontFamily: interFont,
					fontSize: 18,
					fontWeight: 500,
					color: COLORS.white,
					marginBottom: comparison ? 16 : 0,
				}}
			>
				{label}
			</div>

			{/* Comparison with strikethrough */}
			{comparison && (
				<div
					style={{
						position: 'relative',
						display: 'inline-block',
					}}
				>
					<span
						style={{
							fontFamily: interFont,
							fontSize: 15,
							fontWeight: 400,
							color: COLORS.muted,
						}}
					>
						{comparison}
					</span>
					{/* Animated strikethrough */}
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: -4,
							height: 2,
							width: `calc(${strikeProgress * 100}% + 8px)`,
							background: COLORS.red,
							borderRadius: 1,
							boxShadow: `0 0 8px ${COLORS.redGlow}`,
						}}
					/>
				</div>
			)}
		</div>
	);
};
