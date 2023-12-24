import { IFeedback } from './feedback.interface';
import { Feedback } from './feedback.model';

const addFeedback = async (data: IFeedback): Promise<IFeedback | null> => {
  const feedback = await Feedback.create(data);
  return feedback;
};

const getAllFeedback = async (): Promise<IFeedback[] | null> => {
  const feedback = await Feedback.find();
  return feedback;
};

const getSingleFeedback = async (id: string): Promise<IFeedback | null> => {
  const feedback = await Feedback.findById(id);
  return feedback;
};

export const FeedbackService = {
  addFeedback,
  getAllFeedback,
  getSingleFeedback,
};
