import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';

export const useRegisterStyle = () => {
  // state
  const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        submitBtnContainer: {
          width: '100%',
          marginTop: 15,
        },
        loginIcons: {
          width: 284,
          height: 192,
        },
        registerButton: {
          width: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
          paddingVertical: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        registerText: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 14,
        },
        signInContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          alignContent: 'center',
        },
      }),
    [theme.colors.primary],
  );
};
