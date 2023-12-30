import express from 'express';
import { LeaveController } from './leave.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.EMPLOYEE,
    ENUM_USER_ROLE.HR,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  //   validateRequest(LeaveValidation.addLeaveZodSchema),
  LeaveController.addLeave
);

export const LeaveRoutes = router;
