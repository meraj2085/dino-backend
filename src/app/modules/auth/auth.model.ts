import { Schema, model } from 'mongoose';
import { IOtp, OtpModel } from './auth.interface';

const OtpSchema = new Schema<IOtp, OtpModel>(
  {
    office_email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 1, // 1 minute
    },
  }
  //   {
  //     timestamps: true,
  //     toJSON: {
  //       virtuals: true,
  //     },
  //   }
);

export const Otp = model<IOtp, OtpModel>('Otp', OtpSchema);
