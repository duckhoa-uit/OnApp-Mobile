import React, { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Block, Icon, Text, TouchableScale } from '@components';
import { Input } from '@components/form/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { useLoginStyle } from '../style';
import { FormLoginProps } from '../type';

export const FormLogin = ({ onSubmit }: FormLoginProps) => {
  const styles = useLoginStyle();

  const [showPassword, setShowPassword] = useState(false);

  // state
  const formMethod = useForm<FormLoginType>({
    defaultValues: {
      email: '',
      password: '',
      // email: 'thuduyen1306@gmail.com',
      // password: 'Admin@123',
    },
    resolver: zodResolver(loginValidation),
  });

  // function
  const onSubmitKey = () => {
    formMethod.handleSubmit(onSubmit)();
  };

  // render
  return (
    <FormProvider {...formMethod}>
      <Input<FormLoginType> autoFocus label={'Email'} name={'email'} />
      <Input<FormLoginType>
        label={'Password'}
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
          <Block color={'#bbb'} padding={5} style={styles.loginButton}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </Block>
        </TouchableScale>
      </Block>
    </FormProvider>
  );
};
