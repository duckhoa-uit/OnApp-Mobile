import { createQuery } from 'react-query-kit';

import { validResponse } from '@common';
import { VIETQR_API_KEY, VIETQR_CLIENT_ID } from '@env';
import { ApiConstants, VietQrResponse } from '@networking/api';
import { NetWorkService } from '@networking/service';
import type { AxiosError } from 'axios';

type Response = { qrDataURL: string | null };

type Variables = {
  accountNo?: number;
  accountName?: string;
  amount: number;
  appointmentId: number;
};

export const useQueryPaymentQr = createQuery<Response, Variables, AxiosError>({
  primaryKey: ApiConstants.VIETQR_PAYMENT_QR,
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
    return NetWorkService.Post<VietQrResponse<{ qrDataURL: string | null }>>({
      baseURL: 'https://api.vietqr.io/v2/',
      url: primaryKey,
      body: {
        accountNo: '1014414697',
        accountName: 'DANG THI THU DUYEN',
        //VIETCOMBANK
        acqId: '970436',
        amount: variables.amount,
        addInfo: `PMONAPP${variables.appointmentId}`,
        format: 'text',
        template: 'compact',
      },
      headers: {
        'x-client-id': VIETQR_CLIENT_ID,
        'x-api-key': VIETQR_API_KEY,
      },
    }).then(response => {
      if (!response) {
        return { qrDataURL: null };
      }

      if (validResponse(response)) {
        return response.data.data;
      }

      return { qrDataURL: null };
    });
  },
});
