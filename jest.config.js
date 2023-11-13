/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  transform: {
    '^.+\\.[jt]s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  coverageReporters: ['json', 'lcov', 'text-summary', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
    },
  },
}
