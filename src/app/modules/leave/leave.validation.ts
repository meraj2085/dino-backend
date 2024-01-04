import { z } from 'zod';

const addLeaveZodSchema = z.object({
  body: z.object({
    user_id: z.string(),
    from_date: z.string(),
    to_date: z.string(),
    no_of_days: z.number(),
    reason: z.string(),
    organization_id: z.string(),
    status: z.string(),
  }),
});

export const LeaveValidation = {
  addLeaveZodSchema,
};
