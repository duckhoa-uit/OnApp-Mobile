import { ApiBaseResponse } from '@networking';

export type FormLoginType = {
  email: string;
  password: string;
};

export type LoginApiResponse = ApiBaseResponse<{
  refresh_token: string;
  access_token: string;
  streamchat_token: string;
}>;

export type FormRegisterType = {
  email: string;
  name: string;
  password: string;
};

export interface AuthenticationState {
  loading: boolean;
}
