import React, { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Circle, CircleProps } from 'react-native-svg';

import { sharedTiming } from '@animated';

import { styles } from './styles';
import { ProgressCircleProps } from './type';

import { COLOR_BG, COLOR_FG, RADIUS, STROKE_WIDTH } from '../constant';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedText = Animated.createAnimatedComponent(Text);

export const ProgressCircle = ({
  round,
  progress,
  textProgressStyle,
  bg = COLOR_BG,
  fg = COLOR_FG,
  radius = RADIUS,
  strokeWidth = STROKE_WIDTH,
  showTextProgress = true,
}: ProgressCircleProps) => {
  // state
  const strokeDasharray = useMemo(
    () => `${radius * 2 * Math.PI} ${radius * 2 * Math.PI}`,
    [radius],
  );

  const progressValue = useSharedValue(0);

  const strokeDashoffset = useDerivedValue(
    () =>
      interpolate(
        progressValue.value,
        [0, 100],
        [Math.PI * 2, 0],
        Extrapolate.CLAMP,
      ) * radius,
  );

  // function
  const renderText = () => {
    if (progress < 0) {
      return 0 + '';
    }

    if (progress > 100) {
      return 100 + '';
    }

    return progress + '';
  };

  // effect
  useEffect(() => {
    progressValue.value = sharedTiming(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // props
  const circleProps = useAnimatedProps<CircleProps>(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  // render
  return (
    <View style={styles.container}>
      {showTextProgress && (
        <AnimatedText
          children={renderText()}
          style={[styles.textProgress, textProgressStyle]}
        />
      )}
      <View style={[styles.wrapCircle]}>
        <Svg
          fill={'transparent'}
          height={radius * 2 + strokeWidth}
          width={radius * 2 + strokeWidth}
        >
          <AnimatedCircle
            r={radius}
            stroke={bg}
            strokeWidth={strokeWidth}
            x={radius + strokeWidth / 2}
            y={radius + strokeWidth / 2}
          />
          <AnimatedCircle
            animatedProps={circleProps}
            r={radius}
            stroke={fg}
            strokeDasharray={strokeDasharray}
            strokeLinecap={round ? 'round' : undefined}
            strokeWidth={strokeWidth}
            x={radius + strokeWidth / 2}
            y={radius + strokeWidth / 2}
          />
        </Svg>
      </View>
    </View>
  );
};
