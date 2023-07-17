import React from 'react';
import { Image as RNImage, TouchableOpacity } from 'react-native';

import { images } from '@assets/image';
import { dispatch } from '@common';
import { Block, Screen, Text } from '@components';
import { FormLoginType } from '@model/authentication';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions, authenticationActions } from '@redux-slice';

import { FormLogin } from './components/form-login';
import { useLoginStyle } from './style';

export const Login = () => {
  const styles = useLoginStyle();

  // function
  const handleSubmit = (data: FormLoginType) => {
    dispatch(appActions.startProcess());

    const payload: FormLoginType = {
      email: data.email.toLowerCase(),
      password: data.password,
    };

    dispatch(
      authenticationActions.login(
        payload,
        () => {
          console.log('login thanh cong ne');

          dispatch(appActions.endProcess());
        },
        () => {
          dispatch(appActions.endProcess());
        },
      ),
    );
  };

  // render
  return (
    <Block block justifyContent="center" paddingHorizontal={15} paddingTop={0}>
      <Screen
        backgroundColor={'transparent'}
        bottomInsetColor="transparent"
        style={{
          paddingVertical: 100,
          paddingHorizontal: 10,
        }}
      >
        <RNImage
          resizeMode={'cover'}
          source={images.logo}
          style={styles.loginIcons}
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
