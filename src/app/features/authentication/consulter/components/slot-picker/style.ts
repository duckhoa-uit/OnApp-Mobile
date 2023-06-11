import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ColorDefault } from '@theme/color';

export const useSlotPickerStyle = (isActive: boolean) => {
  // state
  // const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        submitBtn: {
          width: '100%',
          backgroundColor: isActive
            ? ColorDefault.primary
            : ColorDefault.primaryLight,
          borderRadius: 10,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        textBtn: {
          color: '#fff',
          fontWeight: '600',
          fontSize: 14,
        },
      }),
    [isActive],
  );
};
