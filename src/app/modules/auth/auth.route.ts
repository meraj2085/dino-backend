import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
const router = express.Router();

// Routes
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
);

router.post('/refresh-token', AuthController.refreshToken);

router.post(
  '/send-otp',
  validateRequest(AuthValidation.sendOtpZodSchema),
  AuthController.sendOtp
);

export const AuthRoutes = router;
