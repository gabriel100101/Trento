import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer'; 
import { SafeAreaView } from 'react-native-safe-area-context';

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
