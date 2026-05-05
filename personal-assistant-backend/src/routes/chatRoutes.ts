import { Router } from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/message', sendMessage);
router.get('/history', getChatHistory);

export default router;
