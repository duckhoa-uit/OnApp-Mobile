/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import ChatContextProvider from '@features/authentication/chat/context';
import { APP_SCREEN } from '@navigation/screen-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppointmentsStack } from './appointment-stack';
import { ChatStack } from './chat-stack';
import { HomeStack } from './home-stack';

const Main = createBottomTabNavigator();

export const MainScreen = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.rootContainer,
      }}
    >
      <Main.Screen
        component={HomeStack}
        name={APP_SCREEN.HOME_STACK}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon color={'#D92659'} icon="home" />
              ) : (
                <VectorIcon icon="home" />
              )}
            </View>
          ),
        }}
      />
      <Main.Screen
        component={ChatStack}
        name={APP_SCREEN.CHAT_STACK}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon color={'#D92659'} icon="message" />
              ) : (
                <VectorIcon icon="message" />
              )}
            </View>
          ),
        }}
      />
      <Main.Screen
        component={AppointmentsStack}
        name={APP_SCREEN.APPOINTMENTS_STACK}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon color={'#D92659'} icon="calendar" />
              ) : (
                <VectorIcon icon="calendar" />
              )}
            </View>
          ),
        }}
      />
      <Main.Screen
        component={HomeStack}
        name={APP_SCREEN.PROFILE_STACK}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon color={'#D92659'} icon="profile" />
              ) : (
                <VectorIcon icon="profile" />
              )}
            </View>
          ),
        }}
      />
    </Main.Navigator>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: 80,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: '#fff',
    bottom: 0,
    padding: 10,
    width: '100%',
  },
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
