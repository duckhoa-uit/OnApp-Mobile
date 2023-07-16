import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import {
  Block,
  ListView,
  NavigationBar,
  Screen,
  Skeleton,
  Text,
} from '@components';
import { SearchBar } from '@components/search-bar';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useQueryConsulters } from '@networking/queries/consulter/use-query-consulters';
import { useTheme } from '@theme';

import ConsulterCard from '../../components/consulter-card';

const ConsulterListComponent = () => {
  const theme = useTheme();

  // const [users, setUsers] = useState<User[]>([]);

  // const [loading, setLoading] = useState(false);

  const {
    data: consulters,
    isLoading,
    fetchStatus,
  } = useQueryConsulters({
    variables: {},
  });

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
      >
        <NavigationBar callback={goBack} title="Tư vấn viên" />

        <Block direction="row" marginTop={10} paddingHorizontal={20}>
          <SearchBar
            // onBlur={() => setLoading(false)}
            // onFocus={() => setLoading(true)}
            placeholder={isLoading ? 'Đang tải' : 'Tìm kiếm'}
            spinnerVisibility={isLoading}
          />
        </Block>

        <Block marginTop={20} paddingHorizontal={20}>
          <ListView
            ItemSeparatorComponent={Divider}
            ListEmptyComponent={
              fetchStatus === 'idle' ? ListEmptyComponent : null
            }
            ListFooterComponent={isLoading ? ListFooterComponent : null}
            data={consulters}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ConsulterCard
                consulter={item}
                onPress={() => {
                  navigateScreen(APP_SCREEN.CONSULTER_DETAILS, {
                    consulter: item,
                  });
                }}
              />
            )}
          />
        </Block>
      </Screen>
    </Block>
  );
};

const Divider = memo(
  () => <Block style={{ width: '100%', height: 12 }} />,
  isEqual,
);

const ListFooterComponent = () => (
  <Skeleton>
    <Block block borderRadius={8} color="red" height={120} marginTop={16} />
    <Block block borderRadius={8} color="red" height={120} marginTop={16} />
    <Block block borderRadius={8} color="red" height={120} marginTop={16} />
  </Skeleton>
);

const ListEmptyComponent = () => (
  <Block marginTop={10} paddingHorizontal={10}>
    <Text>Bạn đã đi đến cuối danh sách</Text>
  </Block>
);

export const ConsulterList = memo(ConsulterListComponent, isEqual);
