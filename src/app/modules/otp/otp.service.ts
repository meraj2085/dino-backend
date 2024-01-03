import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { hashingHelper } from '../../../helpers/hashingHelpers';
import { generateOTP } from '../../../utils/generateOTP';
import { isUserExist } from '../../../utils/isUserExists';
import { sendMail } from '../../../utils/sendMail';
import { User } from '../user/user.model';
import { Otp } from './otp.model';

const sendOtp = async (office_email: string) => {
  const user = await isUserExist(office_email, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const otpData = await Otp.findOne({ office_email });

  if (otpData) {
    const currentTime = new Date();

    console.log(otpData, Number(otpData.expiresAt) - Number(currentTime));

    // Convert remaining time to seconds
    const remainingSeconds = Math.ceil(
      (Number(otpData.expiresAt) - Number(currentTime)) / 1000
    );

    if (remainingSeconds > 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `OTP already sent. Please try again after ${remainingSeconds} seconds`
      );
    } else {
      await Otp.deleteOne({ office_email });
    }
  }

  const generatedOTP = generateOTP();

  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + 60 * 1000); // 1 minute

  const result = await Otp.create({
    office_email,
    otp: generatedOTP,
    expiresAt,
  });

  // Send OTP to email
  if (result) {
    await sendMail({
      to: office_email,
      subject: 'OTP for reset password',
      message: `Your OTP is ${result.otp}. Please do not share it with anyone. OTP will expire in 3 minutes.`,
    });
  }

  return {
    _id: result._id,
    office_email: result.office_email,
    isVerified: result.isVerified,
    expiresAt: result.expiresAt,
  };
};

const verifyOtp = async (office_email: string, otp: string) => {
  const otpData = await Otp.findOne({ office_email });
  if (!otpData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OTP not found');
  }

  const currentTime = new Date();
  // Check if otp is expired
  if (currentTime > otpData.expiresAt) {
    // Delete otp
    await Otp.deleteOne({ office_email });
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP expired');
  }

  if (otpData.otp !== otp) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'OTP is incorrect');
  }

  // Update otp status
  const updatedOtpData = await Otp.findOneAndUpdate(
    { office_email },
    { isVerified: true },
    { new: true }
  );

  if (!updatedOtpData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Could not verify otp');
  }

  return {
    _id: updatedOtpData._id,
    office_email: updatedOtpData.office_email,
    isVerified: updatedOtpData.isVerified,
    expiresAt: updatedOtpData.expiresAt,
  };
};

const resetPassword = async (office_email: string, password: string) => {
  const user = await isUserExist(office_email, User);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const otpData = await Otp.findOne({ office_email });

  //Check if otp is verified
  if (!otpData?.isVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Could not find verified otp');
  }

  // Encrypt password
  const hashedPassword = await hashingHelper.encrypt_password(password);

  const updatedUser = await User.findOneAndUpdate(
    { office_email },
    { password: hashedPassword },
    {
      new: true,
    }
  ).select('-password');

  // Delete otp
  await Otp.deleteOne({ office_email });

  return updatedUser;
};

export const OtpService = {
  sendOtp,
  verifyOtp,
  resetPassword,
};
