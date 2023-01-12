import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { Exercise, TExerciseI, TExerciseU } from './exercise-entity';
import AppError from '../utils/error/error';
import { StatusCodes } from '../utils/htttp-statuses';

type ExerciseService = Service<Exercise, TExerciseI, TExerciseU>;

export const getAllExerciseHandler = (exerciseService: Service<Exercise>) => async () =>
  await exerciseService.getAll();

export const getOneExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const exercise = await exerciseService.getOne(id);

    if (exercise) return exercise;

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };

export const createNewExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ body }: MyRequest<TExerciseI>) => {
    return await exerciseService.create(body);
  };

export const updateOneExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ params: { id }, body }: MyRequest<TExerciseU, { id: number }>) => {
    const exercise = await exerciseService.update(id, body);

    if (exercise) return exercise;

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };

export const deleteOneExerciseHandler =
  (exerciseService: ExerciseService) =>
  async ({ params: { id } }: MyRequest<never, { id: number }>) => {
    const exercise = await exerciseService.deleteOne(id);

    if (exercise) return exercise;

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };
