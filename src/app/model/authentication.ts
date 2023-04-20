export type FormLoginType = {
  email: string;
  password: string;
};

export type FormRegisterType = {
  email: string;
  name: string;
  password: string;
};

export interface AuthenticationState {
  loading: boolean;
}
