import express from 'express';
import { createExpressCallback } from '@utils/express-callback';
import * as creators from '@routes/training/training-handler';
import {
  trainingCrateValidator,
  trainingUpdateValidator,
} from '@routes/training/training-validator';
import { service } from '@routes/training/training-service';
import { bodyValidation, paramsValidation } from '@utils/validators/validation-middleware';
import { idParamValidator } from '@utils/validators/param-id-validator';

const router = express.Router();

const getAllTrainingHandler = creators.getAllTrainingHandler(service);
const getOneTrainingHandler = creators.getOneTrainingHandler(service);
const createTrainingHandler = creators.createNewTrainingHandler(service);
const updateTrainingHandler = creators.updateOneTrainingHandler(service);
const deleteTrainingHandler = creators.deleteOneTrainingHandler(service);

router.get('/', createExpressCallback(getAllTrainingHandler));
router.get(
  '/:id',
  paramsValidation(idParamValidator),
  createExpressCallback(getOneTrainingHandler),
);
router.post(
  '/',
  bodyValidation(trainingCrateValidator),
  createExpressCallback(createTrainingHandler),
);
router.patch(
  '/:id',
  paramsValidation(idParamValidator),
  bodyValidation(trainingUpdateValidator),
  createExpressCallback(updateTrainingHandler),
);
router.delete(
  '/:id',
  paramsValidation(idParamValidator),
  createExpressCallback(deleteTrainingHandler),
);

export default router;
