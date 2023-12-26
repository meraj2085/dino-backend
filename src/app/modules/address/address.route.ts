import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AddressController } from './address.controller';
const router = express.Router();

// Routes
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.HR, ENUM_USER_ROLE.EMPLOYEE),
  AddressController.getAllAddress
);

export const AddressRoutes = router;
