import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
import { UserService } from './user.service';

const addUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const file = req.file as IUploadFile;

    const result = await UserService.addUser(data, file);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await UserService.getUsers(
      filters,
      paginationOptions,
      organization_id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getMyTeam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.user)
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const req_user = req?.user;
    if (!req_user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: 'Unauthorized',
      });
    }

    const result = await UserService.getMyTeam(
      filters,
      paginationOptions,
      req_user
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const organization_id = req.user?.organization_id;
    const result = await UserService.getSingleUser(id, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  }
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const id = req.params.id;
    const data = req.body;

    const file = req.file as IUploadFile;

    const result = await UserService.updateUser(
      id,
      data,
      organization_id,
      file
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const id = req.params.id;
    const result = await UserService.deleteUser(id, organization_id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  }
);

const disableOrActivateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const organization_id = req.user?.organization_id;
    const { id, status } = req.body;
    const result = await UserService.disableOrActivateUser(
      id,
      status,
      organization_id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User disabled successfully',
      data: result,
    });
  }
);

export const UserController = {
  addUser,
  getUsers,
  getMyTeam,
  getSingleUser,
  updateUser,
  deleteUser,
  disableOrActivateUser,
};
