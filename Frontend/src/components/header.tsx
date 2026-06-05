import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Header({ title = 'App Title' }: { title?: string }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo1} source={require('../../assets/emotes/Logo.png')} />
      <Image style={styles.eye2} source={require('../../assets/emotes/Eye.png')} />
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.eye1} source={require('../../assets/emotes/Eye1.png')} />
      <Image style={styles.logo2} source={require('../../assets/emotes/Logo2.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.one,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    position: 'relative',
  },
  logo1: {
    position: 'absolute',
    left: Spacing.four,
    top: Spacing.four,
    width: 25,
    height: 25,
  },
  title: {
    position: 'absolute',
    top: Spacing.four,
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    textShadowColor: theme.colors.background,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  searchButton: {
    position: 'absolute',
    right: Spacing.five,
    top: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo2: {
    position: 'absolute',
    right: Spacing.four,
    top: Spacing.four,
    width: 25,
    height: 25,
  },
  eye2: {
    position: 'absolute',
    left: 88,
    top: Spacing.three,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  eye1: {
    position: 'absolute',
    right: 88,
    top: Spacing.three,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
