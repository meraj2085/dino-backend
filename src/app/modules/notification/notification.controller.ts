import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
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

const getNotification: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user?.userId;
    const result = await NotificationService.getNotification(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification fetched successfully',
      data: result,
    });
  }
);

const getUnreadCount: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user?.userId;
    const result = await NotificationService.getUnreadCount(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Unread Notification count fetched successfully',
      data: result ? result : "0",
    });
  }
);

const deleteMyNotification: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user?.userId;
    const result = await NotificationService.deleteMyNotification(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification deleted successfully',
      data: result,
    });
  }
);

const markRead: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.user?.userId;
    const notificationId = req.body.notificationId;
    const result = await NotificationService.markRead(id, notificationId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification deleted successfully',
      data: result,
    });
  }
);

export const NotificationController = {
  sendNotification,
  getNotification,
  getUnreadCount,
  deleteMyNotification,
  markRead,
};
