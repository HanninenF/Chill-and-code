import React, { useState, type ComponentProps } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PrimaryButton from '../components/ui/PrimaryButton';
import {
  borderWidth,
  colors,
  elevation,
  opacity,
  radius,
  spacing,
  typography,
} from '../theme';
import type { RootStackParamList } from '../navigation/types';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type ToggleKey = 'sound' | 'music' | 'vibration';

type SettingsRowProps = {
  label: string;
  iconName: IoniconName;
  iconColor?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

type ToggleState = Record<ToggleKey, boolean>;

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const copy = {
  title: 'INSTÄLLNINGAR',
  sound: 'LJUD',
  music: 'MUSIK',
  vibration: 'VIBRATION',
  language: 'SPRÅK',
  reset: 'ÅTERSTÄLL FRAMSTEG',
  swedish: 'Svenska',
};

const SettingsRow = ({
  label,
  iconName,
  iconColor = colors.primary,
  onPress,
  rightElement,
  variant = 'default',
}: SettingsRowProps) => {
  const labelStyle =
    variant === 'destructive' ? styles.rowLabelDestructive : styles.rowLabel;

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.75}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
    >
      <View style={styles.rowLeft}>
        <View style={styles.iconBadge}>
          <Ionicons name={iconName} size={22} color={iconColor} />
        </View>
        <Text style={labelStyle}>{label}</Text>
      </View>
      {rightElement ? <View style={styles.rowRight}>{rightElement}</View> : null}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [toggles, setToggles] = useState<ToggleState>({
    sound: true,
    music: true,
    vibration: true,
  });

  const handleToggle = (key: ToggleKey) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleResetPress = () => {
    console.log('Reset progress');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.backButtonWrapper}>
            <PrimaryButton
              label=""
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              labelStyle={styles.backButtonLabel}
              accessibilityLabel="Tillbaka"
            />
            <Ionicons
              name="chevron-back"
              size={18}
              color={colors.primary}
              style={styles.backButtonIcon}
              pointerEvents="none"
            />
          </View>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {copy.title}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          <SettingsRow
            label={copy.sound}
            iconName="volume-high-outline"
            onPress={() => handleToggle('sound')}
            rightElement={
              <Switch
                value={toggles.sound}
                onValueChange={() => handleToggle('sound')}
                trackColor={{
                  false: colors.surfaceBorder,
                  true: colors.primaryDark,
                }}
                thumbColor={toggles.sound ? colors.primary : colors.surfaceLight}
                ios_backgroundColor={colors.surfaceBorder}
              />
            }
          />

          <SettingsRow
            label={copy.music}
            iconName="musical-notes-outline"
            onPress={() => handleToggle('music')}
            rightElement={
              <Switch
                value={toggles.music}
                onValueChange={() => handleToggle('music')}
                trackColor={{
                  false: colors.surfaceBorder,
                  true: colors.primaryDark,
                }}
                thumbColor={toggles.music ? colors.primary : colors.surfaceLight}
                ios_backgroundColor={colors.surfaceBorder}
              />
            }
          />

          <SettingsRow
            label={copy.vibration}
            iconName="phone-portrait-outline"
            onPress={() => handleToggle('vibration')}
            rightElement={
              <Switch
                value={toggles.vibration}
                onValueChange={() => handleToggle('vibration')}
                trackColor={{
                  false: colors.surfaceBorder,
                  true: colors.primaryDark,
                }}
                thumbColor={
                  toggles.vibration ? colors.primary : colors.surfaceLight
                }
                ios_backgroundColor={colors.surfaceBorder}
              />
            }
          />

          <SettingsRow
            label={copy.language}
            iconName="language-outline"
            onPress={() => console.log('Select language')}
            rightElement={
              <View style={styles.languageRight}>
                <Text style={styles.languageText}>{copy.swedish}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textMuted}
                />
              </View>
            }
          />

          <SettingsRow
            label={copy.reset}
            iconName="refresh-outline"
            iconColor={colors.error}
            onPress={handleResetPress}
            variant="destructive"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  backButtonWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 0,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceLight,
    borderWidth: borderWidth.sm,
    borderColor: colors.surfaceBorder,
    shadowOpacity: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
  },
  backButtonContent: {
    justifyContent: 'center',
    gap: 0,
  },
  backButtonLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    letterSpacing: 1,
  },
  backButtonIcon: {
    position: 'absolute',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  title: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    flex: 1,
    paddingHorizontal: spacing.sm,
    textShadowColor: colors.shadowDark,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 0,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: borderWidth.md,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.md,
    shadowColor: colors.shadowDark,
    shadowOpacity: opacity.shadowStrong,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: elevation.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.sm,
    borderBottomColor: colors.surfaceBorder,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  rowRight: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceLight,
    borderWidth: borderWidth.sm,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  rowLabelDestructive: {
    color: colors.error,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  languageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  languageText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'capitalize',
  },
});
