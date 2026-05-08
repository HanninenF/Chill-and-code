import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { Audio } from 'expo-av';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Draggable,
  Droppable,
  DropProvider,
} from 'react-native-reanimated-dnd';

const { height, width } = Dimensions.get('window');
const applecoreImage = require('../assets/draggableItems/applecore.png');
const ketchupImage = require('../assets/draggableItems/kethup.png');
const milkImage = require('../assets/draggableItems/Mjolk.png');
const plasticBagImage = require('../assets/draggableItems/plastpase.png');
const paperBagImage = require('../assets/draggableItems/papperspase.png');
const glassBottleImage = require('../assets/draggableItems/glasflaska.png');
const jamJarImage = require('../assets/draggableItems/syltburk.png');
const squirrel = require('../assets/draggableItems/ekorre.png');
const afraidSquirrel = require('../assets/draggableItems/ekorreRadd.png');

const ANIMATION_DURATION = 9000;

const categories = [
  { name: 'food', background: '#FFD6E0', emoji: '🍌' },
  { name: 'plastic', background: '#CDEBFF', emoji: '🍼' },
  { name: 'paper', background: '#D9FFD6', emoji: '📰' },
  { name: 'glass', background: '#FFF4C7', emoji: '🍶' },
];

const draggableData = [
  { id: '1', name: 'banana peel', icon: '🍌', category: 'food' },
  { id: '2', name: 'apple core', image: applecoreImage, category: 'food' },
  { id: '3', name: 'fish bone', icon: '🐟', category: 'food' },
  { id: '4', name: 'pizza slice', icon: '🍕', category: 'food' },
  { id: '5', name: 'moldy bread', icon: '🥖', category: 'food' },

  { id: '6', name: 'plastic bottle', icon: '🍼', category: 'plastic' },
  { id: '7', name: 'chips bag', icon: '🍿', category: 'plastic' },
  { id: '8', name: 'plastic bag', image: plasticBagImage, category: 'plastic' },
  { id: '9', name: 'ketchup bottle', image: ketchupImage, category: 'plastic' },
  { id: '10', name: 'toothpaste tube', icon: '🪥', category: 'plastic' },
  { id: '11', name: 'washing liquid bottle', icon: '🧼', category: 'plastic' },

  { id: '12', name: 'newspaper', icon: '🗞️', category: 'paper' },
  { id: '13', name: 'milk package', image: milkImage, category: 'paper' },
  { id: '14', name: 'paper bag', image: paperBagImage, category: 'paper' },
  { id: '15', name: 'egg carton', icon: '🥚', category: 'paper' },
  { id: '16', name: 'cereal box', icon: '🥣', category: 'paper' },

  {
    id: '17',
    name: 'glass bottle',
    image: glassBottleImage,
    category: 'glass',
  },
  { id: '18', name: 'jam jar', image: jamJarImage, category: 'glass' },
  { id: '19', name: 'perfume bottle', icon: '🪻', category: 'glass' },
  { id: '20', name: 'medicine bottle', icon: '💊', category: 'glass' },

  { id: '21', name: 'squirrel', image: afraidSquirrel, isSquirrel: true },
];

// Items with images only (for randomized gameplay) - excluding squirrel
const imageItems = draggableData.filter(
  (item) => item.image && !item.isSquirrel,
);

// Generate 20 random items from image pool, plus multiple squirrels (2-3)
const generateGameItems = () => {
  const gameItems = new Array(20).fill(null);

  // Randomly decide how many squirrels (2-3)
  const squirrelCount = Math.random() < 0.5 ? 2 : 3;
  const squirrelPositions = new Set<number>();

  // Pick random positions for squirrels
  while (squirrelPositions.size < squirrelCount) {
    squirrelPositions.add(Math.floor(Math.random() * 20));
  }

  // Fill the array
  for (let i = 0; i < 20; i++) {
    if (squirrelPositions.has(i)) {
      gameItems[i] = {
        id: '21',
        name: 'squirrel',
        image: afraidSquirrel,
        isSquirrel: true,
        uniqueId: `21-${i}`,
      };
    } else {
      const randomItem =
        imageItems[Math.floor(Math.random() * imageItems.length)];
      gameItems[i] = {
        ...randomItem,
        uniqueId: `${randomItem.id}-${i}`,
      };
    }
  }
  return gameItems;
};

