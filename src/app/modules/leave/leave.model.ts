import { Schema, model } from 'mongoose';

import { ILeave, LeaveModel } from './leave.interface';

const leaveSchema = new Schema<ILeave>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leave_type: {
      type: String,
      required: true,
    },
    from_date: String,
    to_date: String,
    no_of_days: Number,
    reason: {
      type: String,
      required: true,
    },
    organization_id: String,
    status: {
      type: String,
      enum: ['Applied', 'Accepted', 'Rejected', 'Cancelled'],
      default: 'Applied',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Leave = model<ILeave, LeaveModel>('Leave', leaveSchema);
