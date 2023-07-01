import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import ConditionalWrapper from '@components/ConditionalWrapper';
import colors from '@constants/colors';

import { addDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';

import styles from './styles';

const DateCard = ({
  date = new Date(),
  disabled = false,
  isActive = false,
  onPress,
}) => {
  const bgStyle = isActive
    ? {
        backgroundColor: colors.PRIMARY,
      }
    : {
        backgroundColor: colors.WHITE,
      };

  const labelStyle = isActive
    ? { color: colors.WHITE }
    : { color: colors.TEXT_SECONDARY };

  const numberStyle = isActive
    ? { color: colors.WHITE }
    : { color: colors.TEXT_PRIMARY };

  return (
    <ConditionalWrapper
      condition={!!onPress || disabled}
      wrapper={children => (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      )}
    >
      <View style={[styles.dateCardContainer, bgStyle]}>
        <Text style={[styles.dateString, labelStyle]}>
          {format(date, 'E', { locale: vi })}
        </Text>
        <Text style={[styles.dateNumber, numberStyle]}>
          {format(date, 'd')}
        </Text>
      </View>
    </ConditionalWrapper>
  );
};

const DatePicker = ({ selectedIndex = 0, onChangeDate }) => {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      data={[1, 2, 3, 4, 5, 6, 7]}
      horizontal
      renderItem={({ item }) => (
        <DateCard
          date={addDays(new Date(), item)}
          isActive={item === selectedIndex}
          onPress={onChangeDate(item)}
        />
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default DatePicker;
