import React, { useState } from 'react';
import ContrastChecker from './components/ContrastChecker';
import type { ContrastResult } from './components/types';

function App() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);

  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(null);

  const previewStyle = {
    color: foreground,
    backgroundColor: background,
    fontWeight: isBold ? 'bold' : 'normal',
    fontSize: `${fontSize}px`,
  };

  return (
    <div>
      <h1>EV Contrast Checker</h1>
      
      <div className="color-input">
        <label>
          Text Color:
          <input
            type="color"
            value={foreground}
            onChange={(e) => setForeground(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            value={foreground}
            onChange={(e) => setForeground(e.target.value.toUpperCase())}
          />
        </label>
      </div>

      <div className="color-input">
        <label>
          Background Color:
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            value={background}
            onChange={(e) => setBackground(e.target.value.toUpperCase())}
          />
        </label>
      </div>

      <div className="color-input">
        <label>
          Font Size (px):
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min="8"
            max="96"
          />
        </label>
        <label>
          Bold:
          <input
            type="checkbox"
            checked={isBold}
            onChange={(e) => setIsBold(e.target.checked)}
          />
        </label>
      </div>

      <div className="results">
        <ContrastChecker
          foregroundColor={foreground}
          backgroundColor={background}
          fontSize={fontSize}
          isBold={isBold}
          onContrastChange={setContrastResult}
        />
      </div>
    </div>
  );
}

export default App;
