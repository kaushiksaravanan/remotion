// ─── src/SendblueAd/scenes/Scene4TheNumbers.tsx ──────────────────────────────
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, SPRINGS} from '../constants';
import {interFont} from '../fonts';

// Stat card with animated counter
const StatCard: React.FC<{
	value: string;
	label: string;
	comparison?: string;
	delay: number;
	countTo?: number;
}> = ({value, label, comparison, delay, countTo}) => {
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
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Counter animation (if countTo is provided)
	let displayValue = value;
	if (countTo !== undefined) {
		const countProgress = interpolate(
			localFrame,
			[0.2 * fps, 1.2 * fps],
			[0, 1],
			{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
		);
		displayValue = `${Math.round(countTo * countProgress)}%`;
	}

	// Strikethrough for comparison — draws from left to right
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
				width: 380,
				padding: '36px 28px',
				borderRadius: 20,
				background: 'rgba(0,0,0,0.02)',
				border: '1px solid rgba(0,0,0,0.06)',
				boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
				textAlign: 'center' as const,
				position: 'relative' as const,
			}}
		>
			{/* Top accent line */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 24,
					right: 24,
					height: 2,
					borderRadius: 1,
					background: `linear-gradient(90deg, transparent, ${COLORS.sendblue}, transparent)`,
				}}
			/>

			{/* Big number */}
			<div
				style={{
					fontFamily: interFont,
					fontSize: 64,
					fontWeight: 900,
					color: COLORS.sendblue,
					letterSpacing: '-0.04em',
					lineHeight: 1,
					marginBottom: 8,
				}}
			>
				{displayValue}
			</div>

			{/* Label */}
			<div
				style={{
					fontFamily: interFont,
					fontSize: 17,
					fontWeight: 500,
					color: COLORS.textPrimary,
					marginBottom: comparison ? 14 : 0,
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
							fontSize: 14,
							fontWeight: 400,
							color: COLORS.muted,
						}}
					>
						{comparison}
					</span>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: -4,
							height: 2,
							width: `calc(${strikeProgress * 100}% + 8px)`,
							background: COLORS.red,
							borderRadius: 1,
						}}
					/>
				</div>
			)}
		</div>
	);
};

export const Scene4TheNumbers: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Quote text entrance
	const quoteDelay = Math.round(4.5 * fps);
	const quoteSpring = spring({
		frame: frame - quoteDelay,
		fps,
		config: SPRINGS.gentle,
	});
	const quoteOpacity = interpolate(
		frame - quoteDelay,
		[0, 0.5 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const quoteY = interpolate(quoteSpring, [0, 1], [30, 0]);

	// Fade out
	const fadeOut = interpolate(frame, [165, 180], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			{/* White background with subtle light gray radial gradient at center */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at 50% 50%, #F0F2F5 0%, #FFFFFF 65%)',
				}}
			/>

			{/* Three stat cards in a row */}
			<div
				style={{
					position: 'absolute',
					top: 200,
					left: 0,
					right: 0,
					display: 'flex',
					justifyContent: 'center',
					gap: 40,
				}}
			>
				<StatCard
					value="80%"
					label="Show Rate"
					comparison="vs 50% with VSLs"
					delay={0}
					countTo={80}
				/>
				<StatCard
					value="70-85%"
					label="iMessage Response Rate"
					comparison="vs 30-40% SMS"
					delay={Math.round(1 * fps)}
				/>
				<StatCard
					value="10M+"
					label="iMessages Sent"
					delay={Math.round(2 * fps)}
				/>
			</div>

			{/* Quote */}
			<div
				style={{
					position: 'absolute',
					bottom: 140,
					left: 200,
					right: 200,
					textAlign: 'center',
					opacity: quoteOpacity,
					transform: `translateY(${quoteY}px)`,
				}}
			>
				<div
					style={{
						fontFamily: interFont,
						fontSize: 32,
						fontWeight: 500,
						color: COLORS.textPrimary,
						lineHeight: 1.4,
						fontStyle: 'italic',
					}}
				>
					"Most funnels talk{' '}
					<span style={{color: COLORS.red}}>AT</span> leads.
					<br />
					This one talks{' '}
					<span style={{color: COLORS.sendblue}}>WITH</span> them."
				</div>
			</div>
		</AbsoluteFill>
	);
};
