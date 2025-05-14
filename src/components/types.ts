import { RGB } from '../security/validators';

/**
 * Represents the WCAG accessibility compliance levels.
 * - AA: Minimum level of conformance
 * - AAA: Enhanced level of conformance
 */
export type AccessibilityLevel = 'AA' | 'AAA';

/**
 * Results of contrast calculations including both WCAG and APCA metrics.
 */
export interface ContrastResult {
  wcag: {
    ratio: number;
    normalAA: boolean;
    normalAAA: boolean;
    largeAA: boolean;
    largeAAA: boolean;
  };
  apca: {
    contrast: number;
    meetsAA: boolean;
    meetsAAA: boolean;
  };
}

/**
 * Props for the ContrastChecker component.
 */
export interface ContrastCheckerProps {
  /** Foreground color (text color) in hex format */
  foregroundColor: string;
  /** Background color in hex format */
  backgroundColor: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Whether the text is bold */
  isBold?: boolean;
  /** Minimum required accessibility level */
  requiredLevel?: AccessibilityLevel;
  /** Callback when contrast results change */
  onContrastChange?: (result: ContrastResult) => void;
  /** Custom preview text */
  previewText?: string;
  /** Additional CSS class name */
  className?: string;
}
