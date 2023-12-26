import { z } from 'zod';

const addFeedbackZodSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  feedback: z.string().nonempty({ message: 'Feedback is required' }),
});

export const FeedbackValidation = {
  addFeedbackZodSchema,
};
