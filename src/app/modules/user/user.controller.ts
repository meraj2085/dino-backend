import httpStatus from 'http-status';
import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';

const addUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await UserService.addUser(data);
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
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await UserService.getUsers(filters, paginationOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);
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
    const id = req.params.id;
    const data = req.body;
    const result = await UserService.updateUser(id, data);
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
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  }
);

export const UserController = {
  addUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
