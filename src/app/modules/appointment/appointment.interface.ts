/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export enum AppointmentStatus {
  PENDING = 'pending',
  APPROVED = 'completed',
}

export type IAppointment = {
  fullName: string;
  email: string;
  mobileNumber: string;
  company_name?: string;
  appointment_date: string;
  appointment_time: string;
  subject: string;
  message: string;
  appointment_status: AppointmentStatus;
};

export type AppointmentModel = Model<IAppointment, Record<string, unknown>>;

export type IAppointmentFilters = {
  searchTerm?: string;
  id?: string;
  fullName?: string;
  email?: string;
  company_name?: string;
};
