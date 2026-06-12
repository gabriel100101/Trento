import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme, Spacing } from '@/constants/theme';

export function Footer({
  onQuadrosPress,
  onCartoesPress,
  onNotificacaoPress,
  onContaPress,
}: {
  onQuadrosPress?: () => void;
  onCartoesPress?: () => void;
  onNotificacaoPress?: () => void;
  onContaPress?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          style={styles.item}
          onPress={onQuadrosPress}
          android_ripple={{ color: theme.colors.primary, borderless: false }}
        >
          <Image style={styles.icon} source={require('../../assets/emotes/Frame.png')} />
          <Text style={styles.label}>Quadros</Text>
        </Pressable>

        <Pressable
          style={[styles.item, styles.divider]}
          onPress={onCartoesPress}
          android_ripple={{ color: theme.colors.primary, borderless: false }}
        >
          <Image style={styles.icon} source={require('../../assets/emotes/Inbox.png')} />
          <Text style={styles.label}>Cartões</Text>
        </Pressable>

        <Pressable
          style={[styles.item, styles.divider]}
          onPress={onNotificacaoPress}
          android_ripple={{ color: theme.colors.primary, borderless: false }}
        >
          <Image style={styles.icon} source={require('../../assets/emotes/Notification.png')} />
          <Text style={styles.label}>Alterações</Text>
        </Pressable>

        <Pressable
          style={[styles.item, styles.divider]}
          onPress={onContaPress}
          android_ripple={{ color: theme.colors.primary, borderless: false }}
        >
          <Image style={styles.icon} source={require('../../assets/emotes/Account.png')} />
          <Text style={styles.label}>Conta</Text>
        </Pressable>
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
