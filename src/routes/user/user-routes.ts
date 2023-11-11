import express from 'express';
import argon2 from 'argon2';

import { createExpressCallback } from '@utils/express-callback';

import * as creators from './user-hadler';
import { service } from './user-service';
import { userCrateValidator, userUpdateValidator } from './user-validator';
import { idParamValidatorZ } from '@utils/validators/param-id-validator';
import { bodyValidationZ, paramsValidationZ } from '@utils/validators/validation-middleware';

const router = express.Router();

const getAllUserHandler = creators.getAllUserHandler(service);
const getOneUserHandler = creators.getOneUserHandler(service);
const createUserHandler = creators.createUserHandler(service, argon2);
const updateUserHandler = creators.updateOneUserHandler(service);
const deleteUserHandler = creators.deleteOneUserHandler(service);
const loginUserHandler = creators.loginHandler(service, argon2);

router.get('/', createExpressCallback(getAllUserHandler));
router.get('/:id', paramsValidationZ(idParamValidatorZ), createExpressCallback(getOneUserHandler));
router.post('/', bodyValidationZ(userCrateValidator), createExpressCallback(createUserHandler));
router.patch(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  bodyValidationZ(userUpdateValidator),
  createExpressCallback(updateUserHandler),
);
router.delete(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  createExpressCallback(deleteUserHandler),
);
router.post('/login', createExpressCallback(loginUserHandler));

export default router;
