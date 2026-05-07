import React, { useMemo, useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
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
const applecoreImage = require('../../assets/applecore.png');
const ketchupImage = require('../../assets/kethup.png');
const milkImage = require('../../assets/Mjolk.png');
const plasticBagImage = require('../../assets/plastpase.png');
const paperBagImage = require('../../assets/papperspase.png');
const glassBottleImage = require('../../assets/glasflaska.png');
const jamJarImage = require('../../assets/syltburk.png');

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
];

// =====================
// Animated Item
// =====================
function AnimatedItem({ item, onMissed, onDrop }: any) {
  const progress = useSharedValue(0);
  const missedRef = useRef(false);
  const swayAmplitude = useRef(12 + Math.random() * 10).current;

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
      <Draggable data={item}>
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(false);

  const currentItem = useMemo(
    () => draggableData[currentIndex],
    [currentIndex],
  );

  const handleDrop = (category: string, item: any) => {
    if (category === item.category) {
      setScore((s) => s + 1);
      setMessage('✅ Correct!');
    } else {
      setMessage('❌ Wrong!');
    }

    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setMessage('');
      setMissed(false);
    }, 500);
  };

  const handleMissed = () => {
    setMissed(true);
    setMessage('❌ Too slow!');

    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setMessage('');
      setMissed(false);
    }, 1000);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DropProvider>
        <View style={styles.container}>
          <Text style={styles.score}>Score: {score}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {/* ITEM */}
          {currentItem && !missed && (
            <AnimatedItem
              item={currentItem}
              onDrop={handleDrop}
              onMissed={handleMissed}
            />
          )}

          {/* DROP ZONES */}
          <View style={styles.row}>
            {categories.map((c) => (
              <Droppable
                key={c.name}
                onDrop={(data) => handleDrop(c.name, data)}
              >
                <View style={[styles.zone, { backgroundColor: c.background }]}>
                  <Text>{c.name.toUpperCase()}</Text>
                </View>
              </Droppable>
            ))}
          </View>
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
    justifyContent: 'space-between', // 👈 viktig
  },

  title: { fontSize: 26, fontWeight: '700' },
  score: { fontSize: 18, marginBottom: 10 },
  message: { fontSize: 18, marginVertical: 10 },

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

  iconText: { fontSize: 36 },
  assetImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
