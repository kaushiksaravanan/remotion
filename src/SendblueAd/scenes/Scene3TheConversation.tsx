// ─── src/SendblueAd/scenes/Scene3TheConversation.tsx ─────────────────────────
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS, SPRINGS} from '../constants';
import {PhoneMockup} from '../PhoneMockup';
import {ChatBubble, TypingDots, ConfirmationBanner} from '../ChatBubble';
import {interFont} from '../fonts';

export const Scene3TheConversation: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Phone entrance — springs in from below
	const phoneSpring = spring({
		frame,
		fps,
		config: SPRINGS.organic,
	});
	const phoneY = interpolate(phoneSpring, [0, 1], [100, 0]);
	const phoneOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// "Within seconds of opt-in" label — fades in around frame 30 (~1s)
	const labelOpacity = interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const labelY = interpolate(frame, [1 * fps, 1.5 * fps], [12, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Message timeline (in frames from scene start)
	const MSG_1_START = Math.round(1.2 * fps); // Blue: "Hey Sarah..."
	const TYPING_1_START = Math.round(2.5 * fps);
	const TYPING_1_END = Math.round(3.5 * fps);
	const MSG_2_START = TYPING_1_END; // Gray: "Yeah, what do you have?"
	const MSG_3_START = Math.round(4.5 * fps); // Blue: "Check out..."
	const TYPING_2_START = Math.round(5.2 * fps);
	const TYPING_2_END = Math.round(5.8 * fps);
	const MSG_4_START = TYPING_2_END; // Gray: "Sure, send it over"
	const CONFIRM_START = Math.round(6.3 * fps); // Green banner

	// Message 1
	const msg1Opacity = interpolate(
		frame,
		[MSG_1_START, MSG_1_START + 8],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const msg1Spring = spring({
		frame: frame - MSG_1_START,
		fps,
		config: SPRINGS.gentle,
	});

	const showTyping1 = frame >= TYPING_1_START && frame < TYPING_1_END;

	// Message 2
	const msg2Opacity = interpolate(
		frame,
		[MSG_2_START, MSG_2_START + 8],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const msg2Spring = spring({
		frame: frame - MSG_2_START,
		fps,
		config: SPRINGS.gentle,
	});

	// Message 3
	const msg3Opacity = interpolate(
		frame,
		[MSG_3_START, MSG_3_START + 8],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const msg3Spring = spring({
		frame: frame - MSG_3_START,
		fps,
		config: SPRINGS.gentle,
	});

	const showTyping2 = frame >= TYPING_2_START && frame < TYPING_2_END;

	// Message 4
	const msg4Opacity = interpolate(
		frame,
		[MSG_4_START, MSG_4_START + 8],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const msg4Spring = spring({
		frame: frame - MSG_4_START,
		fps,
		config: SPRINGS.gentle,
	});

	// Confirmation banner
	const confirmSpring = spring({
		frame: frame - CONFIRM_START,
		fps,
		config: SPRINGS.elastic,
	});
	const confirmOpacity = interpolate(
		frame - CONFIRM_START,
		[0, 0.3 * fps],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
	);
	const confirmY = interpolate(confirmSpring, [0, 1], [30, 0]);

	// Fade out
	const fadeOut = interpolate(frame, [195, 210], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{opacity: fadeOut}}>
			{/* White background */}
			<AbsoluteFill style={{background: COLORS.bgLight}} />

			{/* Label above phone */}
			<div
				style={{
					position: 'absolute',
					top: 112,
					left: 0,
					right: 0,
					textAlign: 'center',
					opacity: labelOpacity,
					transform: `translateY(${labelY}px)`,
				}}
			>
				<span
					style={{
						fontFamily: interFont,
						fontSize: 13,
						fontWeight: 600,
						color: COLORS.muted,
						letterSpacing: '0.12em',
						textTransform: 'uppercase',
					}}
				>
					Within seconds of opt-in
				</span>
			</div>

			{/* Phone — centered hero */}
			<AbsoluteFill
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						opacity: phoneOpacity,
						transform: `translateY(${phoneY}px)`,
					}}
				>
					<PhoneMockup width={380} height={720}>
						{/* iMessage header */}
						<div
							style={{
								padding: '48px 16px 12px',
								borderBottom: '1px solid rgba(0,0,0,0.06)',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									fontFamily: interFont,
									fontSize: 15,
									fontWeight: 600,
									color: COLORS.textPrimary,
								}}
							>
								Sendblue Business
							</div>
							<div
								style={{
									fontFamily: interFont,
									fontSize: 11,
									color: COLORS.sendblue,
									marginTop: 2,
								}}
							>
								iMessage
							</div>
						</div>

						{/* Messages area */}
						<div
							style={{
								flex: 1,
								paddingTop: 14,
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
								overflow: 'hidden',
							}}
						>
							{/* Message 1 — Blue outgoing */}
							{frame >= MSG_1_START && (
								<div
									style={{
										opacity: msg1Opacity,
										transform: `translateY(${interpolate(msg1Spring, [0, 1], [15, 0])}px)`,
									}}
								>
									<ChatBubble
										variant="imessage"
										text="Hey Sarah! I saw you're looking to scale past $50K/mo."
										fontSize={13}
									/>
								</div>
							)}

							{/* Typing dots 1 */}
							{showTyping1 && <TypingDots frame={frame} variant="incoming" />}

							{/* Message 2 — Gray incoming */}
							{frame >= MSG_2_START && (
								<div
									style={{
										opacity: msg2Opacity,
										transform: `translateY(${interpolate(msg2Spring, [0, 1], [15, 0])}px)`,
									}}
								>
									<ChatBubble
										variant="incoming"
										text="Yeah, what do you have?"
										fontSize={13}
									/>
								</div>
							)}

							{/* Message 3 — Blue outgoing */}
							{frame >= MSG_3_START && (
								<div
									style={{
										opacity: msg3Opacity,
										transform: `translateY(${interpolate(msg3Spring, [0, 1], [15, 0])}px)`,
									}}
								>
									<ChatBubble
										variant="imessage"
										text="Check out this training — want me to send it?"
										fontSize={13}
									/>
								</div>
							)}

							{/* Typing dots 2 */}
							{showTyping2 && <TypingDots frame={frame} variant="incoming" />}

							{/* Message 4 — Gray incoming */}
							{frame >= MSG_4_START && (
								<div
									style={{
										opacity: msg4Opacity,
										transform: `translateY(${interpolate(msg4Spring, [0, 1], [15, 0])}px)`,
									}}
								>
									<ChatBubble
										variant="incoming"
										text="Sure, send it over"
										fontSize={13}
									/>
								</div>
							)}

							{/* Confirmation banner */}
							{frame >= CONFIRM_START && (
								<div
									style={{
										opacity: confirmOpacity,
										transform: `translateY(${confirmY}px)`,
									}}
								>
									<ConfirmationBanner text="Call Booked" />
								</div>
							)}
						</div>
					</PhoneMockup>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
