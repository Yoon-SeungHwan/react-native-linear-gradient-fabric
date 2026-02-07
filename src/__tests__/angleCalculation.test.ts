/**
 * Tests for angle calculation logic.
 *
 * These tests verify the angle calculation algorithm used by the native implementations.
 * The algorithm converts angle degrees to start/end points for the gradient.
 *
 * Angle convention (bearing/compass style):
 * - 0 degrees = gradient goes UP (first color at bottom, last at top)
 * - 90 degrees = gradient goes RIGHT (first color at left, last at right)
 * - 180 degrees = gradient goes DOWN (first color at top, last at bottom)
 * - 270 degrees = gradient goes LEFT (first color at right, last at left)
 *
 * Related issue: https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/576
 */

interface Point {
  x: number;
  y: number;
}

/**
 * TypeScript implementation of the iOS angle calculation algorithm.
 * This mirrors the native calculatePointsForAngle method.
 */
function calculatePointsForAngle(
  angle: number,
  centerX: number = 0.5,
  centerY: number = 0.5
): { startPoint: Point; endPoint: Point } {
  // Convert angle from degrees to radians
  // Angle 0 = up, 90 = right, 180 = down, 270 = left
  const angleRad = ((angle - 90) * Math.PI) / 180.0;

  // Calculate the gradient direction vector
  const dx = Math.cos(angleRad);
  const dy = Math.sin(angleRad);

  // Normalize to ensure the gradient covers the full view
  const length = 0.5;

  const startPoint: Point = {
    x: centerX - dx * length,
    y: centerY - dy * length,
  };

  const endPoint: Point = {
    x: centerX + dx * length,
    y: centerY + dy * length,
  };

  return { startPoint, endPoint };
}

/**
 * TypeScript implementation of the Android angle calculation algorithm.
 * This mirrors the native calculatePointsFromAngle method.
 */
function calculatePointsFromAngleAndroid(
  angle: number,
  width: number,
  height: number,
  angleCenterX: number = 0.5,
  angleCenterY: number = 0.5
): { x0: number; y0: number; x1: number; y1: number } {
  // Convert angle from degrees to radians
  // Angle 0 = up, 90 = right, 180 = down, 270 = left
  const angleRad = ((angle - 90) * Math.PI) / 180.0;

  // Calculate the gradient direction vector
  const dx = Math.cos(angleRad);
  const dy = Math.sin(angleRad);

  // Calculate the center point in pixels
  const centerPx = angleCenterX * width;
  const centerPy = angleCenterY * height;

  // Calculate the length to cover the view
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const x0 = centerPx - dx * halfWidth;
  const y0 = centerPy - dy * halfHeight;
  const x1 = centerPx + dx * halfWidth;
  const y1 = centerPy + dy * halfHeight;

  return { x0, y0, x1, y1 };
}

