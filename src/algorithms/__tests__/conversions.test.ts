import { hexToRgb, rgbToHex, rgbToHsl, sRGBToLinear, linearToSRGB } from '../conversions';

describe('Color Conversions', () => {
  describe('hexToRgb', () => {
    it('converts 6-digit hex to RGB', () => {
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('converts 3-digit hex to RGB', () => {
      expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('handles hex without #', () => {
      expect(hexToRgb('FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('throws error for invalid hex', () => {
      expect(() => hexToRgb('#XYZ')).toThrow();
      expect(() => hexToRgb('#12')).toThrow();
    });
  });

  describe('rgbToHex', () => {
    it('converts RGB to hex', () => {
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
    });

    it('handles decimal values', () => {
      expect(rgbToHex({ r: 255.4, g: 128.6, b: 0.1 })).toBe('#ff8100');
    });

    it('clamps values to valid range', () => {
      expect(rgbToHex({ r: 300, g: -50, b: 128 })).toBe('#ff0080');
    });
  });

  describe('rgbToHsl', () => {
    it('converts white to HSL', () => {
      const hsl = rgbToHsl({ r: 255, g: 255, b: 255 });
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(100);
    });

    it('converts black to HSL', () => {
      const hsl = rgbToHsl({ r: 0, g: 0, b: 0 });
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(0);
      expect(hsl.l).toBe(0);
    });

    it('converts primary colors to HSL', () => {
      const red = rgbToHsl({ r: 255, g: 0, b: 0 });
      expect(red.h).toBe(0);
      expect(red.s).toBe(100);
      expect(red.l).toBe(50);

      const green = rgbToHsl({ r: 0, g: 255, b: 0 });
      expect(green.h).toBe(120);
      expect(green.s).toBe(100);
      expect(green.l).toBe(50);

      const blue = rgbToHsl({ r: 0, g: 0, b: 255 });
      expect(blue.h).toBe(240);
      expect(blue.s).toBe(100);
      expect(blue.l).toBe(50);
    });
  });

  describe('sRGB to Linear RGB conversion', () => {
    it('converts black and white correctly', () => {
      const black = sRGBToLinear({ r: 0, g: 0, b: 0 });
      expect(black.r).toBeCloseTo(0);
      expect(black.g).toBeCloseTo(0);
      expect(black.b).toBeCloseTo(0);

      const white = sRGBToLinear({ r: 255, g: 255, b: 255 });
      expect(white.r).toBeCloseTo(1);
      expect(white.g).toBeCloseTo(1);
      expect(white.b).toBeCloseTo(1);
    });

    it('converts mid-gray correctly', () => {
      const gray = sRGBToLinear({ r: 128, g: 128, b: 128 });
      expect(gray.r).toBeCloseTo(0.2158605001, 6);
      expect(gray.g).toBeCloseTo(0.2158605001, 6);
      expect(gray.b).toBeCloseTo(0.2158605001, 6);
    });
  });

  describe('Linear RGB to sRGB conversion', () => {
    it('converts back from linear space correctly', () => {
      const original = { r: 128, g: 128, b: 128 };
      const linear = sRGBToLinear(original);
      const back = linearToSRGB(linear);
      
      expect(back.r).toBe(original.r);
      expect(back.g).toBe(original.g);
      expect(back.b).toBe(original.b);
    });
  });
});
