// ─── src/SendblueStatics/Static2FunnelFlow.tsx ────────────────────────────────
// 1080×1080 static ad — simplified funnel flow as clean text
// 150 frames @ 30fps = 5 seconds
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, SPRINGS} from '../SendblueAd/constants';
import {interFont} from '../SendblueAd/fonts';
import {SendblueLogo} from '../SendblueAd/SendblueLogo';

export type Static2FunnelFlowProps = Record<string, never>;

const STEPS = ['Ad', 'Form', 'iMessage', 'Call'] as const;

export const Static2FunnelFlow: React.FC<Static2FunnelFlowProps> = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// ── Headline ─────────────────────────────────────────────────────────────
	const headlineSpring = spring({frame, fps, config: SPRINGS.gentle});
	const headlineY = interpolate(headlineSpring, [0, 1], [40, 0]);
	const headlineOpacity = interpolate(
		frame,
		[0, Math.round(0.6 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Flow steps — staggered fade + slide up ──────────────────────────────
	const stepBaseDelay = Math.round(0.8 * fps);
	const stepStagger = 6;

	// ── Subtitle ─────────────────────────────────────────────────────────────
	const subtitleDelay =
		stepBaseDelay + STEPS.length * stepStagger + Math.round(0.3 * fps);
	const subtitleOpacity = interpolate(
		frame - subtitleDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── CTA ──────────────────────────────────────────────────────────────────
	const ctaDelay = subtitleDelay + Math.round(0.4 * fps);
	const ctaSpring = spring({
		frame: frame - ctaDelay,
		fps,
		config: SPRINGS.gentle,
	});
	const ctaY = interpolate(ctaSpring, [0, 1], [24, 0]);
	const ctaOpacity = interpolate(
		frame - ctaDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Logo ─────────────────────────────────────────────────────────────────
	const logoDelay = ctaDelay + Math.round(0.5 * fps);
	const logoOpacity = interpolate(
		frame - logoDelay,
		[0, Math.round(0.67 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill style={{background: '#FAFBFC'}}>
			{/* Subtle radial gradient */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,139,255,0.04) 0%, transparent 70%)',
				}}
			/>

			{/* Main content column */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					paddingLeft: 80,
					paddingRight: 80,
				}}
			>
				{/* Headline */}
				<div
					style={{
						opacity: headlineOpacity,
						transform: `translateY(${headlineY}px)`,
						textAlign: 'center',
						marginBottom: 64,
					}}
				>
					<div
						style={{
							fontFamily: interFont,
							fontSize: 52,
							fontWeight: 800,
							color: COLORS.textPrimary,
							letterSpacing: '-0.03em',
							lineHeight: 1.1,
						}}
					>
						The Funnel That Replaced
						<br />
						Our VSL With a Live{' '}
						<span style={{color: COLORS.sendblue}}>iMessage</span>
					</div>
				</div>

				{/* Flow steps — clean text row */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 20,
						marginBottom: 48,
					}}
				>
					{STEPS.map((step, i) => {
						const delay = stepBaseDelay + i * stepStagger;
						const s = spring({
							frame: frame - delay,
							fps,
							config: SPRINGS.gentle,
						});
						const opacity = interpolate(
							frame - delay,
							[0, Math.round(0.4 * fps)],
							[0, 1],
							{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
						);
						const y = interpolate(s, [0, 1], [20, 0]);
						const isHighlight = step === 'iMessage';

						return (
							<React.Fragment key={step}>
								{i > 0 && (
									<span
										style={{
											opacity,
											fontFamily: interFont,
											fontSize: 28,
											fontWeight: 300,
											color: COLORS.muted,
										}}
									>
										→
									</span>
								)}
								<div
									style={{
										opacity,
										transform: `translateY(${y}px)`,
									}}
								>
									<span
										style={{
											fontFamily: interFont,
											fontSize: isHighlight ? 36 : 30,
											fontWeight: isHighlight ? 800 : 600,
											color: isHighlight ? COLORS.sendblue : COLORS.muted,
											letterSpacing: '-0.02em',
										}}
									>
										{step}
									</span>
								</div>
							</React.Fragment>
						);
					})}
				</div>

				{/* Subtitle */}
				<div style={{opacity: subtitleOpacity, marginBottom: 56}}>
					<span
						style={{
							fontFamily: interFont,
							fontSize: 24,
							fontWeight: 500,
							color: COLORS.muted,
							letterSpacing: '-0.01em',
						}}
					>
						<span style={{color: COLORS.textPrimary, fontWeight: 700}}>
							2 seconds
						</span>{' '}
						from opt-in to conversation.
					</span>
				</div>

				{/* CTA */}
				<div
					style={{
						opacity: ctaOpacity,
						transform: `translateY(${ctaY}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
					}}
				>
					<div
						style={{
							width: 40,
							height: 40,
							borderRadius: '50%',
							background: COLORS.sendblue,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
						}}
					>
						<svg width={18} height={18} viewBox="0 0 18 18" fill="none">
							<path
								d="M3 9H15M15 9L10 4M15 9L10 14"
								stroke="white"
								strokeWidth={2.2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<span
						style={{
							fontFamily: interFont,
							fontSize: 24,
							fontWeight: 700,
							color: COLORS.textPrimary,
							letterSpacing: '-0.02em',
						}}
					>
						See the iMessage Funnel in action
					</span>
				</div>
			</AbsoluteFill>

			{/* Logo pinned to bottom */}
			<div
				style={{
					position: 'absolute',
					bottom: 52,
					left: 0,
					right: 0,
					display: 'flex',
					justifyContent: 'center',
					opacity: logoOpacity,
				}}
			>
				<SendblueLogo scale={2.2} />
			</div>
		</AbsoluteFill>
	);
};
