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

const verifyOtpZodSchema = z.object({
  body: z.object({
    office_email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    otp: z.string(),
  }),
});

const resetPasswordZodSchema = z.object({
  body: z.object({
    office_email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    // otp: z.string(),
    password: z.string().min(6).max(100),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    old_password: z
      .string({
        required_error: 'Old password is required',
      })
      .min(6)
      .max(100),
    new_password: z
      .string({
        required_error: 'New password is required',
      })
      .min(6)
      .max(100),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  sendOtpZodSchema,
  verifyOtpZodSchema,
  resetPasswordZodSchema,
  changePasswordZodSchema,
};
