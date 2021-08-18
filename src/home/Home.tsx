import {
  Box,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import darkLogo from "../../public/dark-logo.png";
import lightLogo from "../../public/light-logo.png";
import { CTA } from "./components/CTA";

export const Home = () => {
  const { colorMode } = useColorMode();
  return (
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
      <CTA />
    </>
  );
};
