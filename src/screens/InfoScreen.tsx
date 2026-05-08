import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PrimaryButton from '../components/ui/PrimaryButton';
import { infoSections } from './infoContent';
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

type InfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Info'
>;

const copy = {
  title: 'INFORMATION',
  sections: infoSections,
};

export default function InfoScreen() {
  const navigation = useNavigation<InfoScreenNavigationProp>();

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
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="clip">
            {copy.title}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            {copy.sections.map((section, index) => {
              const isLast = index === copy.sections.length - 1;

              return (
                <View
                  key={section.title}
                  style={[styles.section, isLast && styles.sectionLast]}
                >
                  <View style={styles.sectionHeader}>
                    <View style={styles.iconBadge}>
                      <Ionicons
                        name={section.icon}
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>

                  <Text style={styles.sectionText}>{section.text}</Text>

                  {section.list ? (
                    <View style={styles.list}>
                      <Text style={styles.listTitle}>
                        {section.listTitle ?? 'Exempel på sortering'}
                      </Text>
                      {section.list.map((item) => (
                        <View key={item} style={styles.listRow}>
                          <View style={styles.listDot} />
                          <Text style={styles.listText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: borderWidth.md,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: colors.shadowDark,
    shadowOpacity: opacity.shadowStrong,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: elevation.md,
  },
  section: {
    paddingVertical: spacing.md,
    borderBottomWidth: borderWidth.sm,
    borderBottomColor: colors.surfaceBorder,
  },
  sectionLast: {
    borderBottomWidth: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceLight,
    borderWidth: borderWidth.sm,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.md,
    marginTop: spacing.sm,
  },
  list: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  listTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  listDot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    marginTop: spacing.sm,
  },
  listText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.md,
    flex: 1,
  },
});
