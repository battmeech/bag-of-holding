import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Currency } from "campaign/components/Currency";
import { ItemCard } from "campaign/components/ItemCard";
import { AddItemModal } from "campaign/components/ItemModal";
import { MoneyModal } from "campaign/components/MoneyModal";
import { FetchCampaign_campaign_Campaign as Campaign } from "campaign/gql";
import { useEffect, useState } from "react";
import { FaPiggyBank } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useModal } from "shared";
import { Sorting } from "./Sorting";
import { useSortItems } from "./useSortItems";

export const CampaignLoaded = ({ campaign }: { campaign: Campaign }) => {
  const { openModal } = useModal();
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState(campaign.items ?? []);

  const { sortItems, sortingOrder, toggleSortingOrder } = useSortItems();

  useEffect(() => {
    const newFilteredItems = campaign.items?.filter(
      (item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.tags.filter((tag) =>
          tag.toLowerCase().includes(filterText.toLowerCase())
        ).length > 0
    );
    setFilteredItems(newFilteredItems ?? []);
  }, [filterText, campaign.items]);

  return (
    <Box>
      <Flex as="header" width="full" align="center">
        <Text fontSize="xl">{campaign.name}</Text>

        <Box ml="auto">
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
        </Box>
      </Flex>

      <Flex mb={2}>
        <Currency denomination="platinum" value={campaign.platinum} mr={3} />
        <Currency denomination="gold" value={campaign.gold} mr={3} />
        <Currency denomination="electrum" value={campaign.electrum} mr={3} />
        <Currency denomination="silver" value={campaign.silver} mr={3} />
        <Currency denomination="copper" value={campaign.copper} mr={2} />

        <Tooltip label="modify money">
          <IconButton
            aria-label="edit money"
            variant="ghost"
            size="lg"
            icon={<FaPiggyBank />}
            onClick={() => openModal(<MoneyModal campaignId={campaign.id} />)}
          />
        </Tooltip>
      </Flex>
      {campaign.items?.length === 0 ? (
        <Box mb={6}>
          <Text mb={4}>looks empty in here</Text>
          <Button
            colorScheme="teal"
            onClick={() => openModal(<AddItemModal campaignId={campaign.id} />)}
          >
            add an item
          </Button>
        </Box>
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
                  onTagClick={(tag) => setFilterText(tag.toLowerCase())}
                  key={item.id}
                  item={item}
                />
              ))}
          </SimpleGrid>
        </>
      )}

      <Text fontSize="xs">campaign id: {campaign.id}</Text>
    </Box>
  );
};
