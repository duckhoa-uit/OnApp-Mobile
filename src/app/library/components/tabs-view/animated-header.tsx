import React, { FunctionComponent } from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';

import { CBTabViewOffset } from './animated-tab-view';
import { TabViewConfig } from './config';

export interface CBAnimatedHeaderProps extends Omit<ViewProps, 'style'> {
  scrollY: Animated.AnimatedValue;
}

export const CBAnimatedHeader: FunctionComponent<CBAnimatedHeaderProps> = ({
  scrollY,
  children,
  ...otherProps
}) => {
  const translateY = scrollY.interpolate({
    inputRange: [
      CBTabViewOffset,
      CBTabViewOffset + TabViewConfig.sizing.header,
    ],
    outputRange: [0, -TabViewConfig.sizing.header],
    extrapolateLeft: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.header, { transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    height: TabViewConfig.sizing.header,
    paddingHorizontal: TabViewConfig.spacing.gutter,
  },
});
