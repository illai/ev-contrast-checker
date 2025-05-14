# Migration Guide

## Migrating from v0.x to v1.0

### Breaking Changes

1. **Component Props**
   - Renamed `textColor` to `foregroundColor`
   - Renamed `bgColor` to `backgroundColor`
   - Changed `level` to `requiredLevel`

```diff
<ContrastChecker
-  textColor="#000000"
-  bgColor="#FFFFFF"
-  level="AA"
+  foregroundColor="#000000"
+  backgroundColor="#FFFFFF"
+  requiredLevel="AA"
/>
```

2. **Contrast Result Format**
   - Restructured the contrast result object to separate WCAG and APCA results
   - Added more detailed compliance information

```diff
{
-  wcagRatio: 21,
-  apcaValue: -108,
-  isCompliant: true
+  wcag: {
+    ratio: 21,
+    normalAA: true,
+    normalAAA: true,
+    largeAA: true,
+    largeAAA: true
+  },
+  apca: {
+    contrast: -108,
+    meetsAA: true,
+    meetsAAA: true
+  }
}
```

### New Features

1. **Font Size Support**
   - Added `fontSize` prop for more accurate APCA calculations
   - Added `isBold` prop for font weight considerations

2. **Customization**
   - Added `previewText` prop for custom preview text
   - Added `className` prop for custom styling

3. **Type Safety**
   - Added comprehensive TypeScript types
   - Added input validation and sanitization

### Deprecations

The following features are deprecated and will be removed in v2.0:

- `isLargeText` prop (use `fontSize` instead)
- `customColors` prop (use CSS custom properties instead)

### Bug Fixes

- Fixed APCA calculation for dark-on-light scenarios
- Improved color sanitization for invalid hex values
- Fixed font size validation for decimal values
