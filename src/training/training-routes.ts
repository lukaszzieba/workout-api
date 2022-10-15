import express from 'express';
import * as creators from './training-handler';
import { trainingCrateValidator, trainingUpdateValidator } from './training-validator';
import { TTrainingI, TTrainingU } from './training-entity';
import * as trainingService from './training-service';
import { createExpressCallback } from '../utils/express-callback';
import { validationMiddleware } from '../utils/validation-middleware';

const router = express.Router();

const getAllTrainingHandler = creators.createGetAllTrainingHandler(trainingService);
const getOneTrainingHandler = creators.createGetOneTrainingHandler(trainingService);
const createTrainingHandler = creators.createCreateNewTrainingHandler(trainingService);
const updateTrainingHandler = creators.createUpdateOneTrainingHandler(trainingService);
const deleteTrainingHandler = creators.createDeleteOneTrainingHandler(trainingService);

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
