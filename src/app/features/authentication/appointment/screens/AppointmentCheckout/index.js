// import starImg from '@components/asset/star.png';
import DoctorCard from '@components/doctor/DoctorCard';
import AppointmentCalendarIcon from '@components/icons/AppointmentCalendarIcon';
import AppointmentReasonIcon from '@components/icons/AppointmentReasonIcon';
import { NavigationBar } from '@components/NavigationBar';
import { addDays, format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import doctorList from '../../doctorList.js';
import styles from './styles';

const AppointmentInfoItem = ({ label, icon, value }) => (
  <View style={styles.appointmentInfoContainer}>
    <View style={styles.appointInfoHeader}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity><Text style={styles.changeOption}>Thay đổi</Text></TouchableOpacity>
    </View>
    <View style={styles.appointInfoContent}>
      <View style={styles.appointmentInfoIcon}>
        {/* <SmallCalendarIcon width={20} height={20} /> */}
        {icon}
      </View>
      <Text style={styles.appointInfoText}>{value}</Text>
    </View>
  </View>
)

export const AppointmentCheckout = ({ route, navigation }) => {
  const { doctorId, dateIndex, timeSlot } = route.params;

  const doctorData = useMemo(() => {
    const doctor = doctorList.find((_) => _.id === doctorId);
    return doctor ? doctor : {};
  }, [doctorId]);


  const handleSubmit = () => { };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar
        callback={navigation.goBack}
        title={'Đặt lịch hẹn'}
      />

      <ScrollView style={styles.body}>
        <View style={styles.doctorInfo}>
          <DoctorCard doctor={doctorData} />
        </View>

        <AppointmentInfoItem
          label={'Ngày hẹn'}
          icon={<AppointmentCalendarIcon />}
          value={`${format(addDays(new Date(), dateIndex), 'EEE, do MMMM', { locale: vi })} | ${format(parse(timeSlot, 'kk', new Date()), 'kk:mm a')}`}
        />
        <AppointmentInfoItem
          label={'Lý do'}
          icon={<AppointmentReasonIcon />}
          value={'Tư vấn tâm lý'}
        />
      </ScrollView>

      <View style={styles.paymentMethodContainer}>
        <Text style={styles.label}>Phương thức thanh toán</Text>
        <TouchableOpacity style={styles.paymentMethod}>
          <Text style={styles.visa}>VISA</Text>
          <TouchableOpacity><Text style={styles.changeOption}>Thay đổi</Text></TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.submitArea}>
        <View style={styles.priceSummary}>
          <Text style={styles.priceLabel}>Tổng cộng</Text>
          <Text style={styles.priceTotal}>505.000VNĐ</Text>
        </View>
        <View style={styles.submitBtnContainer}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.textBtn}>Đặt lịch hẹn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
