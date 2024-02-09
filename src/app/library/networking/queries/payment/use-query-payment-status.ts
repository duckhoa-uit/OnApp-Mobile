import { createQuery } from 'react-query-kit';

import { validResponse } from '@common';
import { ApiBaseResponse, ApiConstants } from '@networking/api';
import { NetWorkService } from '@networking/service';
import type { AxiosError } from 'axios';

type Response = boolean;

type Variables = {
  appointmentId: number;
};

export const useQueryPaymentStatus = createQuery<
  Response,
  Variables,
  AxiosError
>({
  primaryKey: ApiConstants.CHECK_PAYMENT,
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get<ApiBaseResponse<boolean>>({
      url: primaryKey,
      params: variables,
    }).then(response => {
      if (!response) {
        return false;
      }

      if (validResponse(response)) {
        return response.data.data;
      }

      return false;
    });
  },
});
