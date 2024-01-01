import { Model } from 'mongoose';

export type INotification = {
  organization_id: string;
  user_ids: string[];
  title: string;
  description: string;
  delete_at: string;
};

export type NotificationModel = Model<INotification, Record<string, unknown>>;
