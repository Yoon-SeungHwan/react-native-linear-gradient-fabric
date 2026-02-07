import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test for issue #591: Locations prop > 1 not working on iOS
 * Verify locations are clamped to [0, 1] range
 */
export function LocationsTest() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Locations Tests</Text>
      <Text style={styles.subtitle}>Issue #591: Locations clamping</Text>

      <View style={styles.testCase}>
        <Text style={styles.label}>Normal locations: [0, 0.5, 1]</Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          locations={[0, 0.5, 1]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
        <View style={styles.markers}>
          <Text style={styles.marker}>0</Text>
          <Text style={styles.marker}>0.5</Text>
          <Text style={styles.marker}>1</Text>
        </View>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Early stop: [0, 0.3, 0.6]</Text>
        <Text style={styles.description}>
          Last color fills remaining 40% of gradient
        </Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          locations={[0, 0.3, 0.6]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Late start: [0.3, 0.6, 1]</Text>
        <Text style={styles.description}>
          First color fills initial 30% of gradient
        </Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          locations={[0.3, 0.6, 1]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Out of bounds: [0, 1.5, 2]</Text>
        <Text style={styles.description}>
          Values &gt; 1 are clamped to 1 (was crashing on iOS)
        </Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          locations={[0, 1.5, 2]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Negative: [-0.5, 0.5, 1]</Text>
        <Text style={styles.description}>
          Values &lt; 0 are clamped to 0
        </Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          locations={[-0.5, 0.5, 1]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>All same: [0.5, 0.5, 0.5]</Text>
        <Text style={styles.description}>Sharp color transitions at center</Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          locations={[0.5, 0.5, 0.5]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Many stops with locations</Text>
        <LinearGradient
          colors={[
            '#ff0000',
            '#ff7f00',
            '#ffff00',
            '#00ff00',
            '#0000ff',
            '#4b0082',
            '#9400d3',
          ]}
          locations={[0, 0.16, 0.33, 0.5, 0.66, 0.83, 1]}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>No locations (auto-distributed)</Text>
        <LinearGradient
          colors={['#ff0000', '#00ff00', '#0000ff']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
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
  gradient: {
    height: 60,
    borderRadius: 8,
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  marker: {
    fontSize: 10,
    color: '#666',
  },
});
