import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatingDraggable } from '@/components/animation';
import { theme } from '@/constants/theme';

const colorOrder = [theme.colors.text, theme.colors.primaryDark, theme.colors.background] as const;

const speedConfig = {
  [theme.colors.text]: {
    floatDistance: 50,
    floatDuration: 2000,
    floatDelay: 1000,
  },
  [theme.colors.primaryDark]: {
    floatDistance: 100,
    floatDuration: 1000,
    floatDelay: 500,
  },
  [theme.colors.background]: {
    floatDistance: 200,
    floatDuration: 500,
    floatDelay: 0,
  },
};

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColor = colorOrder[activeIndex];
  const { floatDistance, floatDuration, floatDelay } = speedConfig[activeColor];

  const handleTitlePress = () => {
    setActiveIndex((current) => (current + 1) % colorOrder.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trento" titleColor={activeColor} onTitlePress={handleTitlePress} />
      <View style={styles.content} />
      <FloatingDraggable
        color={activeColor}
        floatDistance={floatDistance}
        floatDuration={floatDuration}
        floatDelay={floatDelay}
      />
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
