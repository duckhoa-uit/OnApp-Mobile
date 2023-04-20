import { FormRegisterType } from '@model/authentication';

export interface FormRegisterProps {
  onSubmit: (data: FormRegisterType) => void;
}
