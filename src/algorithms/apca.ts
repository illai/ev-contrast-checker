/**
 * APCA (Advanced Perceptual Contrast Algorithm) Implementation
 * Based on: https://github.com/Myndex/SAPC-APCA
 * 
 * This is the simple version (sRGB input only) implementing
 * APCA version 0.0.98G-4g
 */

import { RGB, hexToRgb } from './conversions';

// APCA constants
const normBG = 0.56;
const normTXT = 0.57;
const revBG = 0.62;
const revTXT = 0.65;
const scaleBoW = 1.14;
const scaleWoB = 1.14;
const loClip = 0.1;
const deltaYmin = 0.0005;

/**
 * Calculate Y (luminance) from sRGB values
 * @param rgb - RGB color values (0-255)
 * @returns Luminance value
 */
function calcAPCAY({ r, g, b }: RGB): number {
  // Convert to 0-1 range
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Convert to luminance using sRGB transfer curve
  r = r > 0.03928 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.03928 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.03928 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Return Y value (luminance)
  return r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
}

/**
 * Calculate APCA contrast value between two colors
 * @param text - Text color in hex format
 * @param background - Background color in hex format
 * @returns APCA contrast value between -108 and 108
 */
export function getAPCAContrast(text: string, background: string): number {
  // Convert hex colors to RGB
  const textRGB = hexToRgb(text);
  const bgRGB = hexToRgb(background);

  // Calculate Y values
  const Ytxt = calcAPCAY(textRGB);
  const Ybg = calcAPCAY(bgRGB);

  // Sort Y values and determine polarity
  let Lc: number;
  
  if (Math.abs(Ybg - Ytxt) < deltaYmin) {
    return 0;
  }

  if (Ybg > Ytxt) {
    // Dark text on light background
    const SAPC = Math.pow(Ybg, normBG) - Math.pow(Ytxt, normTXT);
    Lc = SAPC < loClip ? 0 : -(SAPC * scaleBoW * 100);
  } else {
    // Light text on dark background
    const SAPC = Math.pow(Ytxt, revTXT) - Math.pow(Ybg, revBG);
    Lc = SAPC < loClip ? 0 : SAPC * scaleWoB * 100;
  }

  return Math.round(Lc * 10) / 10; // Round to 1 decimal place
}

/**
 * Check if the APCA contrast meets the specified level criteria
 * @param contrast - APCA contrast value
 * @param fontSize - Font size in pixels
 * @param isBold - Whether the font is bold
 * @param level - Conformance level ('AA' or 'AAA')
 * @returns Whether the contrast meets the criteria
 */
export function meetsAPCACriteria(
  contrast: number,
  fontSize: number,
  isBold: boolean,
  level: 'AA' | 'AAA'
): boolean {
  const absContrast = Math.abs(contrast);
  
  // Font weight adjustment - bold text is treated as ~1.25x larger
  const effectiveSize = isBold ? fontSize * 1.25 : fontSize;

  // APCA Conformance levels
  if (level === 'AA') {
    if (effectiveSize >= 24) return absContrast >= 45;
    if (effectiveSize >= 18) return absContrast >= 60;
    if (effectiveSize >= 14) return absContrast >= 75;
    return absContrast >= 90;
  } else { // AAA
    if (effectiveSize >= 24) return absContrast >= 60;
    if (effectiveSize >= 18) return absContrast >= 75;
    if (effectiveSize >= 14) return absContrast >= 90;
    return absContrast >= 98;
  }
}

/**
 * Get the required APCA contrast value for compliance
 * @param fontSize - Font size in pixels
 * @param isBold - Whether the font is bold
 * @param level - Conformance level ('AA' or 'AAA')
 * @returns Required minimum contrast value
 */
export function getRequiredAPCAContrast(
  fontSize: number,
  isBold: boolean,
  level: 'AA' | 'AAA'
): number {
  if (isBold) {
    fontSize *= 1.25;
  }

  if (level === 'AA') {
    if (fontSize >= 24) return 45;
    if (fontSize >= 18) return 60;
    if (fontSize >= 14) return 75;
    return 90;
  } else {
    if (fontSize >= 24) return 60;
    if (fontSize >= 18) return 75;
    if (fontSize >= 14) return 90;
    return 98;
  }
}
