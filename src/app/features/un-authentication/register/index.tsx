import React, { memo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Screen, Text } from '@components';
import { FormRegisterType } from '@model/authentication';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';

import { FormRegister } from './components/form-register';
import { useRegisterStyle } from './style';

const RegisterComponent = () => {
  const styles = useRegisterStyle();

  const handleSubmit = (data: FormRegisterType) => {
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
        <FormRegister onSubmit={handleSubmit} />

        <Block style={styles.signInContainer}>
          <Text colorTheme="text">Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigateScreen(APP_SCREEN.LOGIN)}>
            <Text colorTheme="primary">Đăng nhập</Text>
          </TouchableOpacity>
        </Block>
      </Screen>
    </Block>
  );
};

export const Register = memo(RegisterComponent, isEqual);
