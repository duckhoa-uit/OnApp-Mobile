import React from 'react';

import { ChatRoomScreen } from '@features/authentication/chat/screens/chat-room';
import { ChatsScreen } from '@features/authentication/chat/screens/chats';
import { APP_SCREEN } from '@navigation/screen-types';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const tabHiddenRoutes = [APP_SCREEN.CHAT_ROOM];

export const ChatStack = () => {
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
    // <OverlayProvider>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen component={ChatsScreen} name={APP_SCREEN.CHATS} />
      <Stack.Screen component={ChatRoomScreen} name={APP_SCREEN.CHAT_ROOM} />
    </Stack.Navigator>
    // </OverlayProvider>
  );
};
