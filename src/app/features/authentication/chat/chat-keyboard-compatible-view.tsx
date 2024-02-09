import React from 'react';
import { KeyboardAvoidingViewProps, Platform } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEADER_HEIGHT } from '@common';
import { KeyboardCompatibleView } from 'stream-chat-react-native';

export const ChatKeyboardCompatibleView = ({
  children,
}: KeyboardAvoidingViewProps) => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'android') {
    return children;
  }

  const iosVerticalOffset = insets.bottom + HEADER_HEIGHT;

  return (
    <KeyboardCompatibleView keyboardVerticalOffset={iosVerticalOffset}>
      {children}
    </KeyboardCompatibleView>
  );
};
