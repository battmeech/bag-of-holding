"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import { PageHeading } from "@ui-components/PageHeading";
import React from "react";
import { trpc } from "@trpc-client/client";
import { useParams, useRouter } from "next/navigation";

export const Join = () => {
  const params = useParams();
  const { push } = useRouter();

  const trpcContext = trpc.useContext();
  const { mutate } = trpc.campaign.join.useMutation({
    onSuccess: () => {
      trpcContext.campaign.list.invalidate();
    },
  });

  const joinCampaign = async () => {
    mutate({
      campaignId: params.campaignId as string,
    });
    push(`/campaigns/${params.campaignId}`);
  };

  return (
    <Box>
      <Flex mb="8" as="header" width="full" align="center">
        <PageHeading>join campaign</PageHeading>
      </Flex>

      <Button colorScheme="teal" onClick={() => joinCampaign()}>
        join now
      </Button>
    </Box>
  );
};
