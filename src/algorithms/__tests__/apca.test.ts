import { getAPCAContrast, meetsAPCACriteria } from '../apca';

describe('APCA Contrast Calculations', () => {
  describe('getAPCAContrast', () => {
    it('calculates maximum contrast for black and white', () => {
      expect(getAPCAContrast('#000000', '#FFFFFF')).toBeCloseTo(-114, 0);
      expect(getAPCAContrast('#FFFFFF', '#000000')).toBeCloseTo(114, 0);
    });

    it('returns 0 for same colors', () => {
      expect(getAPCAContrast('#000000', '#000000')).toBe(0);
      expect(getAPCAContrast('#FFFFFF', '#FFFFFF')).toBe(0);
    });

    // Test cases based on APCA reference values
    it('matches APCA reference contrast values', () => {
      // Dark gray text (#595959) on white background
      expect(getAPCAContrast('#595959', '#FFFFFF')).toBeCloseTo(-83.3, 0);

      // White text on dark blue background (#0000FF)
      expect(getAPCAContrast('#FFFFFF', '#0000FF')).toBeCloseTo(91.7, 0);
    });

    it('handles near-threshold values correctly', () => {
      // Colors with very small luminance difference
      expect(getAPCAContrast('#FEFEFE', '#FFFFFF')).toBe(0);
    });
  });

  describe('meetsAPCACriteria', () => {
    describe('Level AA', () => {
      it('evaluates large text (24px) criteria correctly', () => {
        expect(meetsAPCACriteria(45, 24, false, 'AA')).toBe(true);
        expect(meetsAPCACriteria(44, 24, false, 'AA')).toBe(false);
      });

      it('evaluates medium text (18px) criteria correctly', () => {
        expect(meetsAPCACriteria(60, 18, false, 'AA')).toBe(true);
        expect(meetsAPCACriteria(59, 18, false, 'AA')).toBe(false);
      });

      it('evaluates small text (14px) criteria correctly', () => {
        expect(meetsAPCACriteria(75, 14, false, 'AA')).toBe(true);
        expect(meetsAPCACriteria(74, 14, false, 'AA')).toBe(false);
      });

      it('evaluates body text (<14px) criteria correctly', () => {
        expect(meetsAPCACriteria(90, 12, false, 'AA')).toBe(true);
        expect(meetsAPCACriteria(89, 12, false, 'AA')).toBe(false);
      });
    });

    describe('Level AAA', () => {
      it('evaluates large text (24px) criteria correctly', () => {
        expect(meetsAPCACriteria(60, 24, false, 'AAA')).toBe(true);
        expect(meetsAPCACriteria(59, 24, false, 'AAA')).toBe(false);
      });

      it('evaluates medium text (18px) criteria correctly', () => {
        expect(meetsAPCACriteria(75, 18, false, 'AAA')).toBe(true);
        expect(meetsAPCACriteria(74, 18, false, 'AAA')).toBe(false);
      });

      it('evaluates small text (14px) criteria correctly', () => {
        expect(meetsAPCACriteria(90, 14, false, 'AAA')).toBe(true);
        expect(meetsAPCACriteria(89, 14, false, 'AAA')).toBe(false);
      });

      it('evaluates body text (<14px) criteria correctly', () => {
        expect(meetsAPCACriteria(98, 12, false, 'AAA')).toBe(true);
        expect(meetsAPCACriteria(97, 12, false, 'AAA')).toBe(false);
      });
    });

    it('handles bold text correctly', () => {
      // Bold text should be treated as 1.25x larger
      // 14px bold = 17.5px effective size, which meets the 60 contrast requirement for 18px
      expect(meetsAPCACriteria(60, 14, true, 'AA')).toBe(false); // Still needs 75 for 14px
      expect(meetsAPCACriteria(75, 14, true, 'AA')).toBe(true); // Meets requirement for 14px
    });
  });
});
