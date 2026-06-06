import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { theme, BottomTabInset } from '@/constants/theme';

const OBJECT_SIZE = 56;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type FloatingDraggableProps = {
  color: string;
  floatDistance: number;
  floatDuration: number;
  floatDelay: number;
};

export function FloatingDraggable({ color, floatDistance, floatDuration, floatDelay }: FloatingDraggableProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const currentPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const initialized = useRef(false);

  const maxBounds = {
    x: Math.max(0, containerSize.width - OBJECT_SIZE),
    y: Math.max(0, containerSize.height - OBJECT_SIZE - BottomTabInset),
  };

  const getBoundedPosition = (x: number, y: number) => ({
    x: clamp(x, 0, maxBounds.x),
    y: clamp(y, 0, maxBounds.y),
  });

  const startAutoMove = () => {
    if (maxBounds.x <= 0 || maxBounds.y <= 0) {
      return;
    }

    const nextX = clamp(
      currentPosition.current.x + (Math.random() * 2 - 1) * floatDistance,
      0,
      maxBounds.x
    );
    const nextY = clamp(
      currentPosition.current.y + (Math.random() * 2 - 1) * floatDistance,
      0,
      maxBounds.y
    );

    animationRef.current = Animated.sequence([
      Animated.timing(position, {
        toValue: { x: nextX, y: nextY },
        duration: floatDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.delay(floatDelay),
    ]);

    animationRef.current.start(({ finished }) => {
      if (finished) {
        currentPosition.current = { x: nextX, y: nextY };
        startAutoMove();
      }
    });
  };

  useEffect(() => {
    animationRef.current?.stop();
    if (initialized.current && maxBounds.x > 0 && maxBounds.y > 0) {
      startAutoMove();
    }

    return () => animationRef.current?.stop();
  }, [maxBounds.x, maxBounds.y, floatDistance, floatDuration, floatDelay]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });

    if (!initialized.current && width > 0 && height > 0) {
      const initialX = Math.random() * Math.max(0, width - OBJECT_SIZE);
      const initialY = Math.random() * Math.max(0, height - OBJECT_SIZE - BottomTabInset);
      currentPosition.current = { x: initialX, y: initialY };
      position.setValue({ x: initialX, y: initialY });
      initialized.current = true;
    }
  };

  const objectBorderColor = color === theme.colors.background ? theme.colors.card : color;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View style={[styles.floating, { transform: position.getTranslateTransform(), borderColor: objectBorderColor }]}> 
        <Pressable
          style={styles.pressable}
          onPress={() => Alert.alert('Botão +', 'Você pressionou o botão!')}
        >
          <Text style={styles.text}>+</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floating: {
    position: 'absolute',
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    borderRadius: OBJECT_SIZE / 2,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
});
