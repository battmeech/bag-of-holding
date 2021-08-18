import { Box, Flex, Heading } from "@chakra-ui/layout";
import { HStack, IconButton } from "@chakra-ui/react";
import { AccessibleLink } from "shared";
import { WithMaybeSession } from "types/withSession";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatar } from "./UserAvatar";
import { SiDiscord } from "react-icons/si";
import NextLink from "next/link";

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
          <NextLink href="https://discord.gg/yKMDkaUgEv">
            <IconButton
              variant="ghost"
              size="md"
              aria-label="join our discord"
              icon={<SiDiscord />}
            />
          </NextLink>
          <ThemeToggle />
          <UserAvatar session={session} />
        </HStack>
      </Box>
    </Flex>
  );
};
