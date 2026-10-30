import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../theme/colors';
import { Radius, Spacing } from '../theme/spacing';

interface BadgeProps {
  label: string;
  variant?: 'magenta' | 'success' | 'warning' | 'danger' | 'info' | 'dark' | 'outline';
  dot?: boolean;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'magenta',
  dot = false,
  style,
}) => {
  const getContainerStyle = (): ViewStyle[] => {
    const list: ViewStyle[] = [styles.base];
    if (variant === 'magenta') list.push(styles.magentaContainer);
    if (variant === 'success') list.push(styles.successContainer);
    if (variant === 'warning') list.push(styles.warningContainer);
    if (variant === 'danger') list.push(styles.dangerContainer);
    if (variant === 'info') list.push(styles.infoContainer);
    if (variant === 'dark') list.push(styles.darkContainer);
    if (variant === 'outline') list.push(styles.outlineContainer);

    if (style) list.push(style);
    return list;
  };

  const getTextColor = () => {
    switch (variant) {
      case 'magenta':
        return Colors.magenta;
      case 'success':
        return Colors.success;
      case 'warning':
        return Colors.warning;
      case 'danger':
        return Colors.danger;
      case 'info':
        return Colors.info;
      case 'dark':
        return Colors.textWhite;
      case 'outline':
        return Colors.textSub;
      default:
        return Colors.magenta;
    }
  };

  return (
    <View style={getContainerStyle()}>
      {dot && <View style={[styles.dot, { backgroundColor: getTextColor() }]} />}
      <Text style={[styles.text, { color: getTextColor() }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.round,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs + 2,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  magentaContainer: {
    backgroundColor: Colors.magentaLight,
    borderWidth: 1,
    borderColor: Colors.magentaBorder,
  },
  successContainer: {
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.successBorder,
  },
  warningContainer: {
    backgroundColor: Colors.warningLight,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
  },
  dangerContainer: {
    backgroundColor: Colors.dangerLight,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
  },
  infoContainer: {
    backgroundColor: Colors.infoLight,
    borderWidth: 1,
    borderColor: Colors.infoBorder,
  },
  darkContainer: {
    backgroundColor: Colors.darkBg,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
