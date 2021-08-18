import { useQuery } from "@apollo/client";
import { Avatar, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { WithSession } from "types";
import { MeGQL } from "./gql";

export const Profile: React.FC<WithSession> = ({ session }) => {
  const { data } = useQuery(MeGQL);

  return (
    <>
      <HStack justify="space-between">
        <Heading>user profile</Heading>
      </HStack>
      <Avatar
        mt="8"
        name={session.user.name || undefined}
        src={session.user.image || undefined}
      />
      <VStack mt="8" align="flex-start" spacing="2">
        <HStack>
          <Text>name:</Text>
          <Text fontWeight="bold">{session.user.name}</Text>
        </HStack>
        <VStack>
          <Text>campaigns:</Text>
          {data?.me.campaigns && data.me.campaigns.length > 1 ? (
            data.me.campaigns.map((campaign: any) => (
              <Text fontWeight="bold" key={campaign.id}>
                <Link as={NextLink} href={`/campaigns/${campaign.id}`}>
                  {campaign.name}
                </Link>
              </Text>
            ))
          ) : (
            <Text>none yet</Text>
          )}
        </VStack>
      </VStack>
    </>
  );
};
