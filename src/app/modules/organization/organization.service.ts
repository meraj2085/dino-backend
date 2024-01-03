import { SortOrder } from 'mongoose';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { organizationFilterableFields } from './organization.constant';
import { IOrganization, IOrganizationFilters } from './organization.interface';
import { Organization } from './organization.model';
import { generateOrganizationCode } from './organization.utils';

const addOrganization = async (
  data: IOrganization,
  file?: IUploadFile
): Promise<IOrganization | null> => {
  if (file) {
    const uploadedImg = (await fileUploadHelper.uploadToCloudinary(
      file
    )) as ICloudinaryResponse;
    // console.log(uploadedImg);
    data.profile_picture = uploadedImg.secure_url;
  }

  //Generate organization code
  const company_code = await generateOrganizationCode();

  data.company_code = company_code;

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
  payload: Partial<IOrganization>,
  file?: IUploadFile
): Promise<IOrganization | null> => {
  if (file) {
    const uploadedImg = (await fileUploadHelper.uploadToCloudinary(
      file
    )) as ICloudinaryResponse;
    // console.log(uploadedImg);
    payload.profile_picture = uploadedImg.secure_url;
  }

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
