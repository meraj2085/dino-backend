import express, { NextFunction, Request, Response } from 'express';
import { OrganizationController } from './organization.controller';
// import validateRequest from '../../middlewares/validateRequest';
import { OrganizationValidation } from './organization.validation';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

// Routes
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  OrganizationController.getOrganizations
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  OrganizationController.getSingleOrganization
);

router.patch(
  '/organizationConfig/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  OrganizationController.organizationConfig
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  fileUploadHelper.upload.single('profile_picture'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = OrganizationValidation.addOrganizationZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return OrganizationController.addOrganization(req, res, next);
  }
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  fileUploadHelper.upload.single('profile_picture'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = OrganizationValidation.updateOrganizationZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return OrganizationController.updateOrganization(req, res, next);
  }
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  OrganizationController.deleteOrganization
);

export const OrganizationRoutes = router;
