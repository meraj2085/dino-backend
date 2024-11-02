import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AttendanceController } from './attendance.controller';
import { AttendanceValidation } from './attendance.validation';

const router = express.Router();

router.get(
  '/getTodaysAttendance',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EMPLOYEE),
  AttendanceController.getTodaysAttendance
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.EMPLOYEE
  ),

  AttendanceController.myAttendance
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.EMPLOYEE
  ),
  AttendanceController.getAllAttendance
);

router.post(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.EMPLOYEE
  ),
  // validateRequest(AttendanceValidation.addAttendanceZodSchema),
  AttendanceController.addAttendance
);

router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.EMPLOYEE
  ),
  validateRequest(AttendanceValidation.updateAttendanceZodSchema),
  AttendanceController.updateAttendance
);

export const AttendanceRoutes = router;
