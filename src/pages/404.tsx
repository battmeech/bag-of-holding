/* istanbul ignore file */
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { MotionBox } from "shared";

const Page404 = () => {
  return (
    <>
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>
      <Text textAlign="center" fontSize="xs">
        <ChakraLink href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>{"It's Okay!"}</Text>
          <Link href="/">
            <Button
              mt="4"
              backgroundColor={useColorModeValue("gray.300", "teal.500")}
            >
              {"Let's Head Back"}
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
