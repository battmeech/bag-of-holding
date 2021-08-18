import { Heading } from "@chakra-ui/layout";
import { Button, HStack, IconButton, Link } from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import NextLink from "next/link";
import { SiDiscord } from "react-icons/si";
import { AccessibleLink } from "shared";
import { useSession } from "shared/session";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
  const { session } = useSession();

  return (
    <HStack as="header" width="full" justify="space-between">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          bag of holding
        </Heading>
      </AccessibleLink>

      <HStack>
        <Link as={NextLink} href="https://discord.gg/yKMDkaUgEv">
          <IconButton
            variant="ghost"
            size="md"
            aria-label="join our discord"
            icon={<SiDiscord />}
          />
        </Link>
        <ThemeToggle />
        {session?.user ? (
          <UserAvatar />
        ) : (
          <Button colorScheme="teal" onClick={() => signIn()}>
            sign in
          </Button>
        )}
      </HStack>
    </HStack>
  );
};
