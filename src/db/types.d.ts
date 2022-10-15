import { Knex } from 'knex';
import { Exercise, TExerciseI, TExerciseU } from '../exercise/exercise-entity';
import { Training, TTrainingI, TTrainingU } from '../training/training-entity';

declare module 'knex/types/tables' {
  interface Tables {
    exercise: Knex.CompositeTableType<Exercise, TExerciseI, TExerciseU>;
    training: Knex.CompositeTableType<Training, TTrainingI, TTrainingU>;
  }
}
