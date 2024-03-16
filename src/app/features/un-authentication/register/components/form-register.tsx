import React, { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Block, Icon, Text, TouchableScale } from '@components';
import { Input } from '@components/form/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRegisterType } from '@model/authentication';
import { registerValidation } from '@validate/register';

import { useRegisterStyle } from '../style';
import { FormRegisterProps } from '../type';

export const FormRegister = ({ onSubmit }: FormRegisterProps) => {
  const styles = useRegisterStyle();

  const [showPassword, setShowPassword] = useState(false);

  // state
  const formMethod = useForm<FormRegisterType>({
    resolver: zodResolver(registerValidation),
  });

  // function
  const onSubmitKey = () => {
    formMethod.handleSubmit(onSubmit)();
  };

  // render
  return (
    <FormProvider {...formMethod}>
      <Input<FormRegisterType> label={'Email'} name={'email'} />
      <Input<FormRegisterType> label={'Username'} name={'username'} />
      <Input<FormRegisterType> label={'Họ tên'} name={'name'} />
      <Input<FormRegisterType>
        label={'Mật khẩu'}
        name={'password'}
        rightChildren={
          <Icon
            color="#777"
            icon={showPassword ? 'eye' : 'eyeClose'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        secureTextEntry={!showPassword}
      />

      <Block direction={'row'} middle paddingVertical={15}>
        <TouchableScale
          containerStyle={styles.submitBtnContainer}
          onPress={onSubmitKey}
        >
          <Block color={'#bbb'} padding={5} style={styles.registerButton}>
            <Text style={styles.registerText}>Đăng ký</Text>
          </Block>
        </TouchableScale>
      </Block>
    </FormProvider>
  );
};
