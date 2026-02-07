import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test for issue #576: Angle calculations
 * Verify angle prop works correctly with useAngle={true}
 */
export function AngleTest() {
  const [angle, setAngle] = useState(0);

  const cardinalAngles = [0, 90, 180, 270];
  const diagonalAngles = [45, 135, 225, 315];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Angle Tests</Text>
      <Text style={styles.subtitle}>Issue #576: Verify angle calculations</Text>

      <Text style={styles.sectionTitle}>Interactive Angle</Text>
      <View style={styles.angleDisplay}>
        <Text style={styles.angleText}>{angle}°</Text>
      </View>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        useAngle
        angle={angle}
        style={styles.largeGradient}
      />
      <View style={styles.sliderButtons}>
        <Pressable
          style={styles.button}
          onPress={() => setAngle(a => Math.max(0, a - 15))}>
          <Text style={styles.buttonText}>-15°</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setAngle(a => Math.min(360, a + 15))}>
          <Text style={styles.buttonText}>+15°</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setAngle(0)}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Cardinal Directions</Text>
      <Text style={styles.description}>
        0° = UP, 90° = RIGHT, 180° = DOWN, 270° = LEFT
      </Text>
      <View style={styles.grid}>
        {cardinalAngles.map(a => (
          <View key={a} style={styles.gridItem}>
            <LinearGradient
              colors={['#ff6b6b', '#4ecdc4']}
              useAngle
              angle={a}
              style={styles.smallGradient}
            />
            <Text style={styles.gridLabel}>{a}°</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Diagonal Directions</Text>
      <View style={styles.grid}>
        {diagonalAngles.map(a => (
          <View key={a} style={styles.gridItem}>
            <LinearGradient
              colors={['#a55eea', '#45aaf2']}
              useAngle
              angle={a}
              style={styles.smallGradient}
            />
            <Text style={styles.gridLabel}>{a}°</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Negative Angles</Text>
      <View style={styles.grid}>
        {[-45, -90, -135, -180].map(a => (
          <View key={a} style={styles.gridItem}>
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              useAngle
              angle={a}
              style={styles.smallGradient}
            />
            <Text style={styles.gridLabel}>{a}°</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Custom Angle Center</Text>
      <View style={styles.row}>
        <View style={styles.halfItem}>
          <Text style={styles.label}>Center: 0.5, 0.5</Text>
          <LinearGradient
            colors={['#00c6fb', '#005bea']}
            useAngle
            angle={45}
            angleCenter={{x: 0.5, y: 0.5}}
            style={styles.smallGradient}
          />
        </View>
        <View style={styles.halfItem}>
          <Text style={styles.label}>Center: 0, 0</Text>
          <LinearGradient
            colors={['#00c6fb', '#005bea']}
            useAngle
            angle={45}
            angleCenter={{x: 0, y: 0}}
            style={styles.smallGradient}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0e0e0',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  angleDisplay: {
    alignItems: 'center',
    marginBottom: 12,
  },
  angleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4ade80',
  },
  largeGradient: {
    height: 120,
    borderRadius: 12,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 12,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
  },
  smallGradient: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  gridLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfItem: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
});
