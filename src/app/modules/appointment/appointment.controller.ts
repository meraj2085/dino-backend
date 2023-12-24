import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AppointmentService } from './appointment.service';

const addAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AppointmentService.addAppointment(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment created successfully',
      data: result,
    });
  }
);

const getSingleAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AppointmentService.getSingleAppointment(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment fetched successfully',
      data: result,
    });
  }
);

const updateScheduleAndStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AppointmentService.updateScheduleAndStatus(data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment status & schedule updated successfully',
      data: result,
    });
  }
);

const getAllAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppointmentService.getAllAppointment();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointments fetched successfully',
      data: result,
    });
  }
);

export const AppointmentController = {
  addAppointment,
  getSingleAppointment,
  getAllAppointment,
  updateScheduleAndStatus,
};
