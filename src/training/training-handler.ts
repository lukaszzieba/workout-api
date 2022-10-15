import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { Training } from './training-entity';

export const createGetAllTrainingHandler = (exerciseService: Service<Training>) => async () =>
  await exerciseService.getAll();

export const createGetOneTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const { id } = req.params;

    return await exerciseService.getOne(+id);
  };

export const createCreateNewTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const { body } = req;

    return await exerciseService.create(body);
  };

export const createUpdateOneTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const { body } = req;

    return await exerciseService.update(body);
  };

export const createDeleteOneTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const { id } = req.params;

    return await exerciseService.deleteOne(+id);
  };
