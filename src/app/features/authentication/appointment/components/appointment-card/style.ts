import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';

export const useAppointmentCardStyle = () => {
  const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        BigButton: {
          width: '100%',
          borderWidth: 1,
          borderColor: theme.colors.line,
          borderRadius: 8,
          padding: 16,
        },
        doctorImage: {
          backgroundColor: '#C4C4C4',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 24,
          width: 48,
          height: 48,
          overflow: 'hidden',
        },
        doctorInfo: {
          flexDirection: 'column',
          flex: 1,
        },
        doctorSpecialty: {
          marginTop: 8,
        },
      }),
    [theme.colors.line],
  );
};
