module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.{js,ts,tsx}", "!src/**/__test__/**"],
  testEnvironment: "jsdom",
};
