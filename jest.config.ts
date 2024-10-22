// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
