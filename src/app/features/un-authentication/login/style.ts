import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';

export const useLoginStyle = () => {
  // state
  const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        },
        loginIcons: {
          width: 284,
          height: 192,
        },
        inputContainer: {
          marginTop: 20,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // input: {
        //   paddingHorizontal: 25,
        //   borderRadius: GlobalStyles.INPUT_RADIUS,
        //   width: '100%',
        //   height: 58,
        //   backgroundColor: colors.BG_BOX,
        //   color: colors.TEXT_PRIMARY,
        //   fontWeight: '400',
        //   fontSize: GlobalStyles.FONT_SIZE
        // },
        forgotPasswordContainer: {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginTop: 5,
        },
        // forgotPasswordText: {
        //   // color: colors.TEXT_SECONDARY
        //   opacity: 0.5,
        //   fontSize: GlobalStyles.FONT_SIZE_SECONDARY
        // },
        submitBtnContainer: {
          width: '100%',
          marginTop: 15,
        },
        loginButton: {
          width: '100%',
          backgroundColor: theme.colors.primary,
          borderRadius: 10,
          paddingVertical: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        loginText: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 14,
        },
        signUpContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          alignContent: 'center',
        },
        // signUpText: {
        //   fontSize: GlobalStyles.FONT_SIZE_SECONDARY,
        //   color: colors.PRIMARY,
        //   fontWeight: '400',
        // },

        dividerContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          // paddingVertical: GlobalStyles.PADDING_DEFAULT
        },
        dividerLine: {
          flex: 1,
          height: 1,
          // backgroundColor: colors.TEXT_SECONDARY
        },
        dividerText: {
          width: 40,
          textAlign: 'center',
          // color: colors.TEXT_SECONDARY
        },
      }),
    [theme.colors.primary],
  );
};
