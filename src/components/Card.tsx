import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../theme/colors';
import { Radius, Shadows, Spacing } from '../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'surface' | 'dark' | 'subtle' | 'glow';
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'surface',
  padding = Spacing.lg,
}) => {
  const getCardStyle = (): ViewStyle[] => {
    const list: ViewStyle[] = [styles.base, { padding }];

    if (variant === 'surface') list.push(styles.surface);
    if (variant === 'dark') list.push(styles.dark);
    if (variant === 'subtle') list.push(styles.subtle);
    if (variant === 'glow') list.push(styles.glow);

    if (style) list.push(style);
    return list;
  };

  return <View style={getCardStyle()}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadows.card,
  },
  surface: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  dark: {
    backgroundColor: Colors.darkCard,
    borderColor: Colors.darkBorder,
  },
  subtle: {
    backgroundColor: Colors.surfaceSubtle,
    borderColor: Colors.borderLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  glow: {
    backgroundColor: Colors.surface,
    borderColor: Colors.magentaBorder,
    ...Shadows.magentaGlow,
  },
});
