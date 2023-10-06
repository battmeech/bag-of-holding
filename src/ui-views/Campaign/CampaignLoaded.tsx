import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdClear } from "react-icons/md";
import { Campaign } from "@ui-views/Campaign/types";
import { useModal } from "@ui-components/ModalProvider";
import { PageHeading } from "@ui-components/PageHeading";
import { ShareCampaign } from "@ui-components/ShareCampaign";
import { CurrencyDisplay } from "@ui-components/Currency/CurrencyDisplay";
import { useSortItems } from "@ui-views/Campaign/useSorting";
import { useFilterItems } from "@ui-views/Campaign/useFilter";
import { Sorting } from "@ui-views/Campaign/Sorting";
import { AddItemModal } from "@ui-views/Campaign/ItemModal/AddItemModal";
import { ItemCard } from "@ui-views/Campaign/ItemCard/ItemCard";
import React from "react";
import { CampaignButtonGroup } from "@ui-views/Campaign/CampaignButtonGroup";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  const { openModal } = useModal();
  const { sortItems, sortingOrder, toggleSortingOrder } = useSortItems();
  const { filterText, filteredItems, setFilterText } = useFilterItems(
    campaign.items
  );

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

      {campaign.items?.length === 0 ? (
        <Center w="full" h="50vh">
          <VStack spacing="8">
            <Text>nothing to see here!</Text>
            <Button
              colorScheme="teal"
              onClick={() =>
                openModal(<AddItemModal campaignId={campaign.id} />)
              }
            >
              add an item
            </Button>
          </VStack>
        </Center>
      ) : (
        <>
          <HStack>
            <InputGroup>
              <Input
                placeholder="search for items..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              {filterText && (
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setFilterText("")}
                >
                  <MdClear aria-label="clear filter" />
                </InputRightElement>
              )}
            </InputGroup>

            <Sorting
              sortingOrder={sortingOrder}
              toggleSortingOrder={toggleSortingOrder}
            />
          </HStack>
          <SimpleGrid
            mt="4"
            data-testid="card-grid"
            columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
            spacing={4}
            mb={6}
          >
            {filteredItems
              .slice()
              .sort(sortItems)
              .map((item) => (
                <ItemCard
                  onTagClick={setFilterText}
                  key={item.id}
                  item={item}
                />
              ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};
