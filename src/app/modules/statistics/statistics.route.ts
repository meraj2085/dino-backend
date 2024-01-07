import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StatisticsController } from './statistics.controller';
const router = express.Router();

// Routes
router.get(
  '/superAdmin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StatisticsController.getSuperAdminStats
);
router.get(
  '/admin',
  auth(ENUM_USER_ROLE.ADMIN),
  StatisticsController.getAdminStats
);
router.get(
  '/employee',
  auth(ENUM_USER_ROLE.EMPLOYEE),
  StatisticsController.getEmployeeStats
);

export const StatisticsRoutes = router;
