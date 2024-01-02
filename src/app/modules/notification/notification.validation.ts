import { z } from 'zod';

const addNotificationZodSchema = z.object({
  body: z.object({
    organization_id: z.string(),
    user_ids: z.array(z.string()),
    read_by: z.array(z.string()),
    title: z.string(),
    description: z.string(),
  }),
});

export const NotificationValidation = {
  addNotificationZodSchema,
};
