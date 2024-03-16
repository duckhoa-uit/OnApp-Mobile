import { FormRegisterType } from '@model/authentication';
import { z } from 'zod';

import { stringifyObjectValidate } from '../string/index';

export const registerValidation = z.object<ZodShape<FormRegisterType>>({
  email: z
    .string()
    .min(
      1,
      stringifyObjectValidate({
        keyT: 'validation:email_required',
      }),
    )
    .email(),
  username: z.string().min(1, 'Password is required'),
  name: z.string().min(1, 'Password is required'),
  password: z.string().min(1, 'Password is required'),
});
