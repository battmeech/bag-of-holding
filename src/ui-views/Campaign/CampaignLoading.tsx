import { Box, HStack, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import React from "react";

export const CampaignLoading = () => {
  return (
    <Box>
      <VStack mb={1}>
        <HStack justify="space-between" w="full">
          <Skeleton w="50%" h="36px" />
        </HStack>

        <HStack w="full" justify="space-between">
          <Skeleton w="25%" h="40px" />
          <Skeleton w="30%" h="40px" />
        </HStack>

        <HStack justify="space-between" w="full">
          <Skeleton w="35%" h="40px" />
          <Skeleton w="25%" h="40px" />
        </HStack>
        <Skeleton w="full" h="40px" />

        <SimpleGrid
          mt="4"
          data-testid="active-quest-grid"
          columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
          spacing={4}
          w="full"
          mb={6}
        >
          {Array(10)
            .fill(undefined)
            .map((_, i) => (
              <Skeleton borderRadius="lg" h="145" w="330" key={i} />
            ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
