import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';

export const selectAppConfig = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => ({
    loadingApp: app.loadingApp,
    showDialog: app.showDialog,
    theme: app.theme,
  }),
);

export const selectAppToken = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => app.token,
);

export const selectStreamChatToken = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => app.streamChatToken,
);

export const selectAppProfile = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => app.profile,
);
