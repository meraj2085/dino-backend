import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import {
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';
import { isUserExist } from '../../../utils/isUserExists';
import { jwtHelpers } from '../../../utils/jwtHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  comparePassword,
  encryptPassword,
} from '../../../utils/cryptoPassword';

const login = async (payload: IUser): Promise<ILoginResponse> => {
  const { office_email, password } = payload;

  if (!office_email || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Office email & password is required'
    );
  }

  const user = await isUserExist(office_email, User);
  const is_manager = (await User.countDocuments({ manager_id: user?._id })) > 0;

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if password is correct
  const passwordMatch = await comparePassword(password, user?.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { _id: userId, user_type, organization_id } = user;
  const accessToken = jwtHelpers.createToken(
    { userId, user_type, organization_id, is_manager },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, user_type, organization_id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExists = await User.findById(
    { _id: userId, status: 'Active' },
    { _id: 1, user_type: 1, organization_id: 1 }
  ).lean();

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Generate a new token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: isUserExists._id,
      user_type: isUserExists.user_type,
      organization_id: isUserExists.organization_id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userId: string,
  old_password: string,
  new_password: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not set');
  }

  const passwordMatch = await comparePassword(old_password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  // Encrypt password
  const hashedPassword = await encryptPassword(new_password);

  // Update password
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { password: hashedPassword, is_password_reset: true },
    {
      new: true,
    }
  ).select('-password');

  return updatedUser;
};

const adminResetPassword = async (id: string) => {
  const new_password = 'Dino-123';
  if (!new_password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Default password is not set');
  }

  const hashedPassword = await encryptPassword(new_password);
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { password: hashedPassword, is_password_reset: false },
    {
      new: true,
    }
  ).select('-password');

  return updatedUser;
};

export const AuthService = {
  login,
  refreshToken,
  changePassword,
  adminResetPassword,
};
