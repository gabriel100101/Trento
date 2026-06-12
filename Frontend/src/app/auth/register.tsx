import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Header } from '@/components/header';
import { theme } from '@/constants/theme';
import { useAuth } from './AuthProvider';

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    // Não precisa salvar: requisito do exercício.
    // Mesmo assim, após "criar conta", liberamos a navegação.
    if (!name.trim() || !email.trim() || !password.trim()) return;
    login({ email });
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trento" titleColor={theme.colors.text} />

      <View style={styles.content}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Preencha os dados para entrar no app.</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor={theme.colors.border}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.border}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={theme.colors.border}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.primaryButton} onPress={onSubmit}>
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.replace('/auth/login')}>
          <Text style={styles.secondaryButtonText}>Já tenho conta</Text>
        </Pressable>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 22,
    textAlign: 'center',
    maxWidth: 360,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: theme.colors.text,
    backgroundColor: theme.colors.card,
    marginBottom: 14,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
});

