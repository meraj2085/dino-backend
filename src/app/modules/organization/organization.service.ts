import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Organization } from './organization.model';
import { IOrganization, IOrganizationFilters } from './organization.interface';
import { organizationFilterableFields } from './organization.constant';

const addOrganization = async (
  data: IOrganization
): Promise<IOrganization | null> => {
  const organization = await Organization.create(data);
  return organization;
};

const getOrganizations = async (
  filters: IOrganizationFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: organizationFilterableFields.map(field => ({
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

  const result = await Organization.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Organization.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleOrganization = async (
  id: string
): Promise<IOrganization | null> => {
  const organization = await Organization.findById(id);
  return organization;
};

const updateOrganization = async (
  id: string,
  payload: Partial<IOrganization>
): Promise<IOrganization | null> => {
  const updatedOrganization = await Organization.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return updatedOrganization;
};

const deleteOrganization = async (
  id: string
): Promise<IOrganization | null> => {
  const organization = await Organization.findByIdAndDelete(id);
  return organization;
};

export const OrganizationService = {
  addOrganization,
  getOrganizations,
  getSingleOrganization,
  updateOrganization,
  deleteOrganization,
};
