import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import OnboardingModal from './src/components/OnboardingModal';

const ONBOARDING_KEY = 'onboardingCompleted';

export default function App() {
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

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    setShowOnboarding(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mitt spel</Text>

      <Pressable style={styles.resetButton} onPress={resetOnboarding}>
        <Text style={styles.resetButtonText}>Visa onboarding igen</Text>
      </Pressable>

      <OnboardingModal
        visible={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
});
