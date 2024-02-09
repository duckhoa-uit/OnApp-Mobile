import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, NavigationBar, Screen } from '@components';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { useTheme } from '@theme';
import { ColorDefault } from '@theme/color';
import { Channel } from 'stream-chat';
import { ChannelList } from 'stream-chat-react-native';

import { useChatContext } from '../../context';

const ChatsScreenComponent = () => {
  const theme = useTheme();

  const { setCurrentChannel } = useChatContext();

  const onSelect = (chanel: Channel) => {
    setCurrentChannel(chanel);

    navigateScreen(APP_SCREEN.CHAT_ROOM);
  };

  // render
  return (
    <Block block justifyContent="center" paddingTop={0}>
      <Screen
        backgroundColor={theme.colors.background}
        bottomInsetColor="transparent"
        statusBarStyle="dark-content"
      >
        <NavigationBar showLeftIcon={false} title="Messages" />

        <Block
          block
          style={{
            borderBottomWidth: 1,
            borderColor: ColorDefault.line,
            marginTop: 15,
            paddingBottom: 12,
            width: '100%',
          }}
        >
          <ChannelList onSelect={onSelect} />
        </Block>
      </Screen>
    </Block>
  );
};

export const ChatsScreen = memo(ChatsScreenComponent, isEqual);
