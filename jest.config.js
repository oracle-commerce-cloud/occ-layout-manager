const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.json`,

    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' }),
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/test/**/*.spec.(ts|js)',
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
};
