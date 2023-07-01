import { ApiBaseResponse } from '@networking';

export type FormLoginType = {
  email: string;
  password: string;
};

export type LoginApiResponse = ApiBaseResponse<{
  refresh_token: string;
  access_token: string;
}>;

export type FormRegisterType = {
  email: string;
  name: string;
  password: string;
  date: string;
};

export interface AuthenticationState {
  loading: boolean;
}
