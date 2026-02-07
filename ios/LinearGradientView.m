#import "LinearGradientView.h"
#import <QuartzCore/QuartzCore.h>

@implementation LinearGradientView {
    CAGradientLayer *_gradientLayer;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        _gradientLayer = [CAGradientLayer layer];
        _gradientLayer.frame = self.bounds;
        [self.layer insertSublayer:_gradientLayer atIndex:0];

        // Set default values
        _startPoint = CGPointMake(0.5, 0);
        _endPoint = CGPointMake(0.5, 1);
        _useAngle = NO;
        _angle = 0;
        _angleCenter = CGPointMake(0.5, 0.5);
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    _gradientLayer.frame = self.bounds;
}

- (void)setColors:(NSArray<NSNumber *> *)colors
{
    _colors = colors;
    [self updateGradient];
}

- (void)setLocations:(NSArray<NSNumber *> *)locations
{
    _locations = locations;
    [self updateGradient];
}

- (void)setStartPoint:(CGPoint)startPoint
{
    _startPoint = startPoint;
    [self updateGradient];
}

- (void)setEndPoint:(CGPoint)endPoint
{
    _endPoint = endPoint;
    [self updateGradient];
}

- (void)setUseAngle:(BOOL)useAngle
{
    _useAngle = useAngle;
    [self updateGradient];
}

- (void)setAngle:(CGFloat)angle
{
    _angle = angle;
    [self updateGradient];
}

- (void)setAngleCenter:(CGPoint)angleCenter
{
    _angleCenter = angleCenter;
    [self updateGradient];
}

- (void)updateGradient
{
    if (!_colors || _colors.count == 0) {
        return;
    }

    // Convert colors from ARGB int to CGColor
    NSMutableArray<id> *cgColors = [NSMutableArray arrayWithCapacity:_colors.count];
    for (NSNumber *colorNumber in _colors) {
        int colorInt = [colorNumber intValue];
        UIColor *color = [self colorFromInt:colorInt];
        [cgColors addObject:(id)color.CGColor];
    }
    _gradientLayer.colors = cgColors;

    // Set locations if provided
    if (_locations && _locations.count > 0) {
        _gradientLayer.locations = _locations;
    } else {
        _gradientLayer.locations = nil;
    }

    // Calculate start and end points
    CGPoint startPoint, endPoint;

    if (_useAngle) {
        [self calculatePointsForAngle:_angle
                              centerX:_angleCenter.x
                              centerY:_angleCenter.y
                           startPoint:&startPoint
                             endPoint:&endPoint];
    } else {
        startPoint = _startPoint;
        endPoint = _endPoint;
    }

    _gradientLayer.startPoint = startPoint;
    _gradientLayer.endPoint = endPoint;
}

- (UIColor *)colorFromInt:(int)colorInt
{
    // React Native processColor returns ARGB format on iOS
    CGFloat alpha = ((colorInt >> 24) & 0xFF) / 255.0;
    CGFloat red = ((colorInt >> 16) & 0xFF) / 255.0;
    CGFloat green = ((colorInt >> 8) & 0xFF) / 255.0;
    CGFloat blue = (colorInt & 0xFF) / 255.0;

    return [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
}

- (void)calculatePointsForAngle:(CGFloat)angle
                        centerX:(CGFloat)centerX
                        centerY:(CGFloat)centerY
                     startPoint:(CGPoint *)startPoint
                       endPoint:(CGPoint *)endPoint
{
    // Convert angle from degrees to radians
    // Angle 0 = up, 90 = right, 180 = down, 270 = left
    CGFloat angleRad = (angle - 90) * M_PI / 180.0;

    // Calculate the gradient direction vector
    CGFloat dx = cos(angleRad);
    CGFloat dy = sin(angleRad);

    // Normalize to ensure the gradient covers the full view
    CGFloat length = 0.5;

    *startPoint = CGPointMake(centerX - dx * length, centerY - dy * length);
    *endPoint = CGPointMake(centerX + dx * length, centerY + dy * length);
}

@end
