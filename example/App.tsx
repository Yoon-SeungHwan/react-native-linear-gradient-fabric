import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import {LinearGradient} from 'react-native-linear-gradient-fabric';
import {
  AngleTest,
  BorderRadiusTest,
  InitialPropsTest,
  LocationsTest,
  NestedContentTest,
  ZeroDimensionTest,
} from './src/screens';

// Check if New Architecture is enabled
const isNewArchitecture = (global as any).__turboModuleProxy != null;

type Screen =
  | 'home'
  | 'nestedContent'
  | 'angle'
  | 'borderRadius'
  | 'zeroDimension'
  | 'locations'
  | 'initialProps';

const screens: {id: Screen; title: string; issue?: string}[] = [
  {id: 'home', title: 'Home'},
  {id: 'nestedContent', title: 'Nested Content'},
  {id: 'angle', title: 'Angles', issue: '#576'},
  {id: 'borderRadius', title: 'Border Radius', issue: '#579'},
  {id: 'zeroDimension', title: 'Zero Dimension', issue: '#652'},
  {id: 'locations', title: 'Locations', issue: '#591'},
  {id: 'initialProps', title: 'Initial Props', issue: '#639'},
];

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

function HomeScreen({onNavigate}: {onNavigate: (screen: Screen) => void}) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Linear Gradient Fabric</Text>
      <View style={styles.archBadge}>
        <Text style={styles.archText}>
          {isNewArchitecture ? 'New Architecture' : 'Old Architecture'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Test Screens</Text>
      <View style={styles.navGrid}>
        {screens
          .filter(s => s.id !== 'home')
          .map(screen => (
            <Pressable
              key={screen.id}
              style={styles.navButton}
              onPress={() => onNavigate(screen.id)}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.navButtonGradient}>
                <Text style={styles.navButtonTitle}>{screen.title}</Text>
                {screen.issue && (
                  <Text style={styles.navButtonIssue}>{screen.issue}</Text>
                )}
              </LinearGradient>
            </Pressable>
          ))}
      </View>

      <Text style={styles.sectionTitle}>Quick Demos</Text>

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

      <GradientDemo title="Angle-based Gradient (45deg)">
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          useAngle
          angle={45}
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

      <GradientDemo title="Rainbow Gradient">
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
  );
}

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'nestedContent':
        return <NestedContentTest />;
      case 'angle':
        return <AngleTest />;
      case 'borderRadius':
        return <BorderRadiusTest />;
      case 'zeroDimension':
        return <ZeroDimensionTest />;
      case 'locations':
        return <LocationsTest />;
      case 'initialProps':
        return <InitialPropsTest />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {currentScreen !== 'home' && (
        <View style={styles.navbar}>
          <Pressable
            style={styles.backButton}
            onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
          <Text style={styles.navbarTitle}>
            {screens.find(s => s.id === currentScreen)?.title}
          </Text>
          <View style={styles.backButton} />
        </View>
      )}
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 80,
  },
  backButtonText: {
    color: '#4ade80',
    fontSize: 16,
    fontWeight: '600',
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  navButton: {
    width: '47%',
  },
  navButtonGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  navButtonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButtonIssue: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
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
