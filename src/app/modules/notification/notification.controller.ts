import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.service';

const sendNotification: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await NotificationService.sendNotification(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification sent successfully',
      data: result,
    });
  }
);

export const NotificationController = {
  sendNotification,
};
