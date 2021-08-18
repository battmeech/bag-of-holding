import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { ListCampaigns_campaigns as Campaign } from "campaigns/gql";
import NextLink from "next/link";
import { GiElfHelmet, GiPlainDagger } from "react-icons/gi";

export const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Link as={NextLink} href={`/campaigns/${campaign.id}`}>
      <HStack
        cursor="pointer"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        justify="space-between"
      >
        <VStack>
          <Text w="full" fontSize="md">
            {campaign.name}
          </Text>
        </VStack>

        <VStack>
          <HStack w="full" justifyContent="flex-end">
            <Text fontSize="xs">{campaign.userCount} players</Text>
            <GiElfHelmet />
          </HStack>
          <HStack w="full" justifyContent="flex-end">
            <Text fontSize="xs">{campaign.itemCount} items</Text>{" "}
            <GiPlainDagger />
          </HStack>
        </VStack>
      </HStack>
    </Link>
  );
};
