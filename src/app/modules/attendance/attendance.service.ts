import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
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
  const userData = await User.findOne({
    _id: data.user_id,
    organization_id: organization_id,
  });

  if (!userData) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User not found in the organization.'
    );
  }

  const todayDate = new Date().toISOString().split('T')[0];

  let userAttendance = await attendance.findOne({
    user_id: data.user_id,
    organization_id: organization_id,
    date: todayDate,
  });

  data.activity_logs = data.activity_logs || [];

  if (!userAttendance) {
    if (data.action === 'check_in') {
      const currentTimestamp = new Date().toISOString();
      data.check_in = currentTimestamp;
      data.activity_logs.push({
        activity: 'check_in',
        timestamp: currentTimestamp,
      });
      data.organization_id = organization_id;
      data.date = todayDate;

      userAttendance = await attendance.create(data);
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Cannot check out without checking in first.'
      );
    }
  } else {
    const lastActivity =
      userAttendance.activity_logs[userAttendance.activity_logs.length - 1];

    if (data.action === 'check_in') {
      if (lastActivity && lastActivity.activity === 'check_in') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Already checked in.');
      }
      userAttendance.activity_logs.push({
        activity: 'check_in',
        timestamp: new Date().toISOString(),
      });
      userAttendance.check_in = new Date().toISOString();
    } else if (data.action === 'check_out') {
      if (lastActivity && lastActivity.activity === 'check_out') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Already checked out.');
      }
      userAttendance.activity_logs.push({
        activity: 'check_out',
        timestamp: new Date().toISOString(),
      });
      userAttendance.check_out = new Date().toISOString();
    }

    await userAttendance.save();
  }
  return userAttendance;
};

const getTodaysAttendance = async (
  userId: string
): Promise<{
  userId: string;
  date: string;
  check_in?: string;
  check_out?: string;
  activity_logs: Array<{ activity: string; timestamp: string }>;
} | null> => {
  const today = new Date().toISOString().split('T')[0];

  const userAttendance = await attendance.findOne({
    user_id: userId,
    date: today,
  });

  if (!userAttendance) {
    return null;
  }

  return {
    userId: userAttendance.user_id,
    date: userAttendance.date,
    check_in: userAttendance.check_in,
    check_out: userAttendance.check_out,
    activity_logs: userAttendance.activity_logs,
  };
};

const getAllAttendance = async (
  filters: IAttendanceFilters,
  paginationOptions: IPaginationOptions,
  organization_id: string
) => {
  const { monthYear, searchTerm } = filters;
  if (!monthYear || !organization_id) {
    throw new Error('monthYear and organization_id are required');
  }

  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const [year, month] = monthYear.split('-').map(Number);

  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  const userQuery: any = { organization_id };
  if (searchTerm) {
    userQuery.$or = [
      { first_name: { $regex: searchTerm, $options: 'i' } },
      { last_name: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const users = await User.find(userQuery)
    .select('_id first_name last_name')
    .lean();

  const attendanceRecords = await attendance.find({
    organization_id,
    date: {
      $gte: startDate.toISOString(),
      $lte: endDate.toISOString(),
    },
  });

  const attendanceMap: { [key: string]: { [key: string]: IAttendance } } = {};
  attendanceRecords.forEach(record => {
    if (!attendanceMap[record.user_id]) {
      attendanceMap[record.user_id] = {};
    }
    attendanceMap[record.user_id][record.date] = record;
  });

  const daysInMonth = new Date(year, month, 0).getDate();

  const result = users.map(user => {
    const { first_name, last_name, _id: user_id } = user;

    const data = Array.from({ length: daysInMonth }, (_, dayIndex) => {
      const date = new Date(Date.UTC(year, month - 1, dayIndex + 1));
      const formattedDate = date.toISOString().split('T')[0];

      const attendance =
        attendanceMap[user_id.toString()]?.[formattedDate] || null;

      return {
        date: formattedDate,
        attendance: !!attendance,
        production_time: attendance?.production || 0,
      };
    });

    return {
      user_id,
      name: `${first_name} ${last_name}`,
      data,
    };
  });

  const total = result.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result.slice(skip, skip + limit),
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
  organization_id: string,
  filters: IAttendanceFilters,
  paginationOptions: IPaginationOptions
): Promise<{ meta: any; data: any }> => {
  try {
    const isUser = await User.findOne({ _id: userId, organization_id });
    if (!isUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist.');
    }

    const { searchTerm, monthYear, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);

    const currentDate = new Date();
    const [year, month] = monthYear
      ? monthYear.split('-').map(Number)
      : [currentDate.getFullYear(), currentDate.getMonth() + 1];

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const andConditions: any[] = [
      {
        user_id: userId,
        organization_id,
        date: {
          $gte: startOfMonth.toISOString(),
          $lt: endOfMonth.toISOString(),
        },
      },
    ];

    if (searchTerm) {
      andConditions.push({
        $or: attendanceFilterableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
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

    const whereConditions = { $and: andConditions } as Record<string, any>;

    const myAttendanceData = await attendance
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
      data: myAttendanceData,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const AttendanceService = {
  addAttendance,
  getTodaysAttendance,
  getAllAttendance,
  updateAttendance,
  myAttendance,
};
