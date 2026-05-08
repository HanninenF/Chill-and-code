import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
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
import { colors, elevation, radius, spacing, tokens } from '../theme';

const { height } = Dimensions.get('window');
const animationDuration = 9000;

const applecoreImage = require('../../assets/applecore.png');
const ketchupImage = require('../../assets/kethup.png');
const milkImage = require('../../assets/Mjolk.png');
const plasticBagImage = require('../../assets/plastpase.png');
const paperBagImage = require('../../assets/papperspase.png');
const glassBottleImage = require('../../assets/glasflaska.png');
const jamJarImage = require('../../assets/syltburk.png');

const categories = [
  { name: 'food', background: colors.error },
  { name: 'plastic', background: tokens.cityPrimary },
  { name: 'paper', background: colors.success },
  { name: 'glass', background: colors.warning },
];

const draggableData = [
  { id: '1', name: 'banana peel', icon: '?', category: 'food' },
  { id: '2', name: 'apple core', image: applecoreImage, category: 'food' },
  { id: '3', name: 'fish bone', icon: '?', category: 'food' },
  { id: '4', name: 'pizza slice', icon: '?', category: 'food' },
  { id: '5', name: 'moldy bread', icon: '?', category: 'food' },
  { id: '6', name: 'plastic bottle', icon: '?', category: 'plastic' },
  { id: '7', name: 'chips bag', icon: '?', category: 'plastic' },
  { id: '8', name: 'plastic bag', image: plasticBagImage, category: 'plastic' },
  { id: '9', name: 'ketchup bottle', image: ketchupImage, category: 'plastic' },
  { id: '10', name: 'toothpaste tube', icon: '?', category: 'plastic' },
  { id: '11', name: 'washing liquid bottle', icon: '?', category: 'plastic' },
  { id: '12', name: 'newspaper', icon: '?', category: 'paper' },
  { id: '13', name: 'milk package', image: milkImage, category: 'paper' },
  { id: '14', name: 'paper bag', image: paperBagImage, category: 'paper' },
  { id: '15', name: 'egg carton', icon: '?', category: 'paper' },
  { id: '16', name: 'cereal box', icon: '?', category: 'paper' },
  {
    id: '17',
    name: 'glass bottle',
    image: glassBottleImage,
    category: 'glass',
  },
  { id: '18', name: 'jam jar', image: jamJarImage, category: 'glass' },
  { id: '19', name: 'perfume bottle', icon: '?', category: 'glass' },
  { id: '20', name: 'medicine bottle', icon: '?', category: 'glass' },
];

type Item = (typeof draggableData)[number];

function AnimatedItem({
  item,
  onMissed,
}: {
  item: Item;
  onMissed: () => void;
}) {
  const progress = useSharedValue(0);
  const missedRef = useRef(false);
  const swayAmplitude = useRef(12 + Math.random() * 10).current;

  useEffect(() => {
    missedRef.current = false;
    progress.value = 0;

    progress.value = withTiming(
      1,
      {
        duration: animationDuration,
        easing: Easing.out(Easing.quad),
      },
      (finished?: boolean) => {
        if (finished && !missedRef.current) {
          runOnJS(onMissed)();
          missedRef.current = true;
        }
      },
    );

    return () => {
      missedRef.current = true;
    };
  }, [item.id, onMissed, progress]);

  const handleDragStart = () => {
    runOnUI(() => {
      'worklet';
      cancelAnimation(progress);
    })();
  };

  const handleDragEnd = () => {
    const remainingDuration = Math.max(
      200,
      (1 - progress.value) * animationDuration,
    );

    runOnUI(() => {
      'worklet';
      progress.value = withTiming(
        1,
        {
          duration: remainingDuration,
          easing: Easing.out(Easing.quad),
        },
        (finished?: boolean) => {
          if (finished && !missedRef.current) {
            runOnJS(onMissed)();
            missedRef.current = true;
          }
        },
      );
    })();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const x = Math.sin(progress.value * Math.PI * 2) * swayAmplitude;

    const y = interpolate(
      progress.value,
      [0, 0.5, 1],
      [-150, height * 0.3, height * 0.68],
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

export default function DragAndDropTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(false);
  const [isDropped, setIsDropped] = useState(false);

  const currentItem = useMemo(
    () => draggableData[currentIndex],
    [currentIndex],
  );

  const handleDrop = (category: string, item: Item) => {
    setIsDropped(true);

    if (category === item.category) {
      setScore((value) => value + 1);
      setMessage('Correct!');
    } else {
      setMessage('Wrong!');
    }

    setTimeout(() => {
      setCurrentIndex((value) => value + 1);
      setMessage('');
      setMissed(false);
      setIsDropped(false);
    }, 500);
  };

  const handleMissed = () => {
    setMissed(true);
    setMessage('Too slow!');

    setTimeout(() => {
      setCurrentIndex((value) => value + 1);
      setMessage('');
      setMissed(false);
    }, 1000);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <DropProvider>
        <View style={styles.container}>
          <Text style={styles.score}>Score: {score}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.row}>
            {categories.map((category) => (
              <Droppable
                key={`${category.name}-${currentIndex}`}
                onDrop={(data: Item) => handleDrop(category.name, data)}
              >
                <View
                  style={[
                    styles.zone,
                    { backgroundColor: category.background },
                  ]}
                >
                  <Text>{category.name.toUpperCase()}</Text>
                </View>
              </Droppable>
            ))}
          </View>

          {currentItem && !missed && !isDropped ? (
            <AnimatedItem item={currentItem} onMissed={handleMissed} />
          ) : null}
        </View>
      </DropProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: spacing.xl + spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  score: {
    fontSize: tokens.fontSizeMd,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: tokens.fontSizeMd,
    marginVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.lg,
    elevation: elevation.md,
  },
  zone: {
    flex: 1,
    height: 90,
    borderRadius: radius.md,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    width: 50,
    height: 50,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textPrimary,
    elevation: elevation.lg,
  },
  iconText: {
    fontSize: tokens.fontSize4xl,
  },
  assetImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
