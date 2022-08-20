import express from 'express';
import * as handler from './exercise-handler';
import { validationMiddleware } from '../utils/validation-middleware';
import { exerciseCrateValidator, exerciseUpdateValidator } from './exercise-validator';
import { TExerciseI, TExerciseU } from './exercise-entity';

const router = express.Router();

router.get('/', handler.getAllExerciseHandler);
router.get('/:id', handler.getOneExerciseHandler);
router.post(
  '/',
  validationMiddleware<TExerciseI>(exerciseCrateValidator),
  handler.createNewExerciseHandler,
);
router.patch(
  '/:id',
  validationMiddleware<TExerciseU>(exerciseUpdateValidator),
  handler.updateOneExerciseHandler,
);
router.delete('/:id', handler.deleteOneExerciseHandler);

export default router;
