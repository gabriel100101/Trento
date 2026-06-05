import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Header({ title = 'App Title' }: { title?: string }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/emotes/Logo.png')} />
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.searchButton} onPress={() => console.log('Search pressed')}>
        <Image style={styles.searchIcon} source={require('../../assets/emotes/Search.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    left: Spacing.four,
    top: Spacing.five,
    width: 39,
    height: 39,
  },
  title: {
    position: 'absolute',
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    top: Spacing.six,
  },
  searchButton: {
    position: 'absolute',
    right: Spacing.five,
    top: Spacing.seven,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
