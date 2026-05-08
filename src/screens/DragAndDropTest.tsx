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

const maxGameItems = 20;

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
  for (let i = 0; i < maxGameItems; i++) {
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
function SquirrelItem({
  item,
  onRescued,
  onMissed,
  isRescued,
  onInteract,
}: any) {
  const progress = useSharedValue(0);
  const missedRef = useRef(false);
  const swayAmplitude = useRef(12 + Math.random() * 10).current;
  const soundRef = useRef<any>(null);
  const [clickCount, setClickCount] = useState(0);

  // Play sound when squirrel appears
  useEffect(() => {
    let isMounted = true;

    const playSound = async () => {
      try {
        const sound = new Audio.Sound();
        await sound.loadAsync(require('../assets/audio/Squirrel1.m4a'));
        await sound.setVolumeAsync(1);

        if (isMounted) {
          soundRef.current = sound;
          const status = await sound.playAsync();
          console.log('Squirrel1.m4a playing:', status);
        }
      } catch (error) {
        console.error('Error playing Squirrel1.m4a:', error);
      }
    };

    playSound();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current
          .unloadAsync()
          .catch((e: any) => console.error('Unload error:', e));
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
    onInteract?.();
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
        <View style={[styles.squirrelCard, !isRescued && { opacity: 0.9 }]}>
          {!isRescued && (
            <Text style={[styles.clickCounter, styles.clickCounterText]}>
              {3 - clickCount}
            </Text>
          )}
          <Image
            source={isRescued ? squirrel : item.image}
            style={styles.squirrelImage}
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
  const [fallingItems, setFallingItems] = useState<any[]>([]);
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [rescuedIds, setRescuedIds] = useState<Set<string>>(new Set());
  const [dropCounter, setDropCounter] = useState(0);
  const backgroundMusicRef = useRef<any>(null);
  const musicStartedRef = useRef(false);
  const intervalRef = useRef<any>(null);

  // Play background music on mount
  useEffect(() => {
    let isMounted = true;

    const prepareBackgroundMusic = async () => {
      try {
        const sound = new Audio.Sound();
        await sound.loadAsync(require('../assets/audio/PARK.m4a'));
        await sound.setIsLoopingAsync(true);
        await sound.setVolumeAsync(0.3);

        if (isMounted) {
          backgroundMusicRef.current = sound;
          console.log('Background music loaded, ready to play');
          // Try to play immediately - if it fails, will play on first interaction
          sound
            .playAsync()
            .then(() => {
              musicStartedRef.current = true;
              console.log('Background music started');
            })
            .catch((error: any) => {
              console.log(
                'Auto-play failed (expected), will play on first interaction:',
                error.message,
              );
            });
        } else {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.error('Error preparing background music:', error);
      }
    };

    // Small delay to ensure previous audio context is cleared
    const timer = setTimeout(() => {
      if (isMounted) {
        prepareBackgroundMusic();
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current
          .stopAsync()
          .then(() => {
            backgroundMusicRef.current?.unloadAsync();
          })
          .catch((e: any) => console.error('Cleanup error:', e));
      }
    };
  }, []);

  // Helper function to start music on first user interaction
  const tryPlayBackgroundMusic = async () => {
    if (!musicStartedRef.current && backgroundMusicRef.current) {
      try {
        await backgroundMusicRef.current.playAsync();
        musicStartedRef.current = true;
        console.log('Background music started on user interaction');
      } catch (error) {
        console.error('Error starting background music:', error);
      }
    }
  };

  const playSound = async (soundFile: any, volume: number) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(soundFile);
      await sound.setVolumeAsync(volume);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Spawn items continuously
  useEffect(() => {
    if (gameOver || !gameStarted) return;

    intervalRef.current = setInterval(() => {
      setNextItemIndex((prev) => {
        if (prev < gameItems.length) {
          setFallingItems((items) => [
            ...items,
            {
              ...gameItems[prev],
              fallingId: `${gameItems[prev].id}-${Date.now()}-${Math.random()}`,
            },
          ]);
          return prev + 1;
        } else {
          clearInterval(intervalRef.current);
          return prev;
        }
      });
    }, 2500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameOver, gameStarted, gameItems]);

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);

  // Check if all items have been spawned and cleared - end of game
  useEffect(() => {
    if (
      gameStarted &&
      !gameOver &&
      nextItemIndex >= gameItems.length &&
      fallingItems.length === 0
    ) {
      setGameOver(true);
    }
  }, [
    gameStarted,
    gameOver,
    nextItemIndex,
    gameItems.length,
    fallingItems.length,
  ]);

  // Try to start background music when first item spawns
  useEffect(() => {
    if (fallingItems.length > 0) {
      tryPlayBackgroundMusic();
    }
  }, [fallingItems.length]);

  const handleDrop = (category: string, item: any) => {
    tryPlayBackgroundMusic();

    if (category === item.category) {
      setScore((s) => s + 1);
      setMessage('✅ Correct!');
      // Play success sound
      playSound(require('../assets/audio/correct.m4a'), 1);
    } else {
      setLives((l) => Math.max(0, l - 1));
      setMessage('❌ Wrong!');
      // Play failure sound
      playSound(require('../assets/audio/failure.m4a'), 1);
    }

    // Remove item immediately
    setFallingItems((items) =>
      items.filter((i) => i.fallingId !== item.fallingId),
    );

    // Increment dropCounter to force Droppable refresh
    setDropCounter((c) => c + 1);

    setTimeout(() => {
      setMessage('');
    }, 500);
  };

  const handleMissed = (fallingId: string) => {
    setLives((l) => Math.max(0, l - 1));
    setMessage('❌ Too slow!');
    // Play failure sound
    playSound(require('../assets/audio/failure.m4a'), 1);

    // Remove item immediately
    setFallingItems((items) => items.filter((i) => i.fallingId !== fallingId));

    setTimeout(() => {
      setMessage('');
    }, 300);
  };

  const handleRescued = async (fallingId: string) => {
    setScore((s) => s + 1);
    setRescuedIds((prev) => new Set([...prev, fallingId]));

    // Play yay sound
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require('../assets/audio/yay.wav'));
      await sound.setVolumeAsync(1);
      const status = await sound.playAsync();
      console.log('yay.wav playing:', status);
    } catch (error) {
      console.error('Error playing yay.wav:', error);
    }

    setTimeout(() => {
      setFallingItems((items) =>
        items.filter((i) => i.fallingId !== fallingId),
      );
      setRescuedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fallingId);
        return newSet;
      });
    }, 1500);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    // Spawn first item immediately
    setFallingItems([
      {
        ...gameItems[0],
        fallingId: `${gameItems[0].id}-${Date.now()}-${Math.random()}`,
      },
    ]);
    setNextItemIndex(1);
    setRescuedIds(new Set());
    setMessage('');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {!gameStarted ? (
        <View style={styles.startScreenContainer}>
          <Pressable onPress={startGame} style={styles.startButton}>
            <Text style={styles.startButtonText}>Börja spela</Text>
          </Pressable>
        </View>
      ) : gameOver ? (
        <View style={styles.startScreenContainer}>
          <Text style={styles.gameOverText}>Spelet är slut!</Text>
          <Text style={styles.finalScore}>
            Poäng: {score}/{maxGameItems}
          </Text>
          <Pressable onPress={startGame} style={styles.startButton}>
            <Text style={styles.startButtonText}>Spela igen</Text>
          </Pressable>
        </View>
      ) : (
        <DropProvider>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.score}>
                Poäng: {score}/{maxGameItems}
              </Text>
              <Text style={styles.lives}>Liv: {'❤️'.repeat(lives)}</Text>
            </View>
            {message ? <Text style={styles.message}>{message}</Text> : null}

            <>
              {fallingItems
                .slice()
                .reverse()
                .map((item) => (
                  <React.Fragment key={item.fallingId}>
                    {item.isSquirrel ? (
                      <SquirrelItem
                        item={item}
                        onRescued={() => handleRescued(item.fallingId)}
                        onMissed={() => handleMissed(item.fallingId)}
                        isRescued={rescuedIds.has(item.fallingId)}
                        onInteract={tryPlayBackgroundMusic}
                      />
                    ) : (
                      <AnimatedItem
                        item={item}
                        onDrop={handleDrop}
                        onMissed={() => handleMissed(item.fallingId)}
                      />
                    )}
                  </React.Fragment>
                ))}
            </>

            <View style={styles.row}>
              {categories.map((c) => (
                <Droppable
                  key={`${c.name}-${dropCounter}`}
                  onDrop={(data) => {
                    if (!gameOver) {
                      handleDrop(c.name, data);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.zone,
                      {
                        backgroundColor: c.background,
                        opacity: gameOver ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text>{c.name.toUpperCase()}</Text>
                  </View>
                </Droppable>
              ))}
            </View>
          </View>
        </DropProvider>
      )}
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

  startScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },

  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  gameOverText: { fontSize: 48, fontWeight: '700' },
  finalScore: { fontSize: 28, fontWeight: '600' },

  startButton: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },

  startButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },

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
    width: 100,
    height: 100,
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
