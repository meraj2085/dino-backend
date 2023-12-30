import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LeaveService } from './leave.service';
import httpStatus from 'http-status';

const addLeave: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    // console.log(data);
    const result = await LeaveService.addLeave(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Leave added successfully',
      data: result,
    });
  }
);

export const LeaveController = {
  addLeave,
};
