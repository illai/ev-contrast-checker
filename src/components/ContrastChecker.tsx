import React, { useEffect, useMemo } from 'react';
import { getContrastRatio } from '../algorithms/wcag';
import { getAPCAContrast, meetsAPCACriteria } from '../algorithms/apca';
import { sanitizeHexColor } from '../security/sanitizers';
import { ContrastCheckerProps, ContrastResult } from './types';

const DEFAULT_FONT_SIZE = 16;
const DEFAULT_PREVIEW_TEXT = 'Preview Text';

/**
 * A React component that checks and displays color contrast compliance with WCAG 2.1 and APCA standards.
 *
 * @component
 * @example
 * ```tsx
 * <ContrastChecker
 *   foregroundColor="#000000"
 *   backgroundColor="#FFFFFF"
 *   fontSize={16}
 *   isBold={false}
 *   onContrastChange={(result) => console.log(result)}
 * />
 * ```
 */
export const ContrastChecker: React.FC<ContrastCheckerProps> = ({
  foregroundColor,
  backgroundColor,
  fontSize = DEFAULT_FONT_SIZE,
  isBold = false,
  requiredLevel = 'AA',
  onContrastChange,
  previewText = DEFAULT_PREVIEW_TEXT,
  className = '',
}) => {
  // Sanitize inputs
  const sanitizedFg = sanitizeHexColor(foregroundColor) || '#000000';
  const sanitizedBg = sanitizeHexColor(backgroundColor) || '#FFFFFF';

  // Calculate contrast values
  const contrastResult = useMemo<ContrastResult>(() => {
    const wcagRatio = getContrastRatio(sanitizedFg, sanitizedBg);
    const apcaContrast = getAPCAContrast(sanitizedFg, sanitizedBg);

    return {
      wcag: {
        ratio: wcagRatio,
        normalAA: wcagRatio >= 4.5,
        normalAAA: wcagRatio >= 7,
        largeAA: wcagRatio >= 3,
        largeAAA: wcagRatio >= 4.5,
      },
      apca: {
        contrast: apcaContrast,
        meetsAA: meetsAPCACriteria(apcaContrast, fontSize, isBold, 'AA'),
        meetsAAA: meetsAPCACriteria(apcaContrast, fontSize, isBold, 'AAA'),
      },
    };
  }, [sanitizedFg, sanitizedBg, fontSize, isBold]);

  // Notify parent of contrast changes
  useEffect(() => {
    onContrastChange?.(contrastResult);
  }, [contrastResult, onContrastChange]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#f8f8f8',
  };

  const previewStyle = {
    padding: '2rem',
    borderRadius: '0.5rem',
    color: sanitizedFg,
    backgroundColor: sanitizedBg,
    fontSize: `${fontSize}px`,
    fontWeight: isBold ? 'bold' : 'normal',
  };

  const getComplianceStatus = (isCompliant: boolean) => (
    <span style={{ color: isCompliant ? '#22c55e' : '#ef4444' }}>
      {isCompliant ? '✓' : '✗'}
    </span>
  );

  return (
    <div style={containerStyle} className={className}>
      {/* Preview Section */}
      <div style={previewStyle}>
        {previewText}
      </div>

      {/* Results Section */}
      <div>
        <h3>WCAG 2.1 Contrast: {contrastResult.wcag.ratio.toFixed(2)}:1</h3>
        <div>
          Normal Text (14px)
          <ul>
            <li>AA {getComplianceStatus(contrastResult.wcag.normalAA)}</li>
            <li>AAA {getComplianceStatus(contrastResult.wcag.normalAAA)}</li>
          </ul>
        </div>
        <div>
          Large Text (18px+)
          <ul>
            <li>AA {getComplianceStatus(contrastResult.wcag.largeAA)}</li>
            <li>AAA {getComplianceStatus(contrastResult.wcag.largeAAA)}</li>
          </ul>
        </div>
      </div>

      <div>
        <h3>APCA Contrast: {contrastResult.apca.contrast.toFixed(1)}</h3>
        <div>
          Current Text ({fontSize}px{isBold ? ', bold' : ''})
          <ul>
            <li>AA {getComplianceStatus(contrastResult.apca.meetsAA)}</li>
            <li>AAA {getComplianceStatus(contrastResult.apca.meetsAAA)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;
