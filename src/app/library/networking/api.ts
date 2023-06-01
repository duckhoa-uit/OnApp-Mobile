const API_VERSION = '/api/v1/';

const ApiEndPoint = {
  LOGIN: 'auth/login',
  REFRESH_TOKEN: '',
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
