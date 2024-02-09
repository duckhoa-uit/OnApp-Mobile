import React, { memo } from 'react';

import isEqual from 'react-fast-compare';
import {
  KeyboardAvoidingView,
  KeyboardGestureArea,
} from 'react-native-keyboard-controller';

import { NavigationBar, Screen } from '@components';
import { goBack, replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';
import { Channel, MessageInput, MessageList } from 'stream-chat-react-native';

import { ChatKeyboardCompatibleView } from '../../chat-keyboard-compatible-view';
import { useChatContext } from '../../context';

const ChatRoomScreenComponent = () => {
  const theme = useTheme();

  const { currentChannel } = useChatContext();

  if (!currentChannel) {
    return null;
  }

  return (
    <Screen
      backgroundColor={theme.colors.background}
      bottomInsetColor="transparent"
      statusBarStyle="dark-content"
    >
      <KeyboardAvoidingView
        behavior={'padding'}
        contentContainerStyle={{ flex: 1 }}
        keyboardVerticalOffset={20}
        style={{ flex: 1 }}
      >
        <Channel
          KeyboardCompatibleView={ChatKeyboardCompatibleView}
          channel={currentChannel}
          disableKeyboardCompatibleView
        >
          <NavigationBar
            callback={() => replaceScreen(APP_SCREEN.CHATS)}
            title={currentChannel.data?.name || 'Channel'}
          />
          <MessageList />
          <MessageInput />
        </Channel>
      </KeyboardAvoidingView>
    </Screen>
  );
};

// export const ChatRoomScreen = ChatRoomScreenComponent;
export const ChatRoomScreen = memo(ChatRoomScreenComponent, isEqual);
