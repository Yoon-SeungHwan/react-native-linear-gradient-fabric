#ifdef RCT_NEW_ARCH_ENABLED
#import "LinearGradientViewComponentView.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/RNLinearGradientFabricSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNLinearGradientFabricSpec/EventEmitters.h>
#import <react/renderer/components/RNLinearGradientFabricSpec/Props.h>
#import <react/renderer/components/RNLinearGradientFabricSpec/RCTComponentViewHelpers.h>

using namespace facebook::react;

@interface LinearGradientViewComponentView () <RCTLinearGradientViewViewProtocol>
@end

@implementation LinearGradientViewComponentView {
    CAGradientLayer *_gradientLayer;
    std::vector<int> _colors;
    std::vector<Float> _locations;
    Float _startPointX;
    Float _startPointY;
    Float _endPointX;
    Float _endPointY;
    BOOL _useAngle;
    Float _angle;
    Float _angleCenterX;
    Float _angleCenterY;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<LinearGradientViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const LinearGradientViewProps>();
        _props = defaultProps;

        _gradientLayer = [CAGradientLayer layer];
        _gradientLayer.frame = self.bounds;
        _gradientLayer.zPosition = -1000;
        [self.layer insertSublayer:_gradientLayer atIndex:0];

        // Set default values
        _startPointX = 0.5;
        _startPointY = 0;
        _endPointX = 0.5;
        _endPointY = 1;
        _useAngle = NO;
        _angle = 0;
        _angleCenterX = 0.5;
        _angleCenterY = 0.5;
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    _gradientLayer.frame = self.bounds;
    [self updateGradient];
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &newProps = *std::static_pointer_cast<const LinearGradientViewProps>(props);

    // Update colors
    _colors.clear();
    for (const auto &color : newProps.colors) {
        _colors.push_back(color);
    }

    // Update locations
    _locations.clear();
    for (const auto &location : newProps.locations) {
        _locations.push_back(location);
    }

    // Update start point
    _startPointX = newProps.startPoint.x;
    _startPointY = newProps.startPoint.y;

    // Update end point
    _endPointX = newProps.endPoint.x;
    _endPointY = newProps.endPoint.y;

    // Update angle settings
    _useAngle = newProps.useAngle;
    _angle = newProps.angle;
    _angleCenterX = newProps.angleCenter.x;
    _angleCenterY = newProps.angleCenter.y;

    [self updateGradient];

    [super updateProps:props oldProps:oldProps];
}

- (void)updateGradient
{
    // Guard against zero-dimension bounds (iOS 17+ crash fix, see issue #652)
    if (self.bounds.size.width <= 0 || self.bounds.size.height <= 0) {
        return;
    }

    if (_colors.empty()) {
        return;
    }

    // Convert colors from ARGB int to CGColor
    NSMutableArray<id> *cgColors = [NSMutableArray arrayWithCapacity:_colors.size()];
    for (int colorInt : _colors) {
        UIColor *color = [self colorFromInt:colorInt];
        [cgColors addObject:(id)color.CGColor];
    }
    _gradientLayer.colors = cgColors;

    // Set locations if provided
    if (!_locations.empty()) {
        NSMutableArray<NSNumber *> *locationsArray = [NSMutableArray arrayWithCapacity:_locations.size()];
        for (Float location : _locations) {
            [locationsArray addObject:@(location)];
        }
        _gradientLayer.locations = locationsArray;
    } else {
        _gradientLayer.locations = nil;
    }

    // Calculate start and end points
    CGPoint startPoint, endPoint;

    if (_useAngle) {
        [self calculatePointsForAngle:_angle
                              centerX:_angleCenterX
                              centerY:_angleCenterY
                           startPoint:&startPoint
                             endPoint:&endPoint];
    } else {
        startPoint = CGPointMake(_startPointX, _startPointY);
        endPoint = CGPointMake(_endPointX, _endPointY);
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

- (void)calculatePointsForAngle:(Float)angle
                        centerX:(Float)centerX
                        centerY:(Float)centerY
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

Class<RCTComponentViewProtocol> LinearGradientViewCls(void)
{
    return LinearGradientViewComponentView.class;
}

#endif /* RCT_NEW_ARCH_ENABLED */
