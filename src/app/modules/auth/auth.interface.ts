import { Model } from 'mongoose';

export type IOtp = {
  office_email: string;
  otp: string;
  createdAt: Date;
};

export type OtpModel = Model<IOtp, Record<string, unknown>>;
