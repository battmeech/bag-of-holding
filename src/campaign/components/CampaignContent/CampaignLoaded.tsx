import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { CurrencyDisplay } from "campaign/components/Currency";
import { ItemCard } from "campaign/components/ItemCard";
import { AddItemModal } from "campaign/components/ItemModal";
import { FetchCampaign_campaign_Campaign as Campaign } from "campaign/gql";
import { MdClear } from "react-icons/md";
import { useModal } from "shared";
import { PageHeading } from "shared/components/PageHeading";
import { ShareCampaign } from "../ShareCampaign";
import { Sorting } from "./Sorting";
import { useFilterItems } from "./useFilterItems";
import { useSortItems } from "./useSortItems";

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

          <ShareCampaign />
        </HStack>

        <HStack justify="space-between" w="full">
          <CurrencyDisplay
            campaignId={campaign.id}
            copper={campaign.copper}
            silver={campaign.silver}
            gold={campaign.gold}
            electrum={campaign.electrum}
            platinum={campaign.platinum}
          />

          <Tooltip label="add item">
            <IconButton
              aria-label="add item"
              variant="ghost"
              size="lg"
              icon={<AddIcon />}
              onClick={() =>
                openModal(<AddItemModal campaignId={campaign.id} />)
              }
            />
          </Tooltip>
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
