/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ILeave = {
  user_id: Types.ObjectId | IUser;
  leave_type: string;
  from_date: string;
  to_date: string;
  no_of_days: string;
  reason: string;
  organization_id: string;
  status: string;
};

export type LeaveModel = Model<ILeave, Record<string, unknown>>;

export type ILeaveFilters = {
  searchTerm?: string;
  user_id?: string;
  reason?: string;
  status?: string;
};
