import React, { useMemo } from 'react';
import { useWindowDimensions, View, ViewProps, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useTheme } from '@theme';

import { styles } from './styles';
import {
  InsetComponentProps,
  InsetProps,
  ScreenComponentProps,
  ScreenProps,
} from './type';

import { FocusAwareStatusBar } from '../focus-aware-status-bar';

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const getEdges = (
  excludeEdges: ScreenProps['excludeEdges'],
  hiddenStatusBar: boolean,
) => {
  if (excludeEdges === 'all') {
    return [];
  }

  const actualEdges = INSETS.filter(x => !(excludeEdges ?? []).includes(x));

  if (hiddenStatusBar) {
    return actualEdges.filter(x => x !== 'top');
  }

  return actualEdges;
};

const Inset = ({
  color,
  height,
  width,
  bottom,
  left,
  right,
  top,
}: InsetProps) => {
  // state
  const style = useMemo<ViewStyle>(
    () => ({
      backgroundColor: color,
      width,
      height,
      top,
      left,
      bottom,
      right,
    }),
    [bottom, color, height, left, right, top, width],
  );

  // render
  return <View style={[styles.insets, style]} />;
};

const InsetComponent = ({
  edges,
  bottomInsetColor,
  hiddenStatusBar,
  leftInsetColor,
  rightInsetColor,
  statusColor,
  unsafe,
  statusBarStyle,
}: InsetComponentProps) => {
  // state
  const inset = useSafeAreaInsets();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // render
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={'transparent'}
        barStyle={statusBarStyle || 'light-content'}
        hidden={hiddenStatusBar}
        translucent
      />
      {!unsafe && edges.includes('top') && (
        <Inset
          color={statusColor}
          height={inset.top}
          top={0}
          width={screenWidth}
        />
      )}
      {!unsafe && edges.includes('left') && (
        <Inset
          color={leftInsetColor}
          height={screenHeight}
          left={0}
          width={inset.left}
        />
      )}
      {!unsafe && edges.includes('right') && (
        <Inset
          color={rightInsetColor}
          height={screenHeight}
          right={0}
          width={inset.right}
        />
      )}
      {!unsafe && edges.includes('bottom') && (
        <Inset
          bottom={0}
          color={bottomInsetColor}
          height={inset.bottom}
          width={screenWidth}
        />
      )}
    </>
  );
};

function ScreenWithoutScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps,
) {
  // state
  const { colors } = useTheme();

  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.background,
    style = {},
    rightInsetColor = colors.background,
    leftInsetColor = colors.background,
  } = props;

  // render
  return (
    <>
      <Wrapper
        edges={edges}
        style={[
          styles.inner,
          style,
          backgroundColor ? { backgroundColor } : {},
        ]}
      >
        <View style={[styles.flex]}>{children}</View>
      </Wrapper>
      <InsetComponent
        bottomInsetColor={bottomInsetColor}
        edges={edges}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        statusBarStyle={statusBarStyle}
        statusColor={statusColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

function ScreenWithScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps,
) {
  // state
  const { colors } = useTheme();

  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    onScroll,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.background,
    style = {},
    leftInsetColor = colors.background,
    rightInsetColor = colors.background,
  } = props;

  // render
  return (
    <>
      <Wrapper edges={edges} style={[styles.outer]}>
        <Animated.ScrollView
          contentContainerStyle={[style]}
          keyboardShouldPersistTaps="handled"
          onScroll={onScroll}
          overScrollMode={'never'}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[styles.inner, backgroundColor ? { backgroundColor } : {}]}
        >
          {children}
        </Animated.ScrollView>
      </Wrapper>
      <InsetComponent
        bottomInsetColor={bottomInsetColor}
        edges={edges}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        statusBarStyle={statusBarStyle}
        statusColor={statusColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

export const Screen = (props: ScreenProps) => {
  // state
  const edges = useMemo<Edge[]>(
    () => getEdges(props.excludeEdges, props?.hiddenStatusBar ?? false),
    [props.excludeEdges, props.hiddenStatusBar],
  );

  const actualUnsafe = useMemo<boolean>(
    () => props.unsafe || edges.length <= 0,
    [edges.length, props.unsafe],
  );

  const Wrapper = useMemo(
    () => (actualUnsafe ? View : SafeAreaView),
    [actualUnsafe],
  );

  // render
  if (props.scroll) {
    return ScreenWithScrolling(Wrapper, { ...props, actualUnsafe, edges });
  } else {
    return ScreenWithoutScrolling(Wrapper, { ...props, actualUnsafe, edges });
  }
};
