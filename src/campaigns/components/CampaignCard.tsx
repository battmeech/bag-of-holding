import {
  Box,
  Button,
  chakra,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ListCampaigns_campaigns as Campaign } from "campaigns/gql";
import NextLink from "next/link";
import React from "react";
import { GiElfHelmet, GiPlainDagger } from "react-icons/gi";

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
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
            {campaign.userCount}{" "}
            <chakra.span color="gray.500">players</chakra.span>
          </Text>
        </HStack>
        <HStack align="center">
          <GiPlainDagger />
          <Text>
            {campaign.itemCount}{" "}
            <chakra.span color="gray.500">items</chakra.span>
          </Text>
        </HStack>
      </Stack>

      <Box w="full">
        <Link as={NextLink} href={`/campaigns/${campaign.id}`}>
          <Button w="full" variant="link" colorScheme="teal">
            view
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};
