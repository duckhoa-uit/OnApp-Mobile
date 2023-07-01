import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import ConditionalWrapper from '@components/ConditionalWrapper';
import { LocationMarkerIcon, StarIcon } from '@components/icons';

import styles from './styles';

const DoctorCard = ({ doctor, style, onPress }) => {
  return (
    <ConditionalWrapper
      condition={!!onPress}
      wrapper={children => (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      )}
    >
      <View style={[styles.BigButton, style]}>
        <View style={styles.doctorImage}>
          <Image
            source={{ uri: doctor.avatar }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{'Bác sĩ ' + doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.speciality}</Text>

          <View style={styles.ratingBox}>
            <StarIcon style={styles.star} />
            <Text style={styles.rating}>{doctor.rating}</Text>
          </View>

          <View style={styles.doctorLocation}>
            <LocationMarkerIcon />
            <Text style={styles.locationText}>{doctor.location}</Text>
          </View>
        </View>
      </View>
    </ConditionalWrapper>
  );
};

export default DoctorCard;
