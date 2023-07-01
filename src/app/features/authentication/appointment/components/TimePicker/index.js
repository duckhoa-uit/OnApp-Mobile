import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ConditionalWrapper from '@components/ConditionalWrapper';
import colors from '@constants/colors';
import { format, parse } from 'date-fns';

import styles from './styles';

const TimeCard = ({ time, isActive = false, onPress, disabled = false }) => {
  const bgStyle = isActive
    ? {
        backgroundColor: colors.PRIMARY,
        borderColor: colors.PRIMARY,
      }
    : {
        backgroundColor: colors.WHITE,
      };

  const timeStringStyle = isActive
    ? { color: colors.WHITE }
    : { color: colors.TEXT_SECONDARY };

  return (
    <ConditionalWrapper
      condition={!!onPress || disabled}
      wrapper={children => (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      )}
    >
      <View style={[styles.timeCardContainer, bgStyle]}>
        <Text style={[styles.timeString, timeStringStyle]}>
          {format(time, 'kk:mm a')}
        </Text>
      </View>
    </ConditionalWrapper>
  );
};

const timeDataSource = ['09', '10', '11', '13', '14', '15', '16', '19', '20'];

const TimePicker = ({ selectedTime, onChangeTime }) => {
  useEffect(() => {
    if (!selectedTime) {
      onChangeTime(timeDataSource[0]);
    }
  }, [selectedTime]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {timeDataSource.map(time => (
        <TimeCard
          isActive={selectedTime === time}
          key={time}
          onPress={onChangeTime(time)}
          time={parse(time, 'kk', new Date())}
        />
      ))}
    </View>
  );
};

export default TimePicker;
