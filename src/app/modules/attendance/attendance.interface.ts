import { Model } from 'mongoose';

export type ActivityLog = {
  activity: 'check_in' | 'check_out';
  timestamp: string;
};

export type IAttendance = {
  organization_id: string;
  action?: 'check_in' | 'check_out';
  user_id: string;
  date: string;
  check_in: string;
  check_out?: string;
  activity_logs: ActivityLog[];
  production: number;
  overtime: number;
  break: number;
};

export type AttendanceModel = Model<IAttendance, Record<string, unknown>>;

export type IAttendanceFilters = {
  searchTerm?: string;
  userName?: string;
  _id?: string;
  date?: string;
};
