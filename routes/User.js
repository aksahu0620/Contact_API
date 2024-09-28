import express, { Router } from 'express'
import { register, login_user } from '../controllers/User.js';

const router = express.Router();

// user register
router.post('/register', register)

// user login
router.post('/login', login_user)

export default router