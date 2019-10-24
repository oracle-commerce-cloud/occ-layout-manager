module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.json`,
    },
  },
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
}
