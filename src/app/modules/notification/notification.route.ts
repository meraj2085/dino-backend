import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { NotificationController } from './notification.controller';
const router = express.Router();

// Routes
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.HR),
  NotificationController.sendNotification
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.HR),
  NotificationController.getNotification
);

export const NotificationRoutes = router;
