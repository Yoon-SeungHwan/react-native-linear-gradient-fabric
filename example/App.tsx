import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {LinearGradient} from 'react-native-linear-gradient-fabric';

// Check if New Architecture is enabled
const isNewArchitecture = (global as any).__turboModuleProxy != null;

function GradientDemo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.demoContainer}>
      <Text style={styles.demoTitle}>{title}</Text>
      {children}
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Linear Gradient Demos</Text>
        <View style={styles.archBadge}>
          <Text style={styles.archText}>
            {isNewArchitecture ? '✨ New Architecture' : '📦 Old Architecture'}
          </Text>
        </View>

        <GradientDemo title="Basic Vertical Gradient">
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradient}
          />
        </GradientDemo>

        <GradientDemo title="Horizontal Gradient">
          <LinearGradient
            colors={['#ff6b6b', '#feca57', '#48dbfb']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.gradient}
          />
        </GradientDemo>

        <GradientDemo title="Diagonal Gradient">
          <LinearGradient
            colors={['#a55eea', '#45aaf2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}
          />
        </GradientDemo>

        <GradientDemo title="Custom Locations">
          <LinearGradient
            colors={['#ff0000', '#ffff00', '#00ff00']}
            locations={[0, 0.3, 1]}
            style={styles.gradient}
          />
        </GradientDemo>

        <GradientDemo title="Angle-based Gradient (45°)">
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            useAngle
            angle={45}
            style={styles.gradient}
          />
        </GradientDemo>

        <GradientDemo title="Angle-based Gradient (135°)">
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            useAngle
            angle={135}
            style={styles.gradient}
          />
        </GradientDemo>

        <GradientDemo title="Gradient with Children">
          <LinearGradient
            colors={['#00c6fb', '#005bea']}
            style={styles.gradientWithChildren}>
            <Text style={styles.childText}>Hello, Gradient!</Text>
          </LinearGradient>
        </GradientDemo>

        <GradientDemo title="Rounded Gradient Button">
          <LinearGradient
            colors={['#f857a6', '#ff5858']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.buttonText}>Press Me</Text>
          </LinearGradient>
        </GradientDemo>

        <GradientDemo title="Multi-color Gradient">
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
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.gradient}
          />
        </GradientDemo>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  archBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
  },
  archText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ade80',
  },
  demoContainer: {
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0e0e0',
    marginBottom: 8,
  },
  gradient: {
    height: 100,
    borderRadius: 8,
  },
  gradientWithChildren: {
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default App;
