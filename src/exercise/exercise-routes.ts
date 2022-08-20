import express from 'express';
import * as creators from './exercise-handler';
import { exerciseCrateValidator, exerciseUpdateValidator } from './exercise-validator';
import { TExerciseI, TExerciseU } from './exercise-entity';
import * as exerciseService from './exercise-service';
import { createExpressCallback } from '../utils/express-callback';
import { validationMiddleware } from '../utils/validation-middleware';

const router = express.Router();

const getAllExerciseHandler = creators.createGetAllExerciseHandler(exerciseService);
const getOneExerciseHandler = creators.createGetOneExerciseHandler(exerciseService);
const createExerciseHandler = creators.createCreateNewExerciseHandler(exerciseService);
const updateExerciseHandler = creators.createUpdateOneExerciseHandler(exerciseService);
const deleteExerciseHandler = creators.createDeleteOneExerciseHandler(exerciseService);

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
