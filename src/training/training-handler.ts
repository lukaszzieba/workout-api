import { MyRequest } from '../types/my-request';
import { Service } from '../types/service-interface';
import { Training } from './training-entity';
import { getParamId } from '../utils/req';

export const createGetAllTrainingHandler = (exerciseService: Service<Training>) => async () =>
  await exerciseService.getAll();

export const createGetOneTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const id = getParamId(req);

    return await exerciseService.getOne(+id);
  };

export const createCreateNewTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const { body } = req;

    return await exerciseService.create(body);
  };

export const createUpdateOneTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const id = getParamId(req);
    const { body } = req;

    return await exerciseService.update(id, body);
  };

export const createDeleteOneTrainingHandler =
  (exerciseService: Service<Training>) => async (req: MyRequest) => {
    const id = getParamId(req);

    return await exerciseService.deleteOne(id);
  };
