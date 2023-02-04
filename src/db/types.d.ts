import { Knex } from 'knex';
import { Exercise, TExerciseI, TExerciseU } from '@routes/exercise/exercise-entity';
import { Training, TTrainingI, TTrainingU } from '@routes/training/training-entity';
import { User, TUserI, TUserU } from '@routes/user/user-entity';
import { Plan, TPlanI, TPlanU } from '@routes/plan/plan-entity';

declare module 'knex/types/tables' {
  interface Tables {
    exercise: Knex.CompositeTableType<Exercise, TExerciseI, TExerciseU>;
    training: Knex.CompositeTableType<Training, TTrainingI, TTrainingU>;
    user: Knex.CompositeTableType<User, TUserI, TUserU>;
    plan: Knex.CompositeTableType<Plan, TPlanI, TPlanU>;
  }
}
