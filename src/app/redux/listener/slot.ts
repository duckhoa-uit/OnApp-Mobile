import { validResponse } from '@common';
import { takeLatestListeners } from '@listener';
import { ReserveSlotResponse } from '@model/slot';
import { ApiConstants, NetWorkService } from '@networking';

import { slotActions } from '../action-slice/slot';

takeLatestListeners()({
  actionCreator: slotActions.reserveSlot,
  effect: async (action, listenerApi) => {
    const { body, onFailure, onSucceeded } = action.payload;

    const response = await NetWorkService.Post<ReserveSlotResponse>({
      url: ApiConstants.RESERVE_SLOT,
      body,
    });

    if (!response) {
      return;
    }

    if (validResponse(response)) {
      listenerApi.dispatch(slotActions.resetSlotState());

      onSucceeded();

      return;
    }

    onFailure(response.msg ?? '');
  },
});
