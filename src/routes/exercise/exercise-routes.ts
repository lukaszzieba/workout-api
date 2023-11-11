import express from 'express';
import { createExpressCallback } from '@utils/express-callback';
import * as creators from '@routes/exercise/exercise-handler';
import {
  exerciseCrateValidator,
  exerciseUpdateValidator,
} from '@routes/exercise/exercise-validator';
import { service } from '@routes/exercise/exercise-service';
import { bodyValidationZ, paramsValidationZ } from '@utils/validators/validation-middleware';
import { idParamValidatorZ } from '@utils/validators/param-id-validator';

const router = express.Router();

const getAllExerciseHandler = creators.getAllExerciseHandler(service);
const getOneExerciseHandler = creators.getOneExerciseHandler(service);
const createExerciseHandler = creators.createNewExerciseHandler(service);
const updateExerciseHandler = creators.updateOneExerciseHandler(service);
const deleteExerciseHandler = creators.deleteOneExerciseHandler(service);

router.get('/', createExpressCallback(getAllExerciseHandler));
router.get(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  createExpressCallback(getOneExerciseHandler),
);
router.post(
  '/',
  bodyValidationZ(exerciseCrateValidator),
  createExpressCallback(createExerciseHandler),
);
router.patch(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  bodyValidationZ(exerciseUpdateValidator),
  createExpressCallback(updateExerciseHandler),
);
router.delete(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  createExpressCallback(deleteExerciseHandler),
);

export default router;
