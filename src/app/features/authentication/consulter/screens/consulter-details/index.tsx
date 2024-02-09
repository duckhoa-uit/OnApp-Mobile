import React, { memo, useEffect, useState } from 'react';

import isEqual from 'react-fast-compare';

import { Block, NavigationBar, Screen, Text } from '@components';
import { goBack } from '@navigation/navigation-service';
import { APP_SCREEN, RootRouteProps } from '@navigation/screen-types';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import { timeZone as localStorageTimeZone } from '@utils/clock';
import dayjs from '@utils/dayjs';
import notEmpty from '@utils/not-empty';
import { detectBrowserTimeFormat } from '@utils/time-zone';

import ConsulterCard from '../../components/consulter-card';
import SlotPicker from '../../components/slot-picker';

const ConsulterDetailsComponent = () => {
  const route = useRoute<RootRouteProps<APP_SCREEN.CONSULTER_DETAILS>>();

  const theme = useTheme();

  const { consulter } = route.params;

  const eventType = consulter.eventTypes?.[0];

  const [timeZone, setTimeZone] = useState<string>();

  useEffect(() => {
    setTimeZone(localStorageTimeZone() ?? dayjs.tz.guess());
  }, []);

  const timeFormat = detectBrowserTimeFormat;

  if (!eventType) {
    goBack();

    return <></>;
  }

  const userList = eventType.users
    ? eventType.users.map(user => user.username).filter(notEmpty)
    : [];

  // useEffect(() => {
  //   (async () => {
  //     if (!eventType) {
  //       return;
  //     }

  //     const response = await NetWorkService.Get<
  //       ApiBaseResponse<Record<string, TimeSlot[]>>
  //     >({
  //       url: ApiConstants.GET_SLOT,
  //       params: {},
  //     });

  //     if (!response) {
  //       return;
  //     }

  //     if (validResponse(response)) {
  //       const _users = response.data.data;

  //       console.log('🚀 ~ file: index.tsx:33 ~ userData:', _users);
  //     }
  //   })();
  // }, []);

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
      >
        <NavigationBar callback={goBack} title="Thông tin tư vấn viên" />

        <Block direction="row" marginTop={10} paddingHorizontal={20}>
          <ConsulterCard border={false} consulter={consulter} />
        </Block>
        <Block direction="column" marginTop={30} paddingHorizontal={20}>
          <Text fontSize={16} fontWeight={'600'} lineHeight={19}>
            Thông tin
          </Text>
          <Text
            colorTheme="textSecondary"
            fontSize={12}
            style={{ marginTop: 10 }}
          >
            {consulter.profile?.bio ??
              'Sức khoẻ tâm thần cần được coi trọng ngang với sức khoẻ thể chất. Bệnh tâm thần có thể chữa khỏi nếu phát hiện sớm và điều trị kịp thời.'}
          </Text>
        </Block>

        <Block marginTop={30}>
          <SlotPicker
            consulter={consulter}
            eventType={eventType}
            timeFormat={timeFormat}
            timeZone={timeZone}
            users={userList}
            weekStart={
              typeof consulter.weekStart === 'string'
                ? ([
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ].indexOf(consulter.weekStart) as 0 | 1 | 2 | 3 | 4 | 5 | 6)
                : consulter.weekStart
            }
          />
          {/* seatsPerTimeSlot={eventType.seatsPerTimeSlot || undefined}
            bookingAttendees={bookingAttendees || undefined}
            recurringEventCount={recurringEventCount}
            ethSignature={gateState.rainbowToken} */}
        </Block>

        <Block />
      </Screen>
    </Block>
  );
};

export const ConsulterDetails = memo(ConsulterDetailsComponent, isEqual);
