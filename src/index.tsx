import * as React from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { processColor, StyleSheet } from 'react-native';

import LinearGradientNativeComponent from './LinearGradientNativeComponent';

export interface Point {
  x: number;
  y: number;
}

export interface LinearGradientProps {
  /**
   * An array of at least 2 colors that represent gradient colors
   */
  colors: ColorValue[];
  /**
   * An array of locations for each color stop, values should be between 0 and 1
   * The array length must match the colors array length
   */
  locations?: number[];
  /**
   * The start point of the gradient
   * Default: { x: 0.5, y: 0 } (top center)
   */
  start?: Point;
  /**
   * The end point of the gradient
   * Default: { x: 0.5, y: 1 } (bottom center)
   */
  end?: Point;
  /**
   * If true, use angle instead of start/end points
   * Default: false
   */
  useAngle?: boolean;
  /**
   * Angle of the gradient in degrees (0 = up, 90 = right, 180 = down, 270 = left)
   * Only used when useAngle is true
   * Default: 0
   */
  angle?: number;
  /**
   * The center point for the angle rotation
   * Default: { x: 0.5, y: 0.5 }
   */
  angleCenter?: Point;
  /**
   * Style for the gradient view
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Children elements to render on top of the gradient
   */
  children?: React.ReactNode;
}

const DEFAULT_START: Point = { x: 0.5, y: 0 };
const DEFAULT_END: Point = { x: 0.5, y: 1 };
const DEFAULT_ANGLE_CENTER: Point = { x: 0.5, y: 0.5 };

function processColors(colors: ColorValue[]): number[] {
  return colors.map((color) => {
    const processed = processColor(color);
    if (processed === null || processed === undefined) {
      throw new Error(`Invalid color value: ${String(color)}`);
    }
    if (typeof processed === 'number') {
      return processed;
    }
    // OpaqueColorValue (symbol type) or other non-number values
    // This can happen with platform-specific color types
    throw new Error(
      `Unsupported color type: ${String(color)}. Only standard color values are supported.`
    );
  });
}

function validateLocations(
  locations: number[] | undefined,
  colorsLength: number
): number[] | undefined {
  if (!locations) {
    return undefined;
  }

  if (locations.length !== colorsLength) {
    console.warn(
      `LinearGradient: locations array length (${locations.length}) does not match colors array length (${colorsLength})`
    );
  }

  // Clamp location values to [0, 1] range for iOS CAGradientLayer compatibility
  return locations.map((value) => Math.max(0, Math.min(1, value)));
}

export function LinearGradient({
  colors,
  locations,
  start = DEFAULT_START,
  end = DEFAULT_END,
  useAngle = false,
  angle = 0,
  angleCenter = DEFAULT_ANGLE_CENTER,
  style,
  children,
  ...rest
}: LinearGradientProps): React.ReactElement {
  if (colors.length < 2) {
    throw new Error('LinearGradient requires at least 2 colors');
  }

  const processedColors = React.useMemo(() => processColors(colors), [colors]);
  const validatedLocations = React.useMemo(
    () => validateLocations(locations, colors.length),
    [locations, colors.length]
  );

  return (
    <LinearGradientNativeComponent
      {...rest}
      style={StyleSheet.flatten(style)}
      colors={processedColors}
      locations={validatedLocations}
      startPoint={start}
      endPoint={end}
      useAngle={useAngle}
      angle={angle}
      angleCenter={angleCenter}
    >
      {children}
    </LinearGradientNativeComponent>
  );
}

export default LinearGradient;
