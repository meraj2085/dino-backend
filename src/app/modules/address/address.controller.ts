import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AddressService } from './address.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { addressFilterableFields } from './address.constant';

const getAllAddress: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const filters = pick(req.query, addressFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AddressService.getAllAddress(
      filters,
      paginationOptions,
      organization_id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Addresses fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const AddressController = {
  getAllAddress,
};
