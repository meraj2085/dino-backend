import { Model } from 'mongoose';

export type ActivityLog = {
  activity: 'check_in' | 'check_out';
  timestamp: Date;
};

export type IAttendance = {
  organization_id: string;
  user_id: string;
  date: Date;
  check_in: Date;
  check_out?: Date;
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
