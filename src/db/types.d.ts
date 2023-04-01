import { Knex } from 'knex';
import {
  ExerciseEntity,
  TExerciseEntityI,
  TExerciseEntityU,
} from '@routes/exercise/exercise-entity';
import {
  TrainingEntity,
  TTrainingEntityI,
  TTrainingEntityU,
} from '@routes/training/training-entity';
import { UserEntity, TUserEntityI, TUserEntityU } from '@routes/user/types';
import { Plan, TPlanI, TPlanU } from '@routes/plan/plan-entity';

type TrainingExercise = {
  trainingId: number;
  exerciseId: number;
  sets: number;
  reps: number;
  tempo: number;
  reserve: number;
  reserve: rest;
};

declare module 'knex/types/tables' {
  interface Tables {
    exercise: Knex.CompositeTableType<ExerciseEntity, TExerciseEntityI, TExerciseEntityU>;
    training: Knex.CompositeTableType<TrainingEntity, TTrainingEntityI, TTrainingEntityU>;
    users: Knex.CompositeTableType<UserEntity, TUserEntityI, TUserEntityU>;
    plan: Knex.CompositeTableType<Plan, TPlanI, TPlanU>;
    trainingExercise: Knex.CompositeTableType<TrainingExercise>;
  }
}
