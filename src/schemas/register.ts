import z from 'zod';
import {
  VALIDATION_INPUTS_MESSAGE,
  VALIDATION_INPUTS_RULES,
} from '../constants/validationRules';
import { SingUpFormFields } from '../pages/RegisterPage/RegisterPage';

const registerSchema = z
  .object({
    username: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? VALIDATION_INPUTS_MESSAGE.REQUIRED
            : undefined,
      })
      .min(
        VALIDATION_INPUTS_RULES.USERNAME.MIN_LENGTH,
        VALIDATION_INPUTS_MESSAGE.USERNAME.MIN_LENGTH,
      )
      .max(
        VALIDATION_INPUTS_RULES.USERNAME.MAX_LENGTH,
        VALIDATION_INPUTS_MESSAGE.USERNAME.MAX_LENGTH,
      )
      .regex(
        VALIDATION_INPUTS_RULES.USERNAME.REGEX,
        VALIDATION_INPUTS_MESSAGE.USERNAME.MAX_LENGTH,
      ),
    login: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? VALIDATION_INPUTS_MESSAGE.REQUIRED
            : undefined,
      })
      .min(
        VALIDATION_INPUTS_RULES.LOGIN.MIN_LENGTH,
        VALIDATION_INPUTS_MESSAGE.LOGIN.MIN_LENGTH,
      )
      .max(
        VALIDATION_INPUTS_RULES.LOGIN.MAX_LENGTH,
        VALIDATION_INPUTS_MESSAGE.LOGIN.MAX_LENGTH,
      )
      .regex(
        VALIDATION_INPUTS_RULES.LOGIN.REGEX,
        VALIDATION_INPUTS_MESSAGE.LOGIN.MAX_LENGTH,
      ),
    password: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? VALIDATION_INPUTS_MESSAGE.REQUIRED
            : undefined,
      })
      .min(
        VALIDATION_INPUTS_RULES.PASSWORD.MIN_LENGTH,
        VALIDATION_INPUTS_MESSAGE.PASSWORD.MIN_LENGTH,
      )
      .max(
        VALIDATION_INPUTS_RULES.PASSWORD.MAX_LENGTH,
        VALIDATION_INPUTS_MESSAGE.PASSWORD.MAX_LENGTH,
      ),
    confirmPassword: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? VALIDATION_INPUTS_MESSAGE.REQUIRED
            : undefined,
      })
      .min(
        VALIDATION_INPUTS_RULES.PASSWORD.MIN_LENGTH,
        VALIDATION_INPUTS_MESSAGE.PASSWORD.MIN_LENGTH,
      )
      .max(
        VALIDATION_INPUTS_RULES.PASSWORD.MAX_LENGTH,
        VALIDATION_INPUTS_MESSAGE.PASSWORD.MAX_LENGTH,
      ),
    email: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? VALIDATION_INPUTS_MESSAGE.REQUIRED
            : undefined,
      })
      .regex(
        VALIDATION_INPUTS_RULES.EMAIL.REGEX,
        VALIDATION_INPUTS_MESSAGE.EMAIL.REGEX,
      ),
    phoneNumber: z
      .string()
      .regex(
        VALIDATION_INPUTS_RULES.PHONE_NUMBER.REGEX,
        VALIDATION_INPUTS_MESSAGE.PHONE_NUMBER.REGEX,
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Новый пароль, который вы ввели, не совпадает!',
    path: ['confirmPassword'],
  }) satisfies z.ZodType<SingUpFormFields>;

export default registerSchema;
