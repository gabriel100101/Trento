import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Header({
  title = 'App Title',
  titleColor = theme.colors.text,
  onTitlePress,
}: {
  title?: string;
  titleColor?: string;
  onTitlePress?: () => void;
}) {
  return (
    <View style={styles.container}>
      <Image style={styles.eye2} source={require('../../assets/emotes/Eye.png')} />
      <Pressable style={styles.titleButton} onPress={onTitlePress}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </Pressable>
      <Image style={styles.eye1} source={require('../../assets/emotes/Eye1.png')} />
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
  titleButton: {
    position: 'absolute',
    top: Spacing.four,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
  eye2: {
    position: 'absolute',
    left: 60,
    top: Spacing.three,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  eye1: {
    position: 'absolute',
    right: 60,
    top: Spacing.three,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
