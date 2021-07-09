import { useQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { AccessibleLink } from "shared";
import { ListCampaigns, ListCampaignsGQL } from "./gql";

const List = () => {
  const { data } = useQuery<ListCampaigns>(ListCampaignsGQL);

  return (
    <Box>
      <Text fontSize="xl" mb={4}>
        campaigns
      </Text>

      {data?.listCampaigns.map((campaign) => (
        <Box key={campaign?.id}>
          <AccessibleLink href={`/${campaign?.id}`}>
            {campaign?.name}
          </AccessibleLink>
        </Box>
      ))}
    </Box>
  );
};

export default List;
