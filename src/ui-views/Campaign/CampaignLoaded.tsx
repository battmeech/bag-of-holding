import { Avatar, AvatarGroup, Box, HStack, VStack } from "@chakra-ui/react";
import { Campaign } from "@ui-views/Campaign/types";
import { PageHeading } from "@ui-components/PageHeading";
import { ShareCampaign } from "@ui-components/ShareCampaign";
import { CurrencyDisplay } from "@ui-components/Currency/CurrencyDisplay";
import React from "react";
import { CampaignButtonGroup } from "@ui-views/Campaign/CampaignButtonGroup";
import { ItemGrid } from "@ui-views/Campaign/ItemGrid/ItemGrid";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  return (
    <Box>
      <VStack mb={1}>
        <HStack justify="space-between" w="full">
          <PageHeading>{campaign.name}</PageHeading>
        </HStack>

        <HStack w="full" justify="space-between">
          <AvatarGroup size="sm" max={4}>
            {campaign.users.map((user) => (
              <Avatar
                key={user.id}
                aria-label="user avatar"
                size="sm"
                src={user.image || undefined}
                name={user.name || undefined}
              />
            ))}
          </AvatarGroup>

          <ShareCampaign />
        </HStack>

        <HStack justify="space-between" w="full">
          <CurrencyDisplay
            copper={campaign.copper}
            silver={campaign.silver}
            gold={campaign.gold}
            electrum={campaign.electrum}
            platinum={campaign.platinum}
          />
          <CampaignButtonGroup campaignId={campaign.id} />
        </HStack>
      </VStack>

      <ItemGrid items={campaign.items} campaignId={campaign.id} />
    </Box>
  );
};
