import express from 'express';
import * as creators from './exercise-handler';
import { exerciseCrateValidator, exerciseUpdateValidator } from './exercise-validator';
import { service } from './exercise-service';
import { createExpressCallback } from '@utils/express-callback';
import { bodyValidation, idParamValidator, paramsValidation } from '@utils/validators';

const router = express.Router();

const getAllExerciseHandler = creators.getAllExerciseHandler(service);
const getOneExerciseHandler = creators.getOneExerciseHandler(service);
const createExerciseHandler = creators.createNewExerciseHandler(service);
const updateExerciseHandler = creators.updateOneExerciseHandler(service);
const deleteExerciseHandler = creators.deleteOneExerciseHandler(service);

router.get('/', createExpressCallback(getAllExerciseHandler));
router.get(
  '/:id',
  paramsValidation(idParamValidator),
  createExpressCallback(getOneExerciseHandler),
);
router.post(
  '/',
  bodyValidation(exerciseCrateValidator),
  createExpressCallback(createExerciseHandler),
);
router.patch(
  '/:id',
  paramsValidation(idParamValidator),
  bodyValidation(exerciseUpdateValidator),
  createExpressCallback(updateExerciseHandler),
);
router.delete(
  '/:id',
  paramsValidation(idParamValidator),
  createExpressCallback(deleteExerciseHandler),
);

export default router;