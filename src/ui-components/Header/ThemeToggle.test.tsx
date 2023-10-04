import { useColorMode } from "@chakra-ui/color-mode";
import { render } from "@testing-library/react";
import { ThemeToggle } from "@ui-components/Header/ThemeToggle";

jest.mock("@chakra-ui/color-mode", () => ({
  ...jest.requireActual("@chakra-ui/color-mode"),
  useColorMode: jest.fn(),
}));

describe(ThemeToggle.name, () => {
  const testCases = [
    ["moon-icon", "light"],
    ["sun-icon", "dark"],
  ];
  it.each(testCases)(
    "renders a %s when colour mode is %s",
    (testId, colourMode) => {
      (useColorMode as jest.Mock).mockReturnValue({
        colorMode: colourMode as "light" | "dark",
        toggleColorMode: jest.fn(),
        setColorMode: jest.fn(),
      });
      const { getAllByTestId } = render(<ThemeToggle />);

      expect(getAllByTestId(testId)[0]).toBeInTheDocument();
    }
  );
});
