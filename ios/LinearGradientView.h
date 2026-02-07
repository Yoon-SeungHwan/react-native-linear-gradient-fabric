#import <UIKit/UIKit.h>

@interface LinearGradientView : UIView

@property (nonatomic, copy) NSArray<NSNumber *> *colors;
@property (nonatomic, copy) NSArray<NSNumber *> *locations;
@property (nonatomic, assign) CGPoint startPoint;
@property (nonatomic, assign) CGPoint endPoint;
@property (nonatomic, assign) BOOL useAngle;
@property (nonatomic, assign) CGFloat angle;
@property (nonatomic, assign) CGPoint angleCenter;

@end
