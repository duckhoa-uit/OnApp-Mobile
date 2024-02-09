import React, { memo, useCallback } from 'react';
import { Dimensions, View } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Screen, Skeleton, Text } from '@components';
import { NavBar } from '@components/nav-bar';
import {
  CBAnimatedHeader,
  CBAnimatedNavBar,
  CBAnimatedTabBar,
  CBTabBar,
  CBTabRoute,
  CBTabView,
  Scene,
} from '@components/tabs-view';
import { useScrollManager } from '@hooks';
import { Appointment, AppointmentFilter } from '@model/appointment';
import { useQueryAppointments } from '@networking/queries/appointment/use-query-appointments';
import { useTheme } from '@theme';

import AppointmentCard from '../../components/appointment-card';

const initialWidth = Dimensions.get('window').width;

// export type tabKeys = AppointmentFilter

export const tabs: { key: AppointmentFilter; title: string }[] = [
  { key: 'upcoming', title: 'Hiện tại' },
  { key: 'past', title: 'Đã hoàn tất' },
  { key: 'canceled', title: 'Đã huỷ' },
];

const AppointmentsScreen = () => {
  const theme = useTheme();

  // const [filter, setFilter] = useState<tabKeys>('upcoming');

  // const [appointments, setAppointments] = useState<Appointment[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await NetWorkService.Get<
  //         ApiBaseResponse<Appointment[]>
  //       >({
  //         url: ApiConstants.GET_USER_APPOINTMENTS,
  //         params: {
  //           filters: {
  //             status: filter,
  //           },
  //         },
  //       });

  //       if (!response) {
  //         return;
  //       }

  //       if (validResponse(response)) {
  //         const _appointments = response.data.data;

  //         setAppointments(_appointments);
  //       }
  //     } catch (error) {
  //       console.log('🚀 ~ file: index.tsx:44 ~ ; ~ error:', error);
  //     }
  //   })();
  // }, []);

  const { scrollY, index, setIndex, ...sceneProps } = useScrollManager(tabs);

  const {
    data: appointments,
    isLoading,
    fetchStatus,
  } = useQueryAppointments({
    variables: {
      filters: {
        status: tabs[index].key,
      },
    },
  });

  const renderScene = useCallback(
    ({ route: tab }: { route: CBTabRoute }) => (
      <Scene
        ListEmptyComponent={fetchStatus === 'idle' ? ListEmptyComponent : null}
        ListFooterComponent={isLoading ? ListFooterComponent : null}
        data={appointments}
        isActive={tabs[index].key === tab.key}
        renderItem={({ item }) => (
          <AppointmentCard appointment={item as Appointment} />
        )}
        routeKey={tab.key}
        scrollY={scrollY}
        {...sceneProps}
      />
    ),
    [fetchStatus, isLoading, appointments, index, scrollY, sceneProps],
  );

  // render
  return (
    <>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
        statusColor="#fff"
      >
        <NavBar>
          <CBAnimatedNavBar scrollY={scrollY}>
            <Text fontSize={14} fontWeight={'700'}>
              Lịch hẹn
            </Text>
          </CBAnimatedNavBar>
        </NavBar>

        <View style={{ flex: 1 }}>
          <CBAnimatedHeader scrollY={scrollY}>
            <Text fontSize={20} fontWeight={'700'}>
              Lịch hẹn
            </Text>
          </CBAnimatedHeader>

          <CBTabView
            index={index}
            renderScene={renderScene}
            renderTabBar={p => (
              <CBAnimatedTabBar scrollY={scrollY}>
                <CBTabBar {...p} />
              </CBAnimatedTabBar>
            )}
            routes={tabs}
            setIndex={setIndex}
            width={initialWidth}
          />
        </View>
      </Screen>
    </>
  );
};

const ListFooterComponent = () => (
  <Skeleton>
    <Block block borderRadius={8} color="red" height={120} marginTop={16} />
    <Block block borderRadius={8} color="red" height={120} marginTop={16} />
    <Block block borderRadius={8} color="red" height={120} marginTop={16} />
  </Skeleton>
);

const ListEmptyComponent = () => (
  <Block marginTop={10} paddingHorizontal={10}>
    <Text>Không có lịch hẹn nào</Text>
  </Block>
);

export const Appointments = memo(AppointmentsScreen, isEqual);
