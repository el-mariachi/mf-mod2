import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@utils-kit/(.*)': '<rootDir>/src/utils/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@game/(.*)': '<rootDir>/src/game/$1',
    '@scenes/(.*)': '<rootDir>/src/game/scenes/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@store/(.*)': '<rootDir>/src/store/$1',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
}
