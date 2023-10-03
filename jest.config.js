module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  testEnvironment: "jsdom",
};
