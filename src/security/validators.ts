/**
 * Color format validators
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Validates a hex color string
 * @param hex The hex color string to validate
 * @returns true if the hex color is valid, false otherwise
 */
export function isValidHexColor(hex: string): boolean {
  if (!hex) return false;
  const normalized = hex.startsWith('#') ? hex : `#${hex}`;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(normalized);
}

/**
 * Validates RGB color values
 * @param rgb The RGB color object to validate
 * @returns true if the RGB values are valid, false otherwise
 */
export function isValidRGB(rgb: RGB): boolean {
  if (!rgb || typeof rgb !== 'object') return false;
  const { r, g, b } = rgb;
  return (
    Number.isInteger(r) && r >= 0 && r <= 255 &&
    Number.isInteger(g) && g >= 0 && g <= 255 &&
    Number.isInteger(b) && b >= 0 && b <= 255
  );
}

/**
 * Validates font size
 * @param size The font size to validate
 * @returns true if the font size is valid, false otherwise
 */
export function isValidFontSize(size: number): boolean {
  return Number.isFinite(size) && size >= 8 && size <= 96;
}

/**
 * Validates accessibility level
 * @param level The accessibility level to validate
 * @returns true if the level is valid, false otherwise
 */
export function isValidAccessibilityLevel(level: string): boolean {
  return ['AA', 'AAA'].includes(level);
}

/**
 * Validates all contrast check parameters
 * @param foreground The foreground color (hex or RGB)
 * @param background The background color (hex or RGB)
 * @param fontSize The font size in pixels
 * @param level The accessibility level
 * @returns true if all parameters are valid, false otherwise
 */
export function validateContrastParameters(
  foreground: string | RGB,
  background: string | RGB,
  fontSize: number,
  level: string
): boolean {
  // Validate colors
  if (typeof foreground === 'string' && !isValidHexColor(foreground)) return false;
  if (typeof background === 'string' && !isValidHexColor(background)) return false;
  if (typeof foreground === 'object' && !isValidRGB(foreground)) return false;
  if (typeof background === 'object' && !isValidRGB(background)) return false;

  // Validate font size and level
  return isValidFontSize(fontSize) && isValidAccessibilityLevel(level);
}
