import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import APP_SCREEN from '@constants/routes';
import data from '../../doctorList.js';
import styles from './styles.js';
import { NavigationBar } from '@components/NavigationBar';
import DoctorCard from '@components/doctor/DoctorCard';

export const MakeAppointment = ({ navigation }) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <NavigationBar
        callback={navigation.goBack}
        title={'Đặt lịch hẹn'}
      />

      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={styles.scrollContainer}
      >
        {data.map((obj, index) => {
          return (
            <DoctorCard
              key={index}
              doctor={obj}
              onPress={() => {
                navigation.navigate(APP_SCREEN.APPOINTMENTS, {
                  id: obj.id
                });
              }}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
