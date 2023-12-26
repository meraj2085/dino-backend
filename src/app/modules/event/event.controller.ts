import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { eventFilterableFields } from './event.constant';
import { EventService } from './event.service';

const addEvent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const data = req.body;
    const result = await EventService.addEvent(data, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Events created successfully',
      data: result,
    });
  }
);

const getAllEvent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const filters = pick(req.query, eventFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await EventService.getAllEvent(
      filters,
      paginationOptions,
      organization_id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Events fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleEvent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const id = req.params.id;
    const result = await EventService.getSingleEvent(id, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event fetched successfully',
      data: result,
    });
  }
);

const updateEvent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const organization_id = req.user?.organization_id;
    const result = await EventService.updateEvent(id, data, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event updated successfully',
      data: result,
    });
  }
);

const deleteEvent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const organization_id = req.user?.organization_id;
    const result = await EventService.deleteEvent(id, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Event deleted successfully',
      data: result,
    });
  }
);

export const EventController = {
  addEvent,
  getAllEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
