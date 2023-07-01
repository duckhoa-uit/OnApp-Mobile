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
      })
    )
    .email(),
  name: z
    .string()
    .min(1, 'Name is required'),
  password: z
    .string()
    .min(8, 'Password is required or min 8 character')
    .max(50),
  confirmPassword: z
    .string()
    .min(8, 'Password is required or min 8 character')
    .max(50),
  date: z
    .string()
    .min(1, 'Date of birth is required'),
  phone: z
    .string()
    .max(10, 'Phone number is required'),
}).refine((data) => {
  return data.password === data.confirmPassword;
}, {
  message: 'Password and confirm password must be the same',
  path: ['confirmPassword'],
});
