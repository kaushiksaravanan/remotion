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

// ─── Typing dots component — frame-driven, no CSS animation ──────────────────
const TypingDots: React.FC<{frame: number; opacity: number}> = ({
	frame,
	opacity,
}) => {
	const dots = [0, 1, 2];
	return (
		<div
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 6,
				background: COLORS.incomingGray,
				borderRadius: 22,
				padding: '14px 20px',
				opacity,
			}}
		>
			{dots.map((i) => {
				// Each dot oscillates at 1.5Hz with a phase offset
				const phase = (i * Math.PI * 2) / 3;
				const t = (frame * Math.PI * 2 * 1.5) / 30; // 30fps
				const yOffset = Math.sin(t + phase) * 4;
				const dotOpacity = interpolate(
					Math.sin(t + phase),
					[-1, 1],
					[0.35, 1],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				return (
					<div
						key={i}
						style={{
							width: 9,
							height: 9,
							borderRadius: '50%',
							background: COLORS.muted,
							transform: `translateY(${yOffset}px)`,
							opacity: dotOpacity,
						}}
					/>
				);
			})}
		</div>
	);
};

// ─── Main scene ───────────────────────────────────────────────────────────────
export const Scene2GreenVsBlue: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// ── Global fade out ──────────────────────────────────────────────────────
	const fadeOut = interpolate(frame, [165, 180], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── LEFT SIDE — SMS label ────────────────────────────────────────────────
	const smsLabelOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── LEFT SIDE — SMS bubble spring (frames 10-30) ─────────────────────────
	const smsBubbleSpring = spring({
		frame: frame - 10,
		fps,
		config: SPRINGS.organic,
	});
	const smsBubbleScale = interpolate(smsBubbleSpring, [0, 1], [0.6, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const smsBubbleOpacity = interpolate(frame - 10, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── LEFT SIDE — SMS bubble dims (frames 60-80) ───────────────────────────
	const smsDim = interpolate(frame, [60, 80], [1, 0.3], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── LEFT SIDE — "Blocked" label spring pop (frames 70-80) ────────────────
	const blockedSpring = spring({
		frame: frame - 70,
		fps,
		config: SPRINGS.elastic,
	});
	const blockedScale = interpolate(blockedSpring, [0, 1], [0.4, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const blockedOpacity = interpolate(frame - 70, [0, 8], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── RIGHT SIDE — iMessage label (frames 5-25) ────────────────────────────
	const imsgLabelOpacity = interpolate(frame, [5, 25], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── RIGHT SIDE — iMessage bubble spring (frames 15-40) ───────────────────
	const imsgBubbleSpring = spring({
		frame: frame - 15,
		fps,
		config: SPRINGS.organic,
	});
	const imsgBubbleScale = interpolate(imsgBubbleSpring, [0, 1], [0.6, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const imsgBubbleOpacity = interpolate(frame - 15, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── RIGHT SIDE — Typing dots (frames 50-90) ───────────────────────────────
	const typingDotsOpacity = interpolate(frame, [50, 70, 88, 90], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── RIGHT SIDE — Reply bubble spring (frames 70-90) ──────────────────────
	const replySpring = spring({
		frame: frame - 70,
		fps,
		config: SPRINGS.organic,
	});
	const replyScale = interpolate(replySpring, [0, 1], [0.7, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const replyOpacity = interpolate(frame - 70, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Bottom stat (frames 100-130) ─────────────────────────────────────────
	const statSpring = spring({
		frame: frame - 100,
		fps,
		config: SPRINGS.gentle,
	});
	const statY = interpolate(statSpring, [0, 1], [30, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const statOpacity = interpolate(frame - 100, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Shared bubble style factory ───────────────────────────────────────────
	const bubbleRadius = 22;

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			{/* White background */}
			<AbsoluteFill style={{background: COLORS.bgLight}} />

			{/* Subtle center divider */}
			<div
				style={{
					position: 'absolute',
					top: '10%',
					bottom: '10%',
					left: '50%',
					width: 1,
					background: '#E5E7EB',
					transform: 'translateX(-50%)',
				}}
			/>

			{/* ── Two halves layout ── */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{/* ──────────────── LEFT HALF — SMS ──────────────── */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 32,
						paddingBottom: 80,
					}}
				>
					{/* SMS label */}
					<div
						style={{
							opacity: smsLabelOpacity,
							fontFamily: interFont,
							fontSize: 14,
							fontWeight: 700,
							color: COLORS.smsGreen,
							letterSpacing: '0.12em',
							textTransform: 'uppercase' as const,
						}}
					>
						SMS
					</div>

					{/* SMS bubble + blocked overlay container */}
					<div style={{position: 'relative'}}>
						{/* Green SMS bubble */}
						<div
							style={{
								opacity: smsBubbleOpacity * smsDim,
								transform: `scale(${smsBubbleScale})`,
								transformOrigin: 'left center',
								background: COLORS.smsGreen,
								borderRadius: bubbleRadius,
								borderBottomLeftRadius: 6,
								padding: '20px 26px',
								maxWidth: 360,
								width: 360,
							}}
						>
							<span
								style={{
									fontFamily: interFont,
									fontSize: 22,
									fontWeight: 600,
									color: '#FFFFFF',
									lineHeight: 1.4,
								}}
							>
								Hey! Check out this offer...
							</span>
						</div>

						{/* Blocked label — pops over the dimmed bubble */}
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: `translate(-50%, -50%) scale(${blockedScale})`,
								opacity: blockedOpacity,
								background: COLORS.red,
								borderRadius: 10,
								padding: '10px 24px',
								whiteSpace: 'nowrap' as const,
							}}
						>
							<span
								style={{
									fontFamily: interFont,
									fontSize: 18,
									fontWeight: 800,
									color: '#FFFFFF',
									letterSpacing: '0.1em',
									textTransform: 'uppercase' as const,
								}}
							>
								Blocked
							</span>
						</div>
					</div>
				</div>

				{/* ──────────────── RIGHT HALF — iMessage ──────────────── */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						paddingBottom: 80,
					}}
				>
					{/* iMessage label */}
					<div
						style={{
							opacity: imsgLabelOpacity,
							fontFamily: interFont,
							fontSize: 14,
							fontWeight: 700,
							color: COLORS.sendblue,
							letterSpacing: '0.12em',
							textTransform: 'uppercase' as const,
							marginBottom: 24,
						}}
					>
						iMessage
					</div>

					{/* Chat column — fixed width, messages align within */}
					<div style={{width: 420, display: 'flex', flexDirection: 'column', gap: 14}}>
						{/* Outgoing iMessage bubble — right aligned */}
						<div style={{display: 'flex', justifyContent: 'flex-end'}}>
							<div
								style={{
									opacity: imsgBubbleOpacity,
									transform: `scale(${imsgBubbleScale})`,
									transformOrigin: 'right center',
									background: COLORS.sendblue,
									borderRadius: bubbleRadius,
									borderBottomRightRadius: 6,
									padding: '20px 26px',
									maxWidth: 360,
								}}
							>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 22,
										fontWeight: 600,
										color: '#FFFFFF',
										lineHeight: 1.4,
									}}
								>
									Hey Sarah! I saw you're looking to scale.
								</span>
							</div>
						</div>

						{/* Typing dots OR reply — left aligned */}
						<div style={{display: 'flex', justifyContent: 'flex-start', position: 'relative', minHeight: 56}}>
							{/* Typing indicator */}
							<div style={{position: 'absolute', top: 0, left: 0}}>
								<TypingDots frame={frame} opacity={typingDotsOpacity} />
							</div>

							{/* Reply bubble */}
							<div
								style={{
									opacity: replyOpacity,
									transform: `scale(${replyScale})`,
									transformOrigin: 'left center',
									background: COLORS.incomingGray,
									borderRadius: bubbleRadius,
									borderBottomLeftRadius: 6,
									padding: '14px 22px',
									whiteSpace: 'nowrap' as const,
								}}
							>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 22,
										fontWeight: 500,
										color: COLORS.textPrimary,
										lineHeight: 1.4,
									}}
								>
									Yeah, what do you have?
								</span>
							</div>
						</div>
					</div>
				</div>
			</AbsoluteFill>

			{/* ── Bottom stat ── */}
			<div
				style={{
					position: 'absolute',
					bottom: 72,
					left: 0,
					right: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					opacity: statOpacity,
					transform: `translateY(${statY}px)`,
				}}
			>
				<div
					style={{
						fontFamily: interFont,
						fontSize: 56,
						fontWeight: 900,
						color: COLORS.sendblue,
						letterSpacing: '-0.03em',
						lineHeight: 1,
					}}
				>
					70-85%
				</div>
				<div
					style={{
						fontFamily: interFont,
						fontSize: 20,
						fontWeight: 500,
						color: COLORS.muted,
						marginTop: 8,
						letterSpacing: '0.01em',
					}}
				>
					response rate
				</div>
			</div>
		</AbsoluteFill>
	);
};
