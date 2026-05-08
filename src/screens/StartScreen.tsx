import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
import LevelButton from '../components/ui/LevelButton';
import type { RootStackParamList } from '../navigation/types';
import { colors, tokens } from '../theme';
import styles from '../styles/StartScreen.styles';

type Level = {
  id: 'park' | 'beach' | 'city';
  name: string;
  backgroundStyle: StyleProp<ViewStyle>;
};

const copy = {
  start: 'STARTA',
  highScoreLabel: 'HOGSTA POANG',
  info: 'Information',
  settings: 'Installningar',
  levels: {
    park: 'PARK',
    beach: 'STRAND',
    city: 'STAD',
  },
};

type StartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Start'
>;

const levels: Level[] = [
  {
    id: 'park',
    name: copy.levels.park,
    backgroundStyle: { backgroundColor: colors.success },
  },
  {
    id: 'beach',
    name: copy.levels.beach,
    backgroundStyle: { backgroundColor: tokens.beachPrimary },
  },
  {
    id: 'city',
    name: copy.levels.city,
    backgroundStyle: { backgroundColor: tokens.cityPrimary },
  },
];

export default function StartScreen() {
  const navigation = useNavigation<StartScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        slideWidth: {
          width,
        },
      }),
    [width],
  );

  const handleStartPress = (): void => {
    console.warn('Start game');
  };

  const handleInfoPress = (): void => {
    navigation.navigate('Info');
  };

  const handleSettingsPress = (): void => {
    navigation.navigate('Settings');
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={levels}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumEnd}
        renderItem={({ item }) => (
          <View
            style={[
              styles.slide,
              dynamicStyles.slideWidth,
              item.backgroundStyle,
            ]}
          />
        )}
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header} pointerEvents="auto">
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleInfoPress}
            activeOpacity={0.7}
            accessibilityLabel={copy.info}
          >
            <Ionicons name="information-circle" size={26} color="white" />
          </TouchableOpacity>

          <View style={styles.highScoreContainer}>
            <Text style={styles.highScoreLabel}>{copy.highScoreLabel}</Text>
            <Text style={styles.highScoreValue}>1280</Text>
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleSettingsPress}
            activeOpacity={0.7}
            accessibilityLabel={copy.settings}
          >
            <Ionicons name="settings" size={26} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent} pointerEvents="none">
          <Text style={styles.title}>{levels[activeIndex].name}</Text>

          <View style={styles.paginationContainer}>
            {levels.map((level, index) => (
              <View
                key={level.id}
                style={[styles.dot, index === activeIndex && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        <View style={styles.bottomContainer} pointerEvents="auto">
          <LevelButton
            label={copy.start}
            level={levels[activeIndex].id}
            onPress={handleStartPress}
            style={styles.startButton}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
