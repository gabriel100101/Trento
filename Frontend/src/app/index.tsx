import * as Device from 'expo-device';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme, MaxContentWidth, Spacing, BottomTabInset } from '@/constants/theme';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer'; 

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trento" />
      <View style={styles.content} />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
});
