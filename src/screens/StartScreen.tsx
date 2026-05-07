import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Level = {
  id: string;
  name: string;
  backgroundStyle: StyleProp<ViewStyle>;
};

const copy = {
  start: 'STARTA',
  highScoreLabel: 'HÖGSTA POÄNG',
  info: 'Information',
  settings: 'Inställningar',
  levels: {
    park: 'PARK',
    beach: 'STRAND',
    city: 'STAD',
  },
};

const StartScreen = () => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const levels: Level[] = useMemo(
    () => [
      {
        id: 'park',
        name: copy.levels.park,
        backgroundStyle: styles.parkBackground,
      },
      {
        id: 'beach',
        name: copy.levels.beach,
        backgroundStyle: styles.beachBackground,
      },
      {
        id: 'city',
        name: copy.levels.city,
        backgroundStyle: styles.cityBackground,
      },
    ],
    []
  );

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        slideWidth: {
          width,
        },
      }),
    [width]
  );

  const handleStartPress = (): void => {
    // TODO: logik för att starta spelet här
    console.log('Start game');
  };

  const handleInfoPress = (): void => {
    // TODO: navigera till infosida
    console.log('Info pressed');
  };

  const handleSettingsPress = (): void => {
    // TODO: navigera till settingssida
    console.log('Settings pressed');
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
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
            style={[styles.slide, dynamicStyles.slideWidth, item.backgroundStyle]}
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
            <Text style={styles.highScoreValue}>🏆 1280</Text>
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
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.85}
            onPress={handleStartPress}
          >
            <Text style={styles.startButtonText}>{copy.start}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    height: '100%',
  },
  cityBackground: {
    backgroundColor: '#3D8BFF',
  },
  beachBackground: {
    backgroundColor: '#FFB347',
  },
  parkBackground: {
    backgroundColor: '#6CBF3F',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingVertical: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highScoreContainer: {
    alignItems: 'center',
  },
  highScoreLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  highScoreValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bottomContainer: {
    paddingBottom: 6,
  },
  startButton: {
    backgroundColor: '#5AB82E',
    height: 64,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#2A5C14',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 2,
  },
});

export default StartScreen;