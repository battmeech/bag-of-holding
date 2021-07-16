import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      variant="ghost"
      size="lg"
      icon={
        colorMode === "light" ? (
          <RiMoonFill data-testid="moon-icon" />
        ) : (
          <RiSunLine data-testid="sun-icon" />
        )
      }
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
