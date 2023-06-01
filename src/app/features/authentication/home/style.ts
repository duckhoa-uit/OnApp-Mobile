import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';

export const useHomeStyle = () => {
  // state
  const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        header: {
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 106,
          paddingBottom: 26,
        },
        headerText: {
          fontSize: 24,
          color: 'white',
          fontWeight: '500',
        },
        whitePad: {
          marginTop: -27,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 20,
          paddingHorizontal: 20,
        },
        searchBar: {
          padding: 8,
          marginTop: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          borderColor: '#C2C2C2',
          borderWidth: 1,
          width: '100%',
          height: 48,
        },
        redBox: {
          flex: 1,
          height: 188,
          flexDirection: 'column',
          backgroundColor: '#FF5F5F',
          borderRadius: 10,
          alignItems: 'center',
          padding: 14,
        },
        whiteBox: {
          width: '100%',
          height: 110,
          marginTop: 14,
          backgroundColor: '#F3F8FA',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 6,
        },
        coverImg: {
          height: 100,
          width: 100,
          objectFit: 'cover',
        },
        bigButtonText: {
          fontSize: 12,
          fontWeight: 'bold',
          color: 'white',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          marginTop: 16,
        },
      }),
    [theme.colors.primary],
  );
};
