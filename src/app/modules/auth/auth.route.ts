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

router.post(
  '/verify-otp',
  validateRequest(AuthValidation.verifyOtpZodSchema),
  AuthController.verifyOtp
);

router.post('/reset-password',
  validateRequest(AuthValidation.resetPasswordZodSchema),
 AuthController.resetPassword);

export const AuthRoutes = router;
