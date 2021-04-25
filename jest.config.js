module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/**/*.type.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.config.ts',
    '!src/**/*.module.ts',
    '!src/**/index.ts',
    '!src/*'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/tests/$1'
  }
}
