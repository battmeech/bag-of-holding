import {
  Box,
  Button,
  chakra,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { GiElfHelmet, GiPlainDagger } from "react-icons/gi";
import { Outputs } from "@trpc-client/client";
import { Link } from "@chakra-ui/next-js";

export const CampaignCard = ({
  campaign,
}: {
  campaign: Outputs["campaign"]["list"][0];
}) => {
  return (
    <VStack p="4" borderWidth="1px" borderRadius="lg">
      <Box py="2">
        <Heading fontSize="lg" textTransform="lowercase">
          {campaign.name}
        </Heading>
      </Box>

      <Divider />

      <Stack
        spacing={{ base: "2", sm: "8" }}
        direction={{ base: "column", sm: "row" }}
      >
        <HStack align="center">
          <GiElfHelmet />
          <Text>
            {campaign.numberOfUsers}{" "}
            <chakra.span color="gray.500">players</chakra.span>
          </Text>
        </HStack>
        <HStack align="center">
          <GiPlainDagger />
          <Text>
            {campaign.numberOfItems}{" "}
            <chakra.span color="gray.500">items</chakra.span>
          </Text>
        </HStack>
      </Stack>

      <Box w="full">
        <Link href={`/campaigns/${campaign.id}`}>
          <Button w="full" variant="link" colorScheme="teal">
            view
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};
