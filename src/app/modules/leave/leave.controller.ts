import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LeaveService } from './leave.service';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { leaveFilterableFields } from './leave.constant';
import { paginationFields } from '../../../constants/pagination';
import { ILeave } from './leave.interface';

const addLeave: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await LeaveService.addLeave(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Leave added successfully',
      data: result,
    });
  }
);
const getAllLeaves: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const req_user = req.user;
    if (
      !req_user ||
      (req_user?.user_type === 'employee' && req_user?.is_manager === false)
    ) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'Unauthorized',
      });
    }

    const filters = pick(req.query, leaveFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await LeaveService.getAllLeaves(
      filters,
      paginationOptions,
      req_user
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Leave fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleLeave: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await LeaveService.getSingleLeave(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Leave fetched successfully',
      data: result,
    });
  }
);

const updateLeave = catchAsync(async (req: Request, res: Response) => {
  const req_user = req.user;
  console.log(req_user);
  if (req_user?.user_type === 'employee' && req_user?.is_manager !== true) {
    const restrictedStatuses = ['Applied', 'Accepted', 'Rejected'];
    if (restrictedStatuses.includes(req?.body?.status)) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'You are unauthorized',
      });
    }
  }

  const { id } = req.params;
  const { ...leaveData } = req.body;
  const result = await LeaveService.updateLeave(id, leaveData);

  sendResponse<ILeave>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Leave updated successfully',
    data: result,
  });
});

const leaveById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LeaveService.leaveById(id);

  sendResponse<ILeave[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Leaves retrieved successfully',
    data: result,
  });
});

export const LeaveController = {
  addLeave,
  getAllLeaves,
  getSingleLeave,
  updateLeave,
  leaveById,
};
