import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
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
  tokens,
  typography,
} from '../../theme';

export type ButtonVariant = 'primary' | 'city' | 'beach' | 'park';
export type ButtonState = 'default' | 'hover' | 'disabled';

export type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: ButtonVariant;
  state?: ButtonState;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

const variantStyles: Record<
  ButtonVariant,
  {
    defaultBackground: string;
    defaultBorder: string;
    defaultText: string;
    hoverBackground: string;
    hoverBorder: string;
    hoverText: string;
  }
> = {
  primary: {
    defaultBackground: colors.primary,
    defaultBorder: colors.primaryDark,
    defaultText: colors.textDark,
    hoverBackground: colors.bgDark,
    hoverBorder: colors.primary,
    hoverText: colors.primary,
  },
  city: {
    defaultBackground: tokens.cityButton,
    defaultBorder: tokens.citySecondary,
    defaultText: colors.textPrimary,
    hoverBackground: colors.bgDark,
    hoverBorder: tokens.cityButton,
    hoverText: tokens.cityButton,
  },
  beach: {
    defaultBackground: tokens.beachButton,
    defaultBorder: tokens.beachSecondary,
    defaultText: colors.textPrimary,
    hoverBackground: colors.bgDark,
    hoverBorder: tokens.beachButton,
    hoverText: tokens.beachButton,
  },
  park: {
    defaultBackground: colors.success,
    defaultBorder: colors.shadowDark,
    defaultText: colors.textPrimary,
    hoverBackground: colors.bgDark,
    hoverBorder: colors.success,
    hoverText: colors.success,
  },
};

const disabledStyles = {
  backgroundColor: colors.surfaceLight,
  borderColor: colors.surfaceBorder,
  textColor: colors.textMuted,
};

export default function Button({
  label,
  variant = 'primary',
  state,
  style,
  labelStyle,
  disabled,
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  ...pressableProps
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const resolvedState: ButtonState = disabled
    ? 'disabled'
    : (state ?? (isHovered || isPressed ? 'hover' : 'default'));

  const handleHoverIn = (
    event: Parameters<NonNullable<PressableProps['onHoverIn']>>[0],
  ) => {
    setIsHovered(true);
    onHoverIn?.(event);
  };

  const handleHoverOut = (
    event: Parameters<NonNullable<PressableProps['onHoverOut']>>[0],
  ) => {
    setIsHovered(false);
    onHoverOut?.(event);
  };

  const handlePressIn = (
    event: Parameters<NonNullable<PressableProps['onPressIn']>>[0],
  ) => {
    setIsPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (
    event: Parameters<NonNullable<PressableProps['onPressOut']>>[0],
  ) => {
    setIsPressed(false);
    onPressOut?.(event);
  };

  const palette = variantStyles[variant];

  const backgroundColor =
    resolvedState === 'disabled'
      ? disabledStyles.backgroundColor
      : resolvedState === 'hover'
        ? palette.hoverBackground
        : palette.defaultBackground;

  const borderColor =
    resolvedState === 'disabled'
      ? disabledStyles.borderColor
      : resolvedState === 'hover'
        ? palette.hoverBorder
        : palette.defaultBorder;

  const textColor =
    resolvedState === 'disabled'
      ? disabledStyles.textColor
      : resolvedState === 'hover'
        ? palette.hoverText
        : palette.defaultText;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: resolvedState === 'disabled' }}
      disabled={resolvedState === 'disabled'}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor,
        },
        (pressed || isPressed) &&
          resolvedState !== 'disabled' &&
          styles.pressed,
        style,
      ]}
      {...pressableProps}
    >
      <Text style={[styles.label, { color: textColor }, labelStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: borderWidth.md,
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
  pressed: {
    transform: [{ translateY: 1 }],
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  label: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
  },
});
