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

export const AuthController = {
  login,
  refreshToken,
};
