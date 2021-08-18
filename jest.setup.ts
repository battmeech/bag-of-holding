import "@testing-library/jest-dom";

// Open issues on GitHub around testing with Next image optimisation. This is a workaround.
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    return "Next image stub";
  },
}));
