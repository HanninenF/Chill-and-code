import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  borderWidth,
  colors,
  elevation,
  opacity,
  radius,
  sizes,
  spacing,
  typography,
} from '../../theme';

type PrimaryButtonProps = PressableProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({
  label,
  style,
  ...pressableProps
}: PrimaryButtonProps) {
  return (
    <Pressable style={[styles.button, style]} {...pressableProps}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: borderWidth.md,
    borderColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: sizes.buttonMinHeight,
    shadowColor: colors.shadowDark,
    shadowOpacity: opacity.shadowSolid,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: elevation.md,
  },
  label: {
    color: colors.textDark,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
  },
});
