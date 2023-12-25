import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';
import pick from '../../../shared/pick';
import { feedbackFilterableFields } from './feedback.constant';
import { paginationFields } from '../../../constants/pagination';

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
    const filters = pick(req.query, feedbackFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await FeedbackService.getAllFeedback(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback fetched successfully',
      meta: result.meta,
      data: result.data,
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
