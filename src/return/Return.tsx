import { Box } from "@chakra-ui/layout";
import { Button, Input, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

function Return() {
  const [campaignCode, setCampaignCode] = useState("");
  const router = useRouter();

  /* istanbul ignore next */
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    router.push(`/${campaignCode}`);
  };

  return (
    <Box mb={8} width={{ base: "100%", md: "75%", lg: "50%" }}>
      <Text mb={4}>enter your campaign code</Text>
      <form onSubmit={onSubmit}>
        <Box mb={4}>
          <Input
            my="auto"
            placeholder="campaign code"
            value={campaignCode}
            onChange={(event) => setCampaignCode(event.target.value)}
          />
        </Box>
      </form>

      <SimpleGrid columns={{ sm: 1, lg: 2 }} spacing={8}>
        <Link href={`/${campaignCode}`} passHref>
          <Button colorScheme="teal" disabled={!campaignCode}>
            go to campaign
          </Button>
        </Link>

        <Link href="/" passHref>
          <Button ml={4} colorScheme="teal" variant="link">
            don&apos;t have one?
          </Button>
        </Link>
      </SimpleGrid>
    </Box>
  );
}

export default Return;
