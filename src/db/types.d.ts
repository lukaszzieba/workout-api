import { Knex } from 'knex';
import { Exercise, TExerciseI, TExerciseU } from '@routes/exercise/exercise-entity';
import { Training, TTrainingI, TTrainingU } from '@routes/training/training-entity';
import { UserEntity, TUserEntityI, TUserEntityU  } from '@routes/user/types';
import { Plan, TPlanI, TPlanU } from '@routes/plan/plan-entity';

declare module 'knex/types/tables' {
  interface Tables {
    exercise: Knex.CompositeTableType<Exercise, TExerciseI, TExerciseU>;
    training: Knex.CompositeTableType<Training, TTrainingI, TTrainingU>;
    user: Knex.CompositeTableType<UserEntity, TUserEntityI, TUserEntityU>;
    plan: Knex.CompositeTableType<Plan, TPlanI, TPlanU>;
  }
}
