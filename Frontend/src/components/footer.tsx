import { View, Text, Image, StyleSheet } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Image style={styles.icon} source={require('../../assets/emotes/Frame.png')} />
          <Text style={styles.label}>Quadros</Text>
        </View>
        <View style={[styles.item, styles.divider]}>
          <Image style={styles.icon} source={require('../../assets/emotes/Inbox.png')} />
          <Text style={styles.label}>Cartões</Text>
        </View>
        <View style={[styles.item, styles.divider]}>
          <Image style={styles.icon} source={require('../../assets/emotes/Notification.png')} />
          <Text style={styles.label}>Notificação</Text>
        </View>
        <View style={[styles.item, styles.divider]}>
          <Image style={styles.icon} source={require('../../assets/emotes/Account.png')} />
          <Text style={styles.label}>Conta</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 76,
    paddingVertical: Spacing.zero,
    paddingHorizontal: Spacing.zero,
    backgroundColor: theme.colors.textSecondary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.background,
    paddingLeft: Spacing.half,
    alignSelf: 'stretch',
    height: '100%',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginBottom: Spacing.one,
  },
  label: {
    color: theme.colors.background,
    fontSize: 12,
    textAlign: 'center',
  },
});
