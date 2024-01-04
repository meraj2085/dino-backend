import { Model } from 'mongoose';

export type INotification = {
  organization_id: string;
  user_ids: string[];
  read_by: string[];
  title: string;
  description: string;
};

export type NotificationModel = Model<INotification, Record<string, unknown>>;
