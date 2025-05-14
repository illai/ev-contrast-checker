import {
  sanitizeHexColor,
  sanitizeRGB,
  sanitizeFontSize,
  sanitizeAccessibilityLevel,
  sanitizeColor
} from '../sanitizers';

describe('Color Sanitizers', () => {
  describe('sanitizeHexColor', () => {
    it('sanitizes valid hex colors', () => {
      expect(sanitizeHexColor('#000000')).toBe('#000000');
      expect(sanitizeHexColor('FFFFFF')).toBe('#FFFFFF');
      expect(sanitizeHexColor('#fff')).toBe('#FFFFFF');
      expect(sanitizeHexColor('123')).toBe('#112233');
    });

    it('handles invalid hex colors', () => {
      expect(sanitizeHexColor('')).toBeNull();
      expect(sanitizeHexColor('#12345')).toBeNull();
      expect(sanitizeHexColor('#GHIJKL')).toBeNull();
      expect(sanitizeHexColor('not-a-color')).toBeNull();
    });

    it('normalizes hex colors', () => {
      expect(sanitizeHexColor('  #123abc  ')).toBe('#123ABC');
      expect(sanitizeHexColor('abc')).toBe('#AABBCC');
    });
  });

  describe('sanitizeRGB', () => {
    it('sanitizes valid RGB values', () => {
      expect(sanitizeRGB({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0 });
      expect(sanitizeRGB({ r: 255, g: 255, b: 255 })).toEqual({ r: 255, g: 255, b: 255 });
      expect(sanitizeRGB({ r: 123.6, g: 45.1, b: 67.8 })).toEqual({ r: 124, g: 45, b: 68 });
    });

    it('handles invalid RGB values', () => {
      expect(sanitizeRGB({ r: -1, g: 0, b: 0 })).toBeNull();
      expect(sanitizeRGB({ r: 256, g: 0, b: 0 })).toBeNull();
      expect(sanitizeRGB({ r: 0, g: 'invalid' as any, b: 0 })).toBeNull();
      expect(sanitizeRGB(null as any)).toBeNull();
      expect(sanitizeRGB({} as any)).toBeNull();
    });
  });

  describe('sanitizeFontSize', () => {
    it('sanitizes valid font sizes', () => {
      expect(sanitizeFontSize(8)).toBe(8);
      expect(sanitizeFontSize(16.7)).toBe(17);
      expect(sanitizeFontSize(96)).toBe(96);
    });

    it('handles invalid font sizes', () => {
      expect(sanitizeFontSize(7)).toBeNull();
      expect(sanitizeFontSize(97)).toBeNull();
      expect(sanitizeFontSize(-1)).toBeNull();
      expect(sanitizeFontSize(NaN)).toBeNull();
      expect(sanitizeFontSize(Infinity)).toBeNull();
    });
  });

  describe('sanitizeAccessibilityLevel', () => {
    it('sanitizes valid accessibility levels', () => {
      expect(sanitizeAccessibilityLevel('AA')).toBe('AA');
      expect(sanitizeAccessibilityLevel('  aaa  ')).toBe('AAA');
    });

    it('handles invalid accessibility levels', () => {
      expect(sanitizeAccessibilityLevel('')).toBeNull();
      expect(sanitizeAccessibilityLevel('A')).toBeNull();
      expect(sanitizeAccessibilityLevel('AAAA')).toBeNull();
      expect(sanitizeAccessibilityLevel('invalid')).toBeNull();
    });
  });

  describe('sanitizeColor', () => {
    it('sanitizes hex colors', () => {
      expect(sanitizeColor('#000000')).toBe('#000000');
      expect(sanitizeColor('FFFFFF')).toBe('#FFFFFF');
    });

    it('sanitizes RGB colors', () => {
      expect(sanitizeColor({ r: 0, g: 0, b: 0 })).toEqual({ r: 0, g: 0, b: 0 });
      expect(sanitizeColor({ r: 255, g: 255, b: 255 })).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('handles invalid colors', () => {
      expect(sanitizeColor('#INVALID')).toBeNull();
      expect(sanitizeColor({ r: -1, g: 0, b: 0 })).toBeNull();
    });
  });
});
