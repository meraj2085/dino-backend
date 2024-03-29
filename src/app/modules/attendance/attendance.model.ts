import { Schema, model } from 'mongoose';
import { AttendanceModel, IAttendance } from './attendance.interface';

const attendanceSchema = new Schema<IAttendance>(
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
