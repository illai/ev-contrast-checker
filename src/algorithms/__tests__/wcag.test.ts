import { getRelativeLuminance, getContrastRatio, meetsWCAGCriteria } from '../wcag';
import { RGB } from '../conversions';

describe('WCAG Contrast Calculations', () => {
  describe('getRelativeLuminance', () => {
    it('calculates luminance for white and black', () => {
      expect(getRelativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1);
      expect(getRelativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0);
    });

    it('calculates luminance for primary colors', () => {
      const red: RGB = { r: 255, g: 0, b: 0 };
      const green: RGB = { r: 0, g: 255, b: 0 };
      const blue: RGB = { r: 0, g: 0, b: 255 };

      expect(getRelativeLuminance(red)).toBeCloseTo(0.2126);
      expect(getRelativeLuminance(green)).toBeCloseTo(0.7152);
      expect(getRelativeLuminance(blue)).toBeCloseTo(0.0722);
    });
  });

  describe('getContrastRatio', () => {
    it('calculates maximum contrast ratio for black and white', () => {
      expect(getContrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21);
    });

    it('calculates minimum contrast ratio for same color', () => {
      expect(getContrastRatio('#000000', '#000000')).toBeCloseTo(1);
      expect(getContrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1);
    });

    // Test cases from WCAG 2.1 examples
    it('matches WCAG 2.1 example contrast ratios', () => {
      // Small dark gray text (#767676) on white background (#FFFFFF)
      expect(getContrastRatio('#767676', '#FFFFFF')).toBeCloseTo(4.54, 1);

      // White text on dark blue background (#1E40AF)
      expect(getContrastRatio('#FFFFFF', '#1E40AF')).toBeCloseTo(8.72, 1);
    });
  });

  describe('meetsWCAGCriteria', () => {
    describe('Level AA', () => {
      it('evaluates large text criteria correctly', () => {
        expect(meetsWCAGCriteria(3, 'AA', true)).toBe(true);
        expect(meetsWCAGCriteria(2.9, 'AA', true)).toBe(false);
      });

      it('evaluates normal text criteria correctly', () => {
        expect(meetsWCAGCriteria(4.5, 'AA', false)).toBe(true);
        expect(meetsWCAGCriteria(4.4, 'AA', false)).toBe(false);
      });
    });

    describe('Level AAA', () => {
      it('evaluates large text criteria correctly', () => {
        expect(meetsWCAGCriteria(4.5, 'AAA', true)).toBe(true);
        expect(meetsWCAGCriteria(4.4, 'AAA', true)).toBe(false);
      });

      it('evaluates normal text criteria correctly', () => {
        expect(meetsWCAGCriteria(7, 'AAA', false)).toBe(true);
        expect(meetsWCAGCriteria(6.9, 'AAA', false)).toBe(false);
      });
    });
  });
});
