import React, { memo, useEffect, useState } from 'react';

import isEqual from 'react-fast-compare';

import { validResponse } from '@common';
import { Block, ListView, NavigationBar, Screen } from '@components';
import { SearchBar } from '@components/search-bar';
import { User } from '@model/user';
import { goBack, navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { ApiBaseResponse, ApiConstants, NetWorkService } from '@networking';
import { useTheme } from '@theme';

import ConsulterCard from '../../components/consulter-card';

const ConsulterListComponent = () => {
  const theme = useTheme();

  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await NetWorkService.Get<ApiBaseResponse<User[]>>({
        url: ApiConstants.GET_CONSULTER_LIST,
      });

      if (!response) {
        return;
      }

      if (validResponse(response)) {
        const _users = response.data.data;

        setUsers(_users);
      }
    })();
  }, []);

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
            onBlur={() => setLoading(false)}
            onFocus={() => setLoading(true)}
            spinnerVisibility={loading}
          />
        </Block>

        <Block block paddingHorizontal={20}>
          <ListView
            ItemSeparatorComponent={Divider}
            data={users}
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

export const ConsulterList = memo(ConsulterListComponent, isEqual);
