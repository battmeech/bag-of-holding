import { useMutation } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import {
  CreateCampaign,
  CreateCampaignGQL,
  CreateCampaignVariables,
} from "./gql";

const Home = () => {
  const [campaignName, setCampaignName] = useState("");
  const router = useRouter();

  const [mutate, { loading }] = useMutation<
    CreateCampaign,
    CreateCampaignVariables
  >(CreateCampaignGQL);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    createCampaign();
  };

  const createCampaign = async () => {
    const { data } = await mutate({ variables: { name: campaignName } });
    if (data) router.push(`/${data.createCampaign.id}`);
  };

  return (
    <Box mb={8} width={{ base: "100%", md: "75%", lg: "50%" }}>
      <Text mb={4}>create a new campaign</Text>
      <form onSubmit={onSubmit}>
        <Box mb={4}>
          <Input
            my="auto"
            placeholder="campaign name"
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
          />
        </Box>
      </form>

      <Button
        disabled={loading || !campaignName}
        onClick={createCampaign}
        colorScheme="teal"
      >
        create new campaign
      </Button>

      <Link href="/return" passHref>
        <Button ml={4} colorScheme="teal" variant="link">
          already have one?
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
