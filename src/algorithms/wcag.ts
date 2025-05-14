/**
 * WCAG 2.x contrast ratio calculator
 * Implementation based on: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

import { RGB, hexToRgb, sRGBToLinear } from './conversions';

/**
 * Calculate relative luminance from RGB values according to WCAG 2.x formula
 * @param rgb - RGB color values
 * @returns Relative luminance value between 0 and 1
 */
export function getRelativeLuminance(rgb: RGB): number {
  const linear = sRGBToLinear(rgb);
  return 0.2126 * linear.r + 0.7152 * linear.g + 0.0722 * linear.b;
}

/**
 * Calculate WCAG 2.x contrast ratio between two colors
 * @param color1 - First color in hex format
 * @param color2 - Second color in hex format
 * @returns Contrast ratio between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if the contrast ratio meets WCAG 2.x criteria
 * @param ratio - Calculated contrast ratio
 * @param level - 'AA' or 'AAA'
 * @param isLargeText - Whether the text is considered large (≥18.66px bold or ≥24px)
 * @returns Whether the contrast meets the specified criteria
 */
export function meetsWCAGCriteria(
  ratio: number,
  level: 'AA' | 'AAA',
  isLargeText: boolean
): boolean {
  if (level === 'AA') {
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }
}

/**
 * Get the required contrast ratio for WCAG compliance
 * @param level - 'AA' or 'AAA'
 * @param isLargeText - Whether the text is considered large
 * @returns Required minimum contrast ratio
 */
export function getRequiredContrastRatio(
  level: 'AA' | 'AAA',
  isLargeText: boolean
): number {
  if (level === 'AA') {
    return isLargeText ? 3 : 4.5;
  } else {
    return isLargeText ? 4.5 : 7;
  }
}
