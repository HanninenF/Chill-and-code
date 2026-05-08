import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
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

type InfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Info'
>;

type Section = {
  title: string;
  text: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  list?: string[];
  listTitle?: string;
};

const sections: Section[] = [
  {
    title: 'OM SPELET',
    text: 'Skräpjakten är ett spel för barn om återvinning. Här lär du dig varför vi sorterar och vad som händer med olika material.',
    icon: 'game-controller-outline',
  },
  {
    title: 'VARFÖR ÅTERVINNER VI?',
    text: 'När vi återvinner kan material användas igen i stället för att ta nya råvaror från naturen. Det sparar energi och gör att mindre skräp hamnar i naturen.',
    icon: 'leaf-outline',
    listTitle: 'BRA ATT VETA',
    list: [
      'Papper kan bli nya tidningar och kartonger',
      'Glas kan återvinnas många gånger utan att bli sämre',
    ],
  },
  {
    title: 'HUR SORTERAR MAN?',
    text: 'I Sverige sorterar vi olika material var för sig så att de kan återvinnas på rätt sätt.',
    icon: 'trash-outline',
    listTitle: 'EXEMPEL',
    list: [
      'Bananskal → matavfall (kan bli biogas eller jord)',
      'Plastflaska → plast (kan bli ny plast)',
      'Tidning → papper (kan bli nya pappersprodukter)',
      'Glasburk → glas (kan smältas om och användas igen)',
    ],
  },
  {
    title: 'HJÄLP DJUREN',
    text: 'Plast kan ligga kvar i naturen väldigt länge. Djur kan fastna i plast eller tro att det är mat, och då blir de sjuka.',
    icon: 'paw-outline',
    listTitle: 'VARFÖR DET SPELAR ROLL',
    list: [
      'Rent vatten och mark gör djur friskare',
      'Mindre skräp betyder tryggare hem för djuren',
    ],
  },
  {
    title: 'KONTAKT',
    text: 'Har du frågor eller idéer? Skriv till oss på kontakt@skrapjakten.se.',
    icon: 'mail-outline',
  },
  {
    title: 'VERSION',
    text: 'Version 1.0',
    icon: 'information-circle-outline',
  },
];

const copy = {
  title: 'INFORMATION',
  sections,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  listText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.md,
    flex: 1,
  },
});
