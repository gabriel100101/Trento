import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { theme } from '@/constants/theme';


export default function ChangesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trento" titleColor={theme.colors.text} />


      <View style={styles.content}>
        <Text>Alterações</Text>
      </View>

      <Footer
        onQuadrosPress={() => router.push('/')}
        onCartoesPress={() => router.push('/cards')}
        onNotificacaoPress={() => router.push('/changes')}
        onContaPress={() => router.push('/account')}
      />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
});



