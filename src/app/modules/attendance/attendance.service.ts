import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { attendanceFilterableFields } from './attendance.constant';
import { IAttendance, IAttendanceFilters } from './attendance.interface';
import { attendance } from './attendance.model';

const addAttendance = async (
  data: IAttendance,
  organization_id: string
): Promise<IAttendance | null> => {
  let service = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userData = await User.findOne({
      _id: data?.user_id,
      organization_id: organization_id,
    });

    if (!userData) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a User.');
    }

    const isAttendance = await attendance.findOne({
      user_id: data?.user_id,
      organization_id: organization_id,
      date: data?.date,
      is_checkout: true,
    });

    if (isAttendance) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Already present!');
    }

    data.userName = `${userData?.first_name} ${userData?.last_name}`;
    data.organization_id = organization_id;
    service = await attendance.create(data);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return service;
};

const getAllAttendance = async (
  filters: IAttendanceFilters,
  paginationOptions: IPaginationOptions,
  organization_id: string
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: attendanceFilterableFields.map(field => ({
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

  andConditions.push({
    organization_id,
    user_type: {
      $ne: 'super_admin',
    },
  });

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await attendance
    .find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await attendance.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAttendance = async (
  id: string,
  payload: Partial<IAttendance>,
  organization_id: string
): Promise<IAttendance | null> => {
  const attendanceData = await attendance.findOneAndUpdate(
    { _id: id, organization_id },
    payload,
    {
      new: true,
    }
  );
  return attendanceData;
};

const myAttendance = async (
  userId: string,
  organization_id: string
): Promise<IAttendance[] | null> => {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    const isUser = await User.findOne({ _id: userId, organization_id });
    if (!isUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist.');
    }
    const myAttendanceData = await attendance
      .find({
        user_id: userId,
        organization_id,
        date: {
          $gte: startOfMonth.toISOString(),
          $lt: endOfMonth.toISOString(),
        },
      })
      .sort({ createdAt: -1 });

    return myAttendanceData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AttendanceService = {
  addAttendance,
  getAllAttendance,
  updateAttendance,
  myAttendance,
};
