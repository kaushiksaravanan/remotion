// Re-export Open Sauce Sans from project-level load-fonts.
// Trigger the font load as a side-effect so it's ready before first render.
import '../load-fonts';
import {fontFamily, fontPresets} from '../load-fonts';

// Keep the `interFont` export name to minimise churn in scene files.
export const interFont = fontFamily;

export const textStyles = {
	hero: {
		...fontPresets.extraTight,
		fontWeight: 900,
	} as const,
	heading: {
		...fontPresets.tight,
		fontWeight: 700,
	} as const,
	body: {
		...fontPresets.normal,
		fontWeight: 500,
		letterSpacing: '-0.01em',
	} as const,
	label: {
		fontFamily,
		fontWeight: 400,
		letterSpacing: '0.08em',
		lineHeight: 1.2,
	} as const,
} as const;
