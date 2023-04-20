import React, { memo } from 'react';
import { TextInput } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Icon, Screen, Text } from '@components';
import { useTheme } from '@theme';

import { useHomeStyle } from './style';

const HomeComponent = () => {
  const theme = useTheme();

  const styles = useHomeStyle();

  const logout = () => {};

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        bottomInsetColor="transparent"
        backgroundColor={theme.colors.primaryLight}
      >
        <Block style={styles.header}>
          <Text style={styles.headerText}>Xin chào bạn</Text>
          <Icon icon="bell" color="#fff" onPress={logout} />
        </Block>

        <Block style={styles.whitePad}>
          <TextInput
            style={styles.searchBar}
            placeholderTextColor={'#C2C2C2'}
            placeholder="Tìm kiếm"
            onChangeText={text => {
              console.log(text);
            }}
          />
        </Block>
      </Screen>
    </Block>
  );
};

export const Home = memo(HomeComponent, isEqual);
