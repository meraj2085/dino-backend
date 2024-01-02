import { Model } from 'mongoose';

export type IAttendance = {
  organization_id: string;
  user_id: string;
  userName: string;
  date: string;
  check_in: string;
  check_out: string;
  is_checkout: boolean;
  description: string;
};

export type AttendanceModel = Model<IAttendance, Record<string, unknown>>;

export type IAttendanceFilters = {
  searchTerm?: string;
  userName?: string;
  _id?: string;
  date?: string;
};
