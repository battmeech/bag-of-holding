import * as ColourContext from "@chakra-ui/color-mode";
import { render } from "shared";
import ThemeToggle from "../ThemeToggle";

describe("ThemeToggle", () => {
  const testCases = [
    ["moon-icon", "light"],
    ["sun-icon", "dark"],
  ];
  it.each(testCases)(
    "renders a %s when colour mode is %s",
    (testId, colourMode) => {
      jest.spyOn(ColourContext, "useColorMode").mockReturnValue({
        colorMode: colourMode as "light" | "dark",
        toggleColorMode: jest.fn(),
        setColorMode: jest.fn(),
      });
      const { getAllByTestId } = render(<ThemeToggle />);

      expect(getAllByTestId(testId)[0]).toBeInTheDocument();
    }
  );
});
