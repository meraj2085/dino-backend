import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const addFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await FeedbackService.addFeedback(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback created successfully',
      data: result,
    });
  }
);

const getAllFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.getAllFeedback();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback fetched successfully',
      data: result,
    });
  }
);

const getSingleFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FeedbackService.getSingleFeedback(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback fetched successfully',
      data: result,
    });
  }
);

export const FeedbackController = {
  addFeedback,
  getAllFeedback,
  getSingleFeedback,
};
