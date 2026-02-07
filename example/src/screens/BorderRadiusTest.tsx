import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test for issue #579: Border radius support
 * Test uniform and non-uniform border radii including RTL-aware props
 */
export function BorderRadiusTest() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Border Radius Tests</Text>
      <Text style={styles.subtitle}>Issue #579: RTL-aware border radius</Text>

      <View style={styles.testCase}>
        <Text style={styles.label}>Uniform borderRadius: 20</Text>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={[styles.gradient, {borderRadius: 20}]}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Pill shape (borderRadius: 50)</Text>
        <LinearGradient
          colors={['#f857a6', '#ff5858']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradient, {borderRadius: 50}]}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Top corners only</Text>
        <LinearGradient
          colors={['#00c6fb', '#005bea']}
          style={[
            styles.gradient,
            {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Diagonal corners (TL + BR)</Text>
        <LinearGradient
          colors={['#a55eea', '#45aaf2']}
          style={[
            styles.gradient,
            {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 30,
            },
          ]}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>RTL-aware: borderTopStartRadius</Text>
        <Text style={styles.description}>
          Start/End adapt to text direction (LTR/RTL)
        </Text>
        <LinearGradient
          colors={['#ff6b6b', '#feca57']}
          style={[
            styles.gradient,
            {
              borderTopStartRadius: 30,
              borderTopEndRadius: 0,
              borderBottomStartRadius: 0,
              borderBottomEndRadius: 30,
            },
          ]}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Mixed radius values</Text>
        <LinearGradient
          colors={['#4ecdc4', '#556270']}
          style={[
            styles.gradient,
            {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 40,
            },
          ]}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Circle (width = height, radius = 50%)</Text>
        <LinearGradient
          colors={['#f093fb', '#f5576c']}
          style={styles.circle}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Nested with different radii</Text>
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={[styles.gradient, {borderRadius: 20, padding: 10}]}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={[styles.innerGradient, {borderRadius: 10}]}
          />
        </LinearGradient>
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
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  gradient: {
    height: 100,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  innerGradient: {
    flex: 1,
  },
});
