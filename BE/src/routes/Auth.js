import { Router } from 'express';
import { Login } from '../controller/auth.js';

const auth = Router();

auth.post('/login', Login);

export default auth;
