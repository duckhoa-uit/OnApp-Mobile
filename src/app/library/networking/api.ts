const API_VERSION = '/api/v1/';

const ApiEndPoint = {
  LOGIN: 'auth/login',
  REFRESH_TOKEN: '',
  GET_ME: 'users/me',
  GET_CONSULTER_LIST: 'users/consulter',
  GET_SLOT: 'slots',
  RESERVE_SLOT: 'slots',
  REMOVE_MARKED_SLOT: 'slots',
  CREATE_APPOINTMENT: 'appointments',
  GET_APPOINTMENT_UID: 'appointments/get-uid',
  GET_APPOINTMENT_BY_UID: 'appointments',
  GET_EVENT_TYPE: 'event-types',
} as const;

const configApi = () => {
  const apiOb: Record<string, string> = {};

  Object.keys(ApiEndPoint).forEach(x => {
    const valueApi = ApiEndPoint[x as keyof typeof ApiEndPoint];

    apiOb[x] = API_VERSION + valueApi;
  });

  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export type ApiErrorResponse = {
  status: 'success' | 'fail';
  message: string;
};

export type ApiBaseResponse<T> = {
  status: 'success';
  data: T;
};

export const ApiConstants = configApi() as ApiConstantsType<typeof ApiEndPoint>;
