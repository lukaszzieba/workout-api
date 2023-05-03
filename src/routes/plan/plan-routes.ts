import express from 'express';
import { createExpressCallback } from '@utils/express-callback';
import { service as planService } from '@routes/plan/plan-service';
import { service as trainingService } from '@routes/training/training-service';
import {
  getAllPlanHandler,
  getOnePlanHandler,
  createNewPlanHandler,
  updateOnePlanHandler,
  deleteOnePlanHandler,
} from '@routes/plan/plan-handler';

const router = express.Router();

const allPlanHandler = getAllPlanHandler(planService);
const onePlanHandler = getOnePlanHandler(planService, trainingService);
const createPlanHandler = createNewPlanHandler(planService);
const updatePlanHandler = updateOnePlanHandler(planService);
const deletePlanHandler = deleteOnePlanHandler(planService);

router.get('/', createExpressCallback(allPlanHandler));
router.get('/:id', createExpressCallback(onePlanHandler));
router.post('/:id', createExpressCallback(createPlanHandler));
router.put('/:id', createExpressCallback(updatePlanHandler));
router.delete('/:id', createExpressCallback(deletePlanHandler));

export default router;
