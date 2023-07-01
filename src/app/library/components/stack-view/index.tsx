import React, { forwardRef } from 'react';

import Animated from 'react-native-reanimated';

import { StackViewProps } from './type';

export const StackView = forwardRef(
  (
    { children, ...rest }: StackViewProps,
    ref: React.ForwardedRef<Animated.ScrollView>,
  ) => {
    // render
    return (
      <Animated.ScrollView
        ref={ref}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...rest}
      >
        {children}
      </Animated.ScrollView>
    );
  },
);
