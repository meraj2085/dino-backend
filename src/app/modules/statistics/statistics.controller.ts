import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatisticsService } from './statistics.service';

const getSuperAdminStats: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StatisticsService.getSuperAdminStats();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Statistics fetched successfully',
      data: result,
    });
  }
);

const getAdminStats: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const result = await StatisticsService.getAdminStats(organization_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Statistics fetched successfully',
      data: result,
    });
  }
);

const getEmployeeStats: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user_id = req.user?.userId;
    const organization_id = req.user?.organization_id;
    const result = await StatisticsService.getEmployeeStats(user_id, organization_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Statistics fetched successfully',
      data: result,
    });
  }
);

export const StatisticsController = {
  getSuperAdminStats,
  getAdminStats,
  getEmployeeStats,
};
