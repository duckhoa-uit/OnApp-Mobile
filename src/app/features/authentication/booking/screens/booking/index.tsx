import React, { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import isEqual from 'react-fast-compare';

import { dispatch, validResponse } from '@common';
import {
  Block,
  Button,
  Icon,
  NavigationBar,
  Screen,
  Text,
  TouchableScale,
} from '@components';
import ConsulterCard from '@features/authentication/consulter/components/consulter-card';
import {
  AppointmentApiResponse,
  AppointmentCreateBody,
} from '@model/appointment';
import { EventType, EventTypeApiResponse } from '@model/event-type';
import { goBack } from '@navigation/navigation-service';
import { APP_SCREEN, RootRouteProps } from '@navigation/screen-types';
import { ApiConstants, NetWorkService } from '@networking';
import { useRoute } from '@react-navigation/native';
import { appActions } from '@redux-slice';
import { useTheme } from '@theme';
import { timeZone } from '@utils/clock';
import dayjs from '@utils/dayjs';
import { parseDate } from '@utils/parse-dates';

import { useConfirmBookingScreenStyle } from './style';

import { BookingInfoItem } from '../../components/booking-info-item';

const ConfirmBookingScreen = () => {
  const [eventType, setEventType] = useState<EventType>();

  const theme = useTheme();

  const route = useRoute<RootRouteProps<APP_SCREEN.CONFIRM_BOOKING>>();

  const { consulter, date, duration, type, timeFormat } = route.params;

  const styles = useConfirmBookingScreenStyle();

  const bookAppointment = async () => {
    if (!eventType) {
      return;
    }

    const payload: AppointmentCreateBody = {
      start: dayjs(date).utc().format(),
      end: dayjs(date).utc().add(duration, 'minute').format(),
      eventTypeId: eventType.id,
      eventTypeSlug: eventType.slug,
      timeZone: timeZone(),
      // FIXME: update to dynamic language
      // language: i18n.language,
      language: 'vi',
      // bookingUid: booking?.uid,
      // user: router.query.user,
    };

    console.log(
      '🚀 ~ file: index.tsx:65 ~ bookAppointment ~ payload:',
      payload,
    );

    try {
      dispatch(appActions.startProcess());

      const res = await NetWorkService.Post<AppointmentApiResponse>({
        url: ApiConstants.CREATE_APPOINTMENT,
        body: payload,
      });

      console.log('🚀 ~ file: index.tsx:71 ~ bookAppointment ~ res:', res);
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:69 ~ bookAppointment ~ error:', error);
    } finally {
      dispatch(appActions.endProcess());
    }
  };

  useEffect(() => {
    (async () => {
      const response = await NetWorkService.Get<EventTypeApiResponse>({
        url: `${ApiConstants.GET_EVENT_TYPE}/${type}`,
      });

      if (!response) {
        return;
      }

      if (validResponse(response)) {
        const _eventType = response.data.data;

        setEventType(_eventType);

        // let bookingUidWithSeats: string | null = null;
        // if (duration) {
        //   // If it's not reschedule but event Type has seats we should obtain
        //   // the bookingUid regardless and use it to get the booking
        //   const _res = await NetWorkService.Get<
        //     ApiBaseResponse<{ uid: string }>
        //   >({
        //     url: ApiConstants.GET_APPOINTMENT_UID,
        //     params: {
        //       eventTypeId: _eventType.id,
        //       startTime: dayjs(date).toISOString(),
        //       endTime: dayjs(date).add(duration, 'minute').toISOString(),
        //     },
        //   });

        //   if (!_res) {
        //     return;
        //   }

        //   if (validResponse(_res)) {
        //     const currentSeats = _res.data.data;

        //     if (currentSeats && currentSeats) {
        //       bookingUidWithSeats = currentSeats.uid;
        //     }
        //   }
        // }

        // // let appointment: Appointment | null = null;
        // // if (rescheduleUid || query.bookingUid || bookingUidWithSeats) {
        // if (bookingUidWithSeats) {
        //   const _res = await NetWorkService.Get<ApiBaseResponse<Appointment>>({
        //     url: `${ApiConstants.GET_APPOINTMENT_BY_UID}/${bookingUidWithSeats}`,
        //   });

        //   if (!_res) {
        //     return;
        //   }

        //   if (validResponse(_res)) {
        //     const _appointment = _res.data.data;

        //     console.log(
        //       '🚀 ~ file: index.tsx:132 ~ _appointment:',
        //       _appointment,
        //     );

        //     setAppointment(_appointment);
        //   }
        // }
      }
    })();

    return () => {
      NetWorkService.Delete({
        url: ApiConstants.REMOVE_MARKED_SLOT,
      });
    };
  }, []);

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
      >
        <NavigationBar callback={goBack} title="Đặt lịch hẹn" />

        <ScrollView style={styles.body}>
          <Block>
            <ConsulterCard consulter={consulter} />
          </Block>

          <BookingInfoItem
            icon={<Icon icon="calendar" />}
            label={'Ngày hẹn'}
            value={parseDate(date, 'vi', {
              selectedTimeFormat: timeFormat,
            })}
          />
          <BookingInfoItem
            icon={<Icon icon="editSquare" />}
            label={'Lý do'}
            value={'Tư vấn tâm lý'}
          />
        </ScrollView>

        <Block paddingHorizontal={20}>
          <Block style={styles.paymentMethodContainer}>
            <Text fontSize={16} fontWeight={'600'} lineHeight={19}>
              Phương thức thanh toán
            </Text>
            <Button style={styles.paymentMethod}>
              <Text
                fontSize={16}
                fontStyle={'italic'}
                fontWeight={'900'}
                lineHeight={19}
              >
                VISA
              </Text>
              <Button>
                <Text colorTheme="textSecondary" fontSize={12} lineHeight={15}>
                  Thay đổi
                </Text>
              </Button>
            </Button>
          </Block>
        </Block>

        <Block paddingHorizontal={20} style={styles.submitArea}>
          <Block style={styles.priceSummary}>
            <Text
              colorTheme="textSecondary"
              fontSize={14}
              fontWeight={'500'}
              lineHeight={17}
            >
              Tổng cộng
            </Text>
            <Text fontSize={18} fontWeight={'600'} lineHeight={22}>
              500.000VNĐ
            </Text>
          </Block>
          <Block style={styles.submitBtnContainer}>
            <TouchableScale
              containerStyle={styles.submitBtn}
              onPress={bookAppointment}
            >
              <Text
                color="#fff"
                fontSize={14}
                fontWeight={'600'}
                lineHeight={17}
              >
                Đặt lịch hẹn
              </Text>
            </TouchableScale>
          </Block>
        </Block>
      </Screen>
    </Block>
  );
};

export const ConfirmBooking = memo(ConfirmBookingScreen, isEqual);
