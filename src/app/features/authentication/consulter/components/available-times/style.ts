import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { ColorDefault } from '@theme/color';

export const useAvailableTimesStyle = (isActive?: boolean) => {
  // state
  // const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        timeCardContainer: {
          marginTop: 12,
          marginHorizontal: 4,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: isActive ? ColorDefault.primary : ColorDefault.lineDark,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: isActive ? ColorDefault.primary : '#fff',
          width: (screenWidth - 40 - 12 * 2) / 3,
          height: 36,
        },
      }),
    [isActive, screenWidth],
  );
};
