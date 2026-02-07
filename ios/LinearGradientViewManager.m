#import "LinearGradientViewManager.h"
#import "LinearGradientView.h"
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>

@implementation LinearGradientViewManager

RCT_EXPORT_MODULE(LinearGradientView)

- (UIView *)view
{
    return [[LinearGradientView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(colors, NSArray)
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray)
RCT_CUSTOM_VIEW_PROPERTY(startPoint, NSDictionary, LinearGradientView)
{
    if (json) {
        NSDictionary *dict = [RCTConvert NSDictionary:json];
        CGFloat x = [[dict objectForKey:@"x"] floatValue];
        CGFloat y = [[dict objectForKey:@"y"] floatValue];
        view.startPoint = CGPointMake(x, y);
    } else {
        view.startPoint = CGPointMake(0.5, 0);
    }
}

RCT_CUSTOM_VIEW_PROPERTY(endPoint, NSDictionary, LinearGradientView)
{
    if (json) {
        NSDictionary *dict = [RCTConvert NSDictionary:json];
        CGFloat x = [[dict objectForKey:@"x"] floatValue];
        CGFloat y = [[dict objectForKey:@"y"] floatValue];
        view.endPoint = CGPointMake(x, y);
    } else {
        view.endPoint = CGPointMake(0.5, 1);
    }
}

RCT_EXPORT_VIEW_PROPERTY(useAngle, BOOL)
RCT_EXPORT_VIEW_PROPERTY(angle, CGFloat)

RCT_CUSTOM_VIEW_PROPERTY(angleCenter, NSDictionary, LinearGradientView)
{
    if (json) {
        NSDictionary *dict = [RCTConvert NSDictionary:json];
        CGFloat x = [[dict objectForKey:@"x"] floatValue];
        CGFloat y = [[dict objectForKey:@"y"] floatValue];
        view.angleCenter = CGPointMake(x, y);
    } else {
        view.angleCenter = CGPointMake(0.5, 0.5);
    }
}

@end
