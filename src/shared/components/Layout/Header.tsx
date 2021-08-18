import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Avatar, HStack, Menu, MenuButton } from "@chakra-ui/react";
import { AccessibleLink } from "shared";
import { WithMaybeSession } from "types/withSession";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC<WithMaybeSession> = ({ session }) => {
  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          bag of holding
        </Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <HStack>
          <ThemeToggle />
          <Menu>
            <MenuButton>
              <Avatar size="sm" src={session?.user.image} />
            </MenuButton>
          </Menu>
        </HStack>
      </Box>
    </Flex>
  );
};
