/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { APP_SCREEN } from '@navigation/screen-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        name={APP_SCREEN.HOME_STACK}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon icon="home" color={'#D92659'} />
              ) : (
                <VectorIcon icon="home" />
              )}
            </View>
          ),
        }}
      />
      <Main.Screen
        name={APP_SCREEN.MESSAGE_STACK}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon icon="message" color={'#D92659'} />
              ) : (
                <VectorIcon icon="message" />
              )}
            </View>
          ),
        }}
      />
      <Main.Screen
        name={APP_SCREEN.CALENDAR_STACK}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon icon="calendar" color={'#D92659'} />
              ) : (
                <VectorIcon icon="calendar" />
              )}
            </View>
          ),
        }}
      />
      <Main.Screen
        name={APP_SCREEN.PROFILE_STACK}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBarItemContainer}>
              {focused ? (
                <VectorIcon icon="profile" color={'#D92659'} />
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
