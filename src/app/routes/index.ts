import express from 'express';
import { AddressRoutes } from '../modules/address/address.route';
import { AppointmentRoutes } from '../modules/appointment/appointment.route';
import { AttendanceRoutes } from '../modules/attendance/attendance.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { EventRoutes } from '../modules/event/event.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { OrganizationRoutes } from '../modules/organization/organization.route';
import { UserRoutes } from '../modules/user/user.route';
import { LeaveRoutes } from '../modules/leave/Leave.route';
import { OtpRoutes } from '../modules/otp/otp.route';
import { StatisticsRoutes } from '../modules/statistics/statistics.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/organization',
    route: OrganizationRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/otp',
    route: OtpRoutes,
  },
  {
    path: '/address',
    route: AddressRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/appointment',
    route: AppointmentRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/event',
    route: EventRoutes,
  },
  {
    path: '/attendance',
    route: AttendanceRoutes,
  },
  {
    path: '/leave',
    route: LeaveRoutes,
  },
  {
    path: '/statistics',
    route: StatisticsRoutes ,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
