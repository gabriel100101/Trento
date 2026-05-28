import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  require('@/global.css');
}

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false }} />;
}
