import express from 'express';
import { createUser, authenticateUser } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/signup', createUser)
authRoute.post('/login', authenticateUser)

export default authRoute;