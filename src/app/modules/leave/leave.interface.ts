/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type ILeave = {
  user_id: string;
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
  email?: string;
};
