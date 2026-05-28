import { View, Text, StyleSheet } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children ?? '© 2026 Your App'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.four,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: 13,
  },
});
