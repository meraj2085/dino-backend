import { Schema, model } from 'mongoose';
import { AttendanceModel, IAttendance } from './attendance.interface';

const attendanceSchema = new Schema<IAttendance>(
  {
    organization_id: { type: String, required: true, trim: true },
    user_id: { type: String, required: true, trim: true },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0],
    },
    check_in: {
      type: String,
      required: true,
      default: new Date().toISOString(),
    },
    check_out: { type: String },
    activity_logs: {
      type: [
        {
          activity: {
            type: String,
            enum: ['check_in', 'check_out'],
            required: true,
          },
          timestamp: { type: String, required: true },
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
