import React from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient-fabric';

/**
 * Test nested content (text, images, views) inside gradient backgrounds
 */
export function NestedContentTest() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nested Content Tests</Text>
      <Text style={styles.subtitle}>Text, Images, and Views over Gradients</Text>

      <View style={styles.testCase}>
        <Text style={styles.label}>Text over Gradient</Text>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradientBox}>
          <Text style={styles.overlayText}>Hello World!</Text>
          <Text style={styles.overlaySubtext}>
            This text is rendered on top of the gradient
          </Text>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Centered Content</Text>
        <LinearGradient
          colors={['#f093fb', '#f5576c']}
          style={styles.centeredBox}>
          <Text style={styles.bigText}>Centered</Text>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Card with Gradient Background</Text>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.card}>
          <Text style={styles.cardTitle}>Premium Card</Text>
          <Text style={styles.cardDescription}>
            A card component with gradient background, commonly used for
            subscription tiers or featured content.
          </Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Learn More</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Nested Gradients</Text>
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.outerGradient}>
          <Text style={styles.nestedLabel}>Outer Gradient</Text>
          <LinearGradient
            colors={['#e94560', '#ff6b6b']}
            style={styles.innerGradient}>
            <Text style={styles.innerText}>Inner Gradient</Text>
          </LinearGradient>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Multiple Nested Children</Text>
        <LinearGradient
          colors={['#11998e', '#38ef7d']}
          style={styles.multiChildBox}>
          <View style={styles.childRow}>
            <View style={styles.childItem}>
              <Text style={styles.childNumber}>1</Text>
            </View>
            <View style={styles.childItem}>
              <Text style={styles.childNumber}>2</Text>
            </View>
            <View style={styles.childItem}>
              <Text style={styles.childNumber}>3</Text>
            </View>
          </View>
          <Text style={styles.childLabel}>Three items in a row</Text>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Gradient Button with Icon</Text>
        <LinearGradient
          colors={['#ff416c', '#ff4b2b']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.iconButton}>
          <Text style={styles.iconEmoji}>🚀</Text>
          <Text style={styles.iconButtonText}>Launch App</Text>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Profile Card</Text>
        <LinearGradient
          colors={['#6a11cb', '#2575fc']}
          style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileRole}>Senior Developer</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>142</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>89</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>Header with Gradient</Text>
        <LinearGradient
          colors={['#0f0c29', '#302b63', '#24243e']}
          style={styles.header}>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>
            You have 3 new notifications
          </Text>
        </LinearGradient>
      </View>

      <View style={styles.testCase}>
        <Text style={styles.label}>List Items with Gradient</Text>
        {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
          <LinearGradient
            key={item}
            colors={['#373b44', '#4286f4']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.listItem, index > 0 && styles.listItemMargin]}>
            <Text style={styles.listItemText}>{item}</Text>
            <Text style={styles.listItemArrow}>→</Text>
          </LinearGradient>
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
  gradientBox: {
    padding: 20,
    borderRadius: 12,
  },
  overlayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  overlaySubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  centeredBox: {
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  card: {
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  outerGradient: {
    padding: 16,
    borderRadius: 12,
  },
  nestedLabel: {
    color: '#888',
    marginBottom: 12,
  },
  innerGradient: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  innerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  multiChildBox: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  childRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  childItem: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childNumber: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  childLabel: {
    color: 'rgba(255,255,255,0.8)',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  iconEmoji: {
    fontSize: 20,
  },
  iconButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  header: {
    padding: 24,
    borderRadius: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  listItemMargin: {
    marginTop: 8,
  },
  listItemText: {
    color: '#ffffff',
    fontSize: 16,
  },
  listItemArrow: {
    color: '#ffffff',
    fontSize: 18,
  },
});
