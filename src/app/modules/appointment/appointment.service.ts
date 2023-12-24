import { IAppointment } from './appointment.interface';
import { Appointment } from './appointment.model';

const addAppointment = async (
  data: IAppointment
): Promise<IAppointment | null> => {
  const service = await Appointment.create(data);
  return service;
};

const getSingleAppointment = async (
  id: string
): Promise<IAppointment | null> => {
  const appointment = await Appointment.findById(id);
  return appointment;
};

const updateScheduleAndStatus = async (
  data: any
): Promise<IAppointment | null> => {
  const { id } = data;
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    {
      appointment_date: data?.appointment_date,
      appointment_time: data?.appointment_time,
      appointment_status: data?.appointment_status,
    },
    {
      new: true,
    }
  );
  return appointment;
};

const getAllAppointment = async (): Promise<IAppointment[] | null> => {
  const appointments = await Appointment.find()
    .sort({ createdAt: 'desc' })
    .exec();
  return appointments;
};

export const AppointmentService = {
  addAppointment,
  getSingleAppointment,
  getAllAppointment,
  updateScheduleAndStatus,
};
