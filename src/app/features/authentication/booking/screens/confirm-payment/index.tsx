import React, { memo, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import isEqual from 'react-fast-compare';

import {
  Block,
  Image,
  NavigationBar,
  Screen,
  Text,
  TouchableScale,
} from '@components';
import { goBack, replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN, RootRouteProps } from '@navigation/screen-types';
import { useQueryPaymentQr } from '@networking/queries/payment/use-query-payment-qr';
import { useQueryPaymentStatus } from '@networking/queries/payment/use-query-payment-status';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';

import { useConfirmBookingScreenStyle } from './style';

const ConfirmPaymentScreen = () => {
  const [clickFetched, setClickFetched] = useState(false);

  const theme = useTheme();

  const route = useRoute<RootRouteProps<APP_SCREEN.CONFIRM_PAYMENT>>();

  const { appointmentId, amount } = route.params;

  const styles = useConfirmBookingScreenStyle();

  const { data: isPaid, isLoading: isCheckingStatus } = useQueryPaymentStatus({
    variables: {
      appointmentId,
    },
    refetchInterval: 2000,
    enabled: clickFetched,
    onSuccess: data => {
      console.log(
        '🚀 ~ file: index.tsx:41 ~ ConfirmPaymentScreen ~ data:',
        data,
      );

      replaceScreen(APP_SCREEN.AUTHORIZE, {
        screen: APP_SCREEN.APPOINTMENTS_STACK,
        params: {
          screen: APP_SCREEN.APPOINTMENTS,
        },
      });
    },
  });

  const { data, isLoading } = useQueryPaymentQr({
    variables: { appointmentId, amount },
    keepPreviousData: true,
  });

  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
      >
        <NavigationBar callback={goBack} title="Thanh Toán" />

        <Block paddingHorizontal={20} style={styles.body}>
          {isLoading ? (
            <Block style={{ width: 360, height: 360 }}>
              <ActivityIndicator />
            </Block>
          ) : null}
          {data?.qrDataURL ? (
            <Image
              resizeMode={'contain'}
              source={{
                uri: data.qrDataURL,
              }}
              style={{ width: 360, height: 360 }}
            />
          ) : null}
          {/* <Text>{JSON.stringify(data)}</Text> */}
        </Block>

        <Block
          paddingBottom={20}
          paddingHorizontal={20}
          style={styles.submitArea}
        >
          <Block style={styles.submitBtnContainer}>
            <TouchableScale
              containerStyle={styles.submitBtn}
              // disabled={isCheckingStatus}
              onPress={() => !clickFetched && setClickFetched(true)}
            >
              <Text
                color="#fff"
                fontSize={14}
                fontWeight={'600'}
                lineHeight={17}
              >
                {clickFetched ? 'Loading...' : 'Kiểm tra'}
              </Text>
            </TouchableScale>
          </Block>
        </Block>
      </Screen>
    </Block>
  );
};

export const ConfirmPayment = memo(ConfirmPaymentScreen, isEqual);
