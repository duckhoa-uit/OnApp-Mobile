import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import DoctorCard from '@components/doctor/DoctorCard';
import { NavigationBar } from '@components/NavigationBar';
import APP_SCREEN from '@constants/routes';

import styles from './styles.js';

import data from '../../doctorList.js';

export const MakeAppointment = ({ navigation }) => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <NavigationBar callback={navigation.goBack} title={'Đặt lịch hẹn'} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.ScrollView}
      >
        {data.map((obj, index) => {
          return (
            <DoctorCard
              doctor={obj}
              key={index}
              onPress={() => {
                navigation.navigate(APP_SCREEN.APPOINTMENTS, {
                  id: obj.id,
                });
              }}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
