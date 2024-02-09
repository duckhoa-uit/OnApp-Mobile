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
  CONFIRM_PAYMENT = 'CONFIRM_PAYMENT',

  CHAT_STACK = 'CHAT_STACK',
  CHATS = 'CHATS',
  CHAT_ROOM = 'CHAT_ROOM',

  APPOINTMENTS_STACK = 'APPOINTMENTS_STACK',
  APPOINTMENTS = 'APPOINTMENTS',

  PROFILE_STACK = 'PROFILE_STACK',
}

export type RootStackParamList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]:
    | {
        screen: APP_SCREEN.APPOINTMENTS_STACK;
        params: {
          screen: APP_SCREEN.APPOINTMENTS;
          params?: undefined;
        };
      }
    | {
        screen: APP_SCREEN.CHAT_STACK;
        params: {
          screen: APP_SCREEN.CHAT_ROOM;
          params?: undefined;
        };
      };
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.CONSULTER_LIST]: undefined;
  [APP_SCREEN.APPOINTMENTS_STACK]: undefined;
  [APP_SCREEN.APPOINTMENTS]: undefined;
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
  [APP_SCREEN.CONFIRM_PAYMENT]: {
    appointmentId: number;
    amount: number;
  };

  [APP_SCREEN.CHAT_STACK]: undefined;
  [APP_SCREEN.CHATS]: undefined;
  [APP_SCREEN.CHAT_ROOM]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
