import React, { memo, useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  View,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { Button, Text } from '@components';
import { daysInMonth, yyyymmdd } from '@utils/date-fns';
import { Dayjs } from '@utils/dayjs';
import notEmpty from '@utils/not-empty';
import { nameOfDay } from '@utils/weekday';
import dayjs from 'dayjs';

import { useDatePickerHorizontalStyle } from './style';

interface DateCardProps {
  locale?: string;
  date: Dayjs;
  disabled?: boolean;
  isActive: boolean;
  onPress: (date: Dayjs) => void;
}
const DateCard = memo(
  ({
    locale = 'vi',
    date = dayjs(),
    disabled = false,
    isActive = false,
    onPress,
  }: DateCardProps) => {
    const styles = useDatePickerHorizontalStyle(isActive);

    return (
      <Button
        disabled={disabled}
        onPress={() => onPress(date)}
        style={styles.dateCardContainer}
      >
        <Text style={styles.dateString}>
          {nameOfDay(locale, date.get('day'), 'short')}
        </Text>
        <Text style={styles.dateNumber}>{dayjs(date).format('DD')}</Text>
      </Button>
    );
  },
  isEqual,
);

export type DatePickerProps = {
  /** which day of the week to render the calendar. Usually Sunday (=0) or Monday (=1) - default: Sunday */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Fires whenever a selected date is changed. */
  onChange: (date: Dayjs) => void;
  /** Fires when the month is changed. */
  onMonthChange?: (date: Dayjs) => void;
  /** which date is currently selected (not tracked from here) */
  selected?: Dayjs | null;
  /** defaults to current date. */
  minDate?: Dayjs;
  /** Furthest date selectable in the future, default = UNLIMITED */
  maxDate?: Dayjs;
  /** locale, any IETF language tag, e.g. "hu-HU" - defaults to Browser settings */
  locale: string;
  /** Defaults to [], which dates are not bookable. Array of valid dates like: ["2022-04-23", "2022-04-24"] */
  excludedDates?: string[];
  /** defaults to all, which dates are bookable (inverse of excludedDates) */
  includedDates?: string[];
  /** Shows a small loading spinner next to the month name */
  isLoading?: boolean;
};

const DatePickerHorizontal = ({
  weekStart = 0,
  locale,
  // onMonthChange,
  minDate = dayjs.utc(),
  excludedDates = [],
  selected,
  // month,
  ...props
}: DatePickerProps & {
  browsingDate: Dayjs;
  weekStart: number;
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const browsingDate = props.browsingDate || dayjs().startOf('month');

  const weekdayOfFirst = browsingDate.day();

  const currentDate = minDate.utcOffset(browsingDate.utcOffset());

  const availableDates = useCallback(
    (includedDates: string[] | undefined) => {
      const dates = [];

      const lastDateOfMonth = browsingDate.date(daysInMonth(browsingDate));

      for (
        let date = currentDate;
        date.isBefore(lastDateOfMonth) || date.isSame(lastDateOfMonth, 'day');
        date = date.add(1, 'day')
      ) {
        // even if availableDates is given, filter out the passed included dates
        if (includedDates && !includedDates.includes(yyyymmdd(date))) {
          continue;
        }

        dates.push(yyyymmdd(date));
      }

      return dates;
    },
    [browsingDate, currentDate],
  );

  const includedDates = currentDate.isSame(browsingDate, 'month')
    ? availableDates(props.includedDates)
    : props.includedDates;

  const days: (Dayjs | null)[] = Array(
    (weekdayOfFirst - weekStart + 7) % 7,
  ).fill(null);

  for (
    let day = 1, dayCount = daysInMonth(browsingDate);
    day <= dayCount;
    day++
  ) {
    const date = browsingDate.set('date', day);

    days.push(date);
  }

  const nonNullableDays = days.filter(notEmpty);

  // TODO: support switch to another month
  // using month for display current month
  // const month = browsingDate
  //   ? new Intl.DateTimeFormat('vi', { month: 'long' }).format(
  //       new Date(browsingDate.year(), browsingDate.month()),
  //     )
  //   : null;

  const renderItem: ListRenderItem<dayjs.Dayjs> = useCallback(
    ({ item }) => (
      <DateCard
        date={item}
        // disabled={
        //   (includedDates && !includedDates.includes(yyyymmdd(item))) ||
        //   excludedDates.includes(yyyymmdd(item))
        // }
        isActive={selected ? yyyymmdd(selected) === yyyymmdd(item) : false}
        locale={locale}
        onPress={props.onChange}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected, includedDates, excludedDates, locale],
  );

  const keyExtractor = useCallback(
    (item: dayjs.Dayjs, index: number) => `${item.toString()}_${index}`,
    [],
  );

  return (
    <FlatList
      ItemSeparatorComponent={DateSlotsDivider}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
      data={nonNullableDays}
      decelerationRate={0}
      horizontal={true}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      snapToAlignment={'start'}
      // item width = 56, space between 12, padding container 20
      snapToInterval={Math.floor((screenWidth - 20) / (56 + 12)) * (56 + 12)}
    />
  );
};

const DateSlotsDivider = memo(() => <View style={{ width: 12 }} />, isEqual);

export default DatePickerHorizontal;
