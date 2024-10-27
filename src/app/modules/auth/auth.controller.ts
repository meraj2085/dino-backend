import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import {
  ILoginResponse,
  IRefreshTokenResponse,
} from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

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

const adminResetPassword = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;
  const result = await AuthService.adminResetPassword(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthController = {
  login,
  refreshToken,
  changePassword,
  adminResetPassword,
};
