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
        // className="-mt-4 flex h-full w-full flex-col content-center items-center justify-center"
        allBookedContainer: {
          marginTop: -16,
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        },
        // className="text-emphasis my-6 text-xl"
        allBookedText: {
          textAlign: 'center',
          color: ColorDefault.text,
          marginVertical: 24,
        },
      }),
    [isActive, screenWidth],
  );
};
