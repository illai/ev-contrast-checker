/**
 * Color space conversion utilities
 */

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

/**
 * Converts a hex color string to RGB values
 * @param hex - Color in hex format (e.g., "#FFFFFF" or "#FFF")
 * @returns RGB object with values between 0-255
 */
export function hexToRgb(hex: string): RGB {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  if (!result) {
    throw new Error('Invalid hex color format');
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Converts RGB values to a hex color string
 * @param rgb - RGB object with values between 0-255
 * @returns Color in hex format (e.g., "#FFFFFF")
 */
export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGB values to HSL color space
 * @param rgb - RGB object with values between 0-255
 * @returns HSL object with h in degrees (0-360) and s,l in percentage (0-100)
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts sRGB values to linear RGB values
 * @param rgb - RGB object with values between 0-255
 * @returns RGB object with linearized values between 0-1
 */
export function sRGBToLinear({ r, g, b }: RGB): RGB {
  const toLinear = (value: number): number => {
    value = value / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  };

  return {
    r: toLinear(r),
    g: toLinear(g),
    b: toLinear(b),
  };
}

/**
 * Converts linear RGB values back to sRGB space
 * @param rgb - RGB object with linear values between 0-1
 * @returns RGB object with sRGB values between 0-255
 */
export function linearToSRGB({ r, g, b }: RGB): RGB {
  const fromLinear = (value: number): number => {
    return Math.round(
      (value <= 0.00304
        ? value * 12.92
        : 1.055 * Math.pow(value, 1/2.4) - 0.055) * 255
    );
  };

  return {
    r: fromLinear(r),
    g: fromLinear(g),
    b: fromLinear(b),
  };
}
