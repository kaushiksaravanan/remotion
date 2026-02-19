import React from 'react';

export const PhoneMockup: React.FC<{
	children: React.ReactNode;
	style?: React.CSSProperties;
	width?: number;
	height?: number;
}> = ({children, style, width = 340, height = 680}) => {
	const borderRadius = 40;

	return (
		<div
			style={{
				width,
				height,
				borderRadius,
				background: '#FFFFFF',
				border: '1px solid rgba(0,0,0,0.08)',
				boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
				position: 'relative',
				overflow: 'hidden',
				...style,
			}}
		>
			{/* Dynamic Island */}
			<div
				style={{
					position: 'absolute',
					top: 10,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 120,
					height: 28,
					background: '#000',
					borderRadius: 14,
					zIndex: 10,
				}}
			/>

			{/* Screen */}
			<div
				style={{
					position: 'absolute',
					top: 10,
					left: 10,
					right: 10,
					bottom: 10,
					borderRadius: borderRadius - 6,
					background: '#FFFFFF',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{children}
			</div>

			{/* Home indicator */}
			<div
				style={{
					position: 'absolute',
					bottom: 6,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 100,
					height: 4,
					borderRadius: 2,
					background: 'rgba(0,0,0,0.15)',
					zIndex: 10,
				}}
			/>
		</div>
	);
};
