import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  borderWidth,
  colors,
  degree,
  elevation,
  opacity,
  radius,
  sizes,
  spacing,
  tokens,
  typography,
  zIndex,
} from '../theme';
import { FONTS } from '../theme/fonts';
import PrimaryButton from './ui/PrimaryButton';

type OnboardingModalProps = {
  visible: boolean;
  onClose: () => void;
  onComplete: () => Promise<void>;
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
  onComplete,
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
      await onComplete();
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
              <PrimaryButton
                label={primaryButtonLabel}
                style={styles.primaryButton}
                onPress={handleNext}
              />
            )}

            {isLastStep && (
              <PrimaryButton
                label={primaryButtonLabel}
                style={styles.primaryButton}
                onPress={handleStartGame}
              />
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
    maxWidth: sizes.modalMaxWidth,
    height: sizes.modalHeight,
    maxHeight: '92%',
    backgroundColor: colors.bgDark,
    borderWidth: borderWidth.md,
    borderColor: colors.surfaceBorder,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    shadowColor: colors.shadowDark,
    shadowOpacity: opacity.shadowStrong,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: elevation.lg,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    width: sizes.closeButton,
    height: sizes.closeButton,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.base,
  },
  closeButtonText: {
    color: colors.textSecondary,fontSize: typography.fontSize['3xl'],
    lineHeight: typography.lineHeight['2xl'],
    fontFamily: FONTS.pixel,
    textTransform: 'uppercase',
  },
  illustration: {
    height: sizes.illustration,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  heart: {
    position: 'absolute',
    top: spacing.sm,
    color: colors.error,
   fontSize: typography.fontSize['5xl'],
    lineHeight: typography.lineHeight['5xl'],
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
    fontSize: typography.fontSize['2xl'],
    lineHeight: typography.lineHeight.lg,
    fontWeight: typography.fontWeight.black,
    fontFamily: FONTS.pixel,
    textShadowColor: colors.shadowDark,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 0,
  },
  starLeftTop: {
    top: 74,
    left: 58,
  },
  starLeftBottom: {
    bottom: 30,
    left: 74,
  },
  starRightTop: {
    top: 78,
    right: 62,
  },
  starRightBottom: {
    bottom: 54,
    right: 72,
  },
  planet: {
    width: sizes.planet,
    height: sizes.planet,
    marginTop: 30,
    overflow: 'hidden',
    borderRadius: sizes.planet / 2,
    backgroundColor: tokens.cityButton,
    borderWidth: borderWidth.lg,
    borderColor: colors.shadowDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  land: {
    position: 'absolute',
    backgroundColor: colors.success,
    borderColor: colors.shadowDark,
    borderWidth: borderWidth.sm,
  },
  landTopLeft: {
    top: 18,
    left: 16,
    width: 50,
    height: 38,
    borderRadius: 18,
    transform: [{ rotate: degree.md }],
  },
  landTopRight: {
    top: 34,
    right: 16,
    width: 48,
    height: 44,
    borderRadius: 18,
    transform: [{ rotate: `-${degree.xl}` }],
  },
  landBottomLeft: {
    bottom: 18,
    left: 20,
    width: 54,
    height: 38,
    borderRadius: 16,
    transform: [{ rotate: degree.lg }],
  },
  landBottomRight: {
    right: 20,
    bottom: 24,
    width: 46,
    height: 54,
    borderRadius: 18,
    transform: [{ rotate: degree.sm }],
  },
  eyeLeft: {
    position: 'absolute',
    top: 76,
    left: 51,
    width: 12,
    height: 18,
    borderRadius: 6,
    backgroundColor: colors.shadowDark,
  },
  eyeRight: {
    position: 'absolute',
    top: 76,
    right: 51,
    width: 12,
    height: 18,
    borderRadius: 6,
    backgroundColor: colors.shadowDark,
  },
  smile: {
    marginTop: 48,
    color: colors.shadowDark,
    fontSize: typography.fontSize['4xl'],
    lineHeight: typography.lineHeight['3xl'],
    fontWeight: typography.fontWeight.black,
    fontFamily: FONTS.pixel,
  },
  title: {
    color: colors.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.black,
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
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    fontFamily: FONTS.pixel,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeight.md,
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
    marginBottom: spacing.xl,
  },
  stepDot: {
    width: sizes.dot,
    height: sizes.dot,
    borderRadius: sizes.dot / 2,
    backgroundColor: colors.textMuted,
    borderWidth: borderWidth.sm,
    borderColor: colors.surface,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
    minHeight: sizes.buttonMinHeight,
    marginTop: 'auto',
  },
  backButton: {
    flex: 1,
    minHeight: sizes.buttonMinHeight,
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    borderWidth: borderWidth.md,
    borderColor: colors.surfaceBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.black,
     fontFamily: FONTS.pixel,
    textTransform: 'uppercase',
  },
  primaryButton: {
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
