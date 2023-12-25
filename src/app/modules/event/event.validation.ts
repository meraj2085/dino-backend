import { z } from 'zod';

const addEventZodSchema = z.object({
  body: z.object({
    from_date: z.string().nonempty(),
    to_date: z.string().nonempty(),
    title: z.string().nonempty(),
    type: z.string(),
  }),
});

const updateEventZodSchema = z.object({
  body: z.object({
    id: z.string().nonempty().optional(),
    from_date: z.string().nonempty().optional(),
    to_date: z.string().nonempty().optional(),
    type: z.string().nonempty().optional(),
  }),
});

export const EventValidation = {
  updateEventZodSchema,
  addEventZodSchema,
};
