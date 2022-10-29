import express from 'express';
import argon2 from 'argon2';

import { createExpressCallback } from '../utils/express-callback';
import { validationMiddleware } from '../utils/validation-middleware';

import * as creators from './user-hadler';
import { TUserI, TUserU } from './user-entity';
import { service } from './user-service';
import { userCrateValidator, userUpdateValidator } from './user-validator';

const router = express.Router();

const getAllUserHandler = creators.createGetAllUserHandler(service);
const getOneUserHandler = creators.createGetOneUserHandler(service);
const createUserHandler = creators.createCreateUserHandler(service, argon2);
const updateUserHandler = creators.createUpdateOneUserHandler(service);
const deleteUserHandler = creators.createDeleteOneUserHandler(service);
const loginUserHandler = creators.createLoginHandler(service, argon2);

router.get('/', createExpressCallback(getAllUserHandler));
router.get('/:id', createExpressCallback(getOneUserHandler));
router.post(
  '/',
  validationMiddleware<TUserI>(userCrateValidator),
  createExpressCallback(createUserHandler),
);
router.patch(
  '/:id',
  validationMiddleware<TUserU>(userUpdateValidator),
  createExpressCallback(updateUserHandler),
);
router.delete('/:id', createExpressCallback(deleteUserHandler));
router.post('/login', createExpressCallback(loginUserHandler));

export default router;
