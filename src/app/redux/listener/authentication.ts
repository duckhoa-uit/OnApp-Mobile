import {
  STORAGE_KEY_TOKEN,
  STORAGE_STREAMCHAT_TOKEN,
  validResponse,
} from '@common';
import { takeLatestListeners } from '@listener';
import { LoginApiResponse } from '@model/authentication';
import { UserApiGetResponse } from '@model/user';
import { ApiConstants, NetWorkService } from '@networking';
import { saveString } from '@utils/storage';

import { appActions } from '../action-slice/app';
import { authenticationActions } from '../action-slice/authentication';

takeLatestListeners(true)({
  actionCreator: authenticationActions.login,
  effect: async (action, listenerApi) => {
    const { body } = action.payload;

    await listenerApi.delay(1000);

    const response = await NetWorkService.Post<LoginApiResponse>({
      url: ApiConstants.LOGIN,
      body,
    });

    if (!response) {
      return;
    }

    if (validResponse(response)) {
      // TODO: do something when login success
      const { access_token } = response.data.data;

      const { streamchat_token } = response.data.data;

      saveString(STORAGE_KEY_TOKEN, access_token);

      saveString(STORAGE_STREAMCHAT_TOKEN, streamchat_token);

      listenerApi.dispatch(appActions.setToken(access_token));

      listenerApi.dispatch(appActions.setStreamChatToken(streamchat_token));

      const userResp = await NetWorkService.Get<UserApiGetResponse>({
        url: ApiConstants.GET_ME,
      });

      if (!userResp) {
        return;
      }

      if (validResponse(userResp)) {
        const userData = userResp.data.data;

        listenerApi.dispatch(appActions.setAppProfile(userData));
      }
    } else {
      console.log(
        '🚀 ~ file: authentication.ts:26 ~ effect: ~ response:',
        response,
      );
    }
  },
});
