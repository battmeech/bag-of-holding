import { Heading } from "@chakra-ui/layout";
import { HStack, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { SiDiscord } from "react-icons/si";
import { AccessibleLink } from "shared";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
  return (
    <HStack as="header" width="full" justify="space-between">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          bag of holding
        </Heading>
      </AccessibleLink>

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
        <UserAvatar />
      </HStack>
    </HStack>
  );
};
