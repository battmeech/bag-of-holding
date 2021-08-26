module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/**/__test__/**",
    "!src/**/*.stories.*",
    "!src/shared/generators/*",
    "!src/pages/**/*",
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
};
