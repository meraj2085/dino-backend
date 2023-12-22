import { UserController } from './user.controller';
import express from 'express';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

// Routes
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getSingleUser);
router.post(
  '/',
  validateRequest(UserValidation.addUserZodSchema),
  UserController.addUser
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
