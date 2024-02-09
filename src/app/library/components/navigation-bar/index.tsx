import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { Button } from '@components/button';
import { Icon } from '@components/icon';
import { Text } from '@components/text';

import { useNavigationBarStyle } from './style';

interface NavigationBarProps {
  accessoryRight?: ReactNode;
  iconLeft?: ReactNode;
  showLeftIcon?: boolean;
  callback?: () => void;
  title: string;
  theme?: 'dark' | 'light';
}

export const NavigationBar = ({
  accessoryRight,
  iconLeft,
  showLeftIcon = true,
  callback,
  title,
  theme = 'dark',
}: NavigationBarProps) => {
  const styles = useNavigationBarStyle();

  const onCallBack = () => {
    if (callback) {
      callback();
    }
  };

  return (
    <View style={styles.navigationBar}>
      {showLeftIcon && (
        <Button onPress={onCallBack} style={styles.btnBack}>
          {iconLeft ? (
            iconLeft
          ) : (
            <Icon
              colorTheme={theme === 'dark' ? 'text' : 'primaryLight'}
              icon="back"
              size={16}
            />
          )}
        </Button>
      )}
      <View style={styles.titleContainer}>
        {typeof title === 'string' ? (
          <Text
            colorTheme={theme === 'dark' ? 'text' : 'primaryLight'}
            style={styles.title}
          >
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
      <View style={styles.accessoryRight}>{accessoryRight}</View>
    </View>
  );
};
