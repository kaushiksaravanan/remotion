import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise2D} from '@remotion/noise';
import {COLORS} from './constants';

type OrbDef = {
	cx: number;
	cy: number;
	radius: number;
	color: string;
	seed: string;
	speedScale: number;
};

const ORBS: OrbDef[] = [
	{cx: 25, cy: 25, radius: 500, color: COLORS.sendblue, seed: 'sb-a', speedScale: 1},
	{cx: 75, cy: 20, radius: 420, color: COLORS.sendblue, seed: 'sb-b', speedScale: 0.7},
	{cx: 55, cy: 75, radius: 460, color: COLORS.ctaBlue, seed: 'sb-c', speedScale: 1.1},
	{cx: 15, cy: 80, radius: 380, color: COLORS.ctaBlue, seed: 'sb-d', speedScale: 0.8},
];

export const Background: React.FC<{
	tint?: string;
	tintOpacity?: number;
}> = ({tint, tintOpacity = 0}) => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(ellipse at 30% 20%, ${COLORS.bgNavy} 0%, ${COLORS.bgDeep} 70%)`,
				overflow: 'hidden',
			}}
		>
			{/* Animated noise-driven orbs */}
			{ORBS.map((orb) => {
				const t = frame * 0.004 * orb.speedScale;
				const dx = noise2D(orb.seed + '-x', t, 0) * 50;
				const dy = noise2D(orb.seed + '-y', 0, t) * 50;
				const pulse = 1 + noise2D(orb.seed + '-r', t * 0.5, 0) * 0.12;

				return (
					<div
						key={orb.seed}
						style={{
							position: 'absolute',
							left: `${orb.cx}%`,
							top: `${orb.cy}%`,
							width: orb.radius * pulse * 2,
							height: orb.radius * pulse * 2,
							borderRadius: '50%',
							background: `radial-gradient(circle, ${orb.color}15 0%, ${orb.color}05 45%, transparent 70%)`,
							filter: 'blur(60px)',
							transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
							pointerEvents: 'none',
						}}
					/>
				);
			})}

			{/* Optional color tint overlay */}
			{tint && tintOpacity > 0 && (
				<AbsoluteFill
					style={{
						background: `radial-gradient(ellipse at center, ${tint}${Math.round(tintOpacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
					}}
				/>
			)}

			{/* Vignette */}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(to bottom, rgba(10,14,26,0.5) 0%, transparent 20%, transparent 80%, rgba(10,14,26,0.7) 100%)',
				}}
			/>
		</AbsoluteFill>
	);
};
