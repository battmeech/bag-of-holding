"use client";
import {
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import darkLogo from "@public/dark-logo.png";
import lightLogo from "@public/light-logo.png";
import { Heading } from "@chakra-ui/layout";
import darkCampaignPage from "@public/dark-campaign-page.png";
import lightCampaignPage from "@public/light-campaign-page.png";

export const Home = () => (
  <>
    <Stack w="full" align="center" direction={{ base: "column", sm: "row" }}>
      <Flex justify="center" flex="1">
        <Box boxSize="2xs">
          <Image
            src={useColorModeValue(lightLogo, darkLogo)}
            alt="bag of holding logo"
          />
        </Box>
      </Flex>
      <VStack flex="1" w="full" spacing="0">
        <Text textAlign="center" fontSize="5xl">
          bag of holding
        </Text>
        <Text>a place to store all your treasure</Text>
      </VStack>
    </Stack>
    <Stack
      spacing="8"
      direction={{ base: "column", md: "row" }}
      pt="16"
      align="center"
    >
      <VStack w="full" align="flex-start" spacing="4">
        <Heading fontSize={{ base: "3xl", sm: "4xl" }} fontWeight="extrabold">
          <Text display="block">under construction</Text>
          <Text display="block" color="teal">
            come back soon.
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
      </VStack>
      <Flex w="full" h="full" align="center">
        <Image
          src={useColorModeValue(darkCampaignPage, lightCampaignPage)}
          alt="bag of holding campaign page screenshot"
        />
      </Flex>
    </Stack>
  </>
);