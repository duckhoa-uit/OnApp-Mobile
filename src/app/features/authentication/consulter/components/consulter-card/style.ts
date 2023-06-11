import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { ColorDefault } from '@theme/color';

export const useConsulterCardStyle = () => {
  // state
  // const theme = useTheme();

  // result
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: '#fff',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          flex: 1,
        },

        /*scoll view settings*/
        ScrollView: {
          width: '100%',
          flexDirection: 'column',
          flex: 1,
        },

        scrollContainer: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 20,
        },
        btnBorder: {
          borderColor: ColorDefault.line,
          borderWidth: 1,
          borderRadius: 12,
        },
        BigButton: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 8,
        },
        doctorImage: {
          backgroundColor: '#C4C4C4',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          width: 112,
          height: 112,
          overflow: 'hidden',
        },
        doctorInfo: {
          flexDirection: 'column',
          marginLeft: 18,
          flex: 1,
        },
        doctorSpecialty: {
          marginTop: 8,
          fontSize: 12,
          fontWeight: '500',
          color: ColorDefault.textSecondary,
        },
        ratingBox: {
          marginTop: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E8F3F1',
          padding: 4,
          borderRadius: 2,
          width: 40,
        },
        rating: {
          marginLeft: 4,
          fontSize: 12,
          color: ColorDefault.greenNeon,
        },
        star: {
          color: ColorDefault.greenNeon,
        },
        doctorLocation: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginTop: 8,
        },
        locationIcon: {
          color: ColorDefault.textSecondary,
        },
        locationText: {
          marginLeft: 4,
          fontSize: 12,
          fontWeight: '500',
          color: ColorDefault.textSecondary,
        },
      }),
    [],
  );
};
