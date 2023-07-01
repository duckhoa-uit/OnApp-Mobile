import React, { ReactNode } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const NAV_HEADER_HEIGHT = 82;

export const NAV_TITLE_HEIGHT = 30;

export const NavBar: React.FC<{ children?: ReactNode }> = ({ children }) => {
  // const { top: paddingTop } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <Animated.View style={[styles.titleContainer]}>{children}</Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    zIndex: 10,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: NAV_TITLE_HEIGHT,
    flexGrow: 1,
  },
});
