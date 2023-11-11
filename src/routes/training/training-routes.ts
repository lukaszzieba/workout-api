import express from 'express';
import { createExpressCallback } from '@utils/express-callback';
import * as creators from '@routes/training/training-handler';
import {
  trainingCrateValidator,
  trainingUpdateValidator,
} from '@routes/training/training-validator';
import { service } from '@routes/training/training-service';
import { bodyValidationZ, paramsValidationZ } from '@utils/validators/validation-middleware';
import { idParamValidatorZ } from '@utils/validators/param-id-validator';

const router = express.Router();

const getAllTrainingHandler = creators.getAllTrainingHandler(service);
const getOneTrainingHandler = creators.getOneTrainingHandler(service);
const createTrainingHandler = creators.createNewTrainingHandler(service);
const updateTrainingHandler = creators.updateOneTrainingHandler(service);
const deleteTrainingHandler = creators.deleteOneTrainingHandler(service);

router.get('/', createExpressCallback(getAllTrainingHandler));
router.get(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  createExpressCallback(getOneTrainingHandler),
);
router.post(
  '/',
  bodyValidationZ(trainingCrateValidator),
  createExpressCallback(createTrainingHandler),
);
router.patch(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  bodyValidationZ(trainingUpdateValidator),
  createExpressCallback(updateTrainingHandler),
);
router.delete(
  '/:id',
  paramsValidationZ(idParamValidatorZ),
  createExpressCallback(deleteTrainingHandler),
);

export default router;
