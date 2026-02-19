import React from 'react';
import {interFont} from './fonts';

export const ChatBubble: React.FC<{
	text: string;
	variant: 'imessage' | 'sms' | 'incoming';
	style?: React.CSSProperties;
	fontSize?: number;
}> = ({text, variant, style, fontSize = 14}) => {
	const isOutgoing = variant !== 'incoming';

	const bgMap = {
		imessage: '#008BFF',
		sms: '#34C759',
		incoming: '#E5E7EB',
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
				padding: '0 14px',
				...style,
			}}
		>
			<div
				style={{
					maxWidth: '82%',
					padding: '10px 14px',
					borderRadius: isOutgoing
						? '18px 18px 4px 18px'
						: '18px 18px 18px 4px',
					background: bgMap[variant],
					color: variant === 'incoming' ? '#1A1D2B' : '#FFFFFF',
					fontSize,
					lineHeight: 1.4,
					fontFamily: interFont,
					fontWeight: 400,
				}}
			>
				{text}
			</div>
		</div>
	);
};

export const TypingDots: React.FC<{
	frame: number;
	variant?: 'imessage' | 'incoming';
}> = ({frame, variant = 'incoming'}) => {
	const bg = variant === 'imessage' ? '#008BFF' : '#E5E7EB';
	const dotColor = variant === 'imessage' ? 'white' : '#6B7280';

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: variant === 'imessage' ? 'flex-end' : 'flex-start',
				padding: '0 14px',
			}}
		>
			<div
				style={{
					padding: '12px 18px',
					borderRadius:
						variant === 'imessage'
							? '18px 18px 4px 18px'
							: '18px 18px 18px 4px',
					background: bg,
					display: 'flex',
					gap: 5,
					alignItems: 'center',
				}}
			>
				{[0, 1, 2].map((i) => {
					const phase = ((frame + i * 6) % 24) / 24;
					const y = Math.sin(phase * Math.PI * 2) * -3;
					const opacity = 0.4 + Math.sin(phase * Math.PI * 2) * 0.3 + 0.3;
					return (
						<div
							key={i}
							style={{
								width: 7,
								height: 7,
								borderRadius: 4,
								background: dotColor,
								opacity,
								transform: `translateY(${y}px)`,
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const ConfirmationBanner: React.FC<{
	text: string;
	style?: React.CSSProperties;
}> = ({text, style}) => {
	return (
		<div
			style={{
				margin: '6px 14px',
				padding: '10px 16px',
				borderRadius: 12,
				background: 'rgba(52, 199, 89, 0.1)',
				border: '1px solid rgba(52, 199, 89, 0.25)',
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				...style,
			}}
		>
			<svg width={18} height={18} viewBox="0 0 18 18" fill="none">
				<circle cx={9} cy={9} r={9} fill="#34C759" />
				<path
					d="M5.5 9.5L7.5 11.5L12.5 6.5"
					stroke="white"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<span
				style={{
					fontFamily: interFont,
					fontSize: 13,
					fontWeight: 600,
					color: '#34C759',
				}}
			>
				{text}
			</span>
		</div>
	);
};