describe('Angle Calculation - iOS Implementation', () => {
  describe('Cardinal directions', () => {
    it('angle 0 should create gradient going UP (start at bottom, end at top)', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(0);

      // For angle 0 (up), start should be at bottom center, end at top center
      expect(startPoint.x).toBeCloseTo(0.5, 4);
      expect(startPoint.y).toBeCloseTo(1.0, 4);
      expect(endPoint.x).toBeCloseTo(0.5, 4);
      expect(endPoint.y).toBeCloseTo(0.0, 4);
    });

    it('angle 90 should create gradient going RIGHT (start at left, end at right)', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(90);

      // For angle 90 (right), start should be at left center, end at right center
      expect(startPoint.x).toBeCloseTo(0.0, 4);
      expect(startPoint.y).toBeCloseTo(0.5, 4);
      expect(endPoint.x).toBeCloseTo(1.0, 4);
      expect(endPoint.y).toBeCloseTo(0.5, 4);
    });

    it('angle 180 should create gradient going DOWN (start at top, end at bottom)', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(180);

      // For angle 180 (down), start should be at top center, end at bottom center
      expect(startPoint.x).toBeCloseTo(0.5, 4);
      expect(startPoint.y).toBeCloseTo(0.0, 4);
      expect(endPoint.x).toBeCloseTo(0.5, 4);
      expect(endPoint.y).toBeCloseTo(1.0, 4);
    });

    it('angle 270 should create gradient going LEFT (start at right, end at left)', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(270);

      // For angle 270 (left), start should be at right center, end at left center
      expect(startPoint.x).toBeCloseTo(1.0, 4);
      expect(startPoint.y).toBeCloseTo(0.5, 4);
      expect(endPoint.x).toBeCloseTo(0.0, 4);
      expect(endPoint.y).toBeCloseTo(0.5, 4);
    });

    it('angle 360 should be equivalent to angle 0', () => {
      const result0 = calculatePointsForAngle(0);
      const result360 = calculatePointsForAngle(360);

      expect(result360.startPoint.x).toBeCloseTo(result0.startPoint.x, 4);
      expect(result360.startPoint.y).toBeCloseTo(result0.startPoint.y, 4);
      expect(result360.endPoint.x).toBeCloseTo(result0.endPoint.x, 4);
      expect(result360.endPoint.y).toBeCloseTo(result0.endPoint.y, 4);
    });
  });

  describe('Diagonal directions', () => {
    it('angle 45 should create gradient going UP-RIGHT', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(45);

      // For angle 45, gradient goes from bottom-left toward top-right
      // dx = cos(-45deg) = 0.707, dy = sin(-45deg) = -0.707
      const expectedOffset = 0.5 * Math.SQRT1_2; // ~0.354

      expect(startPoint.x).toBeCloseTo(0.5 - expectedOffset, 3);
      expect(startPoint.y).toBeCloseTo(0.5 + expectedOffset, 3);
      expect(endPoint.x).toBeCloseTo(0.5 + expectedOffset, 3);
      expect(endPoint.y).toBeCloseTo(0.5 - expectedOffset, 3);
    });

    it('angle 135 should create gradient going DOWN-RIGHT', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(135);

      const expectedOffset = 0.5 * Math.SQRT1_2;

      // For angle 135, gradient goes from top-left toward bottom-right
      expect(startPoint.x).toBeCloseTo(0.5 - expectedOffset, 3);
      expect(startPoint.y).toBeCloseTo(0.5 - expectedOffset, 3);
      expect(endPoint.x).toBeCloseTo(0.5 + expectedOffset, 3);
      expect(endPoint.y).toBeCloseTo(0.5 + expectedOffset, 3);
    });

    it('angle 225 should create gradient going DOWN-LEFT', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(225);

      const expectedOffset = 0.5 * Math.SQRT1_2;

      // For angle 225, gradient goes from top-right toward bottom-left
      expect(startPoint.x).toBeCloseTo(0.5 + expectedOffset, 3);
      expect(startPoint.y).toBeCloseTo(0.5 - expectedOffset, 3);
      expect(endPoint.x).toBeCloseTo(0.5 - expectedOffset, 3);
      expect(endPoint.y).toBeCloseTo(0.5 + expectedOffset, 3);
    });

    it('angle 315 should create gradient going UP-LEFT', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(315);

      const expectedOffset = 0.5 * Math.SQRT1_2;

      // For angle 315, gradient goes from bottom-right toward top-left
      expect(startPoint.x).toBeCloseTo(0.5 + expectedOffset, 3);
      expect(startPoint.y).toBeCloseTo(0.5 + expectedOffset, 3);
      expect(endPoint.x).toBeCloseTo(0.5 - expectedOffset, 3);
      expect(endPoint.y).toBeCloseTo(0.5 - expectedOffset, 3);
    });
  });

  describe('Custom angle center', () => {
    it('should respect custom angle center at top-left (0, 0)', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(90, 0, 0);

      // For angle 90 with center at (0,0), gradient extends left and right of origin
      expect(startPoint.x).toBeCloseTo(-0.5, 4);
      expect(startPoint.y).toBeCloseTo(0.0, 4);
      expect(endPoint.x).toBeCloseTo(0.5, 4);
      expect(endPoint.y).toBeCloseTo(0.0, 4);
    });

    it('should respect custom angle center at bottom-right (1, 1)', () => {
      const { startPoint, endPoint } = calculatePointsForAngle(0, 1, 1);

      // For angle 0 with center at (1,1), gradient extends above and below
      expect(startPoint.x).toBeCloseTo(1.0, 4);
      expect(startPoint.y).toBeCloseTo(1.5, 4);
      expect(endPoint.x).toBeCloseTo(1.0, 4);
      expect(endPoint.y).toBeCloseTo(0.5, 4);
    });
  });

  describe('Negative angles', () => {
    it('angle -90 should be equivalent to angle 270', () => {
      const resultNeg90 = calculatePointsForAngle(-90);
      const result270 = calculatePointsForAngle(270);

      expect(resultNeg90.startPoint.x).toBeCloseTo(result270.startPoint.x, 4);
      expect(resultNeg90.startPoint.y).toBeCloseTo(result270.startPoint.y, 4);
      expect(resultNeg90.endPoint.x).toBeCloseTo(result270.endPoint.x, 4);
      expect(resultNeg90.endPoint.y).toBeCloseTo(result270.endPoint.y, 4);
    });
  });
});

