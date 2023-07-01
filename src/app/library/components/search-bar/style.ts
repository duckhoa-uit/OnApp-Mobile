import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useSearchBarStyle = () => {
  // result
  return useMemo(
    () =>
      StyleSheet.create({
        searchContainer: {
          marginLeft: 12,
        },
        searchIconImageStyle: {
          width: 18,
          height: 18,
        },
        clearIconImageStyle: {
          width: 15,
          height: 15,
        },
        clearIconContainer: {
          marginRight: 12,
          marginLeft: 'auto',
        },
        spinnerContainer: {
          marginLeft: 6,
        },
        _container: {
          height: 40,
          flex: 1,
          borderRadius: 12,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fdfdfd',
          shadowColor: '#757575',
          shadowRadius: 8,
          shadowOpacity: 0.18,
          shadowOffset: {
            width: 0,
            height: 3,
          },
        },
        _textInputStyle: {
          width: '80%',
          marginLeft: 12,
          color: '#19191a',
        },
      }),
    [],
  );
};
