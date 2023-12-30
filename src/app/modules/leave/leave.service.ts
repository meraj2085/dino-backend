/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILeave, ILeaveFilters } from './leave.interface';
import { Leave } from './leave.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { leaveFilterableFields } from './leave.constant';
import { SortOrder } from 'mongoose';

const addLeave = async (data: ILeave): Promise<ILeave | null> => {
  const toDate: any = new Date(data.to_date);
  const fromDate: any = new Date(data.from_date);

  const timeDifference = toDate - fromDate;
  const NumberOfDate = timeDifference / (1000 * 60 * 60 * 24);
  const days: any = NumberOfDate.toFixed();
  if (days < 0) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Please select right feature date'
    );
  }

  const leaveData = {
    leave_type: data.leave_type,
    reason: data.reason,
    from_date: data.from_date,
    to_date: data.to_date,
    user_id: data.user_id,
    organization_id: data.organization_id,
    no_of_days: days,
  };
  const result = await Leave.create(leaveData);
  return result;
};

const getAllLeaves = async (
  filters: ILeaveFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: leaveFilterableFields.map(field => ({
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

  const result = await Leave.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Leave.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleLeave = async (id: string): Promise<ILeave | null> => {
  const result = await Leave.findById(id);
  return result;
};

export const LeaveService = {
  addLeave,
  getAllLeaves,
  getSingleLeave,
};
