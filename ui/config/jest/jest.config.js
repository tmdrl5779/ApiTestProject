// JS 테스팅

// const path = require("path")

// const config = {
//   transform: {
//     "^.+\\.(js|jsx)$": [
//       "babel-jest",
//       { configFile: path.resolve(__dirname, "../babel/babel.config.js") },
//     ],
//   },
//   rootDir: "../..",
//   collectCoverageFrom: ["src/**/*.{js,jsx}"],
//   testMatch: [
//     "<rootDir>/src/**/__tests__/**/*.{js,jsx}",
//     "<rootDir>/src/**/*.{spec,test}.{js,jsx}",
//   ],
//   testEnvironment: "jest-environment-jsdom",
//   setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.js"],
//   // modulePaths: [".yarn"],
// }

// module.exports = config

// TS 테스팅
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  rootDir: '../..',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
    '@/(.*)': '<rootDir>/src/$1',
  },
  restoreMocks: true,
}
