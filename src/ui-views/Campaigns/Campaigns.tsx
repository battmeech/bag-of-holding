"use client";
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
import { PageHeading } from "@ui-components/PageHeading";
import React from "react";
import { CampaignList } from "@ui-views/Campaigns/CampaignList";
import { trpc } from "@trpc-client/client";
import { useModal } from "@ui-components/ModalProvider";
import { CampaignModal } from "@ui-views/Campaigns/CampaignModal/CampaignModal";

export const Campaigns = () => {
  const { data, isLoading } = trpc.campaign.list.useQuery();
  const { openModal } = useModal();

  return (
    <Box>
      <Flex mb="8" as="header" width="full" align="center">
        <PageHeading>campaigns</PageHeading>

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
      {data && data.length < 1 ? (
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
        <CampaignList loading={isLoading} campaigns={data} />
      )}
    </Box>
  );
};