describe('Angle Calculation - Android Implementation', () => {
  describe('Cardinal directions (100x100 square view)', () => {
    const width = 100;
    const height = 100;

    it('angle 0 should create gradient going UP', () => {
      const { x0, y0, x1, y1 } = calculatePointsFromAngleAndroid(0, width, height);

      // For angle 0 (up), start at bottom center, end at top center
      expect(x0).toBeCloseTo(50, 1);
      expect(y0).toBeCloseTo(100, 1);
      expect(x1).toBeCloseTo(50, 1);
      expect(y1).toBeCloseTo(0, 1);
    });

    it('angle 90 should create gradient going RIGHT', () => {
      const { x0, y0, x1, y1 } = calculatePointsFromAngleAndroid(90, width, height);

      // For angle 90 (right), start at left center, end at right center
      expect(x0).toBeCloseTo(0, 1);
      expect(y0).toBeCloseTo(50, 1);
      expect(x1).toBeCloseTo(100, 1);
      expect(y1).toBeCloseTo(50, 1);
    });

    it('angle 180 should create gradient going DOWN', () => {
      const { x0, y0, x1, y1 } = calculatePointsFromAngleAndroid(180, width, height);

      // For angle 180 (down), start at top center, end at bottom center
      expect(x0).toBeCloseTo(50, 1);
      expect(y0).toBeCloseTo(0, 1);
      expect(x1).toBeCloseTo(50, 1);
      expect(y1).toBeCloseTo(100, 1);
    });

    it('angle 270 should create gradient going LEFT', () => {
      const { x0, y0, x1, y1 } = calculatePointsFromAngleAndroid(270, width, height);

      // For angle 270 (left), start at right center, end at left center
      expect(x0).toBeCloseTo(100, 1);
      expect(y0).toBeCloseTo(50, 1);
      expect(x1).toBeCloseTo(0, 1);
      expect(y1).toBeCloseTo(50, 1);
    });
  });

  describe('Non-square views', () => {
    it('should handle wide views (200x100)', () => {
      const { x0, y0, x1, y1 } = calculatePointsFromAngleAndroid(90, 200, 100);

      // For angle 90 on wide view, should use halfWidth for x offset
      expect(x0).toBeCloseTo(0, 1); // 100 - 100
      expect(y0).toBeCloseTo(50, 1);
      expect(x1).toBeCloseTo(200, 1); // 100 + 100
      expect(y1).toBeCloseTo(50, 1);
    });

    it('should handle tall views (100x200)', () => {
      const { x0, y0, x1, y1 } = calculatePointsFromAngleAndroid(0, 100, 200);

      // For angle 0 on tall view, should use halfHeight for y offset
      expect(x0).toBeCloseTo(50, 1);
      expect(y0).toBeCloseTo(200, 1); // 100 + 100
      expect(x1).toBeCloseTo(50, 1);
      expect(y1).toBeCloseTo(0, 1); // 100 - 100
    });
  });
});

describe('Cross-platform consistency', () => {
  it('iOS and Android should produce equivalent normalized results for square views', () => {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const size = 100;

    for (const angle of angles) {
      const ios = calculatePointsForAngle(angle);
      const android = calculatePointsFromAngleAndroid(angle, size, size);

      // Normalize Android results to 0-1 range
      const androidNormalized = {
        startX: android.x0 / size,
        startY: android.y0 / size,
        endX: android.x1 / size,
        endY: android.y1 / size,
      };

      expect(androidNormalized.startX).toBeCloseTo(ios.startPoint.x, 3);
      expect(androidNormalized.startY).toBeCloseTo(ios.startPoint.y, 3);
      expect(androidNormalized.endX).toBeCloseTo(ios.endPoint.x, 3);
      expect(androidNormalized.endY).toBeCloseTo(ios.endPoint.y, 3);
    }
  });
});
