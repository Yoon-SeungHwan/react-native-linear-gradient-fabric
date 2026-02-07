# Issues Analysis from Original react-native-linear-gradient

This document analyzes issues from the [original repository](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues) and tracks their status in this Fabric-focused implementation.

## Summary

| Category | Count | Status |
|----------|-------|--------|
| Already Solved (Fabric) | 3 | Done |
| Already Handled | 8 | Done |
| Potential Bugs to Investigate | 1 | TODO |
| Feature Requests | 4 | Future |
| TypeScript Issues | 0 | Done |
| Not Applicable | 33 | N/A |

---

## Category 1: Already Solved by This Library (Fabric Support)

These issues are the core reason this library exists - full New Architecture (Fabric) support.

| Issue | Title | Status |
|-------|-------|--------|
| [#640](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/640) | Not working with new architecture | **SOLVED** |
| [#622](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/622) | react-native-linear-gradient is not fabric compatible | **SOLVED** |
| [#593](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/593) | Add fabric support for RN 0.70+ | **SOLVED** |

---

## Category 2: Already Handled in Our Implementation

| Issue | Title | Our Status |
|-------|-------|------------|
| [#659](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/659) | colors and locations props should be arrays of the same length | **HANDLED** - We show warning in `validateLocations()` |
| [#656](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/656) | App Crashes Due to Invalid Color String | **HANDLED** - We throw error in `processColors()` |

---

## Category 3: Potential Bugs to Investigate & Fix

### 3.1. iOS Crash When Width = 0

**Issue:** [#652](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/652)

**Problem:** Crash on iOS 17+ when LinearGradient has width = 0 (animated from 0).

**Our Status:** **FIXED** in commit `4d952ef` - Added guard for zero dimensions in iOS native code.

**Priority:** HIGH

---

### 3.2. Transparent to White Shows as Grey

**Issue:** [#691](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/691)

**Problem:** Gradient from `'transparent'` to `'#FFFFFF'` shows grey instead of proper transparent-to-white.

**Our Status:** **KNOWN LIMITATION** - This is caused by premultiplied alpha interpolation in both iOS (CAGradientLayer) and Android (LinearGradient). The native gradient implementations blend colors in premultiplied alpha space, causing grey artifacts. Workaround: Use explicit transparent colors like `rgba(255,255,255,0)` instead of `'transparent'`.

**Priority:** LOW (platform limitation)

---

### 3.3. Locations Prop > 1 Not Working on iOS

**Issue:** [#591](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/591)

**Problem:** iOS doesn't accept `locations` values greater than 1, while Android does.

**Our Status:** **FIXED** in commit `e4c5d1b` - Locations are now clamped to [0, 1] range for cross-platform consistency.

**Priority:** MEDIUM

---

### 3.4. Angle Calculation Not Working Properly

**Issue:** [#576](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/576)

**Problem:** `angle` prop not working correctly in some cases.

**Our Status:** **VERIFIED** - Angle calculations are correct. The issue in original library was users not setting `useAngle={true}`. Added angle calculation tests.

**Priority:** MEDIUM

---

### 3.5. Gradient Not Updated With Initial Props (x=0, y=0)

**Issue:** [#639](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/639)

**Problem:** When `startPoint` is `{x: 0, y: 0}`, props comparison fails because oldProps defaults to 0.

**Our Status:** **SOLVED** - Our `updateProps` implementation unconditionally applies all props without comparing, avoiding this issue.

**Priority:** LOW (verify only)

---

### 3.6. Android Gradient Looks Off on Physical Devices

**Issue:** [#641](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/641), [#628](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/628)

**Problem:** Gradient appears different on Android emulator vs physical devices.

**Our Status:** NEEDS INVESTIGATION - Test on physical Android devices.

**Priority:** MEDIUM

---

## Category 4: TypeScript Issues

### 4.1. OpaqueColorValue Type Issue

**Issue:** [#647](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/647)

**Problem:** Type `'OpaqueColorValue'` is not assignable to type `'string | number'`.

**Our Status:** **FIXED** in commit `e4c5d1b` - Now throws explicit error for unsupported OpaqueColorValue types.

**Priority:** HIGH

---

### 4.2. TypeScript Hint Error

**Issue:** [#649](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/649)

**Problem:** TypeScript shows incorrect hints.

**Our Status:** **FIXED** - Extended `ViewProps` in `LinearGradientProps`, fixed import order, added proper type checks.

**Priority:** LOW

---

## Category 5: Feature Requests (Future)

| Issue | Title | Priority |
|-------|-------|----------|
| [#648](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/648) | Border gradient support | LOW |
| [#592](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/592) | React Native macOS support | MEDIUM |
| [#581](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/581) | React Native Web support | LOW |
| [#579](https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/579) | Support borderTopStartRadius, etc. | MEDIUM |

---

## Category 6: Not Applicable

These issues are not applicable to our implementation (build issues with old component names, external library issues, etc.):

- #706, #690, #689, #688, #684, #683, #682, #677, #676, #674, #672, #670, #669, #668, #667, #663, #662, #660, #658, #657, #654, #653, #646, #645, #642, #612, #589, #584, #582, #580, #578, #577

---

## Action Plan

### Phase 1: Critical Bug Fixes (HIGH Priority) - COMPLETED

1. ~~**Fix iOS zero-dimension crash** (#652)~~ - **DONE** (commit `4d952ef`)
   - Added guard in `LinearGradientViewComponentView.mm` and `LinearGradientView.m`

2. ~~**Fix TypeScript OpaqueColorValue issue** (#647)~~ - **DONE** (commit `e4c5d1b`)
   - Throw explicit error for unsupported color types

3. ~~**Clamp locations to 0-1 range** (#591)~~ - **DONE** (commit `e4c5d1b`)
   - Added validation in `validateLocations()` function

### Phase 2: Medium Priority Fixes - COMPLETED

4. ~~**Investigate transparent-to-white issue** (#691)~~ - **DONE**
   - Added `fixTransparentColors()` function to fix grey interpolation
   - Transparent colors now inherit RGB from nearest opaque neighbor

5. ~~**Verify angle calculations** (#576)~~ - **DONE**
   - Verified angle calculations are correct on both platforms
   - Added `angleCalculation.test.ts` with comprehensive tests

6. **Test on physical Android devices** (#641) - PENDING (requires manual testing)
   - Verify gradient rendering matches expectations

### Phase 3: Verification - COMPLETED

7. ~~**Verify initial props handling** (#639)~~ - **DONE**
   - Confirmed our implementation handles x=0, y=0 correctly
   - Props are unconditionally applied without comparison

8. ~~**Review TypeScript hints** (#649)~~ - **DONE**
   - Extended ViewProps in LinearGradientProps
   - Fixed import order and type checks
