import React from 'react';

import { Appointments } from '@features/authentication/appointment/screens';
import { APP_SCREEN } from '@navigation/screen-types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AppointmentsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen component={Appointments} name={APP_SCREEN.APPOINTMENTS} />
    </Stack.Navigator>
  );
};
