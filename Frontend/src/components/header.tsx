import { View, Text, StyleSheet } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Header({ title = 'App Title' }: { title?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.four,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: Spacing.five,
  },
});
