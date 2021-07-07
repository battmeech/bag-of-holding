import { Box, Flex, Heading } from "@chakra-ui/layout";

import { AccessibleLink } from "shared";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          bag of holding
        </Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
