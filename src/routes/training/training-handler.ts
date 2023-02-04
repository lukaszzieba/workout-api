import { MyRequest } from '@types';
import { TExerciseU } from '@routes/exercise/exercise-entity';
import { TrainingService } from '@routes/training/types';

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
  async ({ params: { id }, body }: MyRequest<TExerciseU, { id: number }>) => {
    return await exerciseService.update(id, body);
  };

export const deleteOneTrainingHandler =
  (exerciseService: TrainingService) =>
  async ({ params: { id } }: MyRequest) => {
    return await exerciseService.deleteOne(id);
  };
