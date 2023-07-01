import { createQuery } from 'react-query-kit';

import { validResponse } from '@common';
import { Appointment, AppointmentFilter } from '@model/appointment';
import { ApiBaseResponse, ApiConstants } from '@networking/api';
import { NetWorkService } from '@networking/service';
import type { AxiosError } from 'axios';

type Response = Appointment[];

type Variables = {
  filters: {
    status: AppointmentFilter;
  };
  limit?: number | null | undefined;
  cursor?: number | null | undefined;
};

export const useQueryAppointments = createQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: ApiConstants.GET_USER_APPOINTMENTS,
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    return NetWorkService.Get<ApiBaseResponse<Response>>({
      url: primaryKey,
      params: variables,
    }).then(response => {
      if (!response) {
        return [];
      }

      if (validResponse(response)) {
        return response.data.data;
      }

      return [];
    });
  },
});
