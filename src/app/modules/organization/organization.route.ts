import express, { NextFunction, Request, Response } from 'express';
import { OrganizationController } from './organization.controller';
// import validateRequest from '../../middlewares/validateRequest';
import { OrganizationValidation } from './organization.validation';
import { fileUploadHelper } from '../../../helpers/fileUploadHelper';
const router = express.Router();

// Routes
router.get('/', OrganizationController.getOrganizations);
router.get('/:id', OrganizationController.getSingleOrganization);
router.post(
  '/',

  fileUploadHelper.upload.single('profile_picture'),

  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = OrganizationValidation.addOrganizationZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return OrganizationController.addOrganization(req, res, next);
  }
  // validateRequest(OrganizationValidation.addOrganizationZodSchema),
  // OrganizationController.addOrganization
);
router.patch(
  '/:id',
  
  fileUploadHelper.upload.single('profile_picture'),

  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = OrganizationValidation.updateOrganizationZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return OrganizationController.updateOrganization(req, res, next);
  }

  // validateRequest(OrganizationValidation.updateOrganizationZodSchema),
  // OrganizationController.updateOrganization
);
router.delete('/:id', OrganizationController.deleteOrganization);

export const OrganizationRoutes = router;
