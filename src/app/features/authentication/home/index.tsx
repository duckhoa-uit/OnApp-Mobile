import React, { memo } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Icon, Screen, Text } from '@components';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';

import { useHomeStyle } from './style';

const HomeComponent = () => {
  const theme = useTheme();

  const styles = useHomeStyle();

  const logout = () => {
    navigateScreen(APP_SCREEN.CONSULTER_LIST);
  };

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.primaryLight}
        bottomInsetColor="transparent"
        statusBarStyle="light-content"
      >
        <Block style={styles.header}>
          <Text style={styles.headerText}>Tham vấn tâm lý cùng Ổn App</Text>
          <Icon color="#fff" icon="bell" onPress={logout} />
        </Block>

        <Block style={styles.whitePad}>
          <TextInput
            focusable={false}
            onChangeText={text => {
              console.log(text);
            }}
            onPressIn={() => navigateScreen(APP_SCREEN.CONSULTER_LIST)}
            placeholder="Tìm kiếm"
            placeholderTextColor={'#C2C2C2'}
            style={styles.searchBar}
          />
          <Block />
        </Block>
      </Screen>
    </Block>
  );
};

export const Home = memo(HomeComponent, isEqual);
