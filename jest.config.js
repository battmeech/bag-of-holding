/** @type {import('jest').Config} */
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/app/**",
    "!src/auth/**",
    "!src/ui-styling/**",
  ],
};
