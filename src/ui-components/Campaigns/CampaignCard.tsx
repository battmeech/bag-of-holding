import {
  Box,
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
            {campaign.users.length}{" "}
            <chakra.span color="gray.500">players</chakra.span>
          </Text>
        </HStack>
        <HStack align="center">
          <GiPlainDagger />
          <Text>
            {campaign.items.length}{" "}
            <chakra.span color="gray.500">items</chakra.span>
          </Text>
        </HStack>
      </Stack>
    </VStack>
  );
};
