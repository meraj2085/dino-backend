import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReportService } from './report.service';

const getAttendanceReport: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user_ids, monthYear } = req.body;
    const organization_id = req.user?.organization_id;

    const result = await ReportService.getAttendanceReport(
      user_ids,
      monthYear,
      organization_id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Attendance Report Fetched Successfully',
      data: result,
    });
  }
);

export const ReportController = {
  getAttendanceReport,
};
