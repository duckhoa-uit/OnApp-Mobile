import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';
import { ColorDefault } from '@theme/color';

export const useConfirmBookingScreenStyle = () => {
  const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          width: '100%',
          height: '100%',
          alignItems: 'center',
        },
        body: {
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          width: '100%',
          paddingHorizontal: 20,
        },
        label: {
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 19,
        },
        changeOption: {
          fontSize: 12,
          lineHeight: 15,
        },

        appointmentInfoContainer: {
          marginTop: 15,
          width: '100%',
          paddingBottom: 12,
          borderBottomWidth: 1,
          // borderColor: colors.BG_BOX,
        },
        appointInfoHeader: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        appointInfoContent: {
          marginTop: 10,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        },
        appointmentInfoIcon: {
          width: 36,
          height: 36,
          // backgroundColor: colors.BG_BOX,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
        },
        appointInfoText: {
          marginLeft: 15,
          fontWeight: '600',
          // fontSize: GlobalStyles.FONT_SIZE,
          lineHeight: 17,
          // color: colors.GRAY,
        },

        paymentMethodContainer: {
          width: '100%',
          paddingTop: 15,
          borderTopWidth: 1,
          borderColor: ColorDefault.line,
        },
        paymentMethod: {
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 15,
          background: '#fff',
          borderWidth: 1,
          borderColor: ColorDefault.line,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        visa: {
          fontStyle: 'italic',
          fontWeight: '900',
          fontSize: 16,
          lineHeight: 19,
          // color: colors.GRAY,
        },
        priceSummary: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },

        submitArea: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
        },
        submitBtnContainer: {
          flex: 1,
          marginLeft: 28,
        },
        submitBtn: {
          backgroundColor: theme.colors.primary,
          width: '100%',
          borderRadius: 10,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textBtn: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 14,
        },
      }),
    [theme.colors.primary],
  );
};
