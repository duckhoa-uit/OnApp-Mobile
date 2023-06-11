import React from 'react';

import { ConfirmBooking } from '@features/authentication/booking/screens/booking';
import { ConsulterDetails } from '@features/authentication/consulter/screens/consulter-details';
import { ConsulterList } from '@features/authentication/consulter/screens/consulter-list';
import { Home } from '@features/authentication/home';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const tabHiddenRoutes = [
  APP_SCREEN.CONSULTER_LIST,
  APP_SCREEN.CONSULTER_DETAILS,
  APP_SCREEN.CONFIRM_BOOKING,
];

export const HomeStack = () => {
  const navigation = useNavigation();

  const route = useRoute();

  React.useLayoutEffect(() => {
    if (
      tabHiddenRoutes.includes(
        getFocusedRouteNameFromRoute(route) as APP_SCREEN,
      )
    ) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen component={Home} name={APP_SCREEN.HOME} />
      <Stack.Screen
        component={ConsulterList}
        name={APP_SCREEN.CONSULTER_LIST}
      />
      <Stack.Screen
        component={ConsulterDetails}
        name={APP_SCREEN.CONSULTER_DETAILS}
      />
      <Stack.Screen
        component={ConfirmBooking}
        name={APP_SCREEN.CONFIRM_BOOKING}
      />
    </Stack.Navigator>
  );
};
