import express from 'express';
import * as creators from './exercise-handler';
import { exerciseCrateValidator, exerciseUpdateValidator } from './exercise-validator';
import { TExerciseI, TExerciseU } from './exercise-entity';
import { service } from './exercise-service';
import { createExpressCallback } from '../utils/express-callback';
import { validationMiddleware } from '../utils/validation-middleware';

const router = express.Router();

const getAllExerciseHandler = creators.createGetAllExerciseHandler(service);
const getOneExerciseHandler = creators.createGetOneExerciseHandler(service);
const createExerciseHandler = creators.createCreateNewExerciseHandler(service);
const updateExerciseHandler = creators.createUpdateOneExerciseHandler(service);
const deleteExerciseHandler = creators.createDeleteOneExerciseHandler(service);

router.get('/', createExpressCallback(getAllExerciseHandler));
router.get('/:id', createExpressCallback(getOneExerciseHandler));
router.post(
  '/',
  validationMiddleware<TExerciseI>(exerciseCrateValidator),
  createExpressCallback(createExerciseHandler),
);
router.patch(
  '/:id',
  validationMiddleware<TExerciseU>(exerciseUpdateValidator),
  createExpressCallback(updateExerciseHandler),
);
router.delete('/:id', createExpressCallback(deleteExerciseHandler));

export default router;
