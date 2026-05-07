import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import OnboardingModal from './src/components/OnboardingModal';
import { useOnboarding } from './src/hooks/useOnboarding';

export default function App() {
  const {
    showOnboarding,
    completeOnboarding,
    resetOnboarding,
    closeOnboarding,
  } = useOnboarding();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mitt spel</Text>

      <Pressable style={styles.resetButton} onPress={resetOnboarding}>
        <Text style={styles.resetButtonText}>Visa onboarding igen</Text>
      </Pressable>

      <OnboardingModal
        visible={showOnboarding}
        onClose={closeOnboarding}
        onComplete={completeOnboarding}
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
