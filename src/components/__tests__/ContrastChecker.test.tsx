import React from 'react';
import { render, screen } from '@testing-library/react';
import ContrastChecker from '../ContrastChecker';

describe('ContrastChecker', () => {
  const defaultProps = {
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
  };

  it('renders without crashing', () => {
    render(<ContrastChecker {...defaultProps} />);
    expect(screen.getByText('Preview Text')).toBeInTheDocument();
  });

  it('displays custom preview text', () => {
    render(<ContrastChecker {...defaultProps} previewText="Custom Text" />);
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('shows WCAG contrast ratio', () => {
    render(<ContrastChecker {...defaultProps} />);
    expect(screen.getByText(/WCAG 2.1 Contrast: 21.00:1/)).toBeInTheDocument();
  });

  it('shows APCA contrast value', () => {
    render(<ContrastChecker {...defaultProps} />);
    expect(screen.getByText(/APCA Contrast: -114.0/)).toBeInTheDocument();
  });

  it('handles font size changes', () => {
    render(<ContrastChecker {...defaultProps} fontSize={24} />);
    expect(screen.getByText(/24px/)).toBeInTheDocument();
  });

  it('handles bold text', () => {
    render(<ContrastChecker {...defaultProps} fontSize={16} isBold />);
    expect(screen.getByText(/16px, bold/)).toBeInTheDocument();
  });

  it('calls onContrastChange callback', () => {
    const onContrastChange = jest.fn();
    render(<ContrastChecker {...defaultProps} onContrastChange={onContrastChange} />);
    expect(onContrastChange).toHaveBeenCalledWith(expect.objectContaining({
      wcag: expect.any(Object),
      apca: expect.any(Object),
    }));
  });

  it('sanitizes invalid color inputs', () => {
    render(<ContrastChecker foregroundColor="invalid" backgroundColor="also-invalid" />);
    // Should fallback to default colors
    expect(screen.getByText(/WCAG 2.1 Contrast: 21.00:1/)).toBeInTheDocument();
  });
});
