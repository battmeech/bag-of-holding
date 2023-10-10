import { Item } from "@ui-views/Campaign/types";
import React, { FC } from "react";
import {
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
import { AddItemModal } from "@ui-views/Campaign/ItemModal/AddItemModal";
import { SearchIcon } from "@chakra-ui/icons";
import { MdClear } from "react-icons/md";
import { Sorting } from "@ui-views/Campaign/Sorting";
import { ItemCard } from "@ui-views/Campaign/ItemCard/ItemCard";
import { useModal } from "@ui-components/ModalProvider";
import { useSortItems } from "@ui-views/Campaign/useSorting";
import { useFilterItems } from "@ui-views/Campaign/useFilter";

type ItemGridProps = {
  items: Item[];
  campaignId: string;
};

export const ItemGrid: FC<ItemGridProps> = ({ items, campaignId }) => {
  const { openModal } = useModal();
  const { sortItems, sortingOrder, toggleSortingOrder } = useSortItems();
  const { filterText, filteredItems, setFilterText } = useFilterItems(items);

  return (
    <>
      {items.length === 0 ? (
        <Center w="full" h="50vh">
          <VStack spacing="8">
            <Text>nothing to see here!</Text>
            <Button
              colorScheme="teal"
              onClick={() =>
                openModal(<AddItemModal campaignId={campaignId} />)
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
    </>
  );
};
