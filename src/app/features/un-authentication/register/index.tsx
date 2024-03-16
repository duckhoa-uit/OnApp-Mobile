import React, { memo } from 'react';
import { Image as RNImage, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { images } from '@assets/image';
import { validResponse } from '@common';
import { Block, Screen, showSnack, Text } from '@components';
import { FormRegisterType, LoginApiResponse } from '@model/authentication';
import { navigateScreen, replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { ApiConstants, NetWorkService } from '@networking';

import { FormRegister } from './components/form-register';
import { useRegisterStyle } from './style';

const RegisterComponent = () => {
  const styles = useRegisterStyle();

  const handleSubmit = async (body: FormRegisterType) => {
    const response = await NetWorkService.Post<LoginApiResponse>({
      url: ApiConstants.REGISTER,
      body,
    });

    if (!response) {
      return;
    }

    if (validResponse(response)) {
      showSnack({
        msg: 'Đăng kí tài khoản mới thành công, đăng nhập để truy cập ứng dụng',
        type: 'success',
      });

      replaceScreen(APP_SCREEN.LOGIN);
    } else {
      console.log(JSON.stringify(response.msg));
    }
  };

  // render
  return (
    <Block block justifyContent="center" paddingHorizontal={15} paddingTop={0}>
      <Screen
        backgroundColor={'transparent'}
        bottomInsetColor="transparent"
        scroll
        style={{
          paddingVertical: 100,
          paddingHorizontal: 10,
        }}
      >
        <KeyboardAvoidingView
          behavior={'padding'}
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={20}
          style={{ flex: 1 }}
        >
          <RNImage
            resizeMode={'cover'}
            source={images.logo}
            style={styles.loginIcons}
          />
          <FormRegister onSubmit={handleSubmit} />

          <Block style={styles.signInContainer}>
            <Text colorTheme="text">Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigateScreen(APP_SCREEN.LOGIN)}>
              <Text colorTheme="primary">Đăng nhập</Text>
            </TouchableOpacity>
          </Block>
        </KeyboardAvoidingView>
      </Screen>
    </Block>
  );
};

export const Register = memo(RegisterComponent, isEqual);
