import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { attendanceFilterableFields } from './attendance.constant';
import { AttendanceService } from './attendance.service';

const addAttendance: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const organization_id = req.user?.organization_id;
    const result = await AttendanceService.addAttendance(data, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendance successfully',
      data: result,
    });
  }
);

const getTodaysAttendance: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const result = await AttendanceService.getTodaysAttendance(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Todays Attendance Fetched successfully',
      data: result,
    });
  }
);

const getAllAttendance: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const filters = pick(req.query, attendanceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AttendanceService.getAllAttendance(
      filters,
      paginationOptions,
      organization_id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendances fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateAttendance: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const organization_id = req.user?.organization_id;
    const result = await AttendanceService.updateAttendance(
      id,
      data,
      organization_id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendance updated successfully',
      data: result,
    });
  }
);

const myAttendance: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const organization_id = req.user?.organization_id;
    const result = await AttendanceService.myAttendance(id, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetch My Attendance.',
      data: result,
    });
  }
);

export const AttendanceController = {
  addAttendance,
  getTodaysAttendance,
  getAllAttendance,
  updateAttendance,
  myAttendance,
};
