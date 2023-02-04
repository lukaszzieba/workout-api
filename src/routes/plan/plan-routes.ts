import express from 'express';
import { createExpressCallback } from '@utils/express-callback';
import { service as planService } from '@routes/plan/plan-service';
import { service as trainingSeervice } from '@routes/training/training-service';
import { getAllPlanHandler, getOnePlanHandler } from '@routes/plan/plan-handler';

const router = express.Router();

const allPlanHandler = getAllPlanHandler(planService);
const onePlanHandler = getOnePlanHandler(planService, trainingSeervice);
// const createExerciseHandler = creators.createNewExerciseHandler(service);
// const updateExerciseHandler = creators.updateOneExerciseHandler(service);
// const deleteExerciseHandler = creators.deleteOneExerciseHandler(service);

router.get('/', createExpressCallback(allPlanHandler));
router.get('/:id', createExpressCallback(onePlanHandler));

export default router;
