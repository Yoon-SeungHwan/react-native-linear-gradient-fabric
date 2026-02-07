import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test for issue #691: Transparent to white gradient showing grey
 * This tests the fixTransparentColors() function
 */
export function TransparentGradientTest() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Transparent Gradient Tests</Text>
      <Text style={styles.subtitle}>Issue #691: Grey interpolation fix</Text>

      <View style={styles.testCase}>
        <Text style={styles.label}>transparent → white</Text>
        <Text style={styles.description}>
          Should fade from transparent to white, NOT grey
        </Text>
        <View style={styles.checkerboard}>
          <LinearGradient
            colors={['transparent', '#FFFFFF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>transparent → red</Text>
        <Text style={styles.description}>
          Should fade from transparent to red, NOT dark red
        </Text>
        <View style={styles.checkerboard}>
          <LinearGradient
            colors={['transparent', '#FF0000']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>blue → transparent → green</Text>
        <Text style={styles.description}>
          Middle transparent should interpolate correctly
        </Text>
        <View style={styles.checkerboard}>
          <LinearGradient
            colors={['#0000FF', 'transparent', '#00FF00']}
            locations={[0, 0.5, 1]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>transparent → transparent (edge case)</Text>
        <Text style={styles.description}>Should be fully transparent</Text>
        <View style={styles.checkerboard}>
          <LinearGradient
            colors={['transparent', 'transparent']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>rgba(255,255,255,0) → white</Text>
        <Text style={styles.description}>
          Explicit transparent white to opaque white
        </Text>
        <View style={styles.checkerboard}>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}
          />
        </View>
      </View>
    </ScrollView>
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
  checkerboard: {
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    // Grey background to show transparency effect
    backgroundColor: '#808080',
  },
  gradient: {
    flex: 1,
  },
});
