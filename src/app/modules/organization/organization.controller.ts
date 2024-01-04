import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { organizationFilterableFields } from './organization.constant';
import { OrganizationService } from './organization.service';

const addOrganization: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const file = req.file as IUploadFile;

    const result = await OrganizationService.addOrganization(data, file);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Organization created successfully',
      data: result,
    });
  }
);

const getOrganizations: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, organizationFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await OrganizationService.getOrganizations(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Organizations fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleOrganization: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await OrganizationService.getSingleOrganization(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Organization fetched successfully',
      data: result,
    });
  }
);

const updateOrganization: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const file = req.file as IUploadFile;

    const result = await OrganizationService.updateOrganization(id, data,file);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Organization updated successfully',
      data: result,
    });
  }
);

const deleteOrganization: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await OrganizationService.deleteOrganization(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Organization deleted successfully',
      data: result,
    });
  }
);

export const OrganizationController = {
  addOrganization,
  getOrganizations,
  getSingleOrganization,
  updateOrganization,
  deleteOrganization,
};