// =====================
// Squirrel Item (Pressable - 3 clicks to rescue)
// =====================
function SquirrelItem({ item, onRescued, onMissed, isRescued }: any) {
  const progress = useSharedValue(0);
  const missedRef = useRef(false);
  const swayAmplitude = useRef(12 + Math.random() * 10).current;
  const soundRef = useRef<any>(null);
  const [clickCount, setClickCount] = useState(0);

  // Play sound when squirrel appears
  useEffect(() => {
    const playSound = async () => {
      try {
        const sound = new Audio.Sound();
        soundRef.current = sound;
        await sound.loadAsync(require('../assets/audio/Squirrel1.m4a'));
        await sound.playAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    };

    playSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [item.uniqueId]);

  useEffect(() => {
    missedRef.current = false;
    progress.value = 0;

    progress.value = withTiming(
      1,
      {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.quad),
      },
      (finished) => {
        if (finished && !missedRef.current) {
          runOnJS(onMissed)();
          missedRef.current = true;
        }
      },
    );

    return () => {
      missedRef.current = true;
    };
  }, [item.id]);

  const animatedStyle = useAnimatedStyle(() => {
    const x = Math.sin(progress.value * Math.PI * 2) * swayAmplitude;

    const START_Y = -150;
    const MID_Y = height * 0.3;
    const BOTTOM_THRESHOLD = height * 0.68;

    const y = interpolate(
      progress.value,
      [0, 0.5, 1],
      [START_Y, MID_Y, BOTTOM_THRESHOLD],
    );

    const wobble = Math.sin(progress.value * Math.PI * 2) * 5;

    return {
      transform: [
        { translateX: x },
        { translateY: y + wobble },
        { scale: interpolate(progress.value, [0, 0.2, 1], [1, 1.05, 0.9]) },
      ],
    };
  });

  const handlePress = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount >= 3) {
      missedRef.current = true;
      runOnJS(onRescued)();
    }
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable onPress={handlePress}>
        <View
          style={[
            isRescued ? styles.squirrelCard : styles.card,
            isRescued && styles.squirrelCardLarge,
          ]}
        >
          {!isRescued && (
            <Text style={[styles.clickCounter, styles.clickCounterText]}>
              {3 - clickCount}
            </Text>
          )}
          <Image
            source={isRescued ? squirrel : item.image}
            style={isRescued ? styles.squirrelImage : styles.assetImage}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

// =====================
// Animated Item
// =====================
function AnimatedItem({ item, onMissed, onDrop }: any) {
  const progress = useSharedValue(0);
  const missedRef = useRef(false);
  const swayAmplitude = useRef(12 + Math.random() * 10).current;

  const handleDragStart = () => {
    runOnUI(() => {
      'worklet';
      cancelAnimation(progress);
    })();
  };

  const handleDragEnd = () => {
    const currentProgress = progress.value;
    const remainingDuration = Math.max(
      200,
      (1 - currentProgress) * ANIMATION_DURATION,
    );

    runOnUI(() => {
      'worklet';
      progress.value = withTiming(
        1,
        {
          duration: remainingDuration,
          easing: Easing.out(Easing.quad),
        },
        (finished) => {
          if (finished && !missedRef.current) {
            runOnJS(onMissed)();
            missedRef.current = true;
          }
        },
      );
    })();
  };

  useEffect(() => {
    missedRef.current = false;
    progress.value = 0;

    progress.value = withTiming(
      1,
      {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.quad),
      },
      (finished) => {
        if (finished && !missedRef.current) {
          runOnJS(onMissed)();
          missedRef.current = true;
        }
      },
    );

    return () => {
      missedRef.current = true;
    };
  }, [item.id]);

  const animatedStyle = useAnimatedStyle(() => {
    const x = Math.sin(progress.value * Math.PI * 2) * swayAmplitude;

    const START_Y = -150;
    const MID_Y = height * 0.3;
    const BOTTOM_THRESHOLD = height * 0.68;

    const y = interpolate(
      progress.value,
      [0, 0.5, 1],
      [START_Y, MID_Y, BOTTOM_THRESHOLD],
    );

    const wobble = Math.sin(progress.value * Math.PI * 2) * 5;

    return {
      transform: [
        { translateX: x },
        { translateY: y + wobble },
        { scale: interpolate(progress.value, [0, 0.2, 1], [1, 1.05, 0.9]) },
      ],
    };
  });

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Draggable
        data={item}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <View style={styles.card}>
          {item.image ? (
            <Image source={item.image} style={styles.assetImage} />
          ) : (
            <Text style={styles.iconText}>{item.icon}</Text>
          )}
        </View>
      </Draggable>
    </Animated.View>
  );
}

