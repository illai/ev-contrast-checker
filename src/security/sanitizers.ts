import { RGB, isValidHexColor, isValidRGB, isValidFontSize, isValidAccessibilityLevel } from './validators';

/**
 * Sanitizes a hex color string
 * @param hex The hex color string to sanitize
 * @returns A valid hex color string or null if invalid
 */
export function sanitizeHexColor(hex: string): string | null {
  if (!hex) return null;
  
  // Remove whitespace and convert to uppercase
  const normalized = hex.trim().toUpperCase();
  
  // Add # if missing
  const withHash = normalized.startsWith('#') ? normalized : `#${normalized}`;
  
  // Expand 3-digit hex to 6-digit
  if (/^#[0-9A-F]{3}$/.test(withHash)) {
    const [, r, g, b] = withHash.match(/#(.)(.)(.)/)!;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  
  return isValidHexColor(withHash) ? withHash : null;
}

/**
 * Sanitizes RGB color values
 * @param rgb The RGB color object to sanitize
 * @returns A valid RGB color object or null if invalid
 */
export function sanitizeRGB(rgb: RGB): RGB | null {
  if (!rgb || typeof rgb !== 'object') return null;
  
  const sanitized: RGB = {
    r: Math.round(Number(rgb.r)),
    g: Math.round(Number(rgb.g)),
    b: Math.round(Number(rgb.b))
  };
  
  return isValidRGB(sanitized) ? sanitized : null;
}

/**
 * Sanitizes font size
 * @param size The font size to sanitize
 * @returns A valid font size or null if invalid
 */
export function sanitizeFontSize(size: number): number | null {
  const parsed = Math.round(Number(size));
  return isValidFontSize(parsed) ? parsed : null;
}

/**
 * Sanitizes accessibility level
 * @param level The accessibility level to sanitize
 * @returns A valid accessibility level or null if invalid
 */
export function sanitizeAccessibilityLevel(level: string): string | null {
  const normalized = level.trim().toUpperCase();
  return isValidAccessibilityLevel(normalized) ? normalized : null;
}

/**
 * Sanitizes color input (hex or RGB)
 * @param color The color to sanitize (hex string or RGB object)
 * @returns A valid color value or null if invalid
 */
export function sanitizeColor(color: string | RGB): string | RGB | null {
  if (typeof color === 'string') {
    return sanitizeHexColor(color);
  }
  return sanitizeRGB(color);
}
