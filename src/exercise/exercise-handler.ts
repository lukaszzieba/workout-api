import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { Exercise } from './exercise-entity';
import AppError from '../utils/error/error';
import { StatusCodes } from '../utils/htttp-statuses';

export const createGetAllExerciseHandler = (exerciseService: Service<Exercise>) => async () =>
  await exerciseService.getAll();

export const createGetOneExerciseHandler =
  (exerciseService: Service<Exercise>) => async (req: MyRequest) => {
    const { id } = req.params;

    const exercise = await exerciseService.getOne(+id);

    if (exercise) return exercise;

    throw new AppError(StatusCodes.NOT_FOUND, 'NOT FOUND');
  };

export const createCreateNewExerciseHandler =
  (exerciseService: Service<Exercise>) => async (req: MyRequest) => {
    const { body } = req;

    return await exerciseService.create(body);
  };

export const createUpdateOneExerciseHandler =
  (exerciseService: Service<Exercise>) => async (req: MyRequest) => {
    const { body } = req;

    return await exerciseService.update(body);
  };

export const createDeleteOneExerciseHandler =
  (exerciseService: Service<Exercise>) => async (req: MyRequest) => {
    const { id } = req.params;

    return await exerciseService.deleteOne(+id);
  };
