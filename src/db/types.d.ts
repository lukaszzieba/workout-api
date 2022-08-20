import { Knex } from 'knex';
import { Exercise, TExerciseI, TExerciseU } from '../exercise/exercise-entity';

declare module 'knex/types/tables' {
  interface Tables {
    exercises: Knex.CompositeTableType<Exercise, TExerciseI, TExerciseU>;
  }
}
