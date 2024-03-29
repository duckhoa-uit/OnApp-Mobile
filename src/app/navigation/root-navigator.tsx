import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';

import ChatContextProvider from '@features/authentication/chat/context';
import { Login } from '@features/un-authentication/login';
import { Register } from '@features/un-authentication/register';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { selectAppToken } from '@redux-selector/app';

import { MainScreen } from './authen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const token = useSelector(selectAppToken);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return token === undefined ? (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group
        screenOptions={{
          freezeOnBlur: true,
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
        }}
      >
        <RootStack.Screen component={Login} name={APP_SCREEN.LOGIN} />
        <RootStack.Screen component={Register} name={APP_SCREEN.REGISTER} />
      </RootStack.Group>
    </RootStack.Navigator>
  ) : (
    <ChatContextProvider>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Group>
          <RootStack.Screen
            component={MainScreen}
            name={APP_SCREEN.AUTHORIZE}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </ChatContextProvider>
  );
};
