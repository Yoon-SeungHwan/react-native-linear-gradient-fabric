import type { ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeLinearGradientPoint {
  x: Float;
  y: Float;
}

export interface NativeLinearGradientProps extends ViewProps {
  /**
   * An array of colors in integer format (processed by processColor)
   */
  colors: ReadonlyArray<Int32>;
  /**
   * An array of locations for each color stop, values should be between 0 and 1
   */
  locations?: ReadonlyArray<Float>;
  /**
   * The start point of the gradient (x: 0 = left, 1 = right; y: 0 = top, 1 = bottom)
   */
  startPoint?: NativeLinearGradientPoint;
  /**
   * The end point of the gradient (x: 0 = left, 1 = right; y: 0 = top, 1 = bottom)
   */
  endPoint?: NativeLinearGradientPoint;
  /**
   * If true, use angle instead of start/end points
   */
  useAngle?: boolean;
  /**
   * Angle of the gradient in degrees (0 = up, 90 = right, 180 = down, 270 = left)
   */
  angle?: Float;
  /**
   * The center point for the angle rotation
   */
  angleCenter?: NativeLinearGradientPoint;
}

export default codegenNativeComponent<NativeLinearGradientProps>(
  'LinearGradientView'
);
