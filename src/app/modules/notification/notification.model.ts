import { Schema, model } from 'mongoose';
import { INotification, NotificationModel } from './notification.interface';

const notificationSchema = new Schema<INotification>(
  {
    organization_id: { type: String, required: true },
    user_ids: { type: [String], required: true },
    read_by: { type: [String], default: [] },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Notification = model<INotification, NotificationModel>(
  'notification',
  notificationSchema
);
