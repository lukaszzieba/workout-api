import express from 'express';
import { createExpressCallback } from '@utils/express-callback';
import * as creators from '@routes/exercise/exercise-handler';
import {
  exerciseCrateValidator,
  exerciseUpdateValidator,
} from '@routes/exercise/exercise-validator';
import { service } from '@routes/exercise/exercise-service';
import { bodyValidation, paramsValidation } from '@utils/validators/validation-middleware';
import { idParamValidator } from '@utils/validators/param-id-validator';

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
