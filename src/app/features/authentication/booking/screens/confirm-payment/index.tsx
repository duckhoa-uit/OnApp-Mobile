import React, { memo, useMemo, useState } from 'react';

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
import { useQueryPaymentStatus } from '@networking/queries/payment/use-query-payment-status';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';

import { useConfirmBookingScreenStyle } from './style';
import { generateVietQrUrl } from './utils';

const ConfirmPaymentScreen = () => {
  // const notifyOnChangeProps = useFocusNotifyOnChangeProps();

  const [clickFetched, setClickFetched] = useState(false);

  const theme = useTheme();

  const route = useRoute<RootRouteProps<APP_SCREEN.CONFIRM_PAYMENT>>();

  const { appointmentId, amount } = route.params;

  const QRImageUrl = useMemo(
    () => generateVietQrUrl({ amount, id: appointmentId }),
    [],
  );

  const styles = useConfirmBookingScreenStyle();

  const { isLoading: isCheckingStatus, failureCount } = useQueryPaymentStatus({
    variables: {
      appointmentId,
    },
    // notifyOnChangeProps,
    enabled: clickFetched,
    onError() {
      setClickFetched(false);
    },
    onSuccess: paid => {
      console.log(
        '🚀 ~ file: index.tsx:41 ~ ConfirmPaymentScreen ~ data:',
        paid,
      );

      if (paid) {
        replaceScreen(APP_SCREEN.AUTHORIZE, {
          screen: APP_SCREEN.APPOINTMENTS_STACK,
          params: {
            screen: APP_SCREEN.APPOINTMENTS,
          },
        });
      }
    },
    refetchOnWindowFocus: false,
  });

  const handleBypass = () => {
    replaceScreen(APP_SCREEN.AUTHORIZE, {
      screen: APP_SCREEN.APPOINTMENTS_STACK,
      params: {
        screen: APP_SCREEN.APPOINTMENTS,
      },
    });
  };

  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
      >
        <NavigationBar callback={goBack} title="Thanh Toán" />

        <Block paddingHorizontal={20} style={styles.body}>
          <Image
            resizeMode={'contain'}
            source={{
              uri: QRImageUrl,
            }}
            style={{ width: 360, height: 360 }}
          />
        </Block>

        <Block paddingHorizontal={20} style={styles.submitArea}>
          <Block style={styles.submitBtnContainer}>
            <TouchableScale
              containerStyle={styles.submitBtn}
              onPress={() => !clickFetched && setClickFetched(true)}
            >
              <Text
                color="#fff"
                fontSize={14}
                fontWeight={'600'}
                lineHeight={17}
              >
                {failureCount}
                {clickFetched && isCheckingStatus ? 'Loading...' : 'Kiểm tra'}
              </Text>
            </TouchableScale>
          </Block>
        </Block>

        {failureCount > 5 && (
          <Block paddingHorizontal={20} style={styles.submitArea}>
            <Block style={styles.submitBtnContainer}>
              <TouchableScale
                containerStyle={styles.checkLaterBtn}
                onPress={handleBypass}
              >
                <Text fontSize={14} fontWeight={'600'} lineHeight={17}>
                  Kiểm tra sau
                </Text>
              </TouchableScale>
            </Block>
          </Block>
        )}
      </Screen>
    </Block>
  );
};

export const ConfirmPayment = memo(ConfirmPaymentScreen, isEqual);
