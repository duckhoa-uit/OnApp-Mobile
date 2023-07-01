import { TimeFormat } from '@model/app';
import { User } from '@model/user';
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps as RNStackScreenProps } from '@react-navigation/stack';

export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',

  AUTHORIZE = 'AUTHORIZE',
  HOME = 'HOME',

  HOME_STACK = 'HOME_STACK',
  CONSULTER_LIST = 'CONSULTER_LIST',
  CONSULTER_DETAILS = 'CONSULTER_DETAILS',
  CONFIRM_BOOKING = 'CONFIRM_BOOKING',

  MESSAGE_STACK = 'MESSAGE_STACK',
  APPOINTMENTS = 'APPOINTMENTS',

  CALENDAR_STACK = 'CALENDAR_STACK',

  PROFILE_STACK = 'PROFILE_STACK',
}

export type RootStackParamList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.CONSULTER_LIST]: undefined;
  [APP_SCREEN.CONSULTER_DETAILS]: {
    consulter: User;
  };
  [APP_SCREEN.CONFIRM_BOOKING]: {
    consulter: User;
    type: number;
    duration: number;
    date: string;
    slug: string;
    timeFormat: TimeFormat;
  };
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
