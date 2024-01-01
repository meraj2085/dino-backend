import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import {
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';
import { generateOTP } from '../../../utils/generateOTP';
import { isPasswordMatch } from '../../../utils/isPasswordMatch';
import { isUserExist } from '../../../utils/isUserExists';
import { jwtHelpers } from '../../../utils/jwtHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Otp } from './auth.model';
import { sendMail } from '../../../utils/sendMail';

const login = async (payload: IUser): Promise<ILoginResponse> => {
  const { office_email, password } = payload;

  if (!office_email || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Office email & password is required'
    );
  }

  const user = await isUserExist(office_email, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check if password is correct
  const passwordMatch = await isPasswordMatch(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { _id: userId, user_type, organization_id } = user;
  const accessToken = jwtHelpers.createToken(
    { userId, user_type, organization_id },
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

const sendOtp = async (office_email: string) => {
  // const user = await isUserExist(office_email, User);
  // if (!user) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  // }

  const otp = generateOTP();

  const createdOtp = await Otp.create({
    office_email,
    otp,
  });

  // Send OTP to email
  await sendMail({
    to: office_email,
    subject: 'OTP for reset password',
    message: `Your OTP is ${otp}. Please do not share it with anyone. OTP will expire in 1 minutes.`,
  });

  return createdOtp;
};

export const AuthService = {
  login,
  refreshToken,
  sendOtp,
};