// =====================
// MAIN SCREEN
// =====================
export default function DragAndDropTest() {
  const [gameItems] = useState(() => generateGameItems());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [missed, setMissed] = useState(false);
  const [isDropped, setIsDropped] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [squirrelRescued, setSquirrelRescued] = useState(false);

  const currentItem = useMemo(
    () => gameItems[currentIndex],
    [currentIndex, gameItems],
  );

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);

  const handleDrop = (category: string, item: any) => {
    setIsDropped(true);

    if (category === item.category) {
      setScore((s) => s + 1);
      setMessage('✅ Correct!');
    } else {
      setLives((l) => Math.max(0, l - 1));
      setMessage('❌ Wrong!');
    }

    setTimeout(() => {
      if (currentIndex < gameItems.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setGameOver(true);
      }
      setMessage('');
      setMissed(false);
      setIsDropped(false);
      setSquirrelRescued(false);
    }, 500);
  };

  const handleMissed = () => {
    setMissed(true);
    setLives((l) => Math.max(0, l - 1));
    setMessage('❌ Too slow!');

    setTimeout(() => {
      if (currentIndex < gameItems.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setGameOver(true);
      }
      setMessage('');
      setMissed(false);
      setSquirrelRescued(false);
    }, 1000);
  };

  const handleRescued = () => {
    setSquirrelRescued(true);
    setIsDropped(true);
    setScore((s) => s + 1);
    setMessage('🎉 Squirrel saved!');

    setTimeout(() => {
      if (currentIndex < gameItems.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setGameOver(true);
      }
      setMessage('');
      setMissed(false);
      setIsDropped(false);
      setSquirrelRescued(false);
    }, 500);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DropProvider>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.score}>Score: {score}</Text>
            <Text style={styles.lives}>Lives: {'❤️'.repeat(lives)}</Text>
          </View>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {gameOver ? (
            <View style={styles.gameOverContainer}>
              <Text style={styles.gameOverText}>Game Over!</Text>
              <Text style={styles.finalScore}>Final Score: {score}</Text>
            </View>
          ) : currentItem && !missed && !isDropped ? (
            <>
              {currentItem.isSquirrel ? (
                <SquirrelItem
                  item={currentItem}
                  onRescued={handleRescued}
                  onMissed={handleMissed}
                  isRescued={squirrelRescued}
                />
              ) : (
                <AnimatedItem
                  item={currentItem}
                  onDrop={handleDrop}
                  onMissed={handleMissed}
                />
              )}
            </>
          ) : null}

          {!gameOver && (
            <View style={styles.row}>
              {categories.map((c) => (
                <Droppable
                  key={`${c.name}-${currentIndex}`}
                  onDrop={(data) => handleDrop(c.name, data)}
                >
                  <View
                    style={[styles.zone, { backgroundColor: c.background }]}
                  >
                    <Text>{c.name.toUpperCase()}</Text>
                  </View>
                </Droppable>
              ))}
            </View>
          )}
        </View>
      </DropProvider>
    </GestureHandlerRootView>
  );
}

// =====================
// STYLES
// =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  title: { fontSize: 26, fontWeight: '700' },
  score: { fontSize: 18, fontWeight: '600' },
  lives: { fontSize: 18, fontWeight: '600' },
  message: { fontSize: 18, marginVertical: 10, fontWeight: '600' },

  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  gameOverText: { fontSize: 48, fontWeight: '700' },
  finalScore: { fontSize: 28, fontWeight: '600' },

  row: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,

    zIndex: 5,
    elevation: 5,
  },

  zone: {
    flex: 1,
    height: 90,
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 999,
  },

  card: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',

    zIndex: 1000,
    elevation: 25,
  },

  squirrelCard: {
    width: 100,
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',

    zIndex: 1000,
    elevation: 25,
  },

  squirrelCardLarge: {
    width: 100,
    height: 100,
  },

  iconText: { fontSize: 36 },
  assetImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  squirrelImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  clickCounter: {
    position: 'absolute',
    top: -8,
    right: -8,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FF6B6B',
    color: 'white',
    borderRadius: 50,
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    zIndex: 10,
  },
  clickCounterText: {
    fontSize: 18,
  },
});
