/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { HEADER_HEIGHT } from '@common';
import { STREAM_CHAT_API_KEY } from '@env';
import { User } from '@model/user';
import { navigateScreen, replaceScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { selectAppProfile, selectStreamChatToken } from '@redux-selector/app';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-react-native';

type ChatContextType = {
  currentChannel?: ChannelType;
  setCurrentChannel: Dispatch<
    React.SetStateAction<ChannelType<StreamChatGenerics> | undefined>
  >;
  startDMChatRoom: (user: User) => void;
};

export const ChatContext = createContext<ChatContextType>({
  currentChannel: undefined,
  setCurrentChannel: () => {},
  startDMChatRoom: () => {},
});

type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;
type StreamChatGenerics = {
  attachmentType: LocalAttachmentType;
  channelType: LocalChannelType;
  commandType: LocalCommandType;
  eventType: LocalEventType;
  messageType: LocalMessageType;
  reactionType: LocalReactionType;
  userType: LocalUserType;
};

const chatClient =
  StreamChat.getInstance<StreamChatGenerics>(STREAM_CHAT_API_KEY);

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { bottom, top } = useSafeAreaInsets();

  const [currentChannel, setCurrentChannel] = useState<ChannelType>();

  const [clientReady, setClientReady] = useState(false);

  const streamChatToken = useSelector(selectStreamChatToken);

  const profile = useSelector(selectAppProfile);

  useEffect(() => {
    if (!profile || !streamChatToken) {
      return;
    }

    const initChat = async () => {
      try {
        console.log('🚀 ~ initChat ~ profile:', profile);

        const connectPromise = chatClient.connectUser(
          {
            id: profile.id,
            name: profile.name,
          },
          streamChatToken,
        );

        setClientReady(true);

        await connectPromise;
      } catch (error) {
        console.log(
          '🚀 ~ An error occurred while connecting the user to StreamChat:',
          error,
        );
      }
    };

    if (!chatClient?.userID) {
      initChat();
    }

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [profile, streamChatToken]);

  const startDMChatRoom = async (chatWithUser: User) => {
    if (!chatClient || !chatClient.userID) {
      return;
    }

    try {
      const newChannel = chatClient.channel('messaging', {
        members: [chatClient.userID, chatWithUser.id],
      });

      await newChannel.watch();

      console.log('🚀 ~ startDMChatRoom ~ newChannel:', newChannel);

      setCurrentChannel(newChannel);

      replaceScreen(APP_SCREEN.AUTHORIZE, {
        screen: APP_SCREEN.CHAT_STACK,
        params: {
          screen: APP_SCREEN.CHAT_ROOM,
        },
      });

      // navigateScreen(APP_SCREEN.CHATS);

      // // navigation.goBack();
      // navigateScreen(APP_SCREEN.CHAT_ROOM);
    } catch (error) {
      console.log('🚀 ~ startDMChatRoom ~ error:', error);
    }
  };

  // const joinEventChatRoom = async (event: any) => {
  //   if (!chatClient) {
  //     return;
  //   }

  //   const channelId = `room-${event.id}`;

  //   const eventChannel = chatClient.channel('livestream', channelId, {
  //     name: event.name,
  //   });

  //   await eventChannel.watch({ watchers: { limit: 100 } });

  //   setCurrentChannel(eventChannel);

  //   navigateScreen(APP_SCREEN.CHATS);

  //   navigateScreen(APP_SCREEN.CHAT_ROOM);
  // };

  if (!chatClient) {
    return <ActivityIndicator />;
  }

  const value = {
    clientReady,
    chatClient,
    currentChannel,
    setCurrentChannel,
    startDMChatRoom,
    // joinEventChatRoom,
  };

  if (!chatClient) {
    return <>{children}</>;
  }

  return (
    <OverlayProvider bottomInset={bottom + HEADER_HEIGHT} topInset={top}>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
