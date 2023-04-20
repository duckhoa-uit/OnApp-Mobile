import React from 'react';
import { Alert, Image as RNImage, TouchableOpacity } from 'react-native';

import { images } from '@assets/image';
import { dispatch } from '@common';
import { Block, Screen, Text } from '@components';
import { FormLoginType } from '@model/authentication';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

import { FormLogin } from './components/form-login';
import { useLoginStyle } from './style';

export const Login = () => {
  const styles = useLoginStyle();

  // function
  const handleSubmit = (data: FormLoginType) => {
    dispatch(appActions.setAppTheme('default'));

    Alert.alert(JSON.stringify(data));
  };

  // render
  return (
    <Block block justifyContent="center" paddingTop={0} paddingHorizontal={15}>
      <Screen
        bottomInsetColor="transparent"
        style={{
          paddingVertical: 100,
          paddingHorizontal: 10,
        }}
        backgroundColor={'transparent'}
      >
        <RNImage
          style={styles.loginIcons}
          source={images.logo}
          resizeMode={'cover'}
        />
        <FormLogin onSubmit={handleSubmit} />

        {/* <Divider /> */}
        {/* <GoogleSignInButton
          onPress={() => promptAsync({ showInRecents: true })}
        /> */}

        <Block style={styles.signUpContainer}>
          <Text colorTheme="text">Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigateScreen(APP_SCREEN.REGISTER)}>
            <Text colorTheme="primary">Đăng ký</Text>
          </TouchableOpacity>
        </Block>
      </Screen>
    </Block>
  );
};