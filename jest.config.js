// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': ['ts-jest', {
      tsconfig: {
        allowJs: true,
      },
    }],
  },
  testRegex: '(\\.|/)(test|spec)\\.(t|j)s$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@reduxjs/toolkit)/)',
  ],
};
