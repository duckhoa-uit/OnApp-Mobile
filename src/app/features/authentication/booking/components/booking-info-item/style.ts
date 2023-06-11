import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ColorDefault } from '@theme/color';

export const useBookingInfoItemStyle = () => {
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        appointmentInfoContainer: {
          borderBottomWidth: 1,
          borderColor: ColorDefault.line,
          marginTop: 15,
          paddingBottom: 12,
          width: '100%',
        },
        appointInfoHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        },
        appointInfoContent: {
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 10,
          width: '100%',
        },
        appointmentInfoIcon: {
          alignItems: 'center',
          backgroundColor: ColorDefault.line,
          borderRadius: 18,
          height: 36,
          justifyContent: 'center',
          width: 36,
        },
        appointInfoText: {
          marginLeft: 15,
        },
      }),
    [],
  );
};
