import { Router } from 'express';
import {
  createUser,
  getUser,
  getUsers,
  userDelete,
  UserUpdate,
} from '../controller/user.js';
import { CheckToken } from '../middleware/CheckToken.js';
import { Checkrole } from '../middleware/CheckRole.js';

const user = Router();

user
  .post('/create', createUser)
  .get('/getUser/:id', getUser)
  .get('/getUsers', CheckToken, Checkrole, getUsers)
  .put('/userUpdate/:id', UserUpdate)
  .delete('/userDelete/:id', userDelete);

export default user;
