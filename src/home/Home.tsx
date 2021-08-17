import {
  Button,
  Center,
  Image,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export const Home = () => {
  const { colorMode } = useColorMode();

  /* istanbul ignore next */
  const logo = colorMode === "dark" ? "/dark-logo.png" : "/light-logo.png";

  return (
    <Center h="80vh" w="100%">
      <VStack spacing="8" textAlign="center">
        <VStack spacing="0">
          <Image
            src={logo}
            boxSize={{ base: "250px", md: "325px", lg: "500px" }}
            alt="bag of holding logo"
          />
          <Text fontSize="5xl">bag of holding</Text>
          <Text>a place to store all your treasure</Text>
        </VStack>

        <Link href="/campaigns" passHref>
          <Button colorScheme="teal">get started</Button>
        </Link>
      </VStack>
    </Center>
  );
};
