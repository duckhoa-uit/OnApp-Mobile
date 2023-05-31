import ArrowBackIcon from '@components/icons/ArrowBackIcon';
import colors from '@constants/colors';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export const NavigationBar = React.forwardRef(
  ({ accessoryRight, iconLeft, showLeftIcon = true, callback, title, theme = 'dark' }, ref) => {
    const onCallBack = () => {
      if (callback) callback();
    };

    const color = useMemo(() => (theme === 'dark' ? colors.TEXT_PRIMARY : colors.WHITE), [theme]);

    return (
      <View
        ref={ref}
        style={[styles.navigationBar, { color }]}
      >
        {showLeftIcon && (
          <TouchableOpacity
            onPress={onCallBack}
            style={styles.btnBack}
          >
            {iconLeft ? iconLeft : <ArrowBackIcon style={{ color }} />}
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          {typeof title === 'string' ? (
            <Text style={[styles.title, { color }]}>{title}</Text>
          ) : (
            title
          )}
        </View>
        <View style={styles.accessoryRight}>{accessoryRight}</View>
      </View>
    );
  }
);
