// ─── src/SendblueStatics/Static1GreenBubble.tsx ──────────────────────────────
//
// 1080×1080 static ad creative for Sendblue.
// Concept: "Green texts = junk folder" — dark background, SMS vs iMessage comparison.
// Duration: 150 frames @ 30fps = 5 seconds.
//
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

// ─── Dark-mode Sendblue logo — same SVG paths, text letters in white ─────────
// (Original SendblueLogo has #1A1D2B text which is invisible on dark background)
const SendblueLogoDark: React.FC<{scale?: number}> = ({scale = 1}) => {
	const width = 119 * scale;
	const height = 24 * scale;

	return (
		<svg width={width} height={height} viewBox="0 0 119 24" fill="none">
			{/* Blue dot */}
			<path
				d="M19.5141 1.73315C17.9956 1.73315 16.7647 2.96429 16.7647 4.48299C16.7647 6.00168 17.9956 7.23282 19.5141 7.23282C21.0325 7.23282 22.2634 6.00168 22.2634 4.48299C22.2634 2.96429 21.0325 1.73315 19.5141 1.73315Z"
				fill="#008BFF"
			/>
			{/* Blue flower / blob icon */}
			<path
				d="M0.00400648 12C0.00400632 13.8933 1.45673 15.4423 3.30966 15.6024C2.11306 17.0233 2.18109 19.1488 3.51776 20.4857C4.85443 21.8225 6.97949 21.8906 8.4002 20.6938C8.55628 22.547 10.1091 24 12.002 24C13.8949 24 15.4437 22.547 15.6038 20.6938C17.0245 21.8906 19.1496 21.8225 20.4862 20.4857C21.8229 19.1488 21.8909 17.0233 20.6943 15.6024C22.5473 15.4463 24 13.8933 24 12C24 10.0027 22.3792 8.38159 20.3822 8.38159C20.2421 8.38159 20.1061 8.3936 19.97 8.40961C19.8219 8.42562 19.6698 8.42962 19.5138 8.42962C18.9975 8.42962 18.5053 8.32955 18.057 8.14943C17.0485 7.74917 16.2481 6.94463 15.8479 5.93996C15.6678 5.48766 15.5678 4.99533 15.5678 4.48299C15.5678 4.32689 15.5718 4.17879 15.5878 4.02669C15.6038 3.8906 15.6158 3.75451 15.6158 3.61842C15.6158 1.62108 13.995 0 11.998 0C10.1051 0 8.55628 1.45297 8.3962 3.3062C6.97549 2.10941 4.85043 2.17745 3.51376 3.51434C2.17709 4.85123 2.10906 6.97665 3.30566 8.3976C1.45273 8.5537 0 10.1067 0 12L0.00400648 12Z"
				fill="#008BFF"
			/>
			{/* "S" */}
			<path
				d="M30 14.5281L32.4348 14.5702C32.5607 16.2978 33.904 17.4565 35.961 17.4565C37.7031 17.4565 38.9625 16.677 38.9625 15.2654C38.9625 13.7065 37.4302 13.3694 35.1004 12.948C32.6657 12.5267 30.3568 11.7472 30.3568 8.81882C30.3568 6.2486 32.4558 4.5 35.5832 4.5C38.9415 4.5 41.0404 6.33287 41.1454 9.05056H38.7316C38.5427 7.55477 37.3673 6.54354 35.5832 6.54354C33.925 6.54354 32.7706 7.25983 32.7706 8.65028C32.7706 10.1671 34.2818 10.4831 36.5907 10.8834C39.0254 11.3258 41.3972 12.1053 41.3763 15.0126C41.3763 17.6671 39.1724 19.5 35.94 19.5C32.2878 19.5 30.084 17.4775 30 14.5281Z"
				fill="white"
			/>
			{/* "e" */}
			<path
				d="M48.3706 19.5C44.9914 19.5 42.8714 17.309 42.8714 14.0014C42.8714 10.6728 44.9914 8.46067 48.1608 8.46067C51.2672 8.46067 53.3451 10.441 53.4081 13.6011C53.4081 13.875 53.3871 14.1699 53.3451 14.4649H45.2432V14.6124C45.3062 16.4452 46.4606 17.6461 48.2447 17.6461C49.63 17.6461 50.6375 16.9508 50.9523 15.75H53.2192C52.8414 17.8778 51.0363 19.5 48.3706 19.5ZM45.3272 12.8006H51.0573C50.8684 11.1994 49.756 10.2935 48.1817 10.2935C46.7335 10.2935 45.4951 11.2626 45.3272 12.8006Z"
				fill="white"
			/>
			{/* "n" */}
			<path
				d="M60.9079 8.46067C63.2797 8.46067 65.2317 9.76685 65.2317 13.3694V19.3736H62.9439V13.559C62.9439 11.5154 62.0833 10.4199 60.3832 10.4199C58.5781 10.4199 57.5076 11.7472 57.5076 13.9382V19.3736H55.2407V8.58708H57.2137L57.4656 9.99859C58.1373 9.1559 59.1658 8.46067 60.9079 8.46067Z"
				fill="white"
			/>
			{/* "d" */}
			<path
				d="M75.3761 10.0829V4.6264H77.643V19.3736H75.67L75.3971 17.7514C74.7045 18.6994 73.592 19.5 71.8919 19.5C68.9744 19.5 66.8125 17.4354 66.8125 13.9803C66.8125 10.6517 68.9744 8.46067 71.8919 8.46067C73.5291 8.46067 74.6835 9.13483 75.3761 10.0829ZM72.2697 17.5829C74.1588 17.5829 75.3971 16.1081 75.3971 14.0225C75.3971 11.8736 74.1588 10.3989 72.2697 10.3989C70.3807 10.3989 69.1423 11.8736 69.1423 13.9803C69.1423 16.1081 70.3807 17.5829 72.2697 17.5829Z"
				fill="white"
			/>
			{/* "b" */}
			<path
				d="M85.6093 8.46067C88.5478 8.46067 90.6887 10.5042 90.6887 13.9803C90.6887 17.2879 88.5478 19.5 85.6093 19.5C83.9301 19.5 82.7757 18.7837 82.1041 17.8146L81.8312 19.3736H79.8582V4.6264H82.1251V10.1882C82.8387 9.2191 83.9511 8.46067 85.6093 8.46067ZM85.2315 17.5829C87.1205 17.5829 88.3799 16.1081 88.3799 13.9803C88.3799 11.8736 87.1205 10.3989 85.2315 10.3989C83.3424 10.3989 82.1041 11.8736 82.1041 13.9593C82.1041 16.0871 83.3424 17.5829 85.2315 17.5829Z"
				fill="white"
			/>
			{/* "l" */}
			<path
				d="M92.5051 19.3736V4.6264H94.772V19.3736H92.5051Z"
				fill="white"
			/>
			{/* "u" */}
			<path
				d="M104.361 13.9803V8.58708H106.628V19.3736H104.634L104.382 18.0042C103.711 18.8258 102.724 19.5 101.066 19.5C98.7782 19.5 96.8262 18.2781 96.8262 14.5913V8.58708H99.093V14.3385C99.093 16.4452 99.9326 17.5197 101.591 17.5197C103.312 17.5197 104.361 16.2135 104.361 13.9803Z"
				fill="white"
			/>
			{/* "e" */}
			<path
				d="M113.963 19.5C110.583 19.5 108.463 17.309 108.463 14.0014C108.463 10.6728 110.583 8.46067 113.753 8.46067C116.859 8.46067 118.937 10.441 119 13.6011C119 13.875 118.979 14.1699 118.937 14.4649H110.835V14.6124C110.898 16.4452 112.053 17.6461 113.837 17.6461C115.222 17.6461 116.229 16.9508 116.544 15.75H118.811C118.433 17.8778 116.628 19.5 113.963 19.5ZM110.919 12.8006H116.649C116.46 11.1994 115.348 10.2935 113.774 10.2935C112.325 10.2935 111.087 11.2626 110.919 12.8006Z"
				fill="white"
			/>
		</svg>
	);
};

