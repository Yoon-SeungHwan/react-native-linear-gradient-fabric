import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test for issue #652: iOS crash when width = 0
 * Verify gradient handles zero dimensions without crashing
 */
export function ZeroDimensionTest() {
  const [showAnimated, setShowAnimated] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showAnimated) {
      // Animate from 0 to full width/height
      Animated.parallel([
        Animated.timing(widthAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      widthAnim.setValue(0);
      heightAnim.setValue(0);
    }
  }, [showAnimated, widthAnim, heightAnim]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Zero Dimension Tests</Text>
      <Text style={styles.subtitle}>Issue #652: iOS crash when width=0</Text>

      <View style={styles.testCase}>
        <Text style={styles.label}>Static: width = 0</Text>
        <Text style={styles.description}>Should not crash, just invisible</Text>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={[styles.gradient, {width: 0}]}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Static: height = 0</Text>
        <Text style={styles.description}>Should not crash, just invisible</Text>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={[styles.gradient, {height: 0}]}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Static: width = 0, height = 0</Text>
        <Text style={styles.description}>Should not crash, just invisible</Text>
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={[styles.gradient, {width: 0, height: 0}]}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Animated: 0 → full size</Text>
        <Text style={styles.description}>
          This was crashing on iOS 17+ before the fix
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => setShowAnimated(!showAnimated)}>
          <Text style={styles.buttonText}>
            {showAnimated ? 'Reset' : 'Start Animation'}
          </Text>
        </Pressable>
        <View style={styles.animatedContainer}>
          <Animated.View
            style={{
              width: animatedWidth,
              height: animatedHeight,
            }}>
            <LinearGradient
              colors={['#ff6b6b', '#4ecdc4']}
              style={styles.fullGradient}
            />
          </Animated.View>
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Conditional render</Text>
        <Text style={styles.description}>
          Toggle visibility without crashing
        </Text>
        <ToggleGradient />
      </View>
    </ScrollView>
  );
}

function ToggleGradient() {
  const [visible, setVisible] = useState(true);
  const [size, setSize] = useState(100);

  return (
    <View>
      <View style={styles.buttonRow}>
        <Pressable
          style={styles.smallButton}
          onPress={() => setVisible(!visible)}>
          <Text style={styles.buttonText}>{visible ? 'Hide' : 'Show'}</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={() => setSize(s => (s === 0 ? 100 : 0))}>
          <Text style={styles.buttonText}>Toggle Size</Text>
        </Pressable>
      </View>
      {visible && (
        <LinearGradient
          colors={['#a55eea', '#45aaf2']}
          style={[styles.toggleGradient, {height: size}]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  testCase: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  gradientContainer: {
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: 300,
    height: 100,
    borderRadius: 8,
  },
  animatedContainer: {
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullGradient: {
    flex: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4ade80',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  smallButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  toggleGradient: {
    borderRadius: 8,
  },
});
