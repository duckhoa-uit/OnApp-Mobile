import { SLICE_NAME } from '@config/type';
import {
  Appointment,
  AppointmentFilter,
  AppointmentState,
  GetUserAppointmentsQueryParams,
} from '@model/appointment';
import * as Action from '@redux-action-type/appointment';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialAppointmentState: AppointmentState = {
  filter: 'upcoming',
  appointments: [],
};

const appointmentSlice = createSlice({
  name: SLICE_NAME.APPOINTMENT,
  initialState: initialAppointmentState,
  reducers: {
    setAppointmentFilter: (
      state,
      { payload }: PayloadAction<AppointmentFilter>,
    ) => {
      state.filter = payload;
    },
    setAppointments: (state, { payload }: PayloadAction<Appointment[]>) => {
      state.appointments = payload;
    },
  },
});

const getUserAppointments = createAction(
  Action.GET_APPOINTMENTS,
  (
    params: GetUserAppointmentsQueryParams,
    onSucceeded: () => void,
    onFailure: (msg: string) => void,
  ) => ({
    payload: {
      params,
      onSucceeded,
      onFailure,
    },
  }),
);

export const appointmentActions = {
  ...appointmentSlice.actions,
  getUserAppointments,
};

export const appointmentReducer = appointmentSlice.reducer;
