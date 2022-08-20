import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { Exercise } from './exercise-entity';

export const createGetAllExerciseHandler = (exerciseService: Service<Exercise>) => async () =>
  await exerciseService.getAll();

export const createGetOneExerciseHandler =
  (exerciseService: Service<Exercise>) => async (req: MyRequest) => {
    const { id } = req.params;

    return await exerciseService.getOne(+id);
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
