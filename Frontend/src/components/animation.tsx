import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View, type ViewStyle, Alert } from 'react-native';
import { theme, BottomTabInset, Spacing } from '@/constants/theme';

const OBJECT_SIZE = 56;
const FOOTER_HEIGHT = 33;
const HEADER_HEIGHT = 100;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const getBackgroundForTitleColor = (titleColor: string): string => {
  if (titleColor === theme.colors.text) {
    return theme.colors.textSecondary;
  }
  if (titleColor === theme.colors.primaryDark) {
    return theme.colors.primaryDark;
  }
  if (titleColor === theme.colors.background) {
    return theme.colors.surface;
  }
  return theme.colors.primary;
};

type FloatingDraggableProps = {
  color: string;
  floatDistance: number;
  floatDuration: number;
  floatDelay: number;
  onPlusPress?: () => void;
};

export function FloatingDraggable({ color, floatDistance, floatDuration, floatDelay, onPlusPress }: FloatingDraggableProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const currentPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const initialized = useRef(false);

  const maxBounds = {
    x: Math.max(0, containerSize.width - OBJECT_SIZE),
    y: Math.max(HEADER_HEIGHT, containerSize.height - OBJECT_SIZE - BottomTabInset - FOOTER_HEIGHT),
  };

  const getBoundedPosition = (x: number, y: number) => ({
    x: clamp(x, 0, maxBounds.x),
    y: clamp(y, HEADER_HEIGHT, maxBounds.y),
  });

  const startAutoMove = () => {
    if (maxBounds.x <= 0 || maxBounds.y <= HEADER_HEIGHT) {
      return;
    }

    const nextX = clamp(
      currentPosition.current.x + (Math.random() * 2 - 1) * floatDistance,
      0,
      maxBounds.x
    );
    const nextY = clamp(
      currentPosition.current.y + (Math.random() * 2 - 1) * floatDistance,
      HEADER_HEIGHT,
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
      const availableHeight = Math.max(0, height - OBJECT_SIZE - BottomTabInset - FOOTER_HEIGHT - HEADER_HEIGHT);
      const initialX = Math.random() * Math.max(0, width - OBJECT_SIZE);
      const initialY = HEADER_HEIGHT + Math.random() * availableHeight;
      currentPosition.current = { x: initialX, y: initialY };
      position.setValue({ x: initialX, y: initialY });
      initialized.current = true;
    }
  };

  const objectBackground = getBackgroundForTitleColor(color);

  return (
    <View style={styles.container} pointerEvents="box-none" onLayout={onLayout}>
      <Animated.View style={[styles.floating, { transform: position.getTranslateTransform(), borderColor: theme.colors.border, backgroundColor: objectBackground }]}> 
        <Pressable
          style={styles.pressable}
          onPress={onPlusPress}
        >
          <Text style={styles.text}>+</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

type FloatingMotionProps = {
  color: string;
  floatDistance: number;
  floatDuration: number;
  floatDelay: number;
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  initialX?: number;
  initialY?: number;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
};

export function FloatingMotion({
  color,
  floatDistance,
  floatDuration,
  floatDelay,
  children,
  style,
  initialX = 0,
  initialY = 0,
  minX = -Infinity,
  maxX = Infinity,
  minY = -Infinity,
  maxY = Infinity,
}: FloatingMotionProps) {
  const motion = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const currentOffset = useRef({ x: 0, y: 0 });
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const clampToBounds = (nextRaw: number, min: number, max: number) => clamp(nextRaw, min, max);

  const animate = () => {
    const minOffsetX = minX - initialX;
    const maxOffsetX = maxX - initialX;
    const minOffsetY = minY - initialY;
    const maxOffsetY = maxY - initialY;

    const nextX = clampToBounds(
      currentOffset.current.x + (Math.random() * 2 - 1) * floatDistance,
      Math.max(-floatDistance, minOffsetX),
      Math.min(floatDistance, maxOffsetX)
    );

    const nextY = clampToBounds(
      currentOffset.current.y + (Math.random() * 2 - 1) * floatDistance,
      Math.max(-floatDistance, minOffsetY),
      Math.min(floatDistance, maxOffsetY)
    );

    currentOffset.current = {
      x: nextX,
      y: nextY,
    };

    animationRef.current = Animated.sequence([
      Animated.timing(motion, {
        toValue: currentOffset.current,
        duration: floatDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.delay(floatDelay),
    ]);

    animationRef.current.start(({ finished }) => {
      if (finished) {
        animate();
      }
    });
  };

  useEffect(() => {
    animate();
    return () => animationRef.current?.stop();
  }, [floatDistance, floatDuration, floatDelay]);

  return (
    <Animated.View style={[style, { transform: motion.getTranslateTransform() }]}>
      {children}
    </Animated.View>
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
