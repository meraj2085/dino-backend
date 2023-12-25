import { SortOrder } from 'mongoose';
import { IFeedback, IFeedbackFilters } from './feedback.interface';
import { Feedback } from './feedback.model';
import { feedbackFilterableFields } from './feedback.constant';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const addFeedback = async (data: IFeedback): Promise<IFeedback | null> => {
  const feedback = await Feedback.create(data);
  return feedback;
};

const getAllFeedback = async (
  filters: IFeedbackFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: feedbackFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Feedback.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Feedback.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
