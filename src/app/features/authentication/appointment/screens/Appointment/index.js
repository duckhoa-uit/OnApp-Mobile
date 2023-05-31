// import starImg from '@components/asset/star.png';
import DoctorCard from '@components/doctor/DoctorCard';
import { NavigationBar } from '@components/NavigationBar';
import routes from '@constants/routes';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker';
import doctorList from '../../doctorList.js';
import styles from './styles';

export const Appointment = ({ route, navigation }) => {
  const { id: doctorId } = route.params;
  const [selectedDateIndex, setSelectedDateIndex] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09');

  const doctorData = useMemo(() => {
    const doctor = doctorList.find((_) => _.id === doctorId);
    return doctor ? doctor : {};
  }, [doctorId]);

  const handleChangeDateIndex = (index) => () => {
    setSelectedDateIndex(index);
  };

  const handleChangeTimeSlot = (slot) => () => {
    setSelectedTimeSlot(slot);
  };

  const handleSubmit = () => {
    navigation.navigate(routes.APPOINTMENT_CHECKOUT, {
      doctorId,
      dateIndex: selectedDateIndex,
      timeSlot: selectedTimeSlot
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar
        callback={navigation.goBack}
        title={'Thông tin bác sĩ'}
      />

      <ScrollView style={styles.body}>
        <View style={styles.doctorInfo}>
          <DoctorCard
            doctor={doctorData}
            style={{ borderColor: 'transparent' }}
          />
        </View>

        <View style={styles.BriefInfo}>
          <Text style={styles.BriefLabel}>Thông tin</Text>
          <Text style={styles.BriefContent}>{doctorData.briefInfo}</Text>
        </View>

        <View style={styles.datePickerContainer}>
          <DatePicker
            selectedIndex={selectedDateIndex}
            onChangeDate={handleChangeDateIndex}
          />
        </View>
        <View style={styles.timePickerContainer}>
          <TimePicker
            selectedTime={selectedTimeSlot}
            onChangeTime={handleChangeTimeSlot}
          />
        </View>
      </ScrollView>

      <View style={styles.submitArea}>
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
