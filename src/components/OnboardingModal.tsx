import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>

          <Text style={styles.text}>{steps[currentStep].text}</Text>

          <View style={styles.buttonContainer}>
            {!isFirstStep && (
              <Pressable style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Tillbaka</Text>
              </Pressable>
            )}

            {!isLastStep && (
              <Pressable style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Nästa</Text>
              </Pressable>
            )}

            {isLastStep && (
              <Pressable style={styles.nextButton} onPress={handleStartGame}>
                <Text style={styles.nextButtonText}>Börja spela</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
