import { useQuery } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useModal } from "shared";
import { CampaignList } from "./components/CampaignList";
import { CampaignModal } from "./components/CampaignModal";
import { ListCampaigns, ListCampaignsGQL } from "./gql";

export const Campaigns = () => {
  const { data } = useQuery<ListCampaigns>(ListCampaignsGQL);
  const { openModal } = useModal();

  return (
    <Box>
      <Flex as="header" width="full" align="center">
        <Text fontSize="xl">campaigns</Text>

        <Box ml="auto">
          <Tooltip label="create campaign">
            <IconButton
              aria-label="create campaign"
              variant="ghost"
              size="lg"
              icon={<AddIcon />}
              onClick={() => openModal(<CampaignModal />)}
            />
          </Tooltip>
        </Box>
      </Flex>

      <CampaignList campaigns={data?.campaigns} />
    </Box>
  );
};
