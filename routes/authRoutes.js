import express from 'express';
import { createUser, authenticateUser } from '../controllers/authController';

const router = express.Router();

router.post('/signup', createUser)
router.post('/login', authenticateUser)

export default router;