export type Static1GreenBubbleProps = Record<string, never>;

// ─── Bubble radius corners (iMessage style) ──────────────────────────────────
const BUBBLE_RADIUS = 24;

// ─── Small "label pill" — "SMS:" or "iMessage:" ──────────────────────────────
const BubbleLabel: React.FC<{
	text: string;
	color: string;
	opacity: number;
}> = ({text, color, opacity}) => (
	<div
		style={{
			opacity,
			fontFamily: interFont,
			fontSize: 18,
			fontWeight: 700,
			color,
			letterSpacing: '0.08em',
			textTransform: 'uppercase' as const,
			marginBottom: 14,
		}}
	>
		{text}
	</div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export const Static1GreenBubble: React.FC<Static1GreenBubbleProps> = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// ── Background fade in (frames 0-10) ──────────────────────────────────────
	const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Headline: slides up + fades in (frames 0-20) ─────────────────────────
	const headlineSpring = spring({
		frame,
		fps,
		config: SPRINGS.gentle,
	});
	const headlineY = interpolate(headlineSpring, [0, 1], [40, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const headlineOpacity = interpolate(frame, [0, Math.round(0.6 * fps)], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── SMS label (frames 15-30) ──────────────────────────────────────────────
	const smsLabelDelay = Math.round(0.5 * fps);
	const smsLabelOpacity = interpolate(
		frame - smsLabelDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── SMS bubble: slides from LEFT + fade in (frames 20-45) ───────────────
	const smsBubbleDelay = Math.round(0.67 * fps);
	const smsBubbleSpring = spring({
		frame: frame - smsBubbleDelay,
		fps,
		config: SPRINGS.gentle,
	});
	const smsSlideX = interpolate(smsBubbleSpring, [0, 1], [-60, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const smsBubbleOpacity = interpolate(
		frame - smsBubbleDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	// ── iMessage label (frames 35-55) ────────────────────────────────────────
	const imsgLabelDelay = Math.round(1.17 * fps);
	const imsgLabelOpacity = interpolate(
		frame - imsgLabelDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── iMessage bubble: slides from RIGHT + fade in (frames 45-70) ─────────
	const imsgBubbleDelay = Math.round(1.5 * fps);
	const imsgBubbleSpring = spring({
		frame: frame - imsgBubbleDelay,
		fps,
		config: SPRINGS.gentle,
	});
	const imsgSlideX = interpolate(imsgBubbleSpring, [0, 1], [60, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const imsgBubbleOpacity = interpolate(
		frame - imsgBubbleDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const imsgBubbleScale = interpolate(imsgBubbleSpring, [0, 1], [0.85, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Vertical divider: draws in between SMS and iMessage bubble appearances
	const dividerHeight = interpolate(
		frame,
		[Math.round(0.9 * fps), Math.round(1.3 * fps)],
		[0, 100],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── CTA row: slides up (frames 70-95) ────────────────────────────────────
	const ctaDelay = Math.round(2.33 * fps);
	const ctaSpring = spring({
		frame: frame - ctaDelay,
		fps,
		config: SPRINGS.gentle,
	});
	const ctaY = interpolate(ctaSpring, [0, 1], [24, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const ctaOpacity = interpolate(
		frame - ctaDelay,
		[0, Math.round(0.5 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	// ── Logo: fades in last (frames 90-115) ──────────────────────────────────
	const logoDelay = Math.round(3 * fps);
	const logoOpacity = interpolate(
		frame - logoDelay,
		[0, Math.round(0.67 * fps)],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);

	return (
		<AbsoluteFill>
			{/* ── Dark background ── */}
			<AbsoluteFill
				style={{
					background: '#0A0C10',
					opacity: bgOpacity,
				}}
			/>

			{/* ── Subtle radial gradient for depth ── */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,139,255,0.06) 0%, transparent 70%)',
					opacity: bgOpacity,
				}}
			/>

			{/* ── Main content column ── */}
			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					paddingLeft: 80,
					paddingRight: 80,
					gap: 0,
				}}
			>
				{/* ── Headline ── */}
				<div
					style={{
						opacity: headlineOpacity,
						transform: `translateY(${headlineY}px)`,
						textAlign: 'center',
						marginBottom: 60,
					}}
				>
					<div
						style={{
							fontFamily: interFont,
							fontSize: 52,
							fontWeight: 800,
							color: '#FFFFFF',
							letterSpacing: '-0.03em',
							lineHeight: 1.1,
							maxWidth: 800,
						}}
					>
						Most funnels talk{' '}
						<span style={{color: COLORS.red, fontStyle: 'italic' as const}}>
							AT
						</span>{' '}
						leads.
						<br />
						<span style={{color: '#FFFFFF'}}>This one talks</span>{' '}
						<span
							style={{
								color: COLORS.sendblue,
								fontStyle: 'italic' as const,
							}}
						>
							with
						</span>{' '}
						<span style={{color: '#FFFFFF'}}>them.</span>
					</div>
				</div>

				{/* ── Bubble comparison row ── */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: 40,
						alignItems: 'flex-start',
						justifyContent: 'center',
						width: '100%',
						maxWidth: 920,
						marginBottom: 56,
					}}
				>
					{/* ── LEFT: SMS bubble ── */}
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<BubbleLabel
							text="SMS:"
							color={COLORS.smsGreen}
							opacity={smsLabelOpacity}
						/>
						<div
							style={{
								opacity: smsBubbleOpacity,
								transform: `translateX(${smsSlideX}px)`,
								transformOrigin: 'left center',
							}}
						>
							{/* SMS green bubble */}
							<div
								style={{
									background: COLORS.smsGreen,
									borderRadius: BUBBLE_RADIUS,
									borderBottomLeftRadius: 6,
									padding: '28px 32px',
									display: 'flex',
									alignItems: 'center',
									gap: 12,
								}}
							>
								{/* Red X icon — conveys rejection/spam */}
								<svg
									width={28}
									height={28}
									viewBox="0 0 22 22"
									fill="none"
									style={{flexShrink: 0}}
								>
									<circle cx={11} cy={11} r={11} fill="rgba(0,0,0,0.20)" />
									<path
										d="M7.5 7.5L14.5 14.5M14.5 7.5L7.5 14.5"
										stroke="#FFFFFF"
										strokeWidth={2.5}
										strokeLinecap="round"
									/>
								</svg>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 30,
										fontWeight: 600,
										color: '#FFFFFF',
										lineHeight: 1.35,
										letterSpacing: '-0.01em',
									}}
								>
									No show at 3 PM?
								</span>
							</div>

							{/* "Spam folder" label below bubble */}
							<div
								style={{
									marginTop: 12,
									display: 'flex',
									alignItems: 'center',
									gap: 8,
								}}
							>
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: '50%',
										background: COLORS.red,
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 15,
										fontWeight: 600,
										color: COLORS.red,
										letterSpacing: '0.04em',
										textTransform: 'uppercase' as const,
									}}
								>
									Often ends up in spam
								</span>
							</div>
						</div>
					</div>

					{/* ── Vertical divider ── */}
					<div
						style={{
							width: 1,
							height: dividerHeight,
							background: 'rgba(255,255,255,0.12)',
							alignSelf: 'center',
							flexShrink: 0,
						}}
					/>

					{/* ── RIGHT: iMessage bubble ── */}
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<BubbleLabel
							text="iMessage:"
							color={COLORS.sendblue}
							opacity={imsgLabelOpacity}
						/>
						<div
							style={{
								opacity: imsgBubbleOpacity,
								transform: `translateX(${imsgSlideX}px)`,
								transformOrigin: 'right center',
							}}
						>
							{/* iMessage blue bubble */}
							<div
								style={{
									background: COLORS.sendblue,
									borderRadius: BUBBLE_RADIUS,
									borderBottomLeftRadius: 6,
									padding: '28px 32px',
									display: 'flex',
									alignItems: 'center',
									gap: 12,
								}}
							>
								{/* Green checkmark — conveys delivery/success */}
								<svg
									width={28}
									height={28}
									viewBox="0 0 22 22"
									fill="none"
									style={{flexShrink: 0}}
								>
									<circle cx={11} cy={11} r={11} fill="rgba(255,255,255,0.20)" />
									<path
										d="M6.5 11.5L9.5 14.5L15.5 8"
										stroke="#FFFFFF"
										strokeWidth={2.5}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 30,
										fontWeight: 600,
										color: '#FFFFFF',
										lineHeight: 1.35,
										letterSpacing: '-0.01em',
									}}
								>
									See you at 3 PM!
								</span>
							</div>

							{/* "Delivered" label below bubble */}
							<div
								style={{
									marginTop: 12,
									display: 'flex',
									alignItems: 'center',
									gap: 8,
								}}
							>
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: '50%',
										background: '#30D158',
										flexShrink: 0,
									}}
								/>
								<span
									style={{
										fontFamily: interFont,
										fontSize: 15,
										fontWeight: 600,
										color: '#30D158',
										letterSpacing: '0.04em',
										textTransform: 'uppercase' as const,
									}}
								>
									Delivered to inbox
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* ── CTA row ── */}
				<div
					style={{
						opacity: ctaOpacity,
						transform: `translateY(${ctaY}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
						marginBottom: 48,
					}}
				>
					{/* Arrow icon */}
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
						<svg
							width={18}
							height={18}
							viewBox="0 0 18 18"
							fill="none"
						>
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
							fontSize: 28,
							fontWeight: 700,
							color: '#FFFFFF',
							letterSpacing: '-0.02em',
							lineHeight: 1.2,
						}}
					>
						Send blue iMessages from inside your CRM
					</span>
				</div>
			</AbsoluteFill>

			{/* ── Sendblue logo — pinned to bottom center, white text for dark bg ── */}
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
				<SendblueLogoDark scale={2.2} />
			</div>
		</AbsoluteFill>
	);
};
