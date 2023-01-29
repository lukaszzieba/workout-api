import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  moduleNameMapper: {
    '^@db': ['<rootDir>/src/db'],
    '^@db/(.*)$': ['<rootDir>src/db/$1'],
    '^@exercise/(.*)$': ['<rootDir>src/exercise/$1'],
    '^@server/(.*)$': ['<rootDir>src/server/$1'],
    '^@training/(.*)$': ['<rootDir>src/training/$1'],
    '^@types': ['<rootDir>src/types'],
    '^@types/(.*)$': ['<rootDir>src/types/$1'],
    '^@user/(.*)$': ['<rootDir>src/user/$1'],
    '^@utils/(.*)$': ['<rootDir>src/utils/$1'],
    '^@workout/(.*)$': ['<rootDir>src/workout/$1'],
  },
};
export default config;
