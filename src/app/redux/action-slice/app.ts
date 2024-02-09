import { SLICE_NAME } from '@config/type';
import { AppState } from '@model/app';
import { User } from '@model/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';

const initialAppState: AppState = {
  internetState: true,
  profile: null,
  token: undefined,
  streamChatToken: undefined,
  /**
   * default true to load app
   */
  loadingApp: false,
  showDialog: false,
  theme: 'default',
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    setInternetState: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setStreamChatToken: (state, { payload }: PayloadAction<string>) => {
      state.streamChatToken = payload;
    },
    setAppProfile: (state, { payload }: PayloadAction<User>) => {
      state.profile = payload;
    },
    setAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    startLoadApp: state => {
      state.loadingApp = true;
    },
    endLoadApp: state => {
      state.loadingApp = false;
    },
    startProcess: state => {
      state.showDialog = true;
    },
    endProcess: state => {
      state.showDialog = false;
    },
    logout: state => {
      state.token = undefined;

      state.streamChatToken = undefined;

      state.profile = null;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
