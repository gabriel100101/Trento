import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from '@/components/header';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trento" />
      <View style={styles.content} />
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
