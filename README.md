# react-native-linear-gradient-fabric

A modern replacement for `react-native-linear-gradient` with full New Architecture (Fabric) support.

## Features

- Full support for React Native New Architecture (Fabric)
- Backward compatible with Old Architecture via Interop Layer
- GPU-accelerated gradient rendering
- All features from the original `react-native-linear-gradient`

## Installation

```sh
bun add react-native-linear-gradient-fabric
# or
npm install react-native-linear-gradient-fabric
```

### iOS

```sh
cd ios && pod install
```

### Android

No additional steps required. The library will be automatically linked.

## Usage

```tsx
import { LinearGradient } from 'react-native-linear-gradient-fabric';

// Basic vertical gradient
<LinearGradient
  colors={['#4c669f', '#3b5998', '#192f6a']}
  style={{ flex: 1 }}
/>

// Horizontal gradient
<LinearGradient
  colors={['#ff6b6b', '#feca57', '#48dbfb']}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.5 }}
  style={{ height: 100 }}
/>

// Diagonal gradient
<LinearGradient
  colors={['#a55eea', '#45aaf2']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ height: 100 }}
/>

// Gradient with custom color stops
<LinearGradient
  colors={['#ff0000', '#ffff00', '#00ff00']}
  locations={[0, 0.3, 1]}
  style={{ height: 100 }}
/>

// Angle-based gradient
<LinearGradient
  colors={['#667eea', '#764ba2']}
  useAngle
  angle={45}
  style={{ height: 100 }}
/>

// Gradient as background with children
<LinearGradient
  colors={['#00c6fb', '#005bea']}
  style={{ padding: 20, borderRadius: 10 }}
>
  <Text style={{ color: 'white' }}>Hello, Gradient!</Text>
</LinearGradient>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `colors` | `ColorValue[]` | Yes | - | An array of at least 2 colors |
| `start` | `{ x: number, y: number }` | No | `{ x: 0.5, y: 0 }` | Start point of the gradient |
| `end` | `{ x: number, y: number }` | No | `{ x: 0.5, y: 1 }` | End point of the gradient |
| `locations` | `number[]` | No | evenly distributed | Color stop positions (0-1) |
| `useAngle` | `boolean` | No | `false` | Use angle instead of start/end |
| `angle` | `number` | No | `0` | Gradient angle in degrees |
| `angleCenter` | `{ x: number, y: number }` | No | `{ x: 0.5, y: 0.5 }` | Center point for angle rotation |
| `style` | `ViewStyle` | No | - | Style for the gradient view |
| `children` | `ReactNode` | No | - | Content to render on top |

### Coordinate System

The `start` and `end` props use a coordinate system where:
- `x: 0` = left edge, `x: 1` = right edge
- `y: 0` = top edge, `y: 1` = bottom edge

### Angle System

When using `useAngle` and `angle`:
- `0°` = upward (top)
- `90°` = rightward
- `180°` = downward (bottom)
- `270°` = leftward

## Testing

For testing, you can use the provided mock:

```js
// jest.setup.js
jest.mock('react-native-linear-gradient-fabric', () =>
  require('react-native-linear-gradient-fabric/jest/linear-gradient-mock')
);
```

## Requirements

- React Native 0.72+
- iOS 13.4+
- Android SDK 21+

## License

MIT

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
