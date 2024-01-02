import { Model } from 'mongoose';

export type IOtp = {
  office_email: string;
  otp: string;
  isVerified: boolean;
  expiresAt: Date;
};

export type OtpModel = Model<IOtp, Record<string, unknown>>;
