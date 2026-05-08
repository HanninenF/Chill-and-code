import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, type ComponentProps } from 'react';
import {
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import styles from '../styles/SettingsScreen.styles';

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
  title: 'INSTALLNINGAR',
  sound: 'LJUD',
  music: 'MUSIK',
  vibration: 'VIBRATION',
  language: 'SPRAK',
  reset: 'ATERSTALL FRAMSTEG',
  swedish: 'Svenska',
};

const toggleRows = [
  {
    key: 'sound' as const,
    label: copy.sound,
    iconName: 'volume-high-outline' as IoniconName,
  },
  {
    key: 'music' as const,
    label: copy.music,
    iconName: 'musical-notes-outline' as IoniconName,
  },
  {
    key: 'vibration' as const,
    label: copy.vibration,
    iconName: 'phone-portrait-outline' as IoniconName,
  },
] as const;

const SettingsRow = ({
  label,
  iconName,
  iconColor = colors.primary,
  onPress,
  rightElement,
  variant = 'default',
}: SettingsRowProps) => {
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
        <Text
          style={
            variant === 'destructive'
              ? styles.rowLabelDestructive
              : styles.rowLabel
          }
        >
          {label}
        </Text>
      </View>

      {rightElement ? (
        <View style={styles.rowRight}>{rightElement}</View>
      ) : null}
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
              color="white"
              style={styles.backButtonIcon}
              pointerEvents="none"
            />
          </View>

          <Text style={styles.title} numberOfLines={1} ellipsizeMode="clip">
            {copy.title}
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.card}>
          {toggleRows.map((row) => (
            <SettingsRow
              key={row.key}
              label={row.label}
              iconName={row.iconName}
              onPress={() => handleToggle(row.key)}
              rightElement={
                <Switch
                  value={toggles[row.key]}
                  onValueChange={() => handleToggle(row.key)}
                  trackColor={{
                    false: colors.surfaceBorder,
                    true: colors.primaryDark,
                  }}
                  thumbColor={
                    toggles[row.key] ? colors.primary : colors.surfaceLight
                  }
                  ios_backgroundColor={colors.surfaceBorder}
                />
              }
            />
          ))}

          <SettingsRow
            label={copy.language}
            iconName="language-outline"
            onPress={() => console.warn('Select language')}
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
            onPress={() => console.warn('Reset progress')}
            variant="destructive"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
