import { MyRequest } from '@types';
import { AppError } from '@utils/error';
import { StatusCodes } from '@utils/htttp-statuses';
import { TExerciseEntityI, TExerciseEntityU, ExerciseService } from '@routes/exercise/types';

export const getAllExerciseHandler = (exerciseService: ExerciseService) => async () =>
  await exerciseService.getAll();

export const getOneExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const exercise = await exerciseService.getOne(id);

    if (!exercise) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return exercise;
  };

export const createNewExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ body }: MyRequest<TExerciseEntityI>) => {
    const exercise = await exerciseService.create(body);

    if (!exercise) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR');
    }

    return exercise;
  };

export const updateOneExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ params: { id }, body }: MyRequest<TExerciseEntityU, { id: number }>) => {
    const exercise = await exerciseService.update(id, body);

    if (!exercise) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return exercise;
  };

export const deleteOneExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const deleted = await exerciseService.deleteOne(id);

    if (!deleted) {
      throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
    }

    return deleted;
  };
