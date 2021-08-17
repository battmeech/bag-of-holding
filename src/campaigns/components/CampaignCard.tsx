import { ViewIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { ListCampaigns_campaigns as Campaign } from "campaigns/gql";
import Link from "next/link";
import React from "react";

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <VStack
      justify="space-between"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack w="full">
        <HStack w="full" justify="space-between">
          <Text fontSize="md">{campaign.name}</Text>

          <Link href={`/campaigns/${campaign.id}`}>
            <IconButton
              aria-label="open campaign"
              variant="ghost"
              size="xs"
              icon={<ViewIcon />}
            />
          </Link>
        </HStack>

        <Flex w="full" justify="flex-start">
          <Text fontSize="xs">
            created on: {new Date(campaign.createdAt).toDateString()}
          </Text>
        </Flex>
      </VStack>
    </VStack>
  );
};
