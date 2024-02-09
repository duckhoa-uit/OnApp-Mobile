// useChatClient.js

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { STREAM_CHAT_API_KEY } from '@env';
import { selectAppProfile, selectStreamChatToken } from '@redux-selector/app';
import { StreamChat } from 'stream-chat';

const chatClient = StreamChat.getInstance(STREAM_CHAT_API_KEY);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  const profile = useSelector(selectAppProfile);

  const streamChatToken = useSelector(selectStreamChatToken);

  useEffect(() => {
    if (!profile || !streamChatToken) {
      return;
    }

    const setupClient = async () => {
      const user = {
        id: profile?.id,
        name: profile?.name,
      };

      try {
        chatClient.connectUser(user, streamChatToken);

        setClientIsReady(true);

        // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
        // But in case you need the chat to load from offline storage first then you should render chat components
        // immediately after calling `connectUser()`.
        // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,
          );
        }
      }
    };

    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [profile, streamChatToken]);

  return {
    clientIsReady,
  };
};
