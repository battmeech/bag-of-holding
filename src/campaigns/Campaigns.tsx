import { useQuery } from "@apollo/client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useModal } from "shared";
import { CampaignList } from "./components/CampaignList";
import { CampaignModal } from "./components/CampaignModal";
import { ListCampaigns, ListCampaignsGQL } from "./gql";

export const Campaigns = () => {
  const { data, loading } = useQuery<ListCampaigns>(ListCampaignsGQL);
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
      {data && data.campaigns.length < 1 ? (
        <Center w="full" h="60vh">
          <VStack spacing="8">
            <Text>nothing to see here!</Text>
            <Button
              colorScheme="teal"
              onClick={() => openModal(<CampaignModal />)}
            >
              create a campaign
            </Button>
          </VStack>
        </Center>
      ) : (
        <CampaignList loading={loading} campaigns={data?.campaigns} />
      )}
    </Box>
  );
};
