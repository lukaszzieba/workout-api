import express from 'express';
import * as creators from './training-handler';
import { trainingCrateValidator, trainingUpdateValidator } from './training-validator';
import { TTrainingI, TTrainingU } from './training-entity';
import { service } from './training-service';
import { createExpressCallback } from '../utils/express-callback';
import { validationMiddleware } from '../utils/validation-middleware';

const router = express.Router();

const getAllTrainingHandler = creators.createGetAllTrainingHandler(service);
const getOneTrainingHandler = creators.createGetOneTrainingHandler(service);
const createTrainingHandler = creators.createCreateNewTrainingHandler(service);
const updateTrainingHandler = creators.createUpdateOneTrainingHandler(service);
const deleteTrainingHandler = creators.createDeleteOneTrainingHandler(service);

router.get('/', createExpressCallback(getAllTrainingHandler));
router.get('/:id', createExpressCallback(getOneTrainingHandler));
router.post(
  '/',
  validationMiddleware<TTrainingI>(trainingCrateValidator),
  createExpressCallback(createTrainingHandler),
);
router.patch(
  '/:id',
  validationMiddleware<TTrainingU>(trainingUpdateValidator),
  createExpressCallback(updateTrainingHandler),
);
router.delete('/:id', createExpressCallback(deleteTrainingHandler));

export default router;
