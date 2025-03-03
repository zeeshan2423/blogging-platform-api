export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.(m)?js$': '$1'
  },
  testMatch: ['**/tests/**/*.test.js'],
  transform: {},
  globals: {
    jest: true,
  },
};