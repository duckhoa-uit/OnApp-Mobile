import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { LocationMarkerIcon, StarIcon } from '@components/icons';
import ConditionalWrapper from '@components/ConditionalWrapper';

const DoctorCard = ({ doctor, style, onPress }) => {
  return (
    <ConditionalWrapper
      condition={!!onPress}
      wrapper={(children) => <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>}
    >
      <View style={[styles.BigButton, style]}>
        <View style={styles.doctorImage}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: doctor.avatar }}
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
