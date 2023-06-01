import { STORAGE_KEY_TOKEN, validResponse } from '@common';
import { takeLatestListeners } from '@listener';
import { LoginApiResponse } from '@model/authentication';
import { ApiConstants, NetWorkService } from '@networking';
import { saveString } from '@utils/storage';

import { appActions } from '../action-slice/app';
import { authenticationActions } from '../action-slice/authentication';

takeLatestListeners(true)({
  actionCreator: authenticationActions.login,
  effect: async (action, listenerApi) => {
    const { body } = action.payload;

    console.log({ body });

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
      const token = response.data.data.access_token;

      saveString(STORAGE_KEY_TOKEN, token);

      listenerApi.dispatch(appActions.setToken(token));
    }
  },
});
