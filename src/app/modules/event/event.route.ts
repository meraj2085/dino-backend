import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EventController } from './event.controller';
import { EventValidation } from './event.validation';
const router = express.Router();

// Routes
router.get('/', auth(ENUM_USER_ROLE.ADMIN), EventController.getAllEvent);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), EventController.getSingleEvent);

router.post(
  '/',
  validateRequest(EventValidation.addEventZodSchema),
  EventController.addEvent
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(EventValidation.updateEventZodSchema),
  EventController.updateEvent
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), EventController.deleteEvent);

export const EventRoutes = router;
