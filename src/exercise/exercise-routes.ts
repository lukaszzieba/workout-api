import express from 'express';
import * as creators from './exercise-handler';
import * as exerciseService from '../exercise/exercise-service';
import { validationMiddleware } from '../utils/validation-middleware';
import { exerciseCrateValidator, exerciseUpdateValidator } from './exercise-validator';
import { TExerciseI, TExerciseU } from './exercise-entity';

const router = express.Router();

router.get('/', creators.createGetAllExerciseHandler(exerciseService));
router.get('/:id', creators.createGetOneExerciseHandler(exerciseService));
router.post(
  '/',
  validationMiddleware<TExerciseI>(exerciseCrateValidator),
  creators.createCreateNewExerciseHandler(exerciseService),
);
router.patch(
  '/:id',
  validationMiddleware<TExerciseU>(exerciseUpdateValidator),
  creators.createUpdateOneExerciseHandler(exerciseService),
);
router.delete('/:id', creators.createDeleteOneExerciseHandler(exerciseService));

export default router;
