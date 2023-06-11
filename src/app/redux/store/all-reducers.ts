import { appReducer, authenticationReducer, slotReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  slot: slotReducer,
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof allReducer>;
