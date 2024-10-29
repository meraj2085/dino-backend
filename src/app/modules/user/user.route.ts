import { UserController } from './user.controller';
import express, { NextFunction, Request, Response } from 'express';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
const router = express.Router();

// Routes
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EMPLOYEE),
  UserController.getUsers
);
router.get(
  '/my-team',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.EMPLOYEE),
  UserController.getMyTeam
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.EMPLOYEE,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  UserController.getSingleUser
);
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  fileUploadHelper.upload.single('profile_picture'),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.addUserZodSchema.parse(JSON.parse(req.body.data));
    return UserController.addUser(req, res, next);
  }
  // validateRequest(UserValidation.addUserZodSchema),
  // UserController.addUser
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  fileUploadHelper.upload.single('profile_picture'),

  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = UserValidation.updateUserZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return UserController.updateUser(req, res, next);
  }

  // validateRequest(UserValidation.updateUserZodSchema),
  // UserController.updateUser
);
router.post(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);
router.post(
  '/disable-or-activate',
  auth(ENUM_USER_ROLE.ADMIN),
  // validateRequest(UserValidation.disableUserZodSchema),
  UserController.disableOrActivateUser
);

export const UserRoutes = router;
