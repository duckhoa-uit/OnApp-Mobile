import React, { useEffect, useMemo, useState } from 'react';

import { dispatch } from '@common';
import {
  Block,
  Button,
  Divider,
  Icon,
  Text,
  TouchableScale,
} from '@components';
import { useChatContext } from '@features/authentication/chat/context';
import { useSlots } from '@hooks';
import { TimeFormat } from '@model/app';
import { EventType } from '@model/event-type';
import { ReserveSlotPayload, Slot } from '@model/slot';
import { User } from '@model/user';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions, slotActions } from '@redux-slice';
import { timeZone as getInviteeTimeZone } from '@utils/clock';
import dayjs, { ConfigType, Dayjs } from '@utils/dayjs';

import { useSlotPickerStyle } from './style';

import { AvailableTimes } from '../available-times';
import DatePickerHorizontal from '../date-picker-horizontal';

const SlotPicker = ({
  consulter,
  eventType,
  timeFormat,
  timeZone,
  // recurringEventCount,
  users = [],
  seatsPerTimeSlot,
  weekStart = 0,
}: {
  consulter: User;
  eventType: Pick<EventType, 'id' | 'slug' | 'length'>;
  timeFormat: TimeFormat;
  timeZone?: string;
  seatsPerTimeSlot?: number;
  recurringEventCount?: number;
  users?: string[];
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  ethSignature?: string;
}) => {
  const { startDMChatRoom } = useChatContext();

  const [selectedDate, setSelectedDate] = useState<Dayjs>();

  const styles = useSlotPickerStyle(!!selectedDate);

  const [browsingDate, setBrowsingDate] = useState<Dayjs>();

  const [date, setDate] = useState<string>();

  const [month] = useState<string>();

  const [selectedSlot, setSelectedSlot] = useState<Slot>();

  const duration = eventType.length.toString();

  useEffect(() => {
    // Etc/GMT is not actually a timeZone, so handle this select option explicitly to prevent a hard crash.
    if (timeZone === 'Etc/GMT') {
      setBrowsingDate(
        dayjs
          .utc()
          .set('date', 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0),
      );

      if (date) {
        setSelectedDate(dayjs.utc(date));
      }
    } else {
      // Set the start of the month without shifting time like startOf() may do.
      setBrowsingDate(
        dayjs
          .tz(month as ConfigType, timeZone)
          .set('date', 1)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0),
      );

      if (date) {
        // It's important to set the date immediately to the timeZone, dayjs(date) will convert to browsertime.
        setSelectedDate(dayjs.tz(date, timeZone));
      }
    }
  }, [date, month, duration, timeZone]);

  const { slots: monthSlots, isLoading } = useSlots({
    eventTypeId: eventType.id,
    eventTypeSlug: eventType.slug,
    usernameList: users,
    startTime: dayjs().startOf('day'),
    endTime: browsingDate?.endOf('month'),
    timeZone,
    duration,
  });

  const { slots: selectedDateSlots, isLoading: _isLoadingSelectedDateSlots } =
    useSlots({
      eventTypeId: eventType.id,
      eventTypeSlug: eventType.slug,
      usernameList: users,
      startTime: selectedDate?.startOf('day'),
      endTime: selectedDate?.endOf('day'),
      timeZone,
      duration,
      /** Prevent refetching is we already have this data from month slots */
      enabled: !!selectedDate,
    });

  /** Hide skeleton if we have the slot loaded in the month query */
  const isLoadingSelectedDateSlots = useMemo(() => {
    if (!selectedDate) {
      return _isLoadingSelectedDateSlots;
    }

    if (selectedDateSlots[selectedDate.format('YYYY-MM-DD')]) {
      return false;
    }

    if (monthSlots[selectedDate.format('YYYY-MM-DD')]) {
      return false;
    }

    return false;
  }, [
    _isLoadingSelectedDateSlots,
    monthSlots,
    selectedDate,
    selectedDateSlots,
  ]);

  const reserveSlot = () => {
    // FIXME: update selectedSlot to slot store in redux/storage
    if (duration && selectedSlot) {
      const payload: ReserveSlotPayload = {
        eventTypeId: eventType.id,
        slotUtcStartDate: dayjs(selectedSlot.time).utc().format(),
        // TODO: need to check db again here after request
        slotUtcEndDate: dayjs(selectedSlot.time)
          .utc()
          .add(parseInt(duration, 10), 'minute')
          .format(),
      };

      dispatch(appActions.startProcess());

      dispatch(
        slotActions.reserveSlot(
          payload,
          () => {
            dispatch(appActions.endProcess());

            navigateScreen(APP_SCREEN.CONFIRM_BOOKING, {
              consulter,
              date:
                dayjs
                  .utc(selectedSlot.time)
                  .tz(getInviteeTimeZone())
                  .format() ?? '',
              duration: parseInt(duration, 10),
              type: eventType.id,
              slug: eventType.slug,
              timeFormat,
            });
          },
          err => {
            console.log('🚀 ~ file: index.tsx:145 ~ reserveSlot ~ err:', err);

            dispatch(appActions.endProcess());
          },
        ),
      );
    }
  };

  return (
    <Block direction="column">
      <Block>
        <DatePickerHorizontal
          browsingDate={browsingDate || dayjs().startOf('month')}
          includedDates={Object.keys(monthSlots).filter(
            k => monthSlots[k].length > 0,
          )}
          //  FIXME: update locale variable when finish
          isLoading={isLoading}
          locale={'vi'}
          onChange={newDate => {
            setDate(newDate.format('YYYY-MM-DD'));
          }}
          selected={selectedDate}
          weekStart={weekStart}
        />
      </Block>

      <Block marginTop={30} paddingHorizontal={20}>
        <Divider colorTheme="line" />
      </Block>

      <Block
        flex={1}
        marginTop={30}
        paddingHorizontal={20}
        style={{ minHeight: 100 }}
      >
        <AvailableTimes
          date={selectedDate}
          eventTypeId={eventType.id}
          eventTypeSlug={eventType.slug}
          isLoading={isLoadingSelectedDateSlots}
          onSelectSlot={setSelectedSlot}
          seatsPerTimeSlot={seatsPerTimeSlot}
          selectedSlot={selectedSlot}
          slots={
            selectedDate &&
            (selectedDateSlots[selectedDate.format('YYYY-MM-DD')] ||
              monthSlots[selectedDate.format('YYYY-MM-DD')])
          }
          timeFormat={timeFormat}
        />
      </Block>

      <Block direction="row" marginTop={30} paddingHorizontal={20}>
        <Button
          onPress={() => {
            startDMChatRoom(consulter);
          }}
          style={styles.chatBtn}
        >
          <Icon icon="chat" />
        </Button>
        <TouchableScale
          containerStyle={styles.submitBtn}
          // disabled={!!selectedSlot}
          onPress={reserveSlot}
        >
          <Text style={styles.textBtn}>Đặt lịch hẹn</Text>
        </TouchableScale>
      </Block>
    </Block>
  );
};

export default SlotPicker;
