import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingModal from './src/components/OnboardingModal';
import StartScreen from './src/screens/StartScreen';

const ONBOARDING_KEY = '@onboarding_completed';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkOnboarding = async () => {
      try {
        const completed = await AsyncStorage.getItem(ONBOARDING_KEY);

        if (isMounted) {
          setShowOnboarding(completed !== 'true');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkOnboarding();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (showOnboarding) {
    return (
      <OnboardingModal
        visible={showOnboarding}
        onClose={handleOnboardingComplete}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StartScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
