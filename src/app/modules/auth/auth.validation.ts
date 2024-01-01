import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    office_email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

const sendOtpZodSchema = z.object({
  body: z.object({
    office_email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  sendOtpZodSchema,
};
