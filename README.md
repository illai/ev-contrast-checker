# EV Contrast Checker

A powerful React component for checking color contrast compliance with WCAG 2.1 and APCA standards.

## Features

- 🎨 Support for both WCAG 2.1 and APCA contrast calculations
- 🔒 Built-in input validation and sanitization
- 📱 Responsive and customizable UI
- 🧪 Comprehensive test coverage
- 📖 TypeScript support with full type definitions

## Installation

```bash
# Using npm
npm install @ev-cc/contrast-checker

# Using yarn
yarn add @ev-cc/contrast-checker

# Using pnpm
pnpm add @ev-cc/contrast-checker
```

## Quick Start

```tsx
import { ContrastChecker } from '@ev-cc/contrast-checker';

function App() {
  return (
    <ContrastChecker
      foregroundColor="#000000"
      backgroundColor="#FFFFFF"
      fontSize={16}
      isBold={false}
    />
  );
}
```

## API Reference

### ContrastChecker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `foregroundColor` | `string` | Required | Text color in hex format (e.g., "#000000") |
| `backgroundColor` | `string` | Required | Background color in hex format (e.g., "#FFFFFF") |
| `fontSize` | `number` | `16` | Font size in pixels |
| `isBold` | `boolean` | `false` | Whether the text is bold |
| `requiredLevel` | `'AA'` \| `'AAA'` | `'AA'` | Required accessibility level |
| `previewText` | `string` | `'Preview Text'` | Custom text for the preview |
| `onContrastChange` | `(result: ContrastResult) => void` | - | Callback when contrast values change |
| `className` | `string` | - | Additional CSS class name |

### ContrastResult Type

```typescript
interface ContrastResult {
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
```

## Usage Examples

### Basic Usage

```tsx
import { ContrastChecker } from '@ev-cc/contrast-checker';

function App() {
  return (
    <ContrastChecker
      foregroundColor="#000000"
      backgroundColor="#FFFFFF"
    />
  );
}
```

### With Custom Settings

```tsx
import { ContrastChecker } from '@ev-cc/contrast-checker';

function App() {
  const handleContrastChange = (result) => {
    console.log('WCAG Ratio:', result.wcag.ratio);
    console.log('APCA Contrast:', result.apca.contrast);
  };

  return (
    <ContrastChecker
      foregroundColor="#1E40AF"
      backgroundColor="#F3F4F6"
      fontSize={24}
      isBold={true}
      requiredLevel="AAA"
      previewText="Custom Preview"
      onContrastChange={handleContrastChange}
      className="custom-checker"
    />
  );
}
```

## Development

### Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:illai/ev-contrast-checker.git
   cd ev-contrast-checker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Testing

Run the test suite:

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test --coverage
```

### Building

Build the package:

```bash
pnpm build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- WCAG 2.1 Guidelines
- APCA (Advanced Perceptual Contrast Algorithm) by SAPC/APCA Group
