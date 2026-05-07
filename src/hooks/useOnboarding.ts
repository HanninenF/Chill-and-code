import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const ONBOARDING_KEY = 'onboardingCompleted';

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await AsyncStorage.getItem(ONBOARDING_KEY);

      if (completed !== 'true') {
        setShowOnboarding(true);
      }
    };

    checkOnboarding();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    setShowOnboarding(true);
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    completeOnboarding,
    resetOnboarding,
    closeOnboarding,
  };
}
