import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OtpService } from './otp.service';

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const { office_email } = req.body;
  const result = await OtpService.sendOtp(office_email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP sent successfully!',
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { office_email, otp } = req.body;
  const result = await OtpService.verifyOtp(office_email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP verified successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { office_email, password } = req.body;
  const result = await OtpService.resetPassword(office_email, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const OtpController = {
  sendOtp,
  verifyOtp,
  resetPassword,
};
