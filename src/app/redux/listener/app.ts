import {
  checkKeyInObject,
  STORAGE_KEY_APP_THEME,
  STORAGE_KEY_TOKEN,
  validResponse,
} from '@common';
import { takeLatestListeners } from '@listener';
import { UserApiGetResponse } from '@model/user';
import { ApiConstants, NetWorkService } from '@networking';
import { MyAppTheme, ThemeType } from '@theme';
import { loadString } from '@utils/storage';

import { appActions } from '../action-slice/app';

takeLatestListeners()({
  actionCreator: appActions.startLoadApp,
  effect: async (_, listenerApi) => {
    const appTheme = loadString(STORAGE_KEY_APP_THEME);

    const token = loadString(STORAGE_KEY_TOKEN);

    if (typeof token === 'string') {
      listenerApi.dispatch(appActions.setToken(token));

      // Fetch user data & store to redux
      const response = await NetWorkService.Get<UserApiGetResponse>({
        url: ApiConstants.GET_ME,
      });

      if (!response) {
        return;
      }

      if (validResponse(response)) {
        const userData = response.data.data;

        console.log('🚀 ~ file: app.ts:36 ~ effect: ~ userData:', userData);

        listenerApi.dispatch(appActions.setAppProfile(userData));
      }
    }

    if (
      typeof appTheme === 'string' &&
      checkKeyInObject(MyAppTheme, appTheme)
    ) {
      listenerApi.dispatch(appActions.setAppTheme(appTheme as ThemeType));
    }

    listenerApi.dispatch(appActions.endLoadApp());
  },
});
