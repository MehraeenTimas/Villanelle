import { Router } from 'express';
import { AuthController } from './auth.Controller';
import { validate } from '../../common/middleware/validator';

const router = Router();
const authController = new AuthController();

const registerValidation = validate([
  { field: 'username', required: true, minLength: 3, maxLength: 50 },
  { field: 'password', required: true, minLength: 6 }
]);

const loginValidation = validate([
  { field: 'username', required: true },
  { field: 'password', required: true }
]);

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

export default router;
