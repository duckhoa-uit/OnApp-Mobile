import { Platform } from 'react-native';

export const FontDefault = {
  primary: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
  }) as string,
  secondary: Platform.select({
    ios: 'Roboto-Medium',
    android: 'Roboto-Medium',
  }) as string,
};

export type FontFamily = keyof typeof FontDefault;
