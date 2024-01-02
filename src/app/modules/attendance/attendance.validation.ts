import { z } from 'zod';

const addAttendanceZodSchema = z.object({
  body: z.object({
    // organization_id: z.string(),
    user_id: z.string().nonempty(),
    date: z.string().nonempty(),
    check_in: z.string(),
    check_out: z.string(),
    is_checkout: z.boolean(),
    description: z.string(),
  }),
});

const updateAttendanceZodSchema = z.object({
  body: z.object({
    // organization_id: z.string().nonempty().optional(),
    user_id: z.string().nonempty().optional(),
    date: z.string().nonempty().optional(),
    check_in: z.string().optional(),
    check_out: z.string().optional(),
    is_checkout: z.boolean().optional(),
    description: z.string().optional(),
  }),
});

export const AttendanceValidation = {
  updateAttendanceZodSchema,
  addAttendanceZodSchema,
};
