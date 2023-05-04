import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Exercise {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  name: string;
  shortDescription: string | null;
  description: string | null;
  userId: Generated<number>;
}

export interface Plan {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  name: string;
  description: string;
  userId: Generated<number>;
}

export interface Training {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  name: string;
  shortDescription: string | null;
  description: string | null;
  userId: Generated<number>;
}

export interface TrainingExercise {
  trainingId: number;
  exerciseId: number;
  sets: number;
  reps: number;
  tempo: string | null;
  reserve: string | null;
  rest: string | null;
}

export interface Users {
  id: Generated<number>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  name: string;
  lastname: string | null;
  email: string | null;
  password: string | null;
}

export interface DB {
  exercise: Exercise;
  plan: Plan;
  training: Training;
  trainingExercise: TrainingExercise;
  users: Users;
}
