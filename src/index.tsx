import * as React from 'react';
import type { ColorValue, ViewProps } from 'react-native';
import { processColor, StyleSheet } from 'react-native';

import LinearGradientNativeComponent from './LinearGradientNativeComponent';

export interface Point {
  x: number;
  y: number;
}

export interface LinearGradientProps extends ViewProps {
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
}

const DEFAULT_START: Point = { x: 0.5, y: 0 };
const DEFAULT_END: Point = { x: 0.5, y: 1 };
const DEFAULT_ANGLE_CENTER: Point = { x: 0.5, y: 0.5 };

/**
 * Check if a processed color has zero alpha (fully transparent).
 * React Native processColor returns ARGB format where alpha is in the highest byte.
 */
function isTransparentColor(colorInt: number): boolean {
  // Extract alpha from ARGB format (bits 24-31)
  const alpha = (colorInt >>> 24) & 0xff;
  return alpha === 0;
}

/**
 * Get the RGB components from a processed color (ARGB format).
 */
function getRGB(colorInt: number): { r: number; g: number; b: number } {
  return {
    r: (colorInt >>> 16) & 0xff,
    g: (colorInt >>> 8) & 0xff,
    b: colorInt & 0xff,
  };
}

/**
 * Create a color with specified RGB and alpha=0 (fully transparent).
 */
function createTransparentColor(r: number, g: number, b: number): number {
  // ARGB format: alpha=0 in highest byte
  return ((0 << 24) | (r << 16) | (g << 8) | b) >>> 0;
}

/**
 * Fix transparent colors in gradients to avoid grey interpolation artifacts.
 *
 * When interpolating from 'transparent' (rgba(0,0,0,0)) to a color like white,
 * the gradient interpolates all RGBA channels, resulting in grey midtones.
 * This function replaces fully transparent colors with transparent versions
 * of their nearest opaque neighbor, ensuring smooth color transitions.
 *
 * See: https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/691
 */
function fixTransparentColors(colors: number[]): number[] {
  const result = [...colors];

  for (let i = 0; i < result.length; i++) {
    const currentColor = result[i];
    if (currentColor !== undefined && isTransparentColor(currentColor)) {
      // Find nearest non-transparent color to inherit RGB from
      let nearestOpaqueIdx = -1;
      let minDistance = Infinity;

      for (let j = 0; j < result.length; j++) {
        const candidateColor = result[j];
        if (
          i !== j &&
          candidateColor !== undefined &&
          !isTransparentColor(candidateColor)
        ) {
          const distance = Math.abs(i - j);
          if (distance < minDistance) {
            minDistance = distance;
            nearestOpaqueIdx = j;
          }
        }
      }

      // If we found a non-transparent color, use its RGB values
      const nearestColor =
        nearestOpaqueIdx !== -1 ? result[nearestOpaqueIdx] : undefined;
      if (nearestColor !== undefined) {
        const { r, g, b } = getRGB(nearestColor);
        result[i] = createTransparentColor(r, g, b);
      }
      // If all colors are transparent, leave as-is (nothing to fix)
    }
  }

  return result;
}

function processColors(colors: ColorValue[]): number[] {
  const processed = colors.map((color) => {
    const result = processColor(color);
    if (result === null || result === undefined) {
      throw new Error(`Invalid color value: ${String(color)}`);
    }
    if (typeof result === 'number') {
      return result;
    }
    // OpaqueColorValue (symbol type) or other non-number values
    // This can happen with platform-specific color types
    throw new Error(
      `Unsupported color type: ${String(color)}. Only standard color values are supported.`
    );
  });

  // Fix transparent colors to prevent grey gradient artifacts
  return fixTransparentColors(processed);
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
