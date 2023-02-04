import { MyRequest, Service } from '@types';
import { AppError } from '@utils/error';
import { StatusCodes } from '@utils/htttp-statuses';
import { Plan, TPlanI, TPlanU } from './plan-entity';
import { TrainingService } from '@routes/training/types';

type PlanService = Service<Plan, TPlanI, TPlanU>;

export const getAllPlanHandler = (planService: Service<Plan>) => async () =>
  await planService.getAll();

export const getOnePlanHandler =
  (planService: PlanService, trainingService: TrainingService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const plan = await planService.getOne(id);

    if (plan) {
      const trainings = await trainingService.getByPlanId(plan.id);

      return { ...plan, trainings };
    }

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };

export const createNewPlanHandler =
  (planService: PlanService) =>
  async ({ body }: MyRequest<TPlanI>) => {
    return await planService.create(body);
  };

export const updateOnePlanHandler =
  (planService: PlanService) =>
  async ({ params: { id }, body }: MyRequest<TPlanU, { id: number }>) => {
    const plan = await planService.update(id, body);

    if (plan) return plan;

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };

export const deleteOnePlanHandler =
  (planService: PlanService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const plan = await planService.deleteOne(id);

    if (plan) return plan;

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };
