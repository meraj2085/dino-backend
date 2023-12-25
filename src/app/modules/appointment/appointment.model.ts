import { Schema, model } from 'mongoose';
import {
  AppointmentModel,
  AppointmentStatus,
  IAppointment,
} from './appointment.interface';

const appointmentSchema = new Schema<IAppointment>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    company_name: { type: String },
    appointment_date: { type: String, required: true },
    appointment_time: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    appointment_status: {
      type: String,
      enum: AppointmentStatus,
      default: AppointmentStatus.PENDING,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Appointment = model<IAppointment, AppointmentModel>(
  'Appointment',
  appointmentSchema
);
