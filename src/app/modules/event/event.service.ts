import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { eventFilterableFields } from './event.constant';
import { IEvent, IEventFilters } from './event.interface';
import { Event } from './event.model';

const addEvent = async (
  data: IEvent,
  organization_id: string
): Promise<IEvent | null> => {
  data.organization_id = organization_id;
  const service = await Event.create(data);
  return service;
};

const getAllEvent = async (
  filters: IEventFilters,
  paginationOptions: IPaginationOptions,
  organization_id: string
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: eventFilterableFields.map(field => ({
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

  const result = await Event.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEvent = async (
  id: string,
  organization_id: string
): Promise<IEvent | null> => {
  const event = await Event.findOne({ _id: id, organization_id });
  return event;
};

const updateEvent = async (
  id: string,
  payload: Partial<IEvent>,
  organization_id: string
): Promise<IEvent | null> => {
  const updateEvent = await Event.findOneAndUpdate(
    { _id: id, organization_id },
    payload,
    {
      new: true,
    }
  );
  return updateEvent;
};

const deleteEvent = async (
  id: string,
  organization_id: string
): Promise<IEvent | null> => {
  const organization = await Event.findOneAndDelete({
    _id: id,
    organization_id,
  });
  return organization;
};

export const EventService = {
  addEvent,
  getAllEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
