import { MyRequest } from '@types';
import { AppError } from '@utils/error';
import { StatusCodes } from '@utils/htttp-statuses';
import { TrainingService, TTrainingEntityU } from '@routes/training/types';

export const getAllTrainingHandler = (trainingService: TrainingService) => async () => {
  const trainigs = await trainingService.getAll();

  if (!trainigs) {
    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  }

  return trainigs;
};

export const getOneTrainingHandler =
  (trainingService: TrainingService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const training = await trainingService.getOne(id);

    if (!training) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return training;
  };

export const createNewTrainingHandler =
  (trainingService: TrainingService) =>
  async ({ body }: MyRequest) => {
    const training = await trainingService.create(body);

    if (!training) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return training;
  };

export const updateOneTrainingHandler =
  (trainingService: TrainingService) =>
  async ({ params: { id }, body }: MyRequest<TTrainingEntityU, { id: number }>) => {
    const training = await trainingService.update(id, body);

    if (!training) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return training;
  };

export const deleteOneTrainingHandler =
  (trainingService: TrainingService) =>
  async ({ params: { id } }: MyRequest) => {
    const training = await trainingService.deleteOne(id);

    if (!training) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return training;
  };
