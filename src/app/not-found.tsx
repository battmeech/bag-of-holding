"use client";
import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import darkDice from "@public/dark-dice.png";
import lightDice from "@public/light-dice.png";
import { MotionBox } from "@ui-components/MotionBox";
import { FC } from "react";

const Page404: FC = () => (
  <>
    <MotionBox
      animate={{ y: 20 }}
      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
      width={["100%", "70%", "60%", "60%"]}
      margin="0 auto"
    >
      <Image
        src={useColorModeValue(lightDice, darkDice)}
        alt="nat 1 dice roll"
      />
    </MotionBox>
    <Text textAlign="center" fontSize="xs">
      page not found
    </Text>

    <Box marginY={4}>
      <Heading textAlign="center">you failed your investigation check</Heading>

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

export default Page404;
