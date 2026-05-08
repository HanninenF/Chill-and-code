import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import OnboardingModal from './src/components/OnboardingModal';
import { useOnboarding } from './src/hooks/useOnboarding';
import type { RootStackParamList } from './src/navigation/types';
import SettingsScreen from './src/screens/SettingsScreen';
import StartScreen from './src/screens/StartScreen';
import { FONTS } from './src/theme/fonts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
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
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <Text style={[styles.title, fontsLoaded && { fontFamily: FONTS.pixel }]}>
        Mitt spel
      </Text>

      <Pressable style={styles.resetButton} onPress={resetOnboarding}>
        <Text
          style={[
            styles.resetButtonText,
            fontsLoaded && { fontFamily: FONTS.pixel },
          ]}
        >
          Visa onboarding igen
        </Text>
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
  },
});

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useEffect, useState } from 'react';
// import { Pressable, StyleSheet, Text, View } from 'react-native';

// import OnboardingModal from './src/components/OnboardingModal';

// const ONBOARDING_KEY = 'onboardingCompleted';

// export default function App() {
//   const [showOnboarding, setShowOnboarding] = useState(false);

//   useEffect(() => {
//     const checkOnboarding = async () => {
//       const completed = await AsyncStorage.getItem(ONBOARDING_KEY);

//       if (completed !== 'true') {
//         setShowOnboarding(true);
//       }
//     };

//     checkOnboarding();
//   }, []);

//   const resetOnboarding = async () => {
//     await AsyncStorage.removeItem(ONBOARDING_KEY);
//     setShowOnboarding(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mitt spel</Text>

//       <Pressable style={styles.resetButton} onPress={resetOnboarding}>
//         <Text style={styles.resetButtonText}>Visa onboarding igen</Text>
//       </Pressable>

//       <OnboardingModal
//         visible={showOnboarding}
//         onClose={() => setShowOnboarding(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#111',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 32,
//     fontWeight: '700',
//   },
//   resetButton: {
//     marginTop: 20,
//     backgroundColor: '#ddd',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//   },
//   resetButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#222',
//   },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFonts } from 'expo-font';
// import React, { useEffect, useState } from 'react';
// import { Pressable, StyleSheet, Text, View } from 'react-native';

// import OnboardingModal from './src/components/OnboardingModal';
// import { FONTS } from './src/theme/fonts';

// const ONBOARDING_KEY = 'onboardingCompleted';

// export default function App() {
//   const [fontsLoaded] = useFonts({
//     [FONTS.pixel]: require('./assets/fonts/PressStart2P.ttf'),
//   });

//   const [showOnboarding, setShowOnboarding] = useState(false);

//   useEffect(() => {
//     const checkOnboarding = async () => {
//       const completed = await AsyncStorage.getItem(ONBOARDING_KEY);

//       if (completed !== 'true') {
//         setShowOnboarding(true);
//       }
//     };

//     checkOnboarding();
//   }, []);

//   const resetOnboarding = async () => {
//     await AsyncStorage.removeItem(ONBOARDING_KEY);
//     setShowOnboarding(true);
//   };
//   if (!fontsLoaded) {
//     return (
//       <View style={styles.container}>
//         <Text>Laddar...</Text>
//       </View>
//     );
//   }

//   // if (!fontsLoaded) {
//   //   return null;
//   // }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mitt spel</Text>

//       <Pressable style={styles.resetButton} onPress={resetOnboarding}>
//         <Text style={styles.resetButtonText}>Visa onboarding igen</Text>
//       </Pressable>

//       <OnboardingModal
//         visible={showOnboarding}
//         onClose={() => setShowOnboarding(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontFamily: FONTS.pixel,
//   },
//   resetButton: {
//     marginTop: 20,
//     backgroundColor: '#ddd',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//   },
//   resetButtonText: {
//     fontSize: 16,
//     fontFamily: FONTS.pixel,
//     color: '#222',
//   },
// });

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useEffect, useState } from 'react';
// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import OnboardingModal from './src/components/OnboardingModal';

// const ONBOARDING_KEY = 'onboardingCompleted';

// export default function App() {
//   const [showOnboarding, setShowOnboarding] = useState(false);

//   useEffect(() => {
//     const checkOnboarding = async () => {
//       const completed = await AsyncStorage.getItem(ONBOARDING_KEY);

//       if (completed !== 'true') {
//         setShowOnboarding(true);
//       }
//     };

//     checkOnboarding();
//   }, []);

//   const resetOnboarding = async () => {
//     await AsyncStorage.removeItem(ONBOARDING_KEY);
//     setShowOnboarding(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mitt spel</Text>

//       <Pressable style={styles.resetButton} onPress={resetOnboarding}>
//         <Text style={styles.resetButtonText}>Visa onboarding igen</Text>
//       </Pressable>

//       <OnboardingModal
//         visible={showOnboarding}
//         onClose={() => setShowOnboarding(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//   },
//   resetButton: {
//     marginTop: 20,
//     backgroundColor: '#ddd',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//   },
//   resetButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#222',
//   },
// });
