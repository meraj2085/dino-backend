import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';
import {
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    const { refreshToken, ...others } = result;

    // Set refresh token into cookie
    res.cookie('refreshToken', refreshToken, {
      secure: config.env === 'production',
      httpOnly: true,
    });

    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User login successfully',
      data: others,
    });
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully!',
    data: result,
  });
});

const sendOtp = catchAsync(async (req: Request, res: Response) => {

  const { office_email } = req.body;
  // console.log(office_email);
  const result = await AuthService.sendOtp(office_email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP sent successfully!',
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const { office_email, otp } = req.body;
  const result = await AuthService.verifyOtp(office_email, otp);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP verified successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { office_email, password } = req.body;
  const result = await AuthService.resetPassword(office_email, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { old_password, new_password } = req.body;
  // console.log(req.user, req.body);
  
  const result = await AuthService.changePassword(
    req.user?.userId,
    old_password,
    new_password
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});

export const AuthController = {
  login,
  refreshToken,
  sendOtp,
  verifyOtp,
  resetPassword,
  changePassword,
};
