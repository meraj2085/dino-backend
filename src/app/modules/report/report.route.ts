import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReportController } from './report.controller';

const router = express.Router();

router.get(
  '/getAttendanceReport',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.EMPLOYEE
  ),
  ReportController.getAttendanceReport
);

export const ReportRoutes = router;
