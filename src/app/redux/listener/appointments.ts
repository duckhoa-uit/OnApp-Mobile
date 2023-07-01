import { validResponse } from '@common';
import { takeLatestListeners } from '@listener';
import { Appointment } from '@model/appointment';
import { ApiBaseResponse, ApiConstants, NetWorkService } from '@networking';

import { appointmentActions } from '../action-slice/appointment';

takeLatestListeners()({
  actionCreator: appointmentActions.getUserAppointments,
  effect: async (action, listenerApi) => {
    const { params, onFailure, onSucceeded } = action.payload;

    const response = await NetWorkService.Get<ApiBaseResponse<Appointment[]>>({
      url: ApiConstants.GET_USER_APPOINTMENTS,
      params: params,
    });

    if (!response) {
      return;
    }

    if (validResponse(response)) {
      const list = response.data.data;

      listenerApi.dispatch(appointmentActions.setAppointments(list));

      onSucceeded();

      return;
    }

    onFailure(response.msg ?? '');
  },
});
