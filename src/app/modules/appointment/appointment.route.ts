import express from 'express';
import { AppointmentController } from './appointment.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentValidation } from './appointment.validation';
const router = express.Router();

// Routes
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AppointmentController.getAllAppointment
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AppointmentController.getSingleAppointment
);

router.post(
  '/',
  validateRequest(AppointmentValidation.addAppointmentZodSchema),
  AppointmentController.addAppointment
);

router.patch(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AppointmentValidation.updateAppointmentZodSchema),
  AppointmentController.updateScheduleAndStatus
);

export const AppointmentRoutes = router;
