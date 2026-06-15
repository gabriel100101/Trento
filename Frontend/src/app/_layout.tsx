import { Stack, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import { AuthProvider, useAuth } from './auth/AuthProvider';

if (Platform.OS === 'web') {
  require('@/global.css');
}

function AuthGate() {
  const router = useRouter();
  const { isAuthed } = useAuth();

  // Evita tela em branco no primeiro render.
  // Também remove dependência de __expo_router_pathname (não garantido).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const routeKey = useMemo(
    () => (isAuthed ? 'authed' : 'anon'),
    [isAuthed]
  );

  useEffect(() => {
    if (!ready) return;

    // Requisito: ao abrir o app SEMPRE cair em /auth/login.
    // Portanto, se não está autenticado, manda para /auth/login.
    if (!isAuthed) {
      router.replace('/auth/login');
      return;
    }

    // Se estiver autenticado, deixa o fluxo normal (Stack decide), mas evita ficar em /auth.
    // Sem depender do pathname global, checamos via navegação: se chegamos aqui vindo de /auth,
    // após login o botao redireciona para '/', então aqui não faz nada.
  }, [isAuthed, ready, router]);

  if (!ready) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return (
    <Stack
      key={routeKey}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}


