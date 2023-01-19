// import dotenv from 'dotenv'
// dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'react',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  // setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}
