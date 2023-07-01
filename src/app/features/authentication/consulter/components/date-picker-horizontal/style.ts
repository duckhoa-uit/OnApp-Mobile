import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ColorDefault } from '@theme/color';

export const useDatePickerHorizontalStyle = (isActive: boolean) => {
  // state
  // const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        dateCardContainer: {
          flexDirection: 'column',
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: ColorDefault.line,
          height: 72,
          width: 56,
          alignItems: 'center',
          backgroundColor: isActive ? ColorDefault.primary : '#fff',
        },
        dateString: {
          fontSize: 10,
          lineHeight: 12,
          color: isActive ? '#fff' : ColorDefault.textSecondary,
        },
        dateNumber: {
          marginTop: 6,
          fontWeight: '600',
          fontSize: 18,
          lineHeight: 22,
          color: isActive ? '#fff' : ColorDefault.text,
        },
      }),
    [isActive],
  );
};
