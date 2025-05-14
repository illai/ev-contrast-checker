import {
  isValidHexColor,
  isValidRGB,
  isValidFontSize,
  isValidAccessibilityLevel,
  validateContrastParameters
} from '../validators';

describe('Color Validators', () => {
  describe('isValidHexColor', () => {
    it('validates correct hex colors', () => {
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#FFFFFF')).toBe(true);
      expect(isValidHexColor('#123ABC')).toBe(true);
      expect(isValidHexColor('#FFF')).toBe(true);
      expect(isValidHexColor('000000')).toBe(true);
    });

    it('rejects invalid hex colors', () => {
      expect(isValidHexColor('')).toBe(false);
      expect(isValidHexColor('#12345')).toBe(false);
      expect(isValidHexColor('#GHIJKL')).toBe(false);
      expect(isValidHexColor('not-a-color')).toBe(false);
    });
  });

  describe('isValidRGB', () => {
    it('validates correct RGB values', () => {
      expect(isValidRGB({ r: 0, g: 0, b: 0 })).toBe(true);
      expect(isValidRGB({ r: 255, g: 255, b: 255 })).toBe(true);
      expect(isValidRGB({ r: 123, g: 45, b: 67 })).toBe(true);
    });

    it('rejects invalid RGB values', () => {
      expect(isValidRGB({ r: -1, g: 0, b: 0 })).toBe(false);
      expect(isValidRGB({ r: 256, g: 0, b: 0 })).toBe(false);
      expect(isValidRGB({ r: 0, g: 'invalid' as any, b: 0 })).toBe(false);
      expect(isValidRGB(null as any)).toBe(false);
      expect(isValidRGB({} as any)).toBe(false);
    });
  });

  describe('isValidFontSize', () => {
    it('validates correct font sizes', () => {
      expect(isValidFontSize(8)).toBe(true);
      expect(isValidFontSize(16)).toBe(true);
      expect(isValidFontSize(96)).toBe(true);
    });

    it('rejects invalid font sizes', () => {
      expect(isValidFontSize(7)).toBe(false);
      expect(isValidFontSize(97)).toBe(false);
      expect(isValidFontSize(-1)).toBe(false);
      expect(isValidFontSize(NaN)).toBe(false);
      expect(isValidFontSize(Infinity)).toBe(false);
    });
  });

  describe('isValidAccessibilityLevel', () => {
    it('validates correct accessibility levels', () => {
      expect(isValidAccessibilityLevel('AA')).toBe(true);
      expect(isValidAccessibilityLevel('AAA')).toBe(true);
    });

    it('rejects invalid accessibility levels', () => {
      expect(isValidAccessibilityLevel('')).toBe(false);
      expect(isValidAccessibilityLevel('A')).toBe(false);
      expect(isValidAccessibilityLevel('AAAA')).toBe(false);
      expect(isValidAccessibilityLevel('invalid')).toBe(false);
    });
  });

  describe('validateContrastParameters', () => {
    it('validates correct parameters', () => {
      expect(validateContrastParameters('#000000', '#FFFFFF', 16, 'AA')).toBe(true);
      expect(validateContrastParameters(
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        24,
        'AAA'
      )).toBe(true);
    });

    it('rejects invalid parameters', () => {
      expect(validateContrastParameters('#INVALID', '#FFFFFF', 16, 'AA')).toBe(false);
      expect(validateContrastParameters('#000000', '#FFFFFF', 7, 'AA')).toBe(false);
      expect(validateContrastParameters('#000000', '#FFFFFF', 16, 'INVALID')).toBe(false);
      expect(validateContrastParameters(
        { r: -1, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 },
        16,
        'AA'
      )).toBe(false);
    });
  });
});
