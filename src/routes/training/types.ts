import { Service } from '@types';
import { Training, TTrainingI, TTrainingU } from '@routes/training/training-entity';

export type TrainingService = Service<Training, TTrainingI, TTrainingU> & {
  getByPlanId: (planId: number) => Promise<Training[]>;
};
