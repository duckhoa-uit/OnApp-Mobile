import React from 'react';
import { Image, StyleProp, View, ViewStyle } from 'react-native';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Icon, Text } from '@components';
import { Appointment } from '@model/appointment';
import dayjs from '@utils/dayjs';

import { useAppointmentCardStyle } from './style';

interface AppointmentCardProps {
  appointment: Appointment;
  border?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const styles = useAppointmentCardStyle();

  // const isUpcoming = new Date(appointment.endTime) >= new Date();

  // const isPast = new Date(appointment.endTime) < new Date();

  // const isCanceled = appointment.status === BookingStatus.CANCELED;

  // const isConfirmed = appointment.status === BookingStatus.ACCEPTED;

  // const isRejected = appointment.status === BookingStatus.REJECTED;

  // const isPending = appointment.status === BookingStatus.PENDING;

  // const isRecurring = appointment.recurringEventId !== null;
  // const isTabRecurring = appointment.listingStatus === "recurring";
  // const isTabUnconfirmed = appointment.listingStatus === "unconfirmed";

  const startDate = dayjs(appointment.startTime)
    .locale('vi-VN')
    .format('DD/MMM/YYYY');

  const startTime = dayjs(appointment.startTime)
    .locale('vi-VN')
    .format('hh:mm A');

  return (
    <Block style={[styles.BigButton]}>
      <Block alignItems="flex-start" block direction="row">
        <View style={styles.doctorInfo}>
          <Text fontSize={15} fontWeight={'600'}>
            {appointment.createdBy?.name}
          </Text>
          <Block marginTop={8}>
            <Text colorTheme={'textSecondary'} fontSize={12} fontWeight={'500'}>
              {/* {appointment.profile?.headline} */}
              {'Tâm lý học trị liệu'}
            </Text>
          </Block>
        </View>
        <View style={styles.doctorImage}>
          <Image
            source={{ uri: appointment.createdBy?.photo }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </Block>

      <Block direction="row" justifyContent="flex-start" marginTop={24}>
        <Block alignItems="center" direction="row">
          <VectorIcon colorTheme="text" icon="calendar" size={15} />
          <Block marginLeft={6}>
            <Text fontSize={12} fontWeight={'500'}>
              {startDate}
            </Text>
          </Block>
        </Block>
        <Block alignItems="center" direction="row" marginLeft={12}>
          <VectorIcon colorTheme="text" icon="clock" size={15} />
          <Block marginLeft={6}>
            <Text fontSize={12} fontWeight={'500'}>
              {startTime}
            </Text>
          </Block>
        </Block>
        <Block alignItems="center" direction="row" marginLeft={12}>
          <Icon icon="dot" size={6} />
          <Block marginLeft={6}>
            <Text fontSize={12} fontWeight={'500'} textTransform="capitalize">
              {appointment.status}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default AppointmentCard;
