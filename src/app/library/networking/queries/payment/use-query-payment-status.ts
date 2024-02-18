import { createQuery } from 'react-query-kit';

import { validResponse } from '@common';
import { showSnack } from '@components';
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
  retry(failureCount) {
    console.log('🚀 ~ retry ~ failureCount:', failureCount);

    if (failureCount > 4) {
      showSnack({
        msg: 'Hệ thống chưa nhận được chuyển khoản, vui lòng thử lại sau',
        type: 'error',
      });

      return false;
    }

    return true;
  },
  retryDelay(failureCount) {
    return Math.min(
      failureCount > 1 ? 2 ** failureCount * 1000 : 1000,
      30 * 1000,
    );
  },
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Get<ApiBaseResponse<boolean>>({
      url: primaryKey,
      params: variables,
    }).then(response => {
      if (!response) {
        return false;
      }

      console.log('🚀 ~ queryFn: ~ response:', response);

      if (validResponse(response)) {
        if (response.data.data) {
          return true;
        }

        throw new Error('Not paid yet');
      }

      return false;
    });
  },
});
