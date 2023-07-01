import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useNavigationBarStyle = () => {
  // state

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        navigationBar: {
          flexDirection: 'row',
          height: 44,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        },
        btnBack: {
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99,
          marginLeft: 20,
          color: 'inherit',
        },
        titleContainer: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'inherit',
        },
        title: {
          fontSize: 16,
          fontWeight: '600',
          textAlign: 'center',
          flex: 1,
        },
        accessoryRight: {
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [],
  );
};
