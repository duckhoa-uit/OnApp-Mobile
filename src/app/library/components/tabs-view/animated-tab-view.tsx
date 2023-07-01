import React, { memo, ReactElement } from 'react';
import { Animated, FlatListProps, Platform, ViewProps } from 'react-native';

import { TabViewConfig } from './config';

// we provide this bc ios allows overscrolling but android doesn't
// so on ios because of pull to refresh / rubberbaanding we set scroll pos to negtaive header pos
// on android we set to 0 and makeup header height diff with contentinset padding
export const CBTabViewOffset =
  Platform.OS === 'ios' ? -TabViewConfig.sizing.header : 0;

export interface CBAnimatedTabViewProps<T>
  extends ViewProps,
    Pick<
      FlatListProps<T>,
      | 'data'
      | 'getItemLayout'
      | 'initialNumToRender'
      | 'maxToRenderPerBatch'
      | 'onContentSizeChange'
      | 'onMomentumScrollBegin'
      | 'onMomentumScrollEnd'
      | 'onScrollEndDrag'
      | 'renderItem'
      | 'updateCellsBatchingPeriod'
      | 'windowSize'
      | 'ListEmptyComponent'
      | 'ItemSeparatorComponent'
      | 'ListFooterComponent'
    > {
  onRef: (scrollableChild: Animated.FlatList<T>) => void;
  scrollY?: Animated.AnimatedValue;
  refreshControl?: ReactElement;
}
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const CBAnimatedTabViewWithoutMemo = <T extends any>({
  data,
  renderItem,
  getItemLayout,
  onContentSizeChange,
  initialNumToRender,
  maxToRenderPerBatch,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  onRef,
  scrollY,
  refreshControl,
  ListEmptyComponent,
  ItemSeparatorComponent,
  ListFooterComponent,
}: CBAnimatedTabViewProps<T>) => {
  const handleScroll =
    scrollY &&
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
    });

  return (
    <Animated.FlatList<T>
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={[
        Platform.select({
          ios: {
            flexGrow: 1,
            paddingBottom: TabViewConfig.spacing.gutter,
          },
          android: {
            flexGrow: 1,
            paddingTop: TabViewConfig.sizing.header,
            paddingBottom: TabViewConfig.spacing.gutter,
          },
        }),
        { paddingHorizontal: 30 },
      ]}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: -TabViewConfig.sizing.header,
        },
      })}
      data={data as readonly Animated.WithAnimatedValue<T>[]}
      getItemLayout={getItemLayout}
      initialNumToRender={initialNumToRender}
      keyboardShouldPersistTaps="always"
      maxToRenderPerBatch={maxToRenderPerBatch}
      onContentSizeChange={onContentSizeChange}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScroll={handleScroll}
      ref={onRef}
      refreshControl={refreshControl}
      onScrollEndDrag={onScrollEndDrag}
      // ios has over scrolling and other things which make this look and feel nicer
      contentInset={Platform.select({
        ios: { top: TabViewConfig.sizing.header },
      })}
      renderItem={renderItem}
      //tabbar is absolutely positioned
      style={{ marginBottom: TabViewConfig.sizing.tabbar }}
    />
  );
};

// Creating an unmemoized component and casting as that type is the only way
// I can get Typescript to respect the generics of the memoized function.
export const CBAnimatedTabView = memo(
  CBAnimatedTabViewWithoutMemo,
) as typeof CBAnimatedTabViewWithoutMemo;
