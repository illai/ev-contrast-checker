# Advanced Usage Guide

## Custom Styling

The ContrastChecker component accepts a `className` prop for custom styling. Here's how to customize various aspects of the component:

```tsx
import { ContrastChecker } from '@ev-cc/contrast-checker';
import './styles.css';

function App() {
  return (
    <ContrastChecker
      foregroundColor="#000000"
      backgroundColor="#FFFFFF"
      className="custom-checker"
    />
  );
}
```

```css
.custom-checker {
  /* Custom styles */
  --preview-padding: 2rem;
  --preview-border-radius: 0.5rem;
  --result-gap: 1rem;
}
```

## Advanced Props Usage

### Font Size and Weight

The component considers both font size and weight for APCA calculations:

```tsx
<ContrastChecker
  foregroundColor="#1E40AF"
  backgroundColor="#F3F4F6"
  fontSize={24}
  isBold={true}
/>
```

### Contrast Change Callback

Monitor contrast changes in real-time:

```tsx
function App() {
  const handleContrastChange = (result) => {
    const { wcag, apca } = result;
    
    // Log compliance status
    console.log('WCAG AA Normal:', wcag.normalAA);
    console.log('APCA AAA:', apca.meetsAAA);
    
    // Take action based on compliance
    if (!wcag.normalAA) {
      // Show warning
    }
  };

  return (
    <ContrastChecker
      foregroundColor="#000000"
      backgroundColor="#FFFFFF"
      onContrastChange={handleContrastChange}
    />
  );
}
```

## Integration with Color Pickers

Example using react-colorful:

```tsx
import { HexColorPicker } from 'react-colorful';
import { ContrastChecker } from '@ev-cc/contrast-checker';

function App() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#FFFFFF');

  return (
    <div>
      <HexColorPicker
        color={foreground}
        onChange={setForeground}
      />
      <HexColorPicker
        color={background}
        onChange={setBackground}
      />
      <ContrastChecker
        foregroundColor={foreground}
        backgroundColor={background}
      />
    </div>
  );
}
```

## Error Handling

The component includes built-in error handling for invalid inputs:

```tsx
function App() {
  const handleContrastChange = (result) => {
    // result will be null if colors are invalid
    if (!result) {
      console.error('Invalid color values');
      return;
    }
    // Process valid results
  };

  return (
    <ContrastChecker
      foregroundColor="invalid-color" // Will be sanitized to #000000
      backgroundColor="#FFFFFF"
      onContrastChange={handleContrastChange}
    />
  );
}
```

## Performance Optimization

The component uses React's useMemo for optimal performance:

```tsx
function App() {
  // Contrast calculations are memoized and only update
  // when colors, font size, or weight changes
  return (
    <ContrastChecker
      foregroundColor={foreground}
      backgroundColor={background}
      fontSize={fontSize}
      isBold={isBold}
    />
  );
}
```

## Server-Side Rendering

The component is SSR-friendly and hydrates correctly:

```tsx
// pages/index.tsx
import { ContrastChecker } from '@ev-cc/contrast-checker';

export default function Home() {
  return (
    <ContrastChecker
      foregroundColor="#000000"
      backgroundColor="#FFFFFF"
    />
  );
}
```

## Testing

Example using React Testing Library:

```tsx
import { render, screen } from '@testing-library/react';
import { ContrastChecker } from '@ev-cc/contrast-checker';

test('shows correct contrast ratio', () => {
  render(
    <ContrastChecker
      foregroundColor="#000000"
      backgroundColor="#FFFFFF"
    />
  );
  
  expect(screen.getByText(/21.00:1/)).toBeInTheDocument();
});
