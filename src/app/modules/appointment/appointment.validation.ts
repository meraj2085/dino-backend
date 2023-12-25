import { z } from 'zod';

const addAppointmentZodSchema = z.object({
  body: z.object({
    fullName: z.string().nonempty(),
    email: z.string().nonempty(),
    mobileNumber: z.string().nonempty(),
    company_name: z.string(),
    appointment_date: z.string().nonempty(),
    appointment_time: z.string().nonempty(),
    subject: z.string().nonempty(),
    message: z.string().nonempty(),
  }),
});

const updateAppointmentZodSchema = z.object({
  body: z.object({
    id: z.string().nonempty(),
    appointment_date: z.string().nonempty(),
    appointment_time: z.string().nonempty(),
    appointment_status: z.string().nonempty(),
  }),
});

export const AppointmentValidation = {
  updateAppointmentZodSchema,
  addAppointmentZodSchema,
};
