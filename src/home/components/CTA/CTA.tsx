import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { useSession } from "shared";
import darkCampaignPage from "../../../../public/dark-campaign-page.png";
import lightCampaignPage from "../../../../public/light-campaign-page.png";

export const CTA: React.FC = () => {
  const { session } = useSession();

  const ctaText = () => {
    if (!session) return "sign in";
    if (session.isNewUser) return "get started";
    return "view campaigns";
  };

  return (
    <Stack
      spacing="8"
      direction={{ base: "column", md: "row" }}
      pt="16"
      align="center"
    >
      <VStack w="full" align="flex-start" spacing="4">
        <Heading fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="extrabold">
          <Text display="block">ready for adventure?</Text>
          <Text display="block" color="teal">
            jump in now.
          </Text>
        </Heading>
        <Box>
          <Text mb={6} fontSize={{ base: "lg", md: "xl" }}>
            bag of holding is a fast and lightweight way of keeping track of
            your tabletop campaign’s inventory, with mobile and browser support.
          </Text>
          <Text fontSize={{ base: "lg", md: "xl" }}>
            share the load between your party, or designate one person as the
            master-looter! maybe not the rogue…
          </Text>
        </Box>
        <Link as={NextLink} href="/campaigns" passHref>
          <Button w={{ base: "full", md: "auto" }} colorScheme="teal" size="lg">
            {ctaText()}
          </Button>
        </Link>
      </VStack>
      <Flex w="full" h="full" align="center">
        <Image
          src={useColorModeValue(darkCampaignPage, lightCampaignPage)}
          alt="bag of holding campaign page screenshot"
        />
      </Flex>
    </Stack>
  );
};
