import * as Device from 'expo-device';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { theme, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return 'Use browser devtools.';
  }
  if (Device.isDevice) {
    return 'Shake device or press m in terminal.';
  }

  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return `Press ${shortcut}`;
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}> 
      <Header title="Trento" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Welcome to Expo</Text>
          <Text style={styles.subtitle}>A clean starter screen for your project.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Get started</Text>
          <Text style={styles.cardText}>Edit src/app/index.tsx to build your own UI.</Text>
          <Text style={styles.note}>{getDevMenuHint()}</Text>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  title: {
    color: theme.colors.text,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 640,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: Spacing.four,
    padding: Spacing.four,
  },
  cardTitle: {
    color: theme.colors.primary,
    fontSize: 18,
    marginBottom: Spacing.two,
  },
  cardText: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: Spacing.two,
  },
  note: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
