import React, { useState } from 'react';
import { getContrastRatio } from './algorithms/wcag';
import { getAPCAContrast } from './algorithms/apca';
import { meetsAPCACriteria } from './algorithms/apca';

function App() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);

  const wcagContrast = getContrastRatio(foreground, background);
  const apcaContrast = getAPCAContrast(foreground, background);

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
        <div className="preview-text" style={previewStyle}>
          Preview Text
        </div>

        <div className="contrast-value">
          WCAG 2.1 Contrast Ratio: {wcagContrast.toFixed(2)}:1
        </div>

        <div className="contrast-value">
          APCA Contrast Value: {apcaContrast.toFixed(1)}
        </div>

        <div className="compliance">
          <div className="compliance-item">
            <h3>WCAG 2.1</h3>
            <div className={wcagContrast >= 4.5 ? 'pass' : 'fail'}>
              AA Normal Text ({wcagContrast >= 4.5 ? '✓' : '✗'})
            </div>
            <div className={wcagContrast >= 3 ? 'pass' : 'fail'}>
              AA Large Text ({wcagContrast >= 3 ? '✓' : '✗'})
            </div>
            <div className={wcagContrast >= 7 ? 'pass' : 'fail'}>
              AAA Normal Text ({wcagContrast >= 7 ? '✓' : '✗'})
            </div>
            <div className={wcagContrast >= 4.5 ? 'pass' : 'fail'}>
              AAA Large Text ({wcagContrast >= 4.5 ? '✓' : '✗'})
            </div>
          </div>

          <div className="compliance-item">
            <h3>APCA</h3>
            <div className={meetsAPCACriteria(apcaContrast, fontSize, isBold, 'AA') ? 'pass' : 'fail'}>
              Level AA ({meetsAPCACriteria(apcaContrast, fontSize, isBold, 'AA') ? '✓' : '✗'})
            </div>
            <div className={meetsAPCACriteria(apcaContrast, fontSize, isBold, 'AAA') ? 'pass' : 'fail'}>
              Level AAA ({meetsAPCACriteria(apcaContrast, fontSize, isBold, 'AAA') ? '✓' : '✗'})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
