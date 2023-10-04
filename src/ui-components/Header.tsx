"use client";
import { Heading } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { ThemeToggle } from "@ui-components/ThemeToggle";
import { Link } from "@chakra-ui/next-js";

export const Header = () => (
  <HStack as="header" width="full" justify="space-between">
    <Link href="/">
      <Heading as="h1" size="md">
        bag of holding
      </Heading>
    </Link>
    <HStack>
      <ThemeToggle />
    </HStack>
  </HStack>
);
