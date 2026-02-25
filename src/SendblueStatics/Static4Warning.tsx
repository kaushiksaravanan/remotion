// ─── src/SendblueStatics/Static4Warning.tsx ──────────────────────────────────
// 1080×1080 static ad — WARNING banner + clean stat lines
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

export type Static4WarningProps = Record<string, never>;

const STATS = [
	'Leads texting back within seconds',
	'2x more booked calls',
	'80% show-rates',
] as const;

export const Static4Warning: React.FC<Static4WarningProps> = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// ── WARNING banner — elastic pop ─────────────────────────────────────────
	const bannerSpring = spring({frame, fps, config: SPRINGS.elastic});
	const bannerScale = interpolate(bannerSpring, [0, 1], [0.6, 1]);
	const bannerOpacity = interpolate(
		frame,
		[0, Math.round(0.25 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Headline ─────────────────────────────────────────────────────────────
	const headlineDelay = Math.round(0.7 * fps);
	const headlineSpring = spring({
		frame: frame - headlineDelay,
		fps,
		config: SPRINGS.gentle,
	});
	const headlineY = interpolate(headlineSpring, [0, 1], [30, 0]);
	const headlineOpacity = interpolate(
		frame - headlineDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Stats — staggered slide from left ────────────────────────────────────
	const statsBaseDelay = Math.round(1.4 * fps);
	const statsStagger = 10;

	// ── CTA ──────────────────────────────────────────────────────────────────
	const ctaDelay =
		statsBaseDelay + STATS.length * statsStagger + Math.round(0.3 * fps);
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
				{/* WARNING banner — just text in a red pill */}
				<div
					style={{
						opacity: bannerOpacity,
						transform: `scale(${bannerScale})`,
						marginBottom: 48,
					}}
				>
					<div
						style={{
							background: COLORS.red,
							borderRadius: 14,
							paddingTop: 18,
							paddingBottom: 18,
							paddingLeft: 44,
							paddingRight: 44,
							boxShadow: `0 8px 32px ${COLORS.red}44`,
						}}
					>
						<span
							style={{
								fontFamily: interFont,
								fontSize: 36,
								fontWeight: 900,
								color: '#FFFFFF',
								letterSpacing: '0.12em',
								lineHeight: 1,
							}}
						>
							WARNING
						</span>
					</div>
				</div>

				{/* Headline */}
				<div
					style={{
						opacity: headlineOpacity,
						transform: `translateY(${headlineY}px)`,
						textAlign: 'center',
						marginBottom: 56,
						maxWidth: 820,
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
						This Funnel{' '}
						<span style={{color: COLORS.sendblue}}>
							Doubled Our Show-Up Rate
						</span>
					</div>
				</div>

				{/* Stats — simple text lines with arrow prefix */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 28,
						marginBottom: 56,
					}}
				>
					{STATS.map((stat, i) => {
						const delay = statsBaseDelay + i * statsStagger;
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
						const x = interpolate(s, [0, 1], [-30, 0]);

						return (
							<div
								key={stat}
								style={{
									opacity,
									transform: `translateX(${x}px)`,
									display: 'flex',
									alignItems: 'center',
									gap: 16,
								}}
							>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 22,
										color: COLORS.sendblue,
										fontWeight: 700,
									}}
								>
									→
								</span>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 30,
										fontWeight: 600,
										color: COLORS.textPrimary,
										letterSpacing: '-0.02em',
									}}
								>
									{stat}
								</span>
							</div>
						);
					})}
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
						Build this funnel in minutes
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
