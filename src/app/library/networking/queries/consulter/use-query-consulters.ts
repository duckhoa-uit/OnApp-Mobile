import { createQuery } from 'react-query-kit';

import { validResponse } from '@common';
import { User } from '@model/user';
import { ApiBaseResponse, ApiConstants } from '@networking/api';
import { NetWorkService } from '@networking/service';
import type { AxiosError } from 'axios';

type Response = User[];

type Variables = {
  limit?: number | null | undefined;
  cursor?: number | null | undefined;
};

export const useQueryConsulters = createQuery<Response, Variables, AxiosError>({
  primaryKey: ApiConstants.GET_CONSULTER_LIST,
  queryFn: async ({ queryKey: [primaryKey, variables] }) => {
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
