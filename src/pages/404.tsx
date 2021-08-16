/* istanbul ignore file */
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/layout";
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
          illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">page not found</Heading>

        <Box textAlign="center" marginTop={4}>
          <Link href="/" passHref>
            <Button mt="4" colorScheme="teal">
              head back
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
