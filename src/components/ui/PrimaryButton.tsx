import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
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
  typography,
} from '../../theme';

type PrimaryButtonProps = PressableProps & {
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
};

export default function PrimaryButton({
  label = '',
  style,
  labelStyle,
  contentStyle,
  leftIcon,
  ...pressableProps
}: PrimaryButtonProps) {
  const hasLabel = label.trim().length > 0;

  return (
    <Pressable style={[styles.button, style]} {...pressableProps}>
      <View style={[styles.content, contentStyle]}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        {hasLabel ? (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        ) : null}
      </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.textDark,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
  },
});
