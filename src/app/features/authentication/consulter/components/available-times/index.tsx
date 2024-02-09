import React, { memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Button, ListView, Skeleton, Text } from '@components';
import { TimeFormat } from '@model/app';
import { Slot } from '@model/slot';
import { timeZone } from '@utils/clock';
import dayjs, { Dayjs } from '@utils/dayjs';

import { useAvailableTimesStyle } from './style';

type AvailableTimesProps = {
  timeFormat: TimeFormat;
  eventTypeId: number;
  eventTypeSlug: string;
  date?: Dayjs;
  seatsPerTimeSlot?: number | null;
  slots?: Slot[];
  isLoading: boolean;
  selectedSlot?: Slot;
  onSelectSlot: (slot: Slot) => void;
};

export const AvailableTimes = memo(
  ({
    slots = [],
    isLoading,
    // date,
    // eventTypeId,
    // eventTypeSlug,
    timeFormat,
    // seatsPerTimeSlot,
    selectedSlot,
    onSelectSlot,
  }: AvailableTimesProps) => {
    console.log('🚀 ~ file: index.tsx:38 ~ slots:', isLoading, slots.length);

    const styles = useAvailableTimesStyle();

    const renderItem: ListRenderItem<Slot> = ({ item: slot }) => {
      // const bookingObj: Booking = {
      //   //     ...router.query,
      //   date: dayjs.utc(slot.time).tz(timeZone()).format(),
      //   type: eventTypeId,
      //   slug: eventTypeSlug,
      //   timeFormat,
      // };
      // const bookingUrl: BookingURL = {
      //   pathname: router.pathname.endsWith('/embed') ? '../book' : 'book',
      //   query: {
      //     ...router.query,
      //     date: dayjs.utc(slot.time).tz(timeZone()).format(),
      //     type: eventTypeId,
      //     slug: eventTypeSlug,
      //     timeFormat,
      //   },
      // };

      // If event already has an attendee add booking id
      // if (slot.bookingUid) {
      //   bookingObj.bookingUid = slot.bookingUid;
      // }

      // let slotFull, notEnoughSeats;

      // if (slot.attendees && seatsPerTimeSlot) {
      //   slotFull = slot.attendees >= seatsPerTimeSlot;
      // }

      // if (slot.attendees && bookingAttendees && seatsPerTimeSlot) {
      //   notEnoughSeats = slot.attendees + bookingAttendees > seatsPerTimeSlot;
      // }

      // // no more seat
      // if (seatsPerTimeSlot && slot.attendees && (slotFull || notEnoughSeats)) {
      //   return <Text>no more</Text>;
      // }

      return (
        <TimeCard
          isActive={selectedSlot?.time === slot.time}
          key={slot.time}
          onPress={() => onSelectSlot(slot)}
          time={dayjs(slot.time).tz(timeZone()).format(timeFormat)}
        />
      );
    };

    const keyExtractor = useCallback(
      (item: Slot, index: number) => `${item.time}_${index}`,
      [],
    );

    const renderListEmpty = () => (
      <Text
        colorTheme="textSecondary"
        fontSize={14}
        lineHeight={18}
        textAlign="center"
      >
        Không còn giờ trống{'\n'}Vui lòng chọn ngày khác
      </Text>
    );

    return (
      <Block block>
        {/* {!!date && (
          <Block>
            <Text>{nameOfDay('vi', Number(date.format('d')), 'short')}, </Text>
            <Text colorTheme="textSecondary">
              {date.toDate().toLocaleString('vi', { month: 'long' })}{' '}
              {date.format(' DD ')}
            </Text>
          </Block>
        )} */}
        {slots.length > 0 ? (
          <ListView
            ListEmptyComponent={renderListEmpty}
            data={slots}
            keyExtractor={keyExtractor}
            numColumns={3}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        ) : null}

        {!isLoading && !slots.length && (
          <Text style={styles.allBookedText}>
            Đã hết lịch trong ngày được chọn
          </Text>
        )}

        {isLoading && !slots.length && (
          <Skeleton>
            <Block style={{ flexDirection: 'row' }}>
              <Block style={styles.timeCardContainer} />
              <Block style={styles.timeCardContainer} />
              <Block style={styles.timeCardContainer} />
            </Block>
          </Skeleton>
        )}
      </Block>
    );
  },
  isEqual,
);

interface TimeCardProps {
  time: string;
  isActive?: boolean;
  disabled?: boolean;
  onPress: () => void;
}
const TimeCard = ({
  time,
  isActive = false,
  onPress,
  disabled = false,
}: TimeCardProps) => {
  const styles = useAvailableTimesStyle(isActive);

  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={styles.timeCardContainer}
      text={time}
      textColorTheme={isActive ? 'background' : 'textSecondary'}
    />
  );
};
