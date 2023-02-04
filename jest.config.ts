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
    '^@routes/(.*)$': ['<rootDir>src/routes/$1'],
    '^@server/(.*)$': ['<rootDir>src/server/$1'],
    '^@types': ['<rootDir>src/types'],
    '^@types/(.*)$': ['<rootDir>src/types/$1'],
    '^@utils/(.*)$': ['<rootDir>src/utils/$1'],
  },
};
export default config;
