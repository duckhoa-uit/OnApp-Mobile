import { createQuery } from 'react-query-kit';

import { validResponse } from '@common';
import { ApiBaseResponse, ApiConstants } from '@networking/api';
import { NetWorkService } from '@networking/service';
import type { AxiosError } from 'axios';

type Response = Record<
  string,
  {
    time: string;
    users: string[];
  }[]
>;

type Variables = {
  startTime: string;
  endTime: string;
  eventTypeId?: number;
  eventTypeSlug: string;
  timeZone?: string;
  duration?: string;
  usernameList: string[];
};

export const useQueryTimeSlots = createQuery<Response, Variables, AxiosError>({
  primaryKey: ApiConstants.GET_SLOT,
  queryFn: ({ queryKey: [primaryKey, variables] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    return NetWorkService.Get<ApiBaseResponse<Response>>({
      url: primaryKey,
      params: variables,
    }).then(response => {
      if (!response) {
        return {};
      }

      if (validResponse(response)) {
        return response.data.data;
      }

      return {};
    });
  },
});
