"use client";
import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      variant="ghost"
      size="md"
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
