import React, { ReactElement } from 'react';

import { Block, Button, Text } from '@components';
import { goBack } from '@navigation/navigation-service';

import { useBookingInfoItemStyle } from './style';

export const BookingInfoItem = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: ReactElement;
  value: any;
}) => {
  const styles = useBookingInfoItemStyle();

  return (
    <Block style={styles.appointmentInfoContainer}>
      <Block style={styles.appointInfoHeader}>
        <Text colorTheme="text" fontSize={16} fontWeight="600" lineHeight={19}>
          {label}
        </Text>
        <Button onPress={goBack}>
          <Text colorTheme="textSecondary" fontSize={12} fontWeight="400">
            Thay đổi
          </Text>
        </Button>
      </Block>
      <Block style={styles.appointInfoContent}>
        <Block style={styles.appointmentInfoIcon}>{icon}</Block>
        <Text
          fontSize={14}
          fontWeight={'500'}
          lineHeight={17}
          style={styles.appointInfoText}
        >
          {value}
        </Text>
      </Block>
    </Block>
  );
};
