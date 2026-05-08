import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import PrimaryButton from './ui/PrimaryButton';
import styles from '../styles/OnboardingModal.styles';

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
      setCurrentStep((step) => step + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((step) => step - 1);
    }
  };

  const handleStartGame = async () => {
    try {
      await onComplete();
    } catch (error) {
      console.warn('Kunde inte spara onboarding:', error);
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

          <View style={styles.content}>
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
          </View>

          <View style={styles.buttonContainer}>
            {!isFirstStep ? (
              <Pressable style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Tillbaka</Text>
              </Pressable>
            ) : null}

            <PrimaryButton
              label={primaryButtonLabel}
              style={styles.primaryButton}
              onPress={isLastStep ? handleStartGame : handleNext}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
