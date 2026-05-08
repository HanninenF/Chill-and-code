import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';

import OnboardingModal from './src/components/OnboardingModal';
import { useOnboarding } from './src/hooks/useOnboarding';
import InfoScreen from './src/screens/InfoScreen';
import type { RootStackParamList } from './src/navigation/types';
import SettingsScreen from './src/screens/SettingsScreen';
import StartScreen from './src/screens/StartScreen';
import { FONTS } from './src/theme/fonts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useFonts({
    [FONTS.pixel]: require('./assets/fonts/PressStart2P.ttf'),
  });

  const { showOnboarding, completeOnboarding, closeOnboarding, isLoading } =
    useOnboarding();

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen
            name="Info"
            component={InfoScreen}
            options={{ animation: 'slide_from_left' }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

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
