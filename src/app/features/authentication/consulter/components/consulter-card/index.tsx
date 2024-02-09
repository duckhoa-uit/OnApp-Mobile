import React from 'react';
import { Image, StyleProp, View, ViewStyle } from 'react-native';

import { images } from '@assets/image';
import { Button, Icon, Text } from '@components';
import ConditionalWrapper from '@components/conditional-wrapper';
import { User } from '@model/user';

import { useConsulterCardStyle } from './style';

interface ConsulterCardProps {
  consulter: User;
  border?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const ConsulterCard = ({
  consulter,
  style,
  onPress,
  border: showBorder = true,
}: ConsulterCardProps) => {
  const styles = useConsulterCardStyle();

  return (
    <ConditionalWrapper
      condition={!!onPress || showBorder}
      // eslint-disable-next-line react/no-unstable-nested-components
      wrapper={children => (
        <Button onPress={onPress} style={styles.btnBorder}>
          {children}
        </Button>
      )}
    >
      <View style={[styles.BigButton, style]}>
        <View style={styles.doctorImage}>
          <Image
            source={
              consulter.photo ? { uri: consulter.photo } : images.default_avt
            }
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.doctorInfo}>
          <Text fontSize={15} fontWeight={'600'}>
            {consulter.name}
          </Text>
          <Text style={styles.doctorSpecialty}>
            {consulter.profile?.headline}
            {/* {'Tâm lý học trị liệu'} */}
          </Text>

          <View style={styles.ratingBox}>
            <Icon icon="star" size={13} />
            {/* <Text style={styles.rating}>{consulter.rating}</Text> */}
            <Text style={styles.rating}>{4.7}</Text>
          </View>

          <View style={styles.doctorLocation}>
            <Icon icon="location" size={13} />
            <Text style={styles.locationText}>{'Quận 5'}</Text>
          </View>
        </View>
      </View>
    </ConditionalWrapper>
  );
};

export default ConsulterCard;
