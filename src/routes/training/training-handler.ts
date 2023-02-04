import { MyRequest } from '@types';
import { TrainingService } from '@routes/training/types';
import { TTrainingU } from '@routes/training/training-entity';

export const getAllTrainingHandler = (exerciseService: TrainingService) => async () =>
  await exerciseService.getAll();

export const getOneTrainingHandler =
  (exerciseService: TrainingService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    return await exerciseService.getOne(id);
  };

export const createNewTrainingHandler =
  (exerciseService: TrainingService) =>
  async ({ body }: MyRequest) => {
    return await exerciseService.create(body);
  };

export const updateOneTrainingHandler =
  (exerciseService: TrainingService) =>
  async ({ params: { id }, body }: MyRequest<TTrainingU, { id: number }>) => {
    return await exerciseService.update(id, body);
  };

export const deleteOneTrainingHandler =
  (exerciseService: TrainingService) =>
  async ({ params: { id } }: MyRequest) => {
    return await exerciseService.deleteOne(id);
  };
