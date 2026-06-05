/**
 * Core theme settings with the site palette defined for web and native styling.
 */

import { Platform } from 'react-native';

export const theme = {
  colors: {
    background: '#0D0D0D',
    surface: '#161616',
    card: '#1F1F1F',

    primary: '#22C55E',
    primaryDark: '#16A34A',

    text: '#F5F5F5',
    textSecondary: '#A1A1AA',

    danger: '#EF4444',
    border: '#B0B0B0',
  },
  radius: {
    small: 8,
    medium: 16,
    large: 24,
  },
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 3,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.16,
      shadowRadius: 20,
      elevation: 6,
    },
    high: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 28,
      elevation: 10,
    },
  },
} as const;

export const Radius = {
  ...theme.radius,
  sm: theme.radius.small,
  md: theme.radius.medium,
  lg: theme.radius.large,
} as const;

export const Shadows = theme.shadow;

export const Colors = {
  light: {
    background: theme.colors.background,
    surface: theme.colors.surface,
    card: theme.colors.card,
    backgroundElement: theme.colors.surface,
    backgroundSelected: theme.colors.card,
    primary: theme.colors.primary,
    primaryDark: theme.colors.primaryDark,
    text: theme.colors.text,
    textSecondary: theme.colors.textSecondary,
    danger: theme.colors.danger,
    border: theme.colors.border,
  },
  dark: {
    background: theme.colors.background,
    surface: theme.colors.surface,
    card: theme.colors.card,
    backgroundElement: theme.colors.surface,
    backgroundSelected: theme.colors.card,
    primary: theme.colors.primary,
    primaryDark: theme.colors.primaryDark,
    text: theme.colors.text,
    textSecondary: theme.colors.textSecondary,
    danger: theme.colors.danger,
    border: theme.colors.border,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  zero: 0,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 40,
  seven: 44,
  height: 50,
  nine: 64,
  ten: 80,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
