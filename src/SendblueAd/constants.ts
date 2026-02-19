// ─── Color palette (light mode) ─────────────────────────────────────────────
export const COLORS = {
	// Backgrounds
	bgLight: '#FFFFFF',
	bgSoft: '#F5F7FA',
	bgDeep: '#FFFFFF', // keep alias for compat — now white
	bgNavy: '#F0F2F5', // subtle warm gray for radial gradients

	// Brand
	sendblue: '#008BFF',
	ctaBlue: '#3b82f6',

	// SMS green
	smsGreen: '#34C759',

	// Problem/warning
	red: '#EF4444',
	redGlow: '#EF444433',

	// Neutrals (for light mode)
	textPrimary: '#1A1D2B', // near-black navy
	white: '#1A1D2B', // RENAMED: used as "primary text" throughout — now dark
	offWhite: '#374151',
	muted: '#6B7280',
	dimText: '#9CA3AF',

	// Chat
	incomingGray: '#E5E7EB',
} as const;

// ─── Spring configs ───────────────────────────────────────────────────────────
export const SPRINGS = {
	// Smooth entrance, no overshoot
	gentle: {damping: 200, stiffness: 100, mass: 1},
	// Organic settle with slight overshoot
	organic: {damping: 15, stiffness: 80, mass: 0.8},
	// Elastic pop — playful, bouncy
	elastic: {damping: 8, stiffness: 150, mass: 0.5},
	// Heavy, weighty entrance
	heavy: {damping: 30, stiffness: 40, mass: 2},
} as const;

// ─── Scene timing (30fps, 900 frames total = 30s) ───────────────────────────
export const SCENE_TIMING = {
	s1Start: 0,
	s1Dur: 150, // 0-5s: The Leak
	s2Start: 150,
	s2Dur: 180, // 5-11s: Green vs Blue
	s3Start: 330,
	s3Dur: 210, // 11-18s: The Conversation
	s4Start: 540,
	s4Dur: 180, // 18-24s: The Numbers
	s5Start: 720,
	s5Dur: 180, // 24-30s: CTA
} as const;
