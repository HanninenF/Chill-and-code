import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, tokens } from '../theme';
import { FONTS } from '../theme/fonts';

const ONBOARDING_KEY = 'onboardingCompleted';

type OnboardingModalProps = {
  visible: boolean;
  onClose: () => void;
};

type Step = {
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    title: 'Välkommen till spelet!',
    text: 'Här får du lära dig grunderna innan du börjar spela.',
  },
  {
    title: 'Så spelar du',
    text: 'Följ instruktionerna, samla poäng och försök klara spelet.',
  },
  {
    title: 'Nu är du redo!',
    text: 'Tryck på börja spela för att stänga den här introduktionen.',
  },
];

export default function OnboardingModal({
  visible,
  onClose,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (visible) {
      setCurrentStep(0);
    }
  }, [visible]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleStartGame = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      onClose();
    } catch (error) {
      console.log('Kunde inte spara onboarding:', error);
    }
  };

  const primaryButtonLabel = isLastStep
    ? 'Börja spela'
    : isFirstStep
      ? 'Låt oss börja!'
      : 'Nästa';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Stäng onboarding"
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>x</Text>
          </Pressable>

          <View style={styles.illustration}>
            <Text style={styles.heart}>♥</Text>
            <Text style={[styles.star, styles.starLeftTop]}>+</Text>
            <Text style={[styles.star, styles.starLeftBottom]}>+</Text>
            <Text style={[styles.star, styles.starRightTop]}>+</Text>
            <Text style={[styles.star, styles.starRightBottom]}>+</Text>

            <View style={styles.planet}>
              <View style={[styles.land, styles.landTopLeft]} />
              <View style={[styles.land, styles.landTopRight]} />
              <View style={[styles.land, styles.landBottomLeft]} />
              <View style={[styles.land, styles.landBottomRight]} />
              <View style={styles.eyeLeft} />
              <View style={styles.eyeRight} />
              <Text style={styles.smile}>⌣</Text>
            </View>
          </View>

          <Text style={styles.title}>{steps[currentStep].title}</Text>

          <Text style={styles.text}>{steps[currentStep].text}</Text>

          <View style={styles.stepIndicator}>
            {steps.map((step, index) => (
              <View
                key={step.title}
                style={[
                  styles.stepDot,
                  index === currentStep && styles.stepDotActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {!isFirstStep && (
              <Pressable style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Tillbaka</Text>
              </Pressable>
            )}

            {!isLastStep && (
              <Pressable style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>{primaryButtonLabel}</Text>
              </Pressable>
            )}

            {isLastStep && (
              <Pressable style={styles.nextButton} onPress={handleStartGame}>
                <Text style={styles.nextButtonText}>{primaryButtonLabel}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: tokens.colorBgOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalBox: {
    width: '100%',
    maxWidth: 360,
    minHeight: 600,
    backgroundColor: colors.bgDark,
    borderWidth: 3,
    borderColor: colors.surfaceBorder,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    shadowColor: colors.shadowDark,
    shadowOpacity: 0.8,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: colors.textSecondary,
    fontSize: 36,
    lineHeight: 36,
    fontFamily: FONTS.pixel,
    textTransform: 'uppercase',
  },
  illustration: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  heart: {
    position: 'absolute',
    top: spacing.sm,
    color: colors.error,
    fontSize: 48,
    lineHeight: 52,
    fontFamily: FONTS.pixel,
    textShadowColor: colors.shadowDark,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 0,
  },
  star: {
    position: 'absolute',
    color: colors.primary,
    fontSize: 34,
    lineHeight: 34,
    fontFamily: FONTS.pixel,
    textShadowColor: colors.shadowDark,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 0,
  },
  starLeftTop: {
    top: 88,
    left: 58,
  },
  starLeftBottom: {
    bottom: 42,
    left: 74,
  },
  starRightTop: {
    top: 92,
    right: 62,
  },
  starRightBottom: {
    bottom: 70,
    right: 72,
  },
  planet: {
    width: 170,
    height: 170,
    marginTop: 38,
    overflow: 'hidden',
    borderRadius: 85,
    backgroundColor: tokens.cityButton,
    borderWidth: 4,
    borderColor: colors.shadowDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  land: {
    position: 'absolute',
    backgroundColor: colors.success,
    borderColor: colors.shadowDark,
    borderWidth: 2,
  },
  landTopLeft: {
    top: 20,
    left: 18,
    width: 58,
    height: 44,
    borderRadius: 18,
    transform: [{ rotate: '18deg' }],
  },
  landTopRight: {
    top: 38,
    right: 18,
    width: 54,
    height: 50,
    borderRadius: 18,
    transform: [{ rotate: '-24deg' }],
  },
  landBottomLeft: {
    bottom: 20,
    left: 24,
    width: 62,
    height: 42,
    borderRadius: 16,
    transform: [{ rotate: '22deg' }],
  },
  landBottomRight: {
    right: 24,
    bottom: 28,
    width: 52,
    height: 62,
    borderRadius: 18,
    transform: [{ rotate: '12deg' }],
  },
  eyeLeft: {
    position: 'absolute',
    top: 86,
    left: 58,
    width: 14,
    height: 20,
    borderRadius: 7,
    backgroundColor: colors.shadowDark,
  },
  eyeRight: {
    position: 'absolute',
    top: 86,
    right: 58,
    width: 14,
    height: 20,
    borderRadius: 7,
    backgroundColor: colors.shadowDark,
  },
  smile: {
    marginTop: 54,
    color: colors.shadowDark,
    fontSize: 38,
    lineHeight: 38,
    fontFamily: FONTS.pixel,
  },
  title: {
    color: colors.primary,
    fontSize: 34,
    fontFamily: FONTS.pixel,
    textAlign: 'center',
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    textShadowColor: colors.shadowDark,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 0,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 23,
    fontFamily: FONTS.pixel,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 34,
    textShadowColor: colors.shadowDark,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 0,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: 52,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.textMuted,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  backButton: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 3,
    borderColor: colors.surfaceBorder,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: FONTS.pixel,
    textTransform: 'uppercase',
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 3,
    borderColor: colors.primaryDark,
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },
  nextButtonText: {
    color: colors.textDark,
    fontSize: 22,
    fontFamily: FONTS.pixel,
    textTransform: 'uppercase',
  },
});
