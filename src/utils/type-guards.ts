import { MyRequest } from '../types/my-request';

export const isReqParamsHasId = (req: MyRequest): req is { params: { id: string } } =>
  typeof req?.params !== undefined && typeof req?.params?.id !== undefined;