import express from 'express';
const router = express.Router();
import { OrganizationRoutes } from '../modules/organization/organization.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AddressRoutes } from '../modules/address/address.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { AppointmentRoutes } from '../modules/appointment/appointment.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
