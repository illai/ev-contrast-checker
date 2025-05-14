import { RGB } from '../security/validators';

export type AccessibilityLevel = 'AA' | 'AAA';

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
