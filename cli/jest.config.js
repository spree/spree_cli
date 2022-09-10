// @ts-check

/**
 * Jest's configuration object.
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  transform: {
    '^.+\\.[jt]s$': 'ts-jest'
  },
  coverageDirectory: './coverage/',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  watchPathIgnorePatterns: ['**/node_modules'],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)']
};
