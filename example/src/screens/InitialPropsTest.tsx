import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test for issue #639: Gradient not updated with initial props (x=0, y=0)
 * Verify that startPoint/endPoint {0, 0} works correctly on first render
 */
export function InitialPropsTest() {
  const [key, setKey] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Initial Props Tests</Text>
      <Text style={styles.subtitle}>Issue #639: startPoint {'{x:0, y:0}'}</Text>

      <Pressable style={styles.button} onPress={() => setKey(k => k + 1)}>
        <Text style={styles.buttonText}>Remount All (key: {key})</Text>
      </Pressable>

      <View style={styles.testCase} key={`test1-${key}`}>
        <Text style={styles.label}>startPoint: {'{x: 0, y: 0}'}</Text>
        <Text style={styles.description}>
          Gradient should start from top-left corner
        </Text>
        <LinearGradient
          colors={['#ff0000', '#0000ff']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase} key={`test2-${key}`}>
        <Text style={styles.label}>
          startPoint: {'{x: 0, y: 0}'}, endPoint: {'{x: 0, y: 1}'}
        </Text>
        <Text style={styles.description}>
          Left edge vertical gradient (red top, blue bottom)
        </Text>
        <LinearGradient
          colors={['#ff0000', '#0000ff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase} key={`test3-${key}`}>
        <Text style={styles.label}>
          startPoint: {'{x: 0, y: 0}'}, endPoint: {'{x: 1, y: 0}'}
        </Text>
        <Text style={styles.description}>
          Top edge horizontal gradient (red left, blue right)
        </Text>
        <LinearGradient
          colors={['#ff0000', '#0000ff']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase} key={`test4-${key}`}>
        <Text style={styles.label}>All zeros: start/end {'{x: 0, y: 0}'}</Text>
        <Text style={styles.description}>
          Should show solid first color (no gradient direction)
        </Text>
        <LinearGradient
          colors={['#ff0000', '#0000ff']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.gradient}
        />
      </View>

      <View style={styles.testCase} key={`test5-${key}`}>
        <Text style={styles.label}>Default (no start/end)</Text>
        <Text style={styles.description}>
          Should use default vertical gradient (top to bottom)
        </Text>
        <LinearGradient colors={['#ff0000', '#0000ff']} style={styles.gradient} />
      </View>

      <View style={styles.row}>
        <View style={[styles.testCase, styles.halfWidth]} key={`test6-${key}`}>
          <Text style={styles.label}>start: 0,0</Text>
          <LinearGradient
            colors={['#4ecdc4', '#556270']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.smallGradient}
          />
        </View>
        <View style={[styles.testCase, styles.halfWidth]} key={`test7-${key}`}>
          <Text style={styles.label}>start: 1,1</Text>
          <LinearGradient
            colors={['#4ecdc4', '#556270']}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.smallGradient}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Comparison Grid</Text>
      <Text style={styles.description}>
        All should render correctly on first mount
      </Text>
      <View style={styles.grid}>
        {[
          {start: {x: 0, y: 0}, end: {x: 1, y: 1}},
          {start: {x: 1, y: 0}, end: {x: 0, y: 1}},
          {start: {x: 0, y: 1}, end: {x: 1, y: 0}},
          {start: {x: 1, y: 1}, end: {x: 0, y: 0}},
        ].map((props, i) => (
          <View key={`grid-${i}-${key}`} style={styles.gridItem}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={props.start}
              end={props.end}
              style={styles.gridGradient}
            />
            <Text style={styles.gridLabel}>
              {props.start.x},{props.start.y} → {props.end.x},{props.end.y}
            </Text>
          </View>
        ))}
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0e0e0',
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4ade80',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
  testCase: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
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
    height: 80,
    borderRadius: 8,
  },
  smallGradient: {
    height: 80,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
  },
  gridGradient: {
    height: 60,
    borderRadius: 8,
  },
  gridLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});
