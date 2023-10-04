"use client";
import { Heading } from "@chakra-ui/layout";
import { Button, HStack } from "@chakra-ui/react";
import { ThemeToggle } from "@ui-components/Header/ThemeToggle";
import { Link } from "@chakra-ui/next-js";
import { signIn, useSession } from "next-auth/react";
import { UserAvatar } from "@ui-components/Header/UserAvatar";

export const Header = () => {
  const { status } = useSession();

  return (
    <HStack as="header" width="full" justify="space-between">
      <Link href="/">
        <Heading as="h1" size="md">
          bag of holding
        </Heading>
      </Link>
      <HStack>
        <ThemeToggle />

        {status === "authenticated" ? (
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
