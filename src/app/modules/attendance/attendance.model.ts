import { Schema, model } from 'mongoose';
import { AttendanceModel, IAttendance } from './attendance.interface';

const attendanceSchema = new Schema<IAttendance>(
  {
    organization_id: { type: String, required: true, trim: true },
    user_id: { type: String, required: true, trim: true },
    date: { type: Date, required: true, default: () => new Date() },
    check_in: { type: Date, required: true },
    check_out: { type: Date },
    activity_logs: {
      type: [
        {
          activity: { type: String, enum: ['check_in', 'check_out'], required: true },
          timestamp: { type: Date, required: true },
        },
      ],
      default: [],
    },
    production: { type: Number, min: 0, default: 0 },
    overtime: { type: Number, min: 0, default: 0 },
    break: { type: Number, min: 0, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const attendance = model<IAttendance, AttendanceModel>(
  'attendance',
  attendanceSchema
);

/* 
  {
    organization_id: { type: String, required: true },
    user_id: { type: String, required: true },
    userName: { type: String },
    date: { type: String, default: Date },
    check_in: { type: String, required: true },
    check_out: { type: String },
    is_checkout: { type: Boolean, default: true },
    description: { type: String, required: true },
  },
*/
