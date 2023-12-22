import express from 'express';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import { OrganizationController } from './organization.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrganizationValidation } from './organization.validation';
const router = express.Router();

// Routes
router.get('/', OrganizationController.getOrganizations);
router.get('/:id', OrganizationController.getSingleOrganization);
router.post(
  '/',
  validateRequest(OrganizationValidation.addOrganizationZodSchema),
  OrganizationController.addOrganization
);
router.patch(
  '/:id',
  validateRequest(OrganizationValidation.updateOrganizationZodSchema),
  OrganizationController.updateOrganization
);
router.delete('/:id', OrganizationController.deleteOrganization);

export const OrganizationRoutes = router;
