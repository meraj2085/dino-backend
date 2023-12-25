import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { appointmentFilterableFields } from './appointment.constant';
import { IAppointment, IAppointmentFilters } from './appointment.interface';
import { Appointment } from './appointment.model';

const addAppointment = async (
  data: IAppointment
): Promise<IAppointment | null> => {
  const service = await Appointment.create(data);
  return service;
};

const getSingleAppointment = async (
  id: string
): Promise<IAppointment | null> => {
  const appointment = await Appointment.findById(id);
  return appointment;
};

const updateScheduleAndStatus = async (
  data: any
): Promise<IAppointment | null> => {
  const { id } = data;
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    {
      appointment_date: data?.appointment_date,
      appointment_time: data?.appointment_time,
      appointment_status: data?.appointment_status,
    },
    {
      new: true,
    }
  );
  return appointment;
};

const getAllAppointment = async (
  filters: IAppointmentFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: appointmentFilterableFields.map(field => ({
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

  const result = await Appointment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Appointment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AppointmentService = {
  addAppointment,
  getSingleAppointment,
  getAllAppointment,
  updateScheduleAndStatus,
};
