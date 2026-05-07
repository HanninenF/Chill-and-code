import React from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingModal from './src/components/OnboardingModal';
import { useOnboarding } from './src/hooks/useOnboarding';
import StartScreen from './src/screens/StartScreen';

export default function App() {
  const { showOnboarding, completeOnboarding, closeOnboarding, isLoading } =
    useOnboarding();

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      {!showOnboarding && <StartScreen />}

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
  },
});
