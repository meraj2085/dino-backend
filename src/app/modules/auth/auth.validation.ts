import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    office_email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
