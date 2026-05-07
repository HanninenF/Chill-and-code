import { Ionicons } from '@expo/vector-icons';
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
import { colors, spacing, tokens } from '../theme';
import LevelButton from '../components/ui/LevelButton';

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
    [],
  );

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
    console.log('Start game');
  };

  const handleInfoPress = (): void => {
    console.log('Info pressed');
  };

  const handleSettingsPress = (): void => {
    console.log('Settings pressed');
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
    backgroundColor: tokens.cityPrimary,
  },
  beachBackground: {
    backgroundColor: tokens.beachPrimary,
  },
  parkBackground: {
    backgroundColor: colors.success,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingVertical: spacing.sm,
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
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  highScoreValue: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 72,
    fontWeight: '700',
    color: colors.textPrimary,
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
    backgroundColor: colors.textPrimary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bottomContainer: {
    paddingBottom: spacing.xs,
  },
  startButton: {
    marginHorizontal: spacing.lg,
  },
});

export default StartScreen;
