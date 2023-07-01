import React, { ComponentProps, FunctionComponent } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import { CBAnimatedTabView } from './animated-tab-view';

type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => ({
//   title: `Title ${i}`,
//   key: `key-${i}`,
// }));

type SceneProps = {
  isActive: boolean;
  routeKey: string;
  scrollY: Animated.Value;
  trackRef: (key: string, ref: FlatList<any>) => void;
  onMomentumScrollBegin: (e: ScrollEvent) => void;
  onMomentumScrollEnd: (e: ScrollEvent) => void;
  onScrollEndDrag: (e: ScrollEvent) => void;
} & Pick<
  ComponentProps<typeof CBAnimatedTabView>,
  'renderItem' | 'data' | 'ListFooterComponent' | 'ListEmptyComponent'
>;

export const Scene: FunctionComponent<SceneProps> = ({
  data,
  isActive,
  routeKey,
  scrollY,
  trackRef,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  renderItem,
  ListFooterComponent,
  ListEmptyComponent,
}) => (
  <View style={styles.container}>
    <CBAnimatedTabView
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      data={data}
      initialNumToRender={15}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onRef={(ref: any) => {
        trackRef(routeKey, ref);
      }}
      onScrollEndDrag={onScrollEndDrag}
      refreshControl={
        <RefreshControl onRefresh={() => null} refreshing={false} />
      }
      renderItem={renderItem}
      scrollY={isActive ? scrollY : undefined}
      windowSize={3}
    />
  </View>
);

const Separator = () => <View style={{ height: 16 }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
