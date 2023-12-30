import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from './user.model';
import { userFilterableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { ICloudinaryResponse, IUploadFile } from '../../../interfaces/file';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';

const addUser = async (
  data: IUser,
  file?: IUploadFile
): Promise<IUser | null> => {
  //If file uploaded then upload to cloudinary
  if (file) {
    const uploadedImg = (await fileUploadHelper.uploadToCloudinary(
      file
    )) as ICloudinaryResponse;
    // console.log(uploadedImg);
    data.profile_picture = uploadedImg.secure_url;
  }

  const user = await User.create(data);
  return user;
};

const getUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
  organization_id: string
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableFields.map(field => ({
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select('-password');

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (
  id: string,
  organization_id: string
): Promise<IUser | null> => {
  const user = await User.findOne({
    _id: id,
    organization_id,
  }).select('-password');

  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  organization_id: string
): Promise<IUser | null> => {
  const updateUser = await User.findOneAndUpdate(
    { _id: id, organization_id },
    payload,
    {
      new: true,
    }
  ).select('-password');
  return updateUser;
};

const deleteUser = async (
  id: string,
  organization_id: string
): Promise<IUser | null> => {
  const user = await User.findOneAndDelete({
    _id: id,
    organization_id,
  }).select('-password');
  return user;
};

export const UserService = {
  addUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
