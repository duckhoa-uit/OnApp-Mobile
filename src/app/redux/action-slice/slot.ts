import { SLICE_NAME } from '@config/type';
import { ReserveSlotPayload, SlotState } from '@model/slot';
import * as Action from '@redux-action-type/slot';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialSlotState: SlotState = {
  eventTypeId: undefined,
  eventSlug: undefined,
  duration: undefined,
  selectedDate: undefined,
  timeZone: undefined,
};

const slotSlice = createSlice({
  name: SLICE_NAME.SLOT,
  initialState: initialSlotState,
  reducers: {
    setSlotState: (state, { payload }: PayloadAction<Partial<SlotState>>) => {
      state = { ...state, ...payload };
    },
    resetSlotState: state => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialSlotState;
    },
  },
});

const reserveSlot = createAction(
  Action.RESERVE_SLOT,
  (
    body: ReserveSlotPayload,
    onSucceeded: () => void,
    onFailure: (msg: string) => void,
  ) => ({
    payload: {
      body,
      onSucceeded,
      onFailure,
    },
  }),
);

export const slotActions = { ...slotSlice.actions, reserveSlot };

export const slotReducer = slotSlice.reducer;